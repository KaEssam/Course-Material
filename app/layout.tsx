import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DEPI & ITI Courses | Eng. Karim Essam - Software Engineering',
  description: 'Comprehensive software development courses for DEPI and ITI students by Eng. Karim Essam. Interactive lessons, presentations, and practical assignments.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="antialiased bg-background text-text">
        <ThemeProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="py-4 container-custom">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="hidden sm:block">
                    <h1 className="text-lg font-semibold text-text-primary">Karim Essam</h1>
                    <p className="text-xs text-text-muted">Software Engineering Instructor</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container-custom section-spacing">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-surface/50">
            <div className="py-8 container-custom">
              <div className="space-y-4 text-center">
                

                <div className="flex justify-center space-x-6 text-xs text-text-muted">
                  <span>© {new Date().getFullYear()}</span>
                  <span>•</span>
                  <span>DEPI & ITI Courses</span>
                  <span>•</span>
                  <span>Software Engineering</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
