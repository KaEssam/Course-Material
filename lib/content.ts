import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface Course {
  slug: string
  title: string
  description?: string
  lectures: Lecture[]
}

export interface Lecture {
  slug: string
  title: string
  description?: string
  content: string
  frontMatter: any
  hasAssignment: boolean
}

const coursesDirectory = path.join(process.cwd(), 'courses')

export function getAllCourses(): Course[] {
  if (!fs.existsSync(coursesDirectory)) {
    return []
  }

  const courseDirectories = fs.readdirSync(coursesDirectory)
    .filter(name => fs.statSync(path.join(coursesDirectory, name)).isDirectory())

  return courseDirectories.map(courseSlug => {
    const lectures = getLecturesForCourse(courseSlug)
    return {
      slug: courseSlug,
      title: formatTitle(courseSlug),
      lectures
    }
  }).filter(course => course.lectures.length > 0)
}

export function getLecturesForCourse(courseSlug: string): Lecture[] {
  const courseDir = path.join(coursesDirectory, courseSlug)

  if (!fs.existsSync(courseDir)) {
    return []
  }

  const files = fs.readdirSync(courseDir)
    .filter(name => name.endsWith('.mdx') && !name.endsWith('.assignment.mdx'))

  return files.map(fileName => {
    const lectureSlug = fileName.replace('.mdx', '')
    const filePath = path.join(courseDir, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Check for assignment file
    const assignmentPath = path.join(courseDir, `${lectureSlug}.assignment.mdx`)
    const hasAssignment = fs.existsSync(assignmentPath)

    return {
      slug: lectureSlug,
      title: data.title || formatTitle(lectureSlug),
      description: data.description,
      content,
      frontMatter: data,
      hasAssignment
    }
  }).sort((a, b) => a.slug.localeCompare(b.slug))
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
    hasAssignment
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
    hasAssignment: false
  }
}

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
