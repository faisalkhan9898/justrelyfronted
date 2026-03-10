import { useEffect, useState } from "react"
import api from '../api/axios'
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

  useEffect(() => {
    if (reviewsList.length === 0) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviewsList.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviewsList.length])

  return (
    <section className="py-20 px-6 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          What Our <span className="text-[#CA9817]">Clients</span> Say
        </h2>

        {/* Quote Icon */}
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

              <div className="mt-4">
                <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: reviewsList[index].name }} />
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">
              {reviewsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all
                    ${i === index ? "w-8 bg-[#CA9817]" : "w-2 bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

    </section>
  )
}