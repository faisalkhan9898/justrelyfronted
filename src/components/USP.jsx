import { useEffect, useRef, useState } from "react"
import api, { BASE } from '../api/axois'

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
      { threshold: 0.2 }
    )

    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [uspList])


  if (uspList.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 text-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
        OUR USP
      </h2>

      {/* Grid Area */}
      <div className="values-row">
        {uspList.map((item, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`value-car ${visibleItems.includes(i) ? "show" : ""}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="ico">
              <img
                src={item.icon}
                alt="icon"
              />
            </div>

            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        ))}
      </div>
    </section>
  )
}
