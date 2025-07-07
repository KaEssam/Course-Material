'use client'

import CourseDropdown from '@/components/CourseDropdown'
import { Course } from '@/lib/content'
import { Github, Video } from 'lucide-react'

interface LectureWithMaterials {
  slug: string
  title: string
  description?: string
  content: string
  frontMatter: any
  hasAssignment: boolean
  assignmentVisible?: boolean
  hasPractice: boolean
  practiceVisible?: boolean
  visible?: boolean
  materialsUrl?: string
  codeUrl?: string
}

interface CourseWithMaterials extends Course {
  lectures: LectureWithMaterials[]
}

interface ClientHomePageProps {
  courses: CourseWithMaterials[]
}

export default function ClientHomePage({ courses }: ClientHomePageProps) {
  return (
    <div className="responsive-spacing-md zoom-container">
      {/* Header with Course Info */}
      <div className="responsive-spacing-sm text-center">
        <div className="responsive-spacing-sm">
          <h1 className="text-responsive-2xl font-bold text-text-primary zoom-text">
            DEPI & ITI Courses
          </h1>
          <p className="text-responsive-lg text-text-secondary zoom-text">
            By Eng. Karim Essam
          </p>
          <p className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-responsive-sm text-text-muted px-2 sm:px-4 zoom-text">
            Software courses designed for DEPI and ITI students.
            Interactive lessons and practical assignments.
          </p>
        </div>

        <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-4">
          <button
            onClick={() => {
              // Open the video file from public directory
              const videoUrl = '/Github - Made with Clipchamp.mp4';
              window.open(videoUrl, '_blank');
            }}
            className="flex items-center justify-center gap-2 btn-responsive-sm btn btn-ghost hover:bg-blue/10 hover:text-blue mobile-friendly w-full xs:w-auto"
          >
            <Video className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">How to Submit Assignment</span>
          </button>
          <button
            onClick={() => window.open('https://github.com/KaEssam/Depi-Course-Material/tree/main', '_blank')}
            className="flex items-center justify-center gap-2 btn-responsive-sm btn btn-ghost hover:bg-purple/10 hover:text-purple mobile-friendly w-full xs:w-auto"
          >
            <Github className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">GitHub Repository</span>
          </button>
        </div>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="py-8 sm:py-12 md:py-16 text-center px-2 sm:px-4">
          <div className="max-w-xs sm:max-w-md mx-auto card">
            <p className="text-text-muted text-responsive-sm">No courses available yet</p>
          </div>
        </div>
      ) : (
        <div className="responsive-spacing-sm px-1 sm:px-2">
          {courses.map((course, index) => (
            <div
              key={course.slug}
              className="slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseDropdown course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
