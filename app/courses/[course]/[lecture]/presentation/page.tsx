import PresentationRenderer from '@/components/PresentationRenderer'
import { getAllCourses, getLecture } from '@/lib/content'
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
      <div className="flex justify-between items-center p-4 border-b border-border">
        <Link
          href={`/courses/${course}/${lecture}`}
          className="flex gap-2 items-center transition-colors text-muted hover:text-text"
        >
          <ArrowLeft size={16} />
          Exit Presentation
        </Link>

        <div className="flex gap-4 items-center">
          <div className="text-sm text-muted">
            {course.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          <div className="flex gap-2 items-center text-accent">
            <Maximize2 size={16} />
            <span className="font-medium">Presentation Mode</span>
          </div>
        </div>
      </div>

      {/* Presentation Content */}
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-center text-accent">
            {lectureData.title}
          </h1>

          <PresentationRenderer content={lectureData.content} />
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const courses = getAllCourses()
  const params: { course: string; lecture: string }[] = []

  for (const course of courses) {
    for (const lecture of course.lectures) {
      params.push({
        course: course.slug,
        lecture: lecture.slug
      })
    }
  }

  return params
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
