import SlidePresentationRenderer from '@/components/SlidePresentationRenderer'
import { getLecture } from '@/lib/content'
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
