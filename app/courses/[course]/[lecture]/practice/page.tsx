import MDXRenderer from '@/components/MDXRenderer'
import { getPractice } from '@/lib/content'
import { ArrowLeft, Zap } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PracticePageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function PracticePage({ params }: PracticePageProps) {
  const { course, lecture } = params
  const practiceData = getPractice(course, lecture)

  if (!practiceData) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/courses/${course}/${lecture}`}
          className="flex items-center gap-2 text-muted hover:text-text transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Lecture
        </Link>
        <div className="text-sm text-muted">
          {course.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-green text-background p-2 rounded-lg">
            <Zap size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-accent">
              {practiceData.title}
            </h1>
            <p className="text-muted">Practice Exercises</p>
          </div>
        </div>

        {practiceData.description && (
          <p className="text-muted text-lg">
            {practiceData.description}
          </p>
        )}
      </div>

      {/* Content */}
      <article className="prose prose-invert max-w-none">
        <MDXRenderer content={practiceData.content} />
      </article>

      {/* Footer Navigation */}
      <div className="border-t border-border pt-6 mt-12">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-muted hover:text-text transition-colors"
          >
            ← All Courses
          </Link>

          <Link
            href={`/courses/${course}/${lecture}`}
            className="text-secondary hover:text-accent transition-colors"
          >
            Back to Lecture →
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PracticePageProps) {
  const { course, lecture } = params
  const practiceData = getPractice(course, lecture)

  if (!practiceData) {
    return {
      title: 'Practice Not Found',
    }
  }

  return {
    title: `${practiceData.title} | Technical Teaching Platform`,
    description: practiceData.description,
  }
}
