import React, { useEffect, useState } from 'react'
import api, { BASE } from '../api/axois'


export default function Landing() {
  const [slides, setSlides] = useState([])

  const [current, setCurrent] = useState(0)

  // Fetch banners from API and map to original structure
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get('/banner')
        if (res.data && res.data.length > 0) {
          const mappedSlides = res.data.map(item => ({
            ...item,
            video: `${BASE}/uploads/${item.video}`,
            link: "#contact"
          }))
          setSlides(mappedSlides)
        }
      } catch (error) {
        console.error("Error fetching banners:", error)
      }
    }
    fetchBanners()
  }, [])



  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])



  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length)

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  if (slides.length === 0) {
    return (
      <section id="hero" className="relative h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative h-screen overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0"
            }`}
        >
          {/* Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            key={slide.video}
          >
            <source src={slide.video} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 rich-text-heading">
              <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: slide.title }} />
            </h1>

            <div
              className="max-w-2xl text-lg md:text-xl mb-8 rich-text-content"
              dangerouslySetInnerHTML={{ __html: slide.desc }}
            />


            <a
              href={slide.link}
              className="relative inline-flex items-center justify-center w-72 h-12 rounded-full bg-gradient-to-r from-cyan-600 via-yellow-300 to-cyan-600 animate-[gradient_3s_linear_infinite]"
            >
              <span
                className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center font-semibold uppercase tracking-wide text-white rich-text-inline"
                dangerouslySetInnerHTML={{
                  __html: (function () {
                    const props = [slide.buttonText, slide.btnText, slide.button, slide.btn, slide.text, slide.label, slide.cta, slide.linkText, slide.name, slide.heading];
                    for (let val of props) {
                      if (val && val.replace(/<[^>]*>?/gm, '').trim().length > 0) {
                        // Strip <p> tags but keep other inner content
                        return val.replace(/<\/?p>/gi, '');
                      }
                    }
                    return "View Property";
                  })()
                }}
              />
            </a>
          </div>
        </div>
      ))}



      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white text-2xl px-4 py-2"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white text-2xl px-4 py-2"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-yellow-400" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  )
}

// export default Landing