import { useEffect, useRef, useState } from "react"
import img1 from "../assets/images/22-2.png"


import api, { BASE } from '../api/axios'

export default function About() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [aboutData, setAboutData] = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about')
        if (res.data) {
          // The API returns an object directly or an array, in this case it looks like an object
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          if (data) setAboutData(data)
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
      }
    }
    fetchAbout()
  }, [])


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current && entry.isIntersecting) {
            setShowLeft(true)
          }
          if (entry.target === rightRef.current && entry.isIntersecting) {
            setShowRight(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 px-4 text-center">
      {/* Header */}
      <div className="">
        {aboutData?.heading ? (
          <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: aboutData.heading }} />
        ) : (
          <>
            <span>
              ABOUT US
            </span>
            <h2>
              WELCOME TO <span>JUST RELY</span>
              <br />
              (LET'S WALK ON YOUR DREAM)
            </h2>
          </>
        )}
      </div>


      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div
          ref={leftRef}
          className={`transition-all duration-700 ${showLeft
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-10"
            }`}
        >
          <img
            // src={aboutData?.image ? `${BASE}/uploads/${aboutData.image}` : img1}
            src={img1}
            alt="about section"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />

        </div>

        {/* Text */}
        <div
          ref={rightRef}
          className={`text-left  transition-all duration-700 ${showRight
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-10"
            }`}
        >
          {aboutData?.paragraph ? (
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: aboutData.paragraph }}
            />
          ) : (
            <>
              <p className="">
                Just Rely is a Dubai-based company specializing in real estate and
                technical services. We offer expert property solutions alongside
                comprehensive maintenance services, including electrical, plumbing,
                carpentry, painting, and renovations.
              </p>

              <p className="">
                With a commitment to quality, reliability, and customer
                satisfaction, Just Rely is your trusted partner for building,
                maintaining, and investing in Dubai’s dynamic market.
              </p>
            </>
          )}


          <a
            href="#"
            className=" block text-center gap-2 font-semibold mt-6 hover:gap-3 transition-all"
          >
            Read More →
          </a>
        </div>
      </div>
    </section>
  )
}