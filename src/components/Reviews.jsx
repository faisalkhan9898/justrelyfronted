import { useEffect, useState } from "react"
import api, { BASE } from '../api/axois'
import { stripHtml } from '../utils/stringUtils'
import img1 from "../assets/images/13908-1.jpg"

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [reviewsList, setReviewsList] = useState([])

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/testimonials')
        if (res.data && res.data.length > 0) {
          setReviewsList(res.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }
    fetchReviews()
  }, [])


  // Auto slide
  useEffect(() => {
    if (reviewsList.length === 0) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviewsList.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [reviewsList.length])


  return (
    <section className="relative py-24 px-4 overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${img1})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br
                      from-[#0a192f]/95 via-[#112240]/85 to-[#0a192f]/95" />

      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem]
                      rounded-full blur-[80px] opacity-40
                      bg-[radial-gradient(circle,#CA9817,transparent)]" />

      <div className="absolute -bottom-24 -right-24 w-[30rem] h-[30rem]
                      rounded-full blur-[80px] opacity-40
                      bg-[radial-gradient(circle,#217790,transparent)]" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto text-center">
        {/* Big quote */}
        <div className="absolute -top-10 -left-6 text-[6rem] opacity-10">
          ❝
        </div>

        {reviewsList.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 flex justify-center">
            <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10
                            rounded-2xl p-10 shadow-xl transition-all duration-500">
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: reviewsList[index].message }}
              />

              <div>
                <h4 className="font-bold tracking-widest text-[#CA9817] uppercase">
                  {stripHtml(reviewsList[index].name)}
                </h4>
                {/* <p className="text-xs text-white/60 mt-1 uppercase tracking-tight">
                  {reviewsList[index].role || "Verified Client"}
                </p> */}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">
              {reviewsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all
                    ${i === index ? "w-8 bg-[#CA9817]" : "w-2 bg-white/40"}
                  `}
                />
              ))}
            </div>
          </>
        )}
      </div>

    </section>
  )
}