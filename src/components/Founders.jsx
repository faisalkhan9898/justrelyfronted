import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axois'

export default function Founders() {
  const titleRef = useRef(null)
  const cardRefs = useRef([])
  const [titleVisible, setTitleVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState([])
  const [foundersList, setFoundersList] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/team')
        if (res.data && res.data.length > 0) {
          setFoundersList(res.data)
        }
      } catch (error) {
        console.error("Error fetching team:", error)
      }
    }
    fetchTeam()
  }, [])

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true)
      },
      { threshold: 0.3 }
    )

    if (titleRef.current) titleObserver.observe(titleRef.current)

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target)
            setVisibleCards((prev) => [...new Set([...prev, index])])
            cardObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )

    cardRefs.current.forEach((el) => el && cardObserver.observe(el))

    return () => {
      titleObserver.disconnect()
      cardObserver.disconnect()
    }
  }, [foundersList])


  return (
    <section className="py-20 px-6 text-center">
      {/* Title */}
      <div
        ref={titleRef}
        className={`inline-block mb-14 transition-all duration-700 ${titleVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          WHO WE ARE
        </h2>
        <span className="block w-24 h-1 bg-[#CA9817] mx-auto mt-3 rounded"></span>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {foundersList.length === 0 ? (
          <div className="col-span-full py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          foundersList.map((f, i) => (
            <div
              key={f._id || i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`
                bg-white rounded-3xl p-12 shadow-lg
                hover:-translate-y-3 hover:shadow-2xl
                transition-all duration-500
                ${visibleCards.includes(i)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
                }
              `}
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-[#CA9817]">
                <img
                  src={f.image ? `${BASE}/uploads/${f.image}` : `https://i.pravatar.cc/200?img=${i + 10}`}
                  alt={f.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold mb-1 text-gray-900">
                {f.name}
              </h3>
              <p className="text-[#CA9817] font-medium text-sm uppercase tracking-wider mb-4">
                {f.role}
              </p>
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: f.description }}
              />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
