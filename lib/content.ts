import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface Course {
  slug: string
  title: string
  description?: string
  lectures: Lecture[]
  visible?: boolean
  preview?: boolean
  order?: number
  specialFiles?: {
    project?: boolean
    resources?: boolean
    practiceAll?: boolean
  }
}

export interface Lecture {
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
    let courseTitle = formatTitle(courseSlug) // Default fallback
    let courseDescription
    let coursePreview = false
    let courseOrder: number | undefined

    if (fs.existsSync(courseConfigPath)) {
      const courseConfigContents = fs.readFileSync(courseConfigPath, 'utf8')
      const { data } = matter(courseConfigContents)
      courseVisible = data.visible !== false
      courseTitle = data.title || courseTitle // Use title from _course.mdx if available
      courseDescription = data.description
      coursePreview = data.preview === true
      courseOrder = typeof data.order === 'number' ? data.order : undefined
    }

    return {
      slug: courseSlug,
      title: courseTitle,
      description: courseDescription,
      lectures,
      visible: courseVisible,
      preview: coursePreview,
      order: courseOrder,
      specialFiles: {
        project: isSpecialFileVisible(courseSlug, 'project.mdx'),
        resources: isSpecialFileVisible(courseSlug, 'resources.mdx'),
        practiceAll: isSpecialFileVisible(courseSlug, 'practice-all.mdx')
      }
    }
  }).filter(course => course.lectures.length > 0)

  // Sort courses by order (courses with order come first, then by order number, then alphabetically)
  courses.sort((a, b) => {
    // If both have order, sort by order number
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    // If only one has order, it comes first
    if (a.order !== undefined && b.order === undefined) {
      return -1
    }
    if (a.order === undefined && b.order !== undefined) {
      return 1
    }
    // If neither has order, sort alphabetically by title
    return a.title.localeCompare(b.title)
  })

  // Filter courses based on visibility
  if (respectVisibility) {
    courses = courses.filter(course => course.visible !== false)
  }

  return courses
}

export function getLecturesForCourse(courseSlug: string, respectVisibility: boolean = false): Lecture[] {
  // Decode URL-encoded course slug (e.g., C%23 -> C#)
  const decodedCourseSlug = decodeURIComponent(courseSlug)
  const courseDir = path.join(coursesDirectory, decodedCourseSlug)

  if (!fs.existsSync(courseDir)) {
    return []
  }

  const files = fs.readdirSync(courseDir)
    .filter(name => name.endsWith('.mdx') 
      && !name.endsWith('.assignment.mdx') 
      && !name.endsWith('.practice.mdx') 
      && !name.startsWith('_')
      && name !== 'project.mdx'
      && name !== 'practice-all.mdx'
      && name !== 'resources.mdx')

  let lectures = files.map(fileName => {
    const lectureSlug = fileName.replace('.mdx', '')
    const filePath = path.join(courseDir, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Check for assignment file
    const assignmentPath = path.join(courseDir, `${lectureSlug}.assignment.mdx`)
    const hasAssignment = fs.existsSync(assignmentPath)

    // Check for practice file
    const practicePath = path.join(courseDir, `${lectureSlug}.practice.mdx`)
    const hasPractice = fs.existsSync(practicePath)

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

    // Get practice visibility from practice file frontmatter
    let practiceVisible = true
    if (hasPractice) {
      try {
        const practiceContents = fs.readFileSync(practicePath, 'utf8')
        const { data: practiceData } = matter(practiceContents)
        practiceVisible = practiceData.visible !== false
      } catch (error) {
        // If practice file can't be read, default to visible
        practiceVisible = true
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
      hasPractice,
      practiceVisible,
      visible: data.visible !== false // Default to true if not specified
    }
  }).sort((a, b) => a.slug.localeCompare(b.slug))

  // Filter lectures based on visibility
  if (respectVisibility) {
    lectures = lectures.filter(lecture => lecture.visible !== false)
      .map(lecture => ({
        ...lecture,
        assignmentVisible: respectVisibility ? lecture.assignmentVisible : true,
        practiceVisible: respectVisibility ? lecture.practiceVisible : true
      }))
  }

  return lectures
}

export function getLecture(courseSlug: string, lectureSlug: string): Lecture | null {
  // Decode URL-encoded course slug (e.g., C%23 -> C#)
  const decodedCourseSlug = decodeURIComponent(courseSlug)
  const filePath = path.join(coursesDirectory, decodedCourseSlug, `${lectureSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Check for assignment file
  const assignmentPath = path.join(coursesDirectory, decodedCourseSlug, `${lectureSlug}.assignment.mdx`)
  const hasAssignment = fs.existsSync(assignmentPath)

  // Check for practice file
  const practicePath = path.join(coursesDirectory, decodedCourseSlug, `${lectureSlug}.practice.mdx`)
  const hasPractice = fs.existsSync(practicePath)

  return {
    slug: lectureSlug,
    title: data.title || formatTitle(lectureSlug),
    description: data.description,
    content,
    frontMatter: data,
    hasAssignment,
    hasPractice,
    visible: data.visible !== false
  }
}

export function getAssignment(courseSlug: string, lectureSlug: string): Lecture | null {
  // Decode URL-encoded course slug (e.g., C%23 -> C#)
  const decodedCourseSlug = decodeURIComponent(courseSlug)
  const filePath = path.join(coursesDirectory, decodedCourseSlug, `${lectureSlug}.assignment.mdx`)

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
    hasPractice: false,
    visible: data.visible !== false
  }
}

export function getPractice(courseSlug: string, lectureSlug: string): Lecture | null {
  // Decode URL-encoded course slug (e.g., C%23 -> C#)
  const decodedCourseSlug = decodeURIComponent(courseSlug)
  const filePath = path.join(coursesDirectory, decodedCourseSlug, `${lectureSlug}.practice.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: `${lectureSlug}.practice`,
    title: data.title || `${formatTitle(lectureSlug)} - Practice`,
    description: data.description,
    content,
    frontMatter: data,
    hasAssignment: false,
    hasPractice: false,
    visible: data.visible !== false
  }
}

export interface LectureNavigation {
  current: Lecture
  next?: Lecture
  previous?: Lecture
  materialsUrl?: string
}

export function getLectureNavigation(courseSlug: string, lectureSlug: string): LectureNavigation | null {
  const currentLecture = getLecture(courseSlug, lectureSlug)
  if (!currentLecture) {
    return null
  }

  const allLectures = getLecturesForCourse(courseSlug, false)
  const currentIndex = allLectures.findIndex(lecture => lecture.slug === lectureSlug)

  if (currentIndex === -1) {
    return {
      current: currentLecture
    }
  }

  const next = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : undefined
  const previous = currentIndex > 0 ? allLectures[currentIndex - 1] : undefined

  // Check if materials URL is defined in frontmatter
  const materialsUrl = currentLecture.frontMatter?.materialsUrl

  return {
    current: currentLecture,
    next,
    previous,
    materialsUrl
  }
}

function formatTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function isSpecialFileVisible(courseSlug: string, fileName: string): boolean {
  // Decode URL-encoded course slug (e.g., C%23 -> C#)
  const decodedCourseSlug = decodeURIComponent(courseSlug)
  const filePath = path.join(coursesDirectory, decodedCourseSlug, fileName)
  
  if (!fs.existsSync(filePath)) {
    return false
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  
  return data.visible !== false
}
