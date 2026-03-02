import { useEffect, useRef, useState } from "react"

const data = [
  {
    title: "OUR MISSION",
    icon: "◆",
    text: `To provide reliable, high-quality real estate and technical
    solutions that exceed client expectations—through skilled expertise,
    transparent service, and a commitment to enhancing every space we touch.`,
  },
  {
    title: "OUR VISION",
    icon: "👁",
    text: `To be Dubai’s most trusted partner for real estate and technical
    services, delivering excellence, innovation, and lasting value in every
    property we build, sell, maintain, and manage.`,
  },
]

export default function MissionVision() {
  const refs = useRef([])
  const [visible, setVisible] = useState([])

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
      { threshold: 0.25 }
    )

    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {data.map((item, i) => (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`
              flex-1 bg-white/10 backdrop-blur-sm
              border border-white/20 rounded-xl p-10 text-center
              transition-all duration-700
              ${
                visible.includes(i)
                  ? "opacity-100 translate-x-0"
                  : i % 2 === 0
                  ? "opacity-0 -translate-x-16"
                  : "opacity-0 translate-x-16"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                {item.title}
              </h3>
            </div>

            {/* Text */}
            <p className="text-gray-200 leading-relaxed text-lg">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}