import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axios'
import { stripHtml } from '../utils/stringUtils'

export default function USP() {
  const [visibleItems, setVisibleItems] = useState([])
  const refs = useRef([])
  const [uspList, setUspList] = useState([])

  useEffect(() => {
    const fetchUSP = async () => {
      try {
        const res = await api.get('/usp')
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map(item => ({
            text: item.title,
            icon: `${BASE}/uploads/${item.icon}`
          }))
          setUspList(mapped)
        }
      } catch (error) {
        console.error("Error fetching USP:", error)
      }
    }
    fetchUSP()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target)
            setVisibleItems((prev) => [...new Set([...prev, index])])
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [uspList])

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {uspList.map((item, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className={`flex flex-col items-center p-8 rounded-2xl transition-all duration-700
                      ${visibleItems.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            {/* Icon */}
            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gray-50 rounded-full">
              <img
                src={item.icon}
                alt="usp icon"
                className="w-8 h-8 object-contain"
              />
            </div>
            {/* Text */}
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
