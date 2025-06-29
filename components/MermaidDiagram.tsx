'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const mermaid = (await import('mermaid')).default

        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#D0A215',
            primaryTextColor: '#CECDC3',
            primaryBorderColor: '#403E3C',
            lineColor: '#878580',
            secondaryColor: '#4385BE',
            tertiaryColor: '#1C1B1A',
            background: '#100F0F',
            mainBkg: '#1C1B1A',
            secondaryBkg: '#403E3C',
            tertiaryBkg: '#100F0F',
          },
        })

        if (ref.current) {
          ref.current.innerHTML = ''
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart)
          ref.current.innerHTML = svg

          // Make diagram zoomable
          const svgElement = ref.current.querySelector('svg')
          if (svgElement) {
            svgElement.setAttribute('data-zoomable', 'true')
            svgElement.style.cursor = 'zoom-in'
            svgElement.style.maxWidth = '100%'
            svgElement.style.height = 'auto'

            // Initialize medium-zoom for this specific diagram
            import('medium-zoom').then(({ default: mediumZoom }) => {
              mediumZoom(svgElement as unknown as HTMLElement, {
                background: 'rgba(16, 15, 15, 0.9)',
              })
            })
          }
        }
        setError(null)
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError('Failed to render diagram')
      }
    }

    if (chart && ref.current) {
      renderDiagram()
    }
  }, [chart])

  if (error) {
    return (
      <div className="mermaid bg-surface border border-border p-4 rounded-lg">
        <div className="text-red-400 text-sm">
          Error rendering diagram: {error}
        </div>
        <pre className="text-xs text-muted mt-2 overflow-x-auto">
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div className="mermaid overflow-x-auto">
      <div ref={ref} className="flex justify-center" />
    </div>
  )
}
