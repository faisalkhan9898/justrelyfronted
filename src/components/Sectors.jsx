import { useEffect, useRef, useState } from "react"
import icon1 from "../assets/icon/mep.png"
import icon2 from "../assets/icon/ss.png"
import icon3 from "../assets/icon/renova.png"
import icon4 from "../assets/icon/civil-engineering.png"
import icon5 from "../assets/icon/main.png"
import icon6 from "../assets/icon/fire.png"
import icon7 from "../assets/icon/infrastructure.png"
import icon8 from "../assets/icon/fact.png"

const sectors = [
  { name: "Civil Contracting Works", icon: icon4 },
  { name: "MEP Contracting", icon: icon1 },
  { name: "Ss And Fabrication", icon: icon2 },
  { name: "Interior Fit-Out Contracting", icon: icon3},
  { name: "Renovation & Maintenance Works", icon: icon5 },
  { name: "Fire & Safety Contracting", icon: icon6 },
  { name: "Infrastructure & External Works", icon: icon7 },
  { name: "Industrial Contracting", icon: icon8 },
]

export default function Sectors() {
  const titleRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 px-4 bg-white text-center">
      {/* Title */}
      <div
        ref={titleRef}
        className={`inline-block mb-10 transition-all duration-700 ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          WHAT WE DO?
        </h2>
        <span className="block w-24 h-1 bg-[#CA9817] mx-auto mt-3 rounded"></span>
      </div>

      {/* Grid */}
      <div
        className="
          max-w-7xl mx-auto grid
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          border border-gray-200
        "
      >
        {sectors.map((sector, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center justify-center
              p-8 border-b border-r border-gray-200
              hover:text-[#CA9817] hover:font-semibold
              transition cursor-pointer
            "
          >
            <img
              src={sector.icon}
              alt={sector.name}
              className="h-24 w-24 object-contain mb-4"
            />

            <p className="text-gray-900 text-sm md:text-base">
              {sector.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}