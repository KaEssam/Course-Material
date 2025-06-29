'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { mdxComponents } from './MDXComponents'

interface PresentationRendererProps {
  content: string
}

// Presentation-specific component overrides
const presentationComponents = {
  ...mdxComponents,
  h1: (props: any) => (
    <h1 className="text-5xl font-bold text-accent mb-8 text-center" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-4xl font-semibold text-accent mb-6 mt-12 text-center" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-3xl font-medium mb-4 mt-8" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-2xl font-medium mb-3 mt-6" {...props} />
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-xl leading-relaxed mb-6 text-center max-w-3xl mx-auto" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-lg space-y-3 mb-8 max-w-2xl mx-auto" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-lg space-y-3 mb-8 max-w-2xl mx-auto" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="flex items-start gap-3" {...props}>
      <span className="text-accent mt-1">•</span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-accent bg-surface p-8 rounded-r-lg mb-8 italic text-xl max-w-3xl mx-auto" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: any) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-surface px-2 py-1 rounded text-accent font-mono text-lg">
          {children}
        </code>
      )
    }
    // Block code (handled by pre)
    return <code className={className} {...props}>{children}</code>
  },
  // Make images larger in presentation mode
  img: ({ src, alt, ...props }: any) => {
    useEffect(() => {
      // Initialize medium-zoom after component mounts
      import('medium-zoom').then(({ default: mediumZoom }) => {
        mediumZoom('[data-zoomable]', {
          background: 'rgba(16, 15, 15, 0.9)',
        })
      })
    }, [])

    return (
      <div className="my-8 text-center">
        <img
          src={src}
          alt={alt}
          className="rounded-lg mx-auto max-w-full h-auto cursor-zoom-in"
          style={{ maxHeight: '60vh' }}
          data-zoomable
          {...props}
        />
      </div>
    )
  },
}

export default function PresentationRenderer({ content }: PresentationRendererProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const compileMDX = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const mdxSource = await serialize(content, {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
            development: process.env.NODE_ENV === 'development',
          },
        })
        setMdxSource(mdxSource)
      } catch (err) {
        console.error('MDX compilation error:', err)
        setError('Failed to compile MDX content')
      } finally {
        setIsLoading(false)
      }
    }

    if (content) {
      compileMDX()
    }
  }, [content])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-muted text-xl">Loading presentation...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-surface border border-border p-8 rounded-lg text-center">
        <div className="text-red-400 text-xl mb-4">Error loading presentation</div>
        <div className="text-muted">{error}</div>
      </div>
    )
  }

  if (!mdxSource) {
    return (
      <div className="bg-surface border border-border p-8 rounded-lg text-center">
        <div className="text-muted text-xl">No content available</div>
      </div>
    )
  }

  return (
    <div className="presentation-content space-y-8">
      <MDXRemote {...mdxSource} components={presentationComponents} />
    </div>
  )
}
