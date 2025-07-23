import MDXRenderer from '@/components/MDXRenderer'
import { getAssignment } from '@/lib/content'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface AssignmentPageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  const { course, lecture } = params
  const assignmentData = getAssignment(course, lecture)

  if (!assignmentData) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/courses/${encodeURIComponent(course)}/${lecture}`}
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
          <div className="bg-secondary text-background p-2 rounded-lg">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-accent">
              {assignmentData.title}
            </h1>
            <p className="text-muted">Assignment</p>
          </div>
        </div>

        {assignmentData.description && (
          <p className="text-muted text-lg">
            {assignmentData.description}
          </p>
        )}
      </div>

      {/* Content - Using same article renderer with all features */}
      <article className="prose prose-invert max-w-none">
        <MDXRenderer content={assignmentData.content} />
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
            href={`/courses/${encodeURIComponent(course)}/${lecture}`}
            className="text-secondary hover:text-accent transition-colors"
          >
            Back to Lecture →
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: AssignmentPageProps) {
  const { course, lecture } = params
  const assignmentData = getAssignment(course, lecture)

  if (!assignmentData) {
    return {
      title: 'Assignment Not Found',
    }
  }

  return {
    title: `${assignmentData.title} | Technical Teaching Platform`,
    description: assignmentData.description,
  }
}
