import { useEffect, useRef, useState } from "react"
import { FaWhatsapp, FaPhone, FaEnvelope, FaLocationDot, FaPlus, FaXmark } from "react-icons/fa6"

export default function FloatingMenu() {
  const [open, setOpen] = useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    console.log("FloatingMenu rendered, open state:", open)
  }, [open])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const toggleMenu = () => {
    console.log("Toggle clicked")
    setOpen((prev) => !prev)
    setShowLabel(false)
  }

  const items = [
    {
      href: "mailto:info@justrelyservices.com",
      label: "Email Us",
      icon: <FaEnvelope />,
    },
    {
      href: "https://maps.app.goo.gl/YourMapLinkHere",
      label: "Locate Us",
      icon: <FaLocationDot />,
      external: true,
    },
    {
      href: "https://wa.me/919224857324",
      label: "WhatsApp",
      icon: <FaWhatsapp />,
      external: true,
    },
    {
      href: "tel:+919224857324",
      label: "Call Us",
      icon: <FaPhone />,
    },
  ]

  return (
    <div
      ref={containerRef}
      id="floating-menu-container"
      className="fixed bottom-6 right-6 z-[99999] flex flex-col items-center gap-4"
    >
      {/* Menu Items */}
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`group relative w-12 h-12 rounded-full
              flex items-center justify-center text-lg
              bg-slate-900 backdrop-blur-md border border-white/20
              text-[#CA9817] shadow-lg
              hover:text-white hover:bg-[#CA9817]
              transition-all duration-300 transform
              ${open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                     : "opacity-0 translate-y-8 scale-50 pointer-events-none"}
            `}
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
          >
            {item.icon}

            {/* Tooltip */}
            <span className="absolute right-16 whitespace-nowrap
                             bg-slate-900 text-white text-[11px] font-medium 
                             px-3 py-1.5 rounded-lg border border-white/10
                             opacity-0 -translate-x-2 pointer-events-none
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-300">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Toggle Button */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full text-white text-xl
                     flex items-center justify-center
                     bg-gradient-to-br from-[#CA9817] to-[#b1c00e]
                     shadow-xl hover:scale-110 active:scale-90 
                     transition-all duration-300 z-20 relative`}
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <FaPlus
              className={`absolute transition-all duration-300 ${
                open ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <FaXmark
              className={`absolute transition-all duration-300 ${
                open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
              }`}
            />
          </div>
        </button>

        {/* Pulsing effect */}
        {!open && (
           <div className="absolute inset-0 rounded-full bg-[#CA9817] animate-ping opacity-20 -z-10" />
        )}
      </div>

      {/* Hint Label */}
      {showLabel && !open && (
        <div className="absolute right-20 bottom-0 h-14 flex items-center">
           <div className="relative flex items-center">
             <span className="bg-white shadow-lg text-slate-800 px-5 py-2 rounded-full font-bold text-[13px] 
                            whitespace-nowrap border border-[#CA9817]/20 animate-bounce-subtle">
               Contact Us
             </span>
             <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-[#CA9817]/20" />
           </div>
        </div>
      )}
    </div>
  )
}
