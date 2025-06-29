import CourseDropdown from '@/components/CourseDropdown'
import { getAllCourses } from '@/lib/content'

export default function HomePage() {
  const courses = getAllCourses()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-accent mb-4">
          Technical Teaching Platform
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          A minimalist platform for technical education with Markdown lectures,
          interactive presentations, and hands-on assignments.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-surface border border-border p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">No Courses Available</h2>
            <p className="text-muted mb-4">
              Create your first course by adding Markdown files to the <code className="bg-background px-2 py-1 rounded text-accent font-mono text-sm">/courses</code> directory.
            </p>
            <div className="text-left bg-background p-4 rounded font-mono text-sm text-muted">
              <div>courses/</div>
              <div>├── javascript-basics/</div>
              <div>│   ├── 01-variables.mdx</div>
              <div>│   ├── 02-functions.mdx</div>
              <div>│   └── 02-functions.assignment.mdx</div>
              <div>└── react-fundamentals/</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;├── 01-components.mdx</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;└── 02-props.mdx</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Available Courses</h2>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {courses.map((course) => (
              <CourseDropdown key={course.slug} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
