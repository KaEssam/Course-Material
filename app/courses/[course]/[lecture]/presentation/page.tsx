import PresentationRenderer from '@/components/PresentationRenderer'
import { getLecture } from '@/lib/content'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PresentationPageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function PresentationPage({ params }: PresentationPageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link
          href={`/courses/${course}/${lecture}`}
          className="flex items-center gap-2 text-muted hover:text-text transition-colors"
        >
          <ArrowLeft size={16} />
          Exit Presentation
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted">
            {course.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Maximize2 size={16} />
            <span className="font-medium">Presentation Mode</span>
          </div>
        </div>
      </div>

      {/* Presentation Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-accent mb-8 text-center">
            {lectureData.title}
          </h1>

          <PresentationRenderer content={lectureData.content} />
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PresentationPageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    return {
      title: 'Presentation Not Found',
    }
  }

  return {
    title: `${lectureData.title} - Presentation | Technical Teaching Platform`,
    description: lectureData.description,
  }
}
