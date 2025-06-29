'use client'

import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { mdxComponents } from './MDXComponents'

interface SlidePresentationRendererProps {
  content: string
  title: string
  course: string
  lecture: string
}

interface Slide {
  title: string
  content: string
  mdxSource: MDXRemoteSerializeResult | null
}

// Slide-specific component overrides
const slideComponents = {
  ...mdxComponents,
  h1: (props: any) => (
    <h1 className="text-6xl font-bold text-accent mb-8 text-center leading-tight" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-5xl font-semibold text-accent mb-6 text-center leading-tight" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-4xl font-medium mb-6 text-center" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-3xl font-medium mb-4 text-center" {...props} />
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-2xl leading-relaxed mb-6 text-center max-w-4xl mx-auto" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-xl space-y-4 mb-8 max-w-3xl mx-auto" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-xl space-y-4 mb-8 max-w-3xl mx-auto" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="flex items-start gap-4" {...props}>
      <span className="text-accent mt-2 text-2xl">•</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-8 border-accent bg-surface p-8 rounded-r-lg mb-8 italic text-2xl max-w-4xl mx-auto" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: any) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-surface px-3 py-2 rounded text-accent font-mono text-xl">
          {children}
        </code>
      )
    }
    // Block code (handled by pre)
    return <code className={className} {...props}>{children}</code>
  },
  // Enhanced images for slides
  img: ({ src, alt, ...props }: any) => (
    <div className="my-8 text-center">
      <img
        src={src}
        alt={alt}
        className="rounded-lg mx-auto max-w-full h-auto cursor-zoom-in"
        style={{ maxHeight: '70vh' }}
        data-zoomable
        {...props}
      />
    </div>
  ),
  // Enhanced pre/code blocks for slides
  pre: ({ children, ...props }: any) => {
    const child = children?.props
    if (child?.className?.includes('language-mermaid')) {
      return (
        <div className="my-8">
          {mdxComponents.pre?.({ children, ...props })}
        </div>
      )
    }
    return (
      <div className="my-8 text-left max-w-5xl mx-auto">
        {mdxComponents.pre?.({ children, ...props })}
      </div>
    )
  },
}

export default function SlidePresentationRenderer({
  content,
  title,
  course,
  lecture
}: SlidePresentationRendererProps) {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  // Split content into slides by ## headers
  const parseSlides = useCallback(async (content: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Split by ## but keep the ## headers
      const sections = content.split(/(?=^## )/m).filter(section => section.trim())

      const parsedSlides: Slide[] = []

      // Create title slide
      const titleSlide: Slide = {
        title: title,
        content: `# ${title}`,
        mdxSource: null
      }
      titleSlide.mdxSource = await serialize(titleSlide.content, {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          development: process.env.NODE_ENV === 'development',
        },
      })
      parsedSlides.push(titleSlide)

      // Parse content slides
      for (const section of sections) {
        const lines = section.trim().split('\n')
        const firstLine = lines[0]

        let slideTitle = title
        let slideContent = section.trim()

        // Extract title from ## header
        if (firstLine.startsWith('## ')) {
          slideTitle = firstLine.replace('## ', '').trim()
        } else if (firstLine.startsWith('# ')) {
          slideTitle = firstLine.replace('# ', '').trim()
        }

        const slide: Slide = {
          title: slideTitle,
          content: slideContent,
          mdxSource: null
        }

        slide.mdxSource = await serialize(slideContent, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
            development: process.env.NODE_ENV === 'development',
          },
        })

        parsedSlides.push(slide)
      }

      setSlides(parsedSlides)
    } catch (err) {
      console.error('Slide parsing error:', err)
      setError('Failed to parse slides')
    } finally {
      setIsLoading(false)
    }
  }, [title])

    // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '0')) {
      event.preventDefault()
      if (event.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.1, 2))
      } else if (event.key === '-') {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5))
      } else if (event.key === '0') {
        setZoomLevel(1)
      }
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      setCurrentSlide(prev => Math.max(0, prev - 1))
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setCurrentSlide(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setCurrentSlide(slides.length - 1)
    }
  }, [slides.length])

    // Handle mouse wheel zoom
  const handleWheel = useCallback((event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault()
      const delta = event.deltaY > 0 ? -0.1 : 0.1
      setZoomLevel(prev => Math.max(0.5, Math.min(2, prev + delta)))
    }
  }, [])

  useEffect(() => {
    if (content) {
      parseSlides(content)
    }
  }, [content, parseSlides])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [handleKeyDown, handleWheel])

  // Initialize zoom for images
  useEffect(() => {
    import('medium-zoom').then(({ default: mediumZoom }) => {
      mediumZoom('[data-zoomable]', {
        background: 'rgba(16, 15, 15, 0.95)',
      })
    })
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted text-2xl">Loading slides...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-surface border border-border p-8 rounded-lg text-center">
          <div className="text-red-400 text-2xl mb-4">Error loading slides</div>
          <div className="text-muted text-lg">{error}</div>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-surface border border-border p-8 rounded-lg text-center">
          <div className="text-muted text-2xl">No slides available</div>
        </div>
      </div>
    )
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-10 bg-gradient-to-b from-background/90 to-transparent">
        <Link
          href={`/courses/${course}/${lecture}`}
          className="flex items-center gap-2 text-muted hover:text-text transition-colors text-lg"
        >
          <ChevronLeft size={20} />
          Back to Lecture
        </Link>

        <div className="text-right">
          <div className="text-accent font-medium text-lg">{title}</div>
          <div className="text-muted text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div
        className="min-h-screen flex items-center justify-center p-8 transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <div className="w-full max-w-6xl mx-auto">
          {slide.mdxSource && (
            <div className="prose prose-invert max-w-none">
              <MDXRemote {...slide.mdxSource} components={slideComponents} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-surface border border-border rounded-lg hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous slide (← or ↑)"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="px-4 py-2 bg-surface border border-border rounded-lg text-sm">
          {currentSlide + 1} / {slides.length}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 bg-surface border border-border rounded-lg hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next slide (→ or ↓)"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Zoom Indicator */}
      {zoomLevel !== 1 && (
        <div className="absolute top-20 right-6 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-muted">
          Zoom: {Math.round(zoomLevel * 100)}%
        </div>
      )}

      {/* Keyboard Help */}
      <div className="absolute bottom-6 right-6 text-xs text-muted max-w-48">
        <div>← → Navigate slides</div>
        <div>Ctrl + scroll: Zoom</div>
        <div>Home/End: First/Last slide</div>
      </div>
    </div>
  )
}
