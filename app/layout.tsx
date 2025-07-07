import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DEPI & ITI Courses | Eng. Karim Essam - Software Engineering',
  description: 'Comprehensive software development courses for DEPI and ITI students by Eng. Karim Essam. Interactive lessons, presentations, and practical assignments.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="antialiased bg-background text-text min-h-screen flex flex-col">
        <ThemeProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="py-2 sm:py-3 md:py-4 responsive-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="min-w-0">
                    <h1 className="text-sm font-semibold truncate sm:text-base md:text-lg text-text-primary">
                      Karim Essam
                    </h1>
                    <p className="hidden text-xs truncate sm:text-sm text-text-muted xs:block">
                      Software Engineering Instructor
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-shrink-0 space-x-2 sm:space-x-3">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 min-w-0 responsive-container section-spacing">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-border bg-surface/50">
            <div className="responsive-padding responsive-container">
              <div className="text-center responsive-spacing-sm">
                

                <div className="flex flex-wrap justify-center text-xs gap-x-3 gap-y-1 text-text-muted">
                  <span>© {new Date().getFullYear()}</span>
                  <span className="hidden xs:inline">•</span>
                  <span>DEPI & ITI Courses</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Software Engineering</span>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
