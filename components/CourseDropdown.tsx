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
        className="w-full p-4 flex items-center justify-between text-left transition-all duration-200 group/header"
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-text-primary group-hover:text-orange transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center space-x-1.5 bg-surface/80 px-2.5 py-1 rounded-md border border-border/30 text-text-secondary group-hover/header:border-orange/20 group-hover/header:text-orange/80 transition-colors">
                <Play className="w-3.5 h-3.5" />
                <span>{course.lectures.length} lecture{course.lectures.length !== 1 ? 's' : ''}</span>
              </span>
              {course.lectures.some(l => l.hasAssignment) && (
                <span className="flex items-center space-x-1.5 bg-surface/80 px-2.5 py-1 rounded-md border border-border/30 text-text-secondary group-hover/header:border-orange/20 group-hover/header:text-orange/80 transition-colors">
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>{course.lectures.filter(l => l.hasAssignment).length} assignment{course.lectures.filter(l => l.hasAssignment).length !== 1 ? 's' : ''}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`text-orange/70 transition-all duration-300 ml-3 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <div
        className={`border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface-hover/30">
          {course.lectures.length === 0 ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-surface border border-border mx-auto flex items-center justify-center shadow-soft">
                <FileText className="w-6 h-6 text-text-muted" />
              </div>
              <p className="text-text-muted text-sm">No lectures available yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {course.lectures.map((lecture: LectureWithMaterials, index: number) => {
                return (
                  <div key={lecture.slug} className="group/lecture hover:bg-surface-hover transition-all duration-200">
                    <div className="p-4">
                      <div className="flex items-start justify-between space-x-3">
                        <Link
                          href={`/courses/${course.slug}/${lecture.slug}`}
                          className="flex-1 group/link"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border/50 flex items-center justify-center flex-shrink-0 group-hover/lecture:border-orange/30 transition-all duration-200 shadow-soft">
                              <span className="text-xs font-semibold text-text-secondary group-hover/lecture:text-orange transition-colors">
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium text-base text-text-primary group-hover/link:text-orange transition-colors">
                                {lecture.title}
                              </h4>
                              {lecture.frontMatter?.tags && lecture.frontMatter.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {lecture.frontMatter.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                                    <span
                                      key={tagIndex}
                                      className="inline-block px-2 py-0.5 text-xs rounded-md bg-surface-active/50 text-text-muted border border-border/30 transition-colors group-hover/lecture:bg-orange/10 group-hover/lecture:text-orange/80 group-hover/lecture:border-orange/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {lecture.frontMatter.tags.length > 3 && (
                                    <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-surface-active/50 text-text-muted border border-border/30">
                                      +{lecture.frontMatter.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1.5 transition-all duration-200">
                          {lecture.hasAssignment && lecture.assignmentVisible !== false && (
                            <Link
                              href={`/courses/${course.slug}/${lecture.slug}/assignment`}
                              className="btn btn-ghost text-xs py-1.5 px-3 hover:bg-yellow/5 hover:text-yellow border-yellow/20 shadow-soft hover:shadow-medium"
                              title="Assignment available"
                            >
                              <Clipboard className="w-3.5 h-3.5 mr-1.5" />
                              Assignment
                            </Link>
                          )}

                          {lecture.hasPractice && lecture.practiceVisible !== false && (
                            <Link
                              href={`/courses/${course.slug}/${lecture.slug}/practice`}
                              className="btn btn-ghost text-xs py-1.5 px-3 hover:bg-green/5 hover:text-green border-green/20 shadow-soft hover:shadow-medium"
                              title="Practice exercises available"
                            >
                              <Zap className="w-3.5 h-3.5 mr-1.5" />
                              Practice
                            </Link>
                          )}

                          {lecture.codeUrl && (
                            <a
                              href={lecture.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost text-xs py-1.5 px-3 hover:bg-aqua/5 hover:text-aqua border-aqua/20 shadow-soft hover:shadow-medium"
                              title="Source Code"
                            >
                              <Github className="w-3.5 h-3.5 mr-1.5" />
                              Code
                            </a>
                          )}

                          {lecture.materialsUrl && (
                            <a
                              href={lecture.materialsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost text-xs py-1.5 px-3 hover:bg-orange/5 hover:text-orange border-orange/20 shadow-soft hover:shadow-medium"
                              title="Course Materials"
                            >
                              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                              Materials
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
