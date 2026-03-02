import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axois'

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
    const handleScroll = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return

        const rect = card.getBoundingClientRect()
        const triggerPoint = 100

        if (rect.top <= triggerPoint) {
          const progress = Math.min(
            (triggerPoint - rect.top) / window.innerHeight,
            1
          )
          const scale = 1 - progress * 0.08
          card.style.transform = `scale(${scale})`
        } else {
          card.style.transform = "scale(1)"
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [servicesList])


  return (
    <section className="max-w-6xl mx-auto px-4 py-32 space-y-32">
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
                <h2 className="text-3xl font-bold mb-3">{service.title}</h2>

                {service.subtitle && (
                  <h4 className="text-gray-500 mb-6">{service.subtitle}</h4>
                )}

                {service.description && (
                  <div
                    className="text-gray-700 rich-text-content"
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