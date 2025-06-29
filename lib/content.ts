import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface Course {
  slug: string
  title: string
  description?: string
  lectures: Lecture[]
  visible?: boolean
}

export interface Lecture {
  slug: string
  title: string
  description?: string
  content: string
  frontMatter: any
  hasAssignment: boolean
  assignmentVisible?: boolean
  visible?: boolean
}

const coursesDirectory = path.join(process.cwd(), 'courses')

export function getAllCourses(respectVisibility: boolean = false): Course[] {
  if (!fs.existsSync(coursesDirectory)) {
    return []
  }

  const courseDirectories = fs.readdirSync(coursesDirectory)
    .filter(name => fs.statSync(path.join(coursesDirectory, name)).isDirectory())

  let courses = courseDirectories.map(courseSlug => {
    const lectures = getLecturesForCourse(courseSlug, respectVisibility)

    // Check if there's a course-level config file
    const courseConfigPath = path.join(coursesDirectory, courseSlug, '_course.mdx')
    let courseVisible = true

    if (fs.existsSync(courseConfigPath)) {
      const courseConfigContents = fs.readFileSync(courseConfigPath, 'utf8')
      const { data } = matter(courseConfigContents)
      courseVisible = data.visible !== false
    }

    return {
      slug: courseSlug,
      title: formatTitle(courseSlug),
      lectures,
      visible: courseVisible
    }
  }).filter(course => course.lectures.length > 0)

  // Filter courses based on visibility
  if (respectVisibility) {
    courses = courses.filter(course => course.visible !== false)
  }

  return courses
}

export function getLecturesForCourse(courseSlug: string, respectVisibility: boolean = false): Lecture[] {
  const courseDir = path.join(coursesDirectory, courseSlug)

  if (!fs.existsSync(courseDir)) {
    return []
  }

  const files = fs.readdirSync(courseDir)
    .filter(name => name.endsWith('.mdx') && !name.endsWith('.assignment.mdx') && !name.startsWith('_'))

  let lectures = files.map(fileName => {
    const lectureSlug = fileName.replace('.mdx', '')
    const filePath = path.join(courseDir, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Check for assignment file
    const assignmentPath = path.join(courseDir, `${lectureSlug}.assignment.mdx`)
    const hasAssignment = fs.existsSync(assignmentPath)

    // Get assignment visibility from assignment file frontmatter
    let assignmentVisible = true
    if (hasAssignment) {
      try {
        const assignmentContents = fs.readFileSync(assignmentPath, 'utf8')
        const { data: assignmentData } = matter(assignmentContents)
        assignmentVisible = assignmentData.visible !== false
      } catch (error) {
        // If assignment file can't be read, default to visible
        assignmentVisible = true
      }
    }

    return {
      slug: lectureSlug,
      title: data.title || formatTitle(lectureSlug),
      description: data.description,
      content,
      frontMatter: data,
      hasAssignment,
      assignmentVisible,
      visible: data.visible !== false // Default to true if not specified
    }
  }).sort((a, b) => a.slug.localeCompare(b.slug))

  // Filter lectures based on visibility
  if (respectVisibility) {
    lectures = lectures.filter(lecture => lecture.visible !== false)
      .map(lecture => ({
        ...lecture,
        assignmentVisible: respectVisibility ? lecture.assignmentVisible : true
      }))
  }

  return lectures
}

export function getLecture(courseSlug: string, lectureSlug: string): Lecture | null {
  const filePath = path.join(coursesDirectory, courseSlug, `${lectureSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Check for assignment file
  const assignmentPath = path.join(coursesDirectory, courseSlug, `${lectureSlug}.assignment.mdx`)
  const hasAssignment = fs.existsSync(assignmentPath)

  return {
    slug: lectureSlug,
    title: data.title || formatTitle(lectureSlug),
    description: data.description,
    content,
    frontMatter: data,
    hasAssignment,
    visible: data.visible !== false
  }
}

export function getAssignment(courseSlug: string, lectureSlug: string): Lecture | null {
  const filePath = path.join(coursesDirectory, courseSlug, `${lectureSlug}.assignment.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: `${lectureSlug}.assignment`,
    title: data.title || `${formatTitle(lectureSlug)} - Assignment`,
    description: data.description,
    content,
    frontMatter: data,
    hasAssignment: false,
    visible: data.visible !== false
  }
}

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
