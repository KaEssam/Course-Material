'use client'

import { Course } from '@/lib/content'
import { ChevronDown, Clipboard, FileText } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CourseDropdownProps {
  course: Course
}

export default function CourseDropdown({ course }: CourseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-surface-hover transition-all duration-200"
      >
        <div className="space-y-1">
          <h3 className="font-semibold text-xl text-white">{course.title}</h3>
          <p className="text-muted text-sm">
            {course.lectures.length} lecture{course.lectures.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="text-muted transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <ChevronDown size={20} />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border bg-surface">
          {course.lectures.length === 0 ? (
            <div className="p-6 text-muted text-center">
              No lectures available
            </div>
          ) : (
            <div className="divide-y divide-border">
              {course.lectures.map((lecture) => (
                <div key={lecture.slug} className="p-4 hover:bg-surface-hover transition-colors">
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/courses/${course.slug}/${lecture.slug}`}
                      className="flex-1 group"
                    >
                      <div className="flex items-center gap-3 text-text hover:text-white transition-colors">
                        <FileText size={16} className="text-muted" />
                        <span className="font-medium group-hover:underline">
                          {lecture.title}
                        </span>
                      </div>
                      {lecture.description && (
                        <p className="text-muted text-sm mt-2 ml-7 leading-relaxed">
                          {lecture.description}
                        </p>
                      )}
                    </Link>

                    {lecture.hasAssignment && lecture.assignmentVisible !== false && (
                      <Link
                        href={`/courses/${course.slug}/${lecture.slug}/assignment`}
                        className="ml-4 px-3 py-2 rounded-md text-muted hover:text-secondary hover:bg-surface-hover transition-all duration-200 flex items-center gap-2"
                        title="Assignment available"
                      >
                        <Clipboard size={16} />
                        <span className="text-sm font-medium">Assignment</span>
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
