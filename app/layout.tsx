import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karim Essam - Software Engineering Instructor | DEPI & ITI',
  description: 'Comprehensive software development courses by Karim Essam. Interactive lessons, presentations, and assignments for DEPI and ITI students.',
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
