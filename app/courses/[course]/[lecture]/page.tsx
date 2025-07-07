import MDXRenderer from '@/components/MDXRenderer'
import { getLectureNavigation } from '@/lib/content'
import { ArrowLeft, ArrowRight, BookOpen, Clipboard, Github, Presentation } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic'

interface LecturePageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function LecturePage({ params }: LecturePageProps) {
  const { course, lecture } = params
  const navigationData = getLectureNavigation(course, lecture)

  if (!navigationData) {
    notFound()
  }

  const { current: lectureData, next: nextLecture, materialsUrl } = navigationData
  const codeUrl = lectureData.frontMatter?.codeUrl

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

          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gray-600 text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              <Github size={14} />
              Source Code
            </a>
          )}

          {materialsUrl && (
            <a
              href={materialsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              <BookOpen size={14} />
              Course Materials
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="max-w-none prose prose-invert">
        <MDXRenderer content={lectureData.content} />
      </article>

      {/* Assignment and Next Buttons - Below Article */}
      <div className="flex justify-center gap-3 pt-8">
        {lectureData.hasAssignment && (
          <Link
            href={`/assignments/${course}/${lecture}`}
            className="flex items-center gap-1.5 bg-secondary text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            <Clipboard size={14} />
            View Assignment
          </Link>
        )}

        {nextLecture && (
          <Link
            href={`/courses/${course}/${nextLecture.slug}`}
            className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            Next Lecture
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 mt-12 border-t border-border">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="transition-colors text-muted hover:text-text"
          >
            ← All Courses
          </Link>

          <div className="flex gap-4">
            {lectureData.hasAssignment && (
              <Link
                href={`/assignments/${course}/${lecture}`}
                className="transition-colors text-secondary hover:text-accent"
              >
                Assignment →
              </Link>
            )}

            {nextLecture && (
              <Link
                href={`/courses/${course}/${nextLecture.slug}`}
                className="transition-colors text-green-400 hover:text-green-300"
              >
                Next: {nextLecture.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: LecturePageProps) {
  const { course, lecture } = params
  const navigationData = getLectureNavigation(course, lecture)

  if (!navigationData) {
    return {
      title: 'Lecture Not Found',
    }
  }

  return {
    title: `${navigationData.current.title} | Technical Teaching Platform`,
    description: navigationData.current.description,
  }
}
