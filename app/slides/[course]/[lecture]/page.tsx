import SlidePresentationRenderer from '@/components/SlidePresentationRenderer'
import { getAllCourses, getLecture } from '@/lib/content'
import { notFound } from 'next/navigation'

interface SlidePageProps {
  params: {
    course: string
    lecture: string
  }
}

export default function SlidePage({ params }: SlidePageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    notFound()
  }

  return (
    <SlidePresentationRenderer
      content={lectureData.content}
      title={lectureData.title}
      course={course}
      lecture={lecture}
    />
  )
}

export async function generateStaticParams() {
  const courses = getAllCourses()
  const params: { course: string; lecture: string }[] = []

  for (const course of courses) {
    for (const lecture of course.lectures) {
      params.push({
        course: course.slug,
        lecture: lecture.slug
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: SlidePageProps) {
  const { course, lecture } = params
  const lectureData = getLecture(course, lecture)

  if (!lectureData) {
    return {
      title: 'Slides Not Found',
    }
  }

  return {
    title: `${lectureData.title} - Slides | Technical Teaching Platform`,
    description: lectureData.description,
  }
}
