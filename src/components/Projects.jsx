import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axois'

export default function Projects() {
  const refs = useRef([])
  const [visible, setVisible] = useState([])
  const [projectsList, setProjectsList] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects')
        if (res.data && res.data.length > 0) {
          setProjectsList(res.data)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }
    fetchProjects()
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target)
            setVisible((prev) => [...new Set([...prev, index])])
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [projectsList])


  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            OUR PROJECTS
          </h2>
          <p className="text-gray-600">
            Delivering landmark infrastructure across India
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsList.length === 0 ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            projectsList.map((project, i) => (
              <div
                key={project._id || i}
                ref={(el) => (refs.current[i] = el)}
                className={`
                  relative h-80 rounded-xl overflow-hidden
                  cursor-pointer
                  transition-all duration-500
                  hover:-translate-y-2 hover:shadow-2xl
                  ${visible.includes(i)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }
                `}
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  backgroundImage: project.image ? `url(${BASE}/uploads/${project.image})` : 'none',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                {/* Text */}
                <div className="absolute bottom-0 p-6 text-white z-10">
                  <h3 className="text-lg font-semibold rich-text-content" dangerouslySetInnerHTML={{ __html: project.title }} />
                </div>
              </div>
            ))
          )}
        </div>


        {/* CTA */}
        <div className="text-center mt-12">
          <a className="inline-block font-semibold text-[#CA9817] hover:underline cursor-pointer">
            VIEW ALL PROJECTS →
          </a>
        </div>
      </div>
    </section>
  )
}