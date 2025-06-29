import MDXRenderer from '@/components/MDXRenderer'
import { getLecture } from '@/lib/content'
import { ArrowLeft, Clipboard, Presentation } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface LecturePageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function LecturePage({ params }: LecturePageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted hover:text-text transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <div className="text-sm text-muted">
          {course.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-accent">
          {lectureData.title}
        </h1>

        {lectureData.description && (
          <p className="text-muted text-lg">
            {lectureData.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/slides/${course}/${lecture}`}
            className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <Presentation size={16} />
            🎤 View as Presentation
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none">
        <MDXRenderer content={lectureData.content} />
      </article>

      {/* Assignment Button - Below Article */}
      {lectureData.hasAssignment && (
        <div className="flex justify-center pt-8">
          <Link
            href={`/assignments/${course}/${lecture}`}
            className="flex items-center gap-2 bg-secondary text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
          >
            <Clipboard size={18} />
            📎 View Assignment
          </Link>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="border-t border-border pt-6 mt-12">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-muted hover:text-text transition-colors"
          >
            ← All Courses
          </Link>

          {lectureData.hasAssignment && (
            <Link
              href={`/assignments/${course}/${lecture}`}
              className="text-secondary hover:text-accent transition-colors"
            >
              Assignment →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: LecturePageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    return {
      title: 'Lecture Not Found',
    }
  }

  return {
    title: `${lectureData.title} | Technical Teaching Platform`,
    description: lectureData.description,
  }
}
