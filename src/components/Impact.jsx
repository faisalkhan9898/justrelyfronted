import { useEffect, useRef, useState } from "react"

const stats = [
  { label: "Years of Experience", target: 29, suffix: "+" },
  { label: "Projects Delivered", target: 100, suffix: "+" },
  { label: "Sectors", target: 13, suffix: "+" },
  { label: "States", target: 10, suffix: "+" },
  { label: "Cities", target: 50, suffix: "+" },
  { label: "Growth", target: 100, suffix: "%" },
]

export default function Impact() {
  const sectionRef = useRef(null)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const duration = 2000
    const startTime = performance.now()

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1)

      const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

      const eased = easeOutExpo(progress)

      setCounts(stats.map((s) => Math.round(s.target * eased)))

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [started])

  return (
    <section
      ref={sectionRef}
      className="
        relative py-28 px-4 text-white
        bg-fixed bg-center bg-cover
      "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/85" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto grid gap-10 text-center
                      grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              {counts[i]}
              {stat.suffix}
            </h2>
            <p className="text-sm md:text-base text-slate-300 uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}