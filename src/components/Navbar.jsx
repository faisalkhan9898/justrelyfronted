import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import logoWhite from "../assets/logo/just_rely_logo-removebg-preview.png"
import logoDark from "../assets/logo/logowhitw.png"
import img1 from "../assets/navbar/technician-checking-heating-system-boiler-room.jpg"
import img2 from "../assets/navbar/ms-fabrication-work-381897622-ds6l2.avif"
import img3 from "../assets/navbar/civil-construction.webp"
import img4 from "../assets/navbar/building-renovation-services.jpg"
import img5 from "../assets/navbar/fire.webp"
import img6 from "../assets/navbar/elec.jpg"
import img7 from "../assets/navbar/infra.jpg"
import img8 from "../assets/navbar/indus.png"


const services = [
  {
    name: "Civil Contracting Works",
    image: img3,
    path: "/CivilContractingWorks",
  },
  {
    name: "MEP Contracting",
    image: img1,
    path: "/MEPContracting",
  },
  {
    name: "SS And Fabrication Works",
    image: img2,
    path: "/SSFabrication",
  },
  {
    name: "Renovation & Maintenance Works",
    image: img4,
    path: "/RenovationMaintenance",
  },
  {
    name: "Fire & Safety Contracting",
    image: img5,
    path: "/FireSafety",
  },
  {
    name: "ELV & Low Current Systems",
    image: img6,
    path: "/ELVSystems",
  },
  {
    name: "Infrastructure & External Works",
    image: img7,
    path: "/InfrastructureWorks",
  },
  {
    name: "Industrial Contracting",
    image: img8,
    path: "/IndustrialContracting",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [preview, setPreview] = useState(img1)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    if (menuOpen) setMobileServicesOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-white shadow-md border-b-3 border-[#CA9817]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-0">
        {/* Logo */}
        <img
          src={scrolled ? logoWhite : logoDark}
          alt="logo"
          className={`transition-all ${
            scrolled ? "h-20" : "h-36"
          }`}
        />

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-semibold items-center">
          <li>
            <Link to="/" className={`transition-colors ${scrolled ? "text-black hover:text-[#CA9817]" : "text-white hover:text-[#CA9817]"}`}>
              Home
            </Link>
          </li>
          <li>
            <a href="#about" className={`transition-colors ${scrolled ? "text-black hover:text-[#CA9817]" : "text-white hover:text-[#CA9817]"}`}>
              About Us
            </a>
          </li>
          <li>
            <a href="#projects" className={`transition-colors ${scrolled ? "text-black hover:text-[#CA9817]" : "text-white hover:text-[#CA9817]"}`}>
              Projects
            </a>
          </li>

          {/* Desktop Dropdown */}
          <li className="relative group py-4">
            <span className={`cursor-pointer transition-colors flex items-center gap-1 ${scrolled ? "text-black hover:text-[#CA9817]" : "text-white hover:text-[#CA9817]"}`}>
              Services We Offer <span className="text-[10px]">▼</span>
            </span>

            <div
              className="
                absolute left-2 top-full -translate-x-1/2 translate-y-2
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-300
                bg-white rounded-xl shadow-2xl
                p-5 flex gap-6
                min-w-[700px] max-w-[calc(100vw-40px)]
                z-50
                hidden md:flex
              "
            >
              {/* Links column */}
              <ul className="min-w-[300px] border-r border-[#CA9817] pr-4">
                {services.map((service, i) => (
                  <li key={i}>
                    <Link
                      to={service.path}
                      onMouseEnter={() => setPreview(service.image)}
                      className="
                        block w-full text-left px-5 py-3
                        text-gray-700 font-medium
                        hover:bg-gray-50 hover:text-[#CA9817]
                        border-b border-[#CA9817] last:border-none
                        transition-all
                      "
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Image preview */}
              <div className="w-[380px] h-[420px] rounded-xl overflow-hidden hidden lg:block">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </li>

          <li>
            <Link to="/Contact" className={`transition-colors ${scrolled ? "text-black hover:text-[#CA9817]" : "text-white hover:text-[#CA9817]"}`}>
              Contact
            </Link>
          </li>
        </ul>

        <button
          onClick={toggleMenu}
          className={`md:hidden text-2xl z-50 p-2 ${
            menuOpen ? "text-black" : (scrolled ? "text-black" : "text-white")
          }`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 space-y-6 overflow-y-auto">
          <Link to="/" className="text-2xl font-bold text-gray-800 border-b pb-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="#about" className="text-2xl font-bold text-gray-800 border-b pb-2" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#projects" className="text-2xl font-bold text-gray-800 border-b pb-2" onClick={() => setMenuOpen(false)}>Projects</a>
          
          <div className="flex flex-col">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-2xl font-bold text-gray-800 border-b pb-2"
            >
              Services We Offer <span>{mobileServicesOpen ? "▲" : "▼"}</span>
            </button>
            <div
              className={`flex flex-col pl-4 mt-4 space-y-4 overflow-hidden transition-all duration-300 ${
                mobileServicesOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {services.map((service, i) => (
                <Link
                  key={i}
                  to={service.path}
                  className="text-lg font-medium text-gray-600 hover:text-[#CA9817] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/ContactUs" className="text-2xl font-bold text-gray-800 border-b pb-2" onClick={() => setMenuOpen(false)}>Contact</Link>
          
          <div className="mt-auto py-10 flex flex-col items-center gap-4 text-center">
             <img src={logoWhite} alt="logo" className="h-20 grayscale opacity-50" />
             <p className="text-gray-400 text-sm">© 2026 Just Rely. All rights reserved.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
