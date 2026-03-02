import { useEffect, useState } from "react"
import api from "../api/axois"


const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const AddressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function ContactInfo() {
  const [contactData, setContactData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get('/contact')
        if (res.data) {
          setContactData(res.data)
        }
      } catch (error) {
        console.error("Error fetching contact info:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchContact()
  }, [])

  const contacts = contactData ? [
    {
      title: "PHONE",
      value: contactData.phone || "+91 9224857324",
      link: contactData.phone ? `tel:${contactData.phone}` : "tel:+919224857324",
      icon: <PhoneIcon />,
    },
    {
      title: "WHATSAPP",
      value: contactData.whatsapp || "+91 9224857324",
      link: contactData.whatsapp ? `https://wa.me/${contactData.whatsapp}` : "https://wa.me/919224857324",
      icon: <WhatsAppIcon />,
    },
    {
      title: "ADDRESS",
      value: contactData.address || "New Delhi, India",
      link: null,
      icon: <AddressIcon />,
    },
    {
      title: "EMAIL",
      value: contactData.email || "info@justrelyservices.com",
      link: contactData.email ? `mailto:${contactData.email}` : "mailto:info@justrelyservices.com",
      icon: <EmailIcon />,
    },
  ] : []

  return (
    <section className="relative py-20 px-4 bg-slate-900 text-white text-center overflow-hidden">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r
                      from-[#217790] via-[#fdf286] via-[#e5c547]
                      via-[#ca9817] via-[#137b9b] to-[#217790]" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Get In <span className="text-[#CA9817]">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-[#CA9817] mx-auto rounded-full mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto">
            We'd love to hear from you — reach out through any channel
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            contacts.map((item, i) => {

              const Wrapper = item.link ? "a" : "div"

              return (
                <Wrapper
                  key={i}
                  href={item.link || undefined}
                  target={item.link?.startsWith("http") ? "_blank" : undefined}
                  className="
                  group flex flex-col items-center
                  bg-white/5 border border-white/10
                  rounded-2xl p-10
                  transition-all duration-500
                  hover:-translate-y-2 hover:bg-white/10 hover:border-[#CA9817]/50
                  hover:shadow-2xl hover:shadow-[#CA9817]/10
                "
                >
                  {/* Icon Container */}
                  <div className="
                  w-20 h-20 mb-6 rounded-full
                  flex items-center justify-center
                  bg-[#CA9817]/10 text-[#CA9817]
                  transition-all duration-500
                  group-hover:bg-[#CA9817] group-hover:text-white
                  group-hover:rotate-[360deg]
                ">
                    {item.icon}
                  </div>

                  {/* Text Section */}
                  <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 mb-3 uppercase">
                    {item.title}
                  </h4>
                  <div
                    className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors rich-text-content"
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </Wrapper>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
