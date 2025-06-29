import CourseDropdown from '@/components/CourseDropdown'
import { getAllCourses } from '@/lib/content'

export default function HomePage() {
  const courses = getAllCourses()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="mb-2 text-5xl font-bold text-accent">
            Karim Essam
          </h1>
          <div className="text-xl font-medium text-muted">
            Software Engineering Instructor
          </div>
          <div className="flex gap-4 justify-center items-center text-sm text-muted">
            <span className="px-3 py-1 font-medium rounded-full bg-accent/10 text-accent">
              DEPI
            </span>
            <span className="px-3 py-1 font-medium rounded-full bg-accent/10 text-accent">
              ITI
            </span>
          </div>
        </div>


      </div>




      {/* Courses Section */}
      <div className="space-y-6">


        {courses.length === 0 ? (
          <div className="py-12 text-center">
            <div className="p-8 mx-auto max-w-md rounded-lg border bg-surface border-border">
              <h3 className="mb-4 text-xl font-semibold">Courses Coming Soon</h3>
              <p className="mb-4 text-muted">
                I'm currently preparing exciting new courses for you. Check back soon!
              </p>
              <div className="p-4 font-mono text-sm text-left rounded bg-background text-muted">
                <div>📁 courses/</div>
                <div>├── 📂 javascript-basics/</div>
                <div>│   ├── 📄 01-variables.mdx</div>
                <div>│   ├── 📄 02-functions.mdx</div>
                <div>│   └── 📝 02-functions.assignment.mdx</div>
                <div>├── 📂 react-fundamentals/</div>
                <div>│   ├── 📄 01-components.mdx</div>
                <div>│   └── 📄 02-props.mdx</div>
                <div>└── 📂 sql-server/</div>
                <div>    ├── 📄 database-design.mdx</div>
                <div>    └── 📄 select.mdx</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 mx-auto max-w-3xl">
              {courses.map((course) => (
                <CourseDropdown key={course.slug} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="pt-8 text-center border-t border-border">
        <div className="space-y-2">

          <p className="text-xs text-muted">
            Created by Karim Essam for DEPI & ITI Courses
          </p>
        </div>
      </div>
    </div>
  )
}
