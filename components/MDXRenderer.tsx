'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { mdxComponents } from './MDXComponents'

interface MDXRendererProps {
  content: string
}

export default function MDXRenderer({ content }: MDXRendererProps) {
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
      <div className="flex items-center justify-center py-8">
        <div className="text-muted">Loading content...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg">
        <div className="text-red-400 mb-2">Error loading content</div>
        <div className="text-sm text-muted">{error}</div>
      </div>
    )
  }

  if (!mdxSource) {
    return (
      <div className="bg-surface border border-border p-6 rounded-lg">
        <div className="text-muted">No content available</div>
      </div>
    )
  }

  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </div>
  )
}
