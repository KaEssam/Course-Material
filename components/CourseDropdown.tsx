'use client'

import { Course, Lecture } from '@/lib/content'
import { BookOpen, ChevronDown, Clipboard, FileText, Github, Play, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface LectureWithMaterials extends Lecture {
  materialsUrl?: string
  codeUrl?: string
}

interface CourseDropdownProps {
  course: Course & {
    lectures: LectureWithMaterials[]
  }
}

export default function CourseDropdown({ course }: CourseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-large ring-1 ring-orange/20' : 'card-hover group hover:ring-1 hover:ring-orange/10'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full responsive-padding-sm flex items-center justify-between text-left transition-all duration-200 group/header mobile-friendly"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4">
            <h3 className="font-semibold text-responsive-lg text-text-primary group-hover:text-orange transition-colors truncate">
              {course.title}
            </h3>
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
              <span className="flex items-center gap-1 sm:gap-1.5 bg-surface/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-border/30 text-text-secondary group-hover/header:border-orange/20 group-hover/header:text-orange/80 transition-colors">
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="whitespace-nowrap text-xs">{course.lectures.length} lecture{course.lectures.length !== 1 ? 's' : ''}</span>
              </span>
              {course.lectures.some(l => l.hasAssignment) && (
                <span className="flex items-center gap-1 sm:gap-1.5 bg-surface/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-border/30 text-text-secondary group-hover/header:border-orange/20 group-hover/header:text-orange/80 transition-colors">
                  <Clipboard className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap text-xs">{course.lectures.filter(l => l.hasAssignment).length} assignment{course.lectures.filter(l => l.hasAssignment).length !== 1 ? 's' : ''}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`text-orange/70 transition-all duration-300 ml-2 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>

      <div
        className={`border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface-hover/30">
          {course.lectures.length === 0 ? (
            <div className="responsive-padding text-center responsive-spacing-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-surface border border-border mx-auto flex items-center justify-center shadow-soft">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-text-muted" />
              </div>
              <p className="text-text-muted text-responsive-sm">No lectures available yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {course.lectures.map((lecture: LectureWithMaterials, index: number) => {
                return (
                  <div key={lecture.slug} className="group/lecture hover:bg-surface-hover transition-all duration-200">
                    <div className="p-2 sm:p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <Link
                          href={`/courses/${course.slug}/${lecture.slug}`}
                          className="flex-1 group/link min-w-0"
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center flex-shrink-0 group-hover/lecture:border-orange/30 transition-all duration-200 shadow-soft mobile-friendly">
                              <span className="text-xs font-semibold text-text-secondary group-hover/lecture:text-orange transition-colors">
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <div className="responsive-spacing-sm min-w-0 flex-1">
                              <h4 className="font-medium text-responsive-sm text-text-primary group-hover/link:text-orange transition-colors zoom-text">
                                {lecture.title}
                              </h4>
                              {lecture.frontMatter?.tags && lecture.frontMatter.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {lecture.frontMatter.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                    <span
                                      key={tagIndex}
                                      className="inline-block px-1.5 sm:px-2 py-0.5 text-xs rounded-md bg-surface-active/50 text-text-muted border border-border/30 transition-colors group-hover/lecture:bg-orange/10 group-hover/lecture:text-orange/80 group-hover/lecture:border-orange/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {lecture.frontMatter.tags.length > 3 && (
                                    <span className="inline-block px-1.5 sm:px-2 py-0.5 text-xs rounded-md bg-surface-active/50 text-text-muted border border-border/30">
                                      +{lecture.frontMatter.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 transition-all duration-200">
                          {lecture.hasAssignment && lecture.assignmentVisible !== false && (
                            <Link
                              href={`/courses/${course.slug}/${lecture.slug}/assignment`}
                              className="btn btn-ghost btn-responsive-sm hover:bg-yellow/5 hover:text-yellow border-yellow/20 shadow-soft hover:shadow-medium mobile-friendly"
                              title="Assignment available"
                            >
                              <Clipboard className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden xs:inline">Assignment</span>
                              <span className="xs:hidden">Assign</span>
                            </Link>
                          )}

                          {lecture.hasPractice && lecture.practiceVisible !== false && (
                            <Link
                              href={`/courses/${course.slug}/${lecture.slug}/practice`}
                              className="btn btn-ghost btn-responsive-sm hover:bg-green/5 hover:text-green border-green/20 shadow-soft hover:shadow-medium mobile-friendly"
                              title="Practice exercises available"
                            >
                              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden xs:inline">Practice</span>
                              <span className="xs:hidden">Practice</span>
                            </Link>
                          )}

                          {lecture.codeUrl && (
                            <a
                              href={lecture.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-responsive-sm hover:bg-aqua/5 hover:text-aqua border-aqua/20 shadow-soft hover:shadow-medium mobile-friendly"
                              title="Source Code"
                            >
                              <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden xs:inline">Code</span>
                              <span className="xs:hidden">Code</span>
                            </a>
                          )}

                          {lecture.materialsUrl && (
                            <a
                              href={lecture.materialsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-responsive-sm hover:bg-orange/5 hover:text-orange border-orange/20 shadow-soft hover:shadow-medium mobile-friendly"
                              title="Course Materials"
                            >
                              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden sm:inline">Materials</span>
                              <span className="sm:hidden">Mat</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
