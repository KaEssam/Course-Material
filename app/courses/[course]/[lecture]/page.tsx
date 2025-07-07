import MDXRenderer from '@/components/MDXRenderer'
import { getLectureNavigation } from '@/lib/content'
import { ArrowLeft, ArrowRight, BookOpen, Clipboard, Github, Presentation, Zap } from 'lucide-react'
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
            className="btn btn-ghost btn-responsive-sm hover:bg-orange/5 hover:text-orange border-orange/20 shadow-soft hover:shadow-medium"
          >
            <Presentation className="w-3.5 h-3.5 mr-1.5" />
            View as Presentation
          </Link>

          {lectureData.hasAssignment && (
            <Link
              href={`/assignments/${course}/${lecture}`}
              className="btn btn-ghost btn-responsive-sm hover:bg-yellow/5 hover:text-yellow border-yellow/20 shadow-soft hover:shadow-medium"
            >
              <Clipboard className="w-3.5 h-3.5 mr-1.5" />
              Assignment
            </Link>
          )}

          {lectureData.hasPractice && (
            <Link
              href={`/practices/${course}/${lecture}`}
              className="btn btn-ghost btn-responsive-sm hover:bg-green/5 hover:text-green border-green/20 shadow-soft hover:shadow-medium"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Practice
            </Link>
          )}

          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-responsive-sm hover:bg-aqua/5 hover:text-aqua border-aqua/20 shadow-soft hover:shadow-medium"
            >
              <Github className="w-3.5 h-3.5 mr-1.5" />
              Source Code
            </a>
          )}

          {materialsUrl && (
            <a
              href={materialsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-responsive-sm hover:bg-blue/5 hover:text-blue border-blue/20 shadow-soft hover:shadow-medium"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Course Materials
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="max-w-none prose prose-invert">
        <MDXRenderer content={lectureData.content} />
      </article>

      {/* Assignment, Practice and Next Buttons - Below Article */}
      <div className="flex justify-center gap-3 pt-8">
        {lectureData.hasAssignment && (
          <Link
            href={`/assignments/${course}/${lecture}`}
            className="btn btn-ghost btn-responsive-sm hover:bg-yellow/5 hover:text-yellow border-yellow/20 shadow-soft hover:shadow-medium"
          >
            <Clipboard className="w-3.5 h-3.5 mr-1.5" />
            View Assignment
          </Link>
        )}

        {lectureData.hasPractice && (
          <Link
            href={`/practices/${course}/${lecture}`}
            className="btn btn-ghost btn-responsive-sm hover:bg-green/5 hover:text-green border-green/20 shadow-soft hover:shadow-medium"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Practice Exercises
          </Link>
        )}

        {nextLecture && (
          <Link
            href={`/courses/${course}/${nextLecture.slug}`}
            className="btn btn-ghost btn-responsive-sm hover:bg-blue/5 hover:text-blue border-blue/20 shadow-soft hover:shadow-medium"
          >
            Next Lecture
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
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
                className="transition-colors text-yellow hover:text-yellow/80"
              >
                Assignment →
              </Link>
            )}

            {lectureData.hasPractice && (
              <Link
                href={`/practices/${course}/${lecture}`}
                className="transition-colors text-green hover:text-green/80"
              >
                Practice →
              </Link>
            )}

            {nextLecture && (
              <Link
                href={`/courses/${course}/${nextLecture.slug}`}
                className="transition-colors text-blue hover:text-blue/80"
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
