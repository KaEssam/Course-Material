import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Technical Teaching Platform',
  description: 'A minimalist platform for technical education with Markdown lectures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text min-h-screen">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  )
}
