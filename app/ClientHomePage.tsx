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
    <div className="space-y-6">
      {/* Header with Course Info */}
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">
            DEPI & ITI Courses
          </h1>
          <p className="text-lg text-text-secondary">
            By Eng. Karim Essam
          </p>
          <p className="max-w-2xl mx-auto text-sm text-text-muted">
            software courses designed for DEPI and ITI students.
            Interactive lessons And practical assignments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              // Open the video file from public directory
              const videoUrl = '/Github - Made with Clipchamp.mp4';
              window.open(videoUrl, '_blank');
            }}
            className="flex items-center gap-2 text-sm btn btn-ghost hover:bg-blue/10 hover:text-blue"
          >
            <Video className="w-4 h-4" />
            How to Submit Assignment
          </button>
            <button
            onClick={() => window.open('https://github.com/KaEssam/Depi-Course-Material/tree/main', '_blank')}
            className="flex items-center gap-2 text-sm btn btn-ghost hover:bg-purple/10 hover:text-purple"
            >
            <Github className="w-4 h-4" />
            GitHub Repository
            </button>
        </div>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto card">
            <p className="text-text-muted">No courses available yet</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
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
