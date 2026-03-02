import React from "react";

const Contact = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* 🔹 Banner */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
        <img
          src="/dropdown/civil.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1428]/90 via-[#0a1428]/70 to-[#0a1428]/50"></div>

        <div className="relative max-w-3xl px-6">
          <span className="text-[#CA9817] tracking-widest font-semibold">
            GET IN TOUCH
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-4">
            Let&apos;s <br /> Build Your{" "}
            <span className="text-[#CA9817]">Dream</span>
          </h1>
        </div>
      </section>

      {/* 🔹 Contact Info */}
      <section className="py-20 px-5 bg-[#fdfdfd] font-['Poppins']">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {[
              {
                icon: "fa-phone",
                label: "PHONE",
                title: "+922 4 285 7324",
              },
              {
                icon: "fa-envelope",
                label: "EMAIL",
                title: "info@justrelyservices.com",
                text: "We reply within 24 hours",
              },
              {
                icon: "fa-location-dot",
                label: "ADDRESS",
                title: "New Delhi, India",
              },
              {
                icon: "fa-clock",
                label: "WORKING HOURS",
                title: "Mon – Sat: 9:00 AM – 6:00 PM",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] py-10 px-[30px] text-center transition-all duration-300 border border-[#e0e0e0] relative overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:border-[#ca9817] hover:shadow-[0_10px_30px_rgba(202,152,23,0.15)] group"
              >
                <div className="w-[70px] h-[70px] rounded-full bg-[#ca9817]/10 flex items-center justify-center mx-auto mb-[25px] text-[28px] text-[#ca9817] transition-all duration-300 group-hover:bg-[#ca9817] group-hover:text-white">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>

                <p className="text-[13px] font-semibold tracking-[2px] text-[#888] mb-[15px] uppercase">
                  {item.label}
                </p>

                <h3 className="text-[18px] font-semibold leading-[1.6] mb-[10px] text-[#1a1a1a]">
                  {item.title}
                </h3>

                {item.text && (
                  <p className="text-[#666] text-[14px] leading-[1.6]">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


     

      {/* 🔹 Final Contact Form Section */}
      <section className="py-20 px-5 bg-[#fdfdfd] font-['Poppins'] border-t border-[#eee]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-[60px] items-start">
          
          {/* LEFT : FORM */}
          <div className="bg-white p-10 rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-[28px] font-bold text-[#1a1a1a] mb-[10px]">Send Us a Message</h2>
            <p className="text-[15px] text-[#666] mb-[30px] leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours
            </p>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold uppercase tracking-wider text-[#1a1a1a]">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-[15px] py-3 border border-[#ddd] rounded-md text-[15px] text-[#333] transition-all duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#ca9817] focus:bg-white focus:ring-[3px] focus:ring-[#ca9817]/10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold uppercase tracking-wider text-[#1a1a1a]">Phone Number *</label>
                  <input 
                    type="text" 
                    placeholder="+91 9059299455" 
                    className="w-full px-[15px] py-3 border border-[#ddd] rounded-md text-[15px] text-[#333] transition-all duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#ca9817] focus:bg-white focus:ring-[3px] focus:ring-[#ca9817]/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold uppercase tracking-wider text-[#1a1a1a]">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full px-[15px] py-3 border border-[#ddd] rounded-md text-[15px] text-[#333] transition-all duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#ca9817] focus:bg-white focus:ring-[3px] focus:ring-[#ca9817]/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold uppercase tracking-wider text-[#1a1a1a]">Service Interested In *</label>
                <select className="w-full px-[15px] py-3 border border-[#ddd] rounded-md text-[15px] text-[#333] transition-all duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#ca9817] focus:bg-white focus:ring-[3px] focus:ring-[#ca9817]/10">
                  <option>Select a service</option>
                  <option>Construction</option>
                  <option>Interior Design</option>
                  <option>Renovation</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold uppercase tracking-wider text-[#1a1a1a]">Your Message *</label>
                <textarea 
                  placeholder="Tell us about your project..." 
                  className="w-full px-[15px] py-3 border border-[#ddd] rounded-md text-[15px] text-[#333] transition-all duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#ca9817] focus:bg-white focus:ring-[3px] focus:ring-[#ca9817]/10 min-h-[120px] resize-vertical"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-[10px] p-[15px] bg-[#1a1a1a] text-white font-semibold text-base rounded-md cursor-pointer transition-all duration-300 tracking-wider uppercase hover:bg-[#ca9817] hover:text-[#111] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(202,152,23,0.2)]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT : INFO */}
          <div className="flex flex-col gap-10 pt-5">
            <div>
              <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[3px] after:bg-[#ca9817] after:mt-2 after:rounded-[2px]">
                Our Office
              </h3>

              <div className="bg-white p-[25px] rounded-[10px] border border-[#eee] shadow-[0_5px_15px_rgba(0,0,0,0.03)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#ca9817]">
                <div className="flex justify-between items-center mb-[15px]">
                  <span className="font-bold text-[18px] text-[#1a1a1a]">New Delhi</span>
                  <small className="bg-[#ca9817]/15 text-[#ca9817] px-2.5 py-1 rounded-[20px] text-[11px] font-bold uppercase">
                    Head Office
                  </small>
                </div>
                <p>New Delhi</p>
                <p className="mt-2.5 font-semibold text-[#1a1a1a] text-base">+922 4 285 7324</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[3px] after:bg-[#ca9817] after:mt-2 after:rounded-[2px]">
                Quick Actions
              </h3>

              {[
                { icon: "fa-phone", title: "Call Now", text: "Speak with our team" },
                { icon: "fa-calendar-check", title: "Schedule Visit", text: "Book a site visit" },
                { icon: "fa-building", title: "View Projects", text: "Explore our work" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-4 bg-white rounded-[8px] border border-[#f0f0f0] transition-all duration-300 cursor-pointer hover:border-[#ca9817] hover:translate-x-[5px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] group"
                >
                  <div className="w-[45px] h-[45px] bg-[#fdf2e9] text-[#ca9817] rounded-full flex items-center justify-center text-[18px] transition-all duration-300 group-hover:bg-[#ca9817] group-hover:text-white">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div>
                    <strong className="block text-[15px] text-[#1a1a1a] mb-[2px]">{item.title}</strong>
                    <p className="text-[13px] text-[#777] m-0">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

       {/* 🔹 Map */}
      <section className="py-12">
        <div className="w-[90%] max-w-6xl h-[50vh] mx-auto rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004883842!2d77.04417347155065!3d28.52725273882469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1771396476133!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;