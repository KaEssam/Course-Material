'use client'

import { Course } from '@/lib/content'
import { ChevronDown, ChevronRight, Clipboard, FileText } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CourseDropdownProps {
  course: Course
}

export default function CourseDropdown({ course }: CourseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-background transition-colors"
      >
        <div>
          <h3 className="font-semibold text-lg">{course.title}</h3>
          <p className="text-muted text-sm">
            {course.lectures.length} lecture{course.lectures.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-muted">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {course.lectures.length === 0 ? (
            <div className="p-4 text-muted text-center">
              No lectures available
            </div>
          ) : (
            <div className="divide-y divide-border">
              {course.lectures.map((lecture) => (
                <div key={lecture.slug} className="p-3">
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/courses/${course.slug}/${lecture.slug}`}
                      className="flex-1 group"
                    >
                      <div className="flex items-center gap-2 text-secondary hover:text-accent transition-colors">
                        <FileText size={16} />
                        <span className="font-medium group-hover:underline">
                          {lecture.title}
                        </span>
                      </div>
                      {lecture.description && (
                        <p className="text-muted text-sm mt-1 ml-6">
                          {lecture.description}
                        </p>
                      )}
                    </Link>

                    {lecture.hasAssignment && (
                      <Link
                        href={`/courses/${course.slug}/${lecture.slug}/assignment`}
                        className="ml-3 text-accent hover:text-secondary transition-colors"
                        title="Assignment available"
                      >
                        <Clipboard size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
