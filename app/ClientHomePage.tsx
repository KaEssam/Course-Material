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
      <div className="text-center responsive-spacing-sm">


        <div className="flex flex-col flex-wrap justify-center gap-2 px-2 xs:flex-row sm:gap-3 sm:px-4">
          <button
            onClick={() => {
              // Open the video file from public directory
              const videoUrl = '/Github - Made with Clipchamp.mp4';
              window.open(videoUrl, '_blank');
            }}
            className="flex items-center justify-center w-full gap-2 btn-responsive-sm btn btn-ghost hover:bg-blue/10 hover:text-blue mobile-friendly xs:w-auto"
          >
            <Video className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">How to Submit Assignment</span>
          </button>
          <button
            onClick={() => window.open('https://github.com/KaEssam/Depi-Course-Material/tree/main', '_blank')}
            className="flex items-center justify-center w-full gap-2 btn-responsive-sm btn btn-ghost hover:bg-purple/10 hover:text-purple mobile-friendly xs:w-auto"
          >
            <Github className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">GitHub Repository</span>
          </button>
        </div>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="px-2 py-8 text-center sm:py-12 md:py-16 sm:px-4">
          <div className="max-w-xs mx-auto sm:max-w-md card">
            <p className="text-text-muted text-responsive-sm">No courses available yet</p>
          </div>
        </div>
      ) : (
        <div className="px-1 responsive-spacing-sm sm:px-2">
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
