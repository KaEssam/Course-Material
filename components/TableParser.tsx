'use client'

interface TableParserProps {
  content: string
  isSlide?: boolean
}

function parseMarkdownTable(content: string): { headers: string[], rows: string[][] } | null {
  const lines = content.trim().split('\n')

  if (lines.length < 3) return null

  // Check if it looks like a table (has | characters)
  if (!lines[0].includes('|') || !lines[1].includes('|')) return null

  // Parse headers
  const headers = lines[0]
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell !== '')

  // Skip the separator line (line 1)
  // Parse data rows
  const rows = lines.slice(2)
    .filter(line => line.includes('|'))
    .map(line =>
      line.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell !== '')
    )
    .filter(row => row.length > 0)

  return { headers, rows }
}

export default function TableParser({ content, isSlide = false }: TableParserProps) {
  const tableData = parseMarkdownTable(content)

  if (!tableData) {
    return <div className="text-muted">Invalid table format</div>
  }

  const { headers, rows } = tableData

  // Slide-specific styling
  const tableClass = isSlide
    ? "w-full border-collapse bg-surface rounded-lg overflow-hidden text-lg"
    : "w-full border-collapse bg-surface rounded-lg overflow-hidden"

  const thClass = isSlide
    ? "border-b-2 border-accent p-4 text-left font-semibold bg-background text-xl text-accent"
    : "border-b border-border p-3 text-left font-medium bg-background"

  const tdClass = isSlide
    ? "border-b border-border p-4 text-lg"
    : "border-b border-border p-3"

  const wrapperClass = isSlide
    ? "overflow-x-auto mb-8 max-w-5xl mx-auto"
    : "overflow-x-auto mb-4"

  return (
    <div className={wrapperClass}>
      <table className={tableClass}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={thClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={tdClass}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
