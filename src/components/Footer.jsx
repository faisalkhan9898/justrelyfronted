import logo from "../assets/logo/just_rely_logo-removebg-preview.png"


const mainLinks = [
  "Home",
  "Completed Projects",
  "Ongoing Projects",
  "Career",
  "JUST RELY Insights",
  "Contact Us",
]

const aboutLinks = [
  "Company Overview",
  "Our Group of Companies",
  "Meet the Management",
  "QHSE Policy",
  "ISO Certifications",
  "Awards",
]

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t-4 border-[#E5C547]">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10
                      sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
          <img
            src={logo}
            alt="logo"
            className="w-40 mb-4"
          />

          {/* LinkedIn */}
          <a
            href="#"
            className="flex items-center justify-between gap-3 w-full max-w-xs
                       border border-blue-600 rounded-lg px-4 py-3 mb-3
                       hover:bg-blue-50 transition"
          >
            <span className="text-blue-600">in</span>
            <span className="font-semibold">Connect to LinkedIn</span>
            <span>→</span>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="flex items-center justify-between gap-3 w-full max-w-xs
                       border border-pink-500 rounded-lg px-4 py-3
                       hover:bg-pink-50 transition"
          >
            <span className="text-pink-500">◎</span>
            <span className="font-semibold">Connect to Instagram</span>
            <span>→</span>
          </a>
        </div>

        {/* Main Links */}
        <div>
          <h4 className="font-bold mb-4">MAIN LINKS</h4>
          <ul className="space-y-2 text-slate-600">
            {mainLinks.map((link, i) => (
              <li key={i}>
                <a className="hover:text-blue-600 cursor-pointer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-bold mb-4">ABOUT US</h4>
          <ul className="space-y-2 text-slate-600">
            {aboutLinks.map((link, i) => (
              <li key={i}>
                <a className="hover:text-blue-600 cursor-pointer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4">CONTACT US</h4>
          <div className="space-y-2 text-slate-600">
            <p>📍 New Delhi, India</p>
            <p>📞 +922 4 285 7324</p>
            <p>✉ info@justrelyservices.com</p>
            <p>✉ info@justrelyproperties.com</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 py-4 px-6
                      flex flex-col md:flex-row
                      items-center justify-between
                      text-sm text-slate-600">
        <p>© JTS TECHNOLOGIES. ALL RIGHTS RESERVED.</p>

        <div className="flex gap-3">
          <a className="hover:text-blue-600 cursor-pointer">
            Terms & Conditions
          </a>
          <span>|</span>
          <a className="hover:text-blue-600 cursor-pointer">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}