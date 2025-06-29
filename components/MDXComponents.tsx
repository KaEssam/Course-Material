'use client'

import { Check, Copy } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Dynamically import Mermaid to avoid SSR issues
const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false })

interface CodeBlockProps {
  children: string
  className?: string
  filename?: string
}

function CodeBlock({ children, className = '', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const language = className.replace('language-', '') || 'text'

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="text-muted font-mono text-sm">
          {filename || language}
        </span>
        <button
          onClick={copyToClipboard}
          className="copy-button flex items-center gap-1"
          title="Copy code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#1C1B1A',
          fontSize: '0.875rem',
          fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

function Heading({ level, children, ...props }: any) {
  const id = typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : undefined

  const Component = `h${level}` as keyof JSX.IntrinsicElements
  const classes = {
    1: 'text-3xl font-bold mt-8 mb-4 text-accent',
    2: 'text-2xl font-semibold mt-6 mb-3 text-accent',
    3: 'text-xl font-medium mt-4 mb-2',
    4: 'text-lg font-medium mt-3 mb-2',
    5: 'text-base font-medium mt-2 mb-1',
    6: 'text-sm font-medium mt-2 mb-1',
  }

  return (
    <Component
      id={id}
      className={classes[level as keyof typeof classes] || ''}
      {...props}
    >
      <a href={`#${id}`} className="group relative">
        {children}
        <span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-50 text-muted">
          #
        </span>
      </a>
    </Component>
  )
}

function ZoomableImage({ src, alt, ...props }: any) {
  useEffect(() => {
    // Initialize medium-zoom after component mounts
    import('medium-zoom').then(({ default: mediumZoom }) => {
      mediumZoom('[data-zoomable]', {
        background: 'rgba(16, 15, 15, 0.9)',
      })
    })
  }, [])

  return (
    <img
      src={src}
      alt={alt}
      className="rounded-lg mx-auto max-w-full h-auto cursor-zoom-in"
      data-zoomable
      {...props}
    />
  )
}

export const mdxComponents = {
  pre: ({ children, ...props }: any) => {
    const child = children?.props
    if (child?.className?.includes('language-mermaid')) {
      return <MermaidDiagram chart={child.children} />
    }
    return (
      <CodeBlock className={child?.className} filename={props.filename}>
        {child?.children || ''}
      </CodeBlock>
    )
  },
  code: ({ className, children, ...props }: any) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-surface px-1.5 py-0.5 rounded text-accent font-mono text-sm">
          {children}
        </code>
      )
    }
    // Block code (handled by pre)
    return <code className={className} {...props}>{children}</code>
  },
  img: ZoomableImage,
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
  h5: (props: any) => <Heading level={5} {...props} />,
  h6: (props: any) => <Heading level={6} {...props} />,
  p: ({ children, ...props }: any) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-accent bg-surface p-4 rounded-r-lg mb-4 italic" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse bg-surface rounded-lg overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border-b border-border p-3 text-left font-medium bg-background" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border-b border-border p-3" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-secondary hover:text-accent underline transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
}
