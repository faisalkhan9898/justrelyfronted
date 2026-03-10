import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axios'
import { stripHtml } from '../utils/stringUtils'

export default function StackServices() {
  const cardRefs = useRef([])
  const [servicesList, setServicesList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services')
        if (res.data && res.data.length > 0) {
          setServicesList(res.data)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [servicesList])

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-24">
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        servicesList.map((service, i) => {

          return (
            <div
              key={service._id || i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`sticky top-32 bg-white rounded-3xl shadow-2xl
                          flex flex-col lg:flex-row overflow-hidden
                          transition-transform duration-200
                          ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className="lg:w-1/2 h-64 lg:h-auto">
                <img
                  src={service.icon ? `${BASE}/uploads/${service.icon}` : `https://placehold.co/800x600/png?text=${service.title}`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div
                  className="rich-text-content mb-3"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />

                {service.subtitle && (
                  <div
                    className="rich-text-content mb-6"
                    dangerouslySetInnerHTML={{ __html: service.subtitle }}
                  />
                )}

                {service.description && (
                  <div
                    className="rich-text-content"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                )}
              </div>
            </div>
          )
        })
      )}
    </section>

  )
}