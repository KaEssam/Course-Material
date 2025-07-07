import CourseDropdown from '@/components/CourseDropdown'
import { getAllCourses } from '@/lib/content'
import ClientHomePage from './ClientHomePage'

export default function HomePage() {
  // Get courses based on visibility settings in MDX frontmatter (server-side)
  const courses = getAllCourses(true) // true = respect visibility from MDX files

  // Enhance courses with materials and code data
  const coursesWithMaterials = courses.map(course => ({
    ...course,
    lectures: course.lectures.map(lecture => ({
      ...lecture,
      materialsUrl: lecture.frontMatter?.materialsUrl,
      codeUrl: lecture.frontMatter?.codeUrl
    }))
  }))

  return <ClientHomePage courses={coursesWithMaterials} />
}
