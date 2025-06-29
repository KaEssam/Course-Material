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
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center transition-colors text-muted hover:text-text"
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
          <p className="text-lg text-muted">
            {lectureData.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/slides/${course}/${lecture}`}
            className="flex items-center gap-1.5 bg-accent text-background px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            <Presentation size={14} />
            View as Presentation
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-none prose prose-invert">
        <MDXRenderer content={lectureData.content} />
      </article>

      {/* Assignment Button - Below Article */}
      {lectureData.hasAssignment && (
        <div className="flex justify-center pt-8">
          <Link
            href={`/assignments/${course}/${lecture}`}
            className="flex items-center gap-1.5 bg-secondary text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            <Clipboard size={14} />
             View Assignment
          </Link>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="pt-6 mt-12 border-t border-border">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="transition-colors text-muted hover:text-text"
          >
            ← All Courses
          </Link>

          {lectureData.hasAssignment && (
            <Link
              href={`/assignments/${course}/${lecture}`}
              className="transition-colors text-secondary hover:text-accent"
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
