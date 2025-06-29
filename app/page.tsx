import CourseDropdown from '@/components/CourseDropdown'
import { getAllCourses } from '@/lib/content'

export default function HomePage() {
  const courses = getAllCourses()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="mb-4 text-6xl font-bold tracking-tight text-white">
            Karim Essam
          </h1>
          <div className="text-xl font-medium text-muted">
            Software Engineering Instructor
          </div>
          <div className="flex gap-3 justify-center items-center text-sm">
            <span className="px-4 py-2 font-medium rounded-full border transition-colors bg-surface border-border text-text hover:bg-surface-hover">
              DEPI
            </span>
            <span className="px-4 py-2 font-medium rounded-full border transition-colors bg-surface border-border text-text hover:bg-surface-hover">
              ITI
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <p className="text-lg leading-relaxed text-muted text-balance">
            Welcome to my teaching platform. you'll find course materials

          </p>
        </div>
      </div>


      {/* Courses Section */}
      <div className="space-y-6">
        {courses.length === 0 ? (
          <div className="py-16 text-center">
            <div className="p-10 mx-auto max-w-lg card">
              <h3 className="mb-6 text-2xl font-semibold text-white">Courses Coming Soon</h3>
              <p className="mb-8 leading-relaxed text-muted">
                I'm currently preparing exciting new courses for you. Check back soon!
              </p>
              <div className="p-6 font-mono text-sm text-left rounded-lg border bg-background border-border text-muted">
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
            <div className="grid gap-4 mx-auto max-w-4xl">
              {courses.map((course) => (
                <div key={course.slug} className="hover-lift">
                  <CourseDropdown course={course} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="pt-12 text-center border-t border-border">
        <div className="space-y-3">
          <p className="text-xs text-muted">
            Created by Karim Essam for DEPI & ITI Courses
          </p>
        </div>
      </div>
    </div>
  )
}
