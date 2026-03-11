import React, { useEffect, useRef, useState } from 'react';

// Assets
import bannerImg from '../assets/images/mep.webp';
import electricalImg from '../assets/navbar/elec.jpg';
import hvacImg from '../assets/navbar/technician-checking-heating-system-boiler-room.jpg';
import plumbingImg from '../assets/navbar/infra.jpg';
import fireImg from '../assets/navbar/fire.webp';
import bmsImg from '../assets/navbar/indus.png';

/* ─── Reusable Sub-components ─── */

const ServiceBlock = ({ tag, title, subtitle, text, list, img, icon, reverse }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setShow(true); observer.unobserve(entry.target); } },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className={`py-20 ${reverse ? 'bg-white' : 'bg-[#f7f8fa]'}`}>
            <div
                className={`container mx-auto px-6 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16
          transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Media */}
                <div className="flex-1 w-full relative">
                    <img src={img} alt={title} className="w-full rounded-2xl shadow-lg" />
                    <div className="absolute -bottom-5 left-5 bg-[#E5C547] w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white shadow-xl">
                        {icon}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full space-y-6">
                    <span className="inline-block bg-[#ffe4c4] text-[#CA9817] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        {tag}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#0d1b2a]">{title}</h2>
                    <p className="text-xl text-gray-700 font-medium">{subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{text}</p>
                    <ul className="space-y-3">
                        {list.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-[#2d3748]">
                                <span className="text-[#CA9817]">✔</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4">
                        <a
                            href="#contact-cta"
                            className="inline-block bg-[#CA9817] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#b08514] transition-all hover:-translate-y-0.5 shadow-lg"
                        >
                            Get a Quote →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhyChooseCard = ({ icon, title, text }) => (
    <div className="bg-white p-10 rounded-3xl border border-gray-200 text-left transition-all duration-400 hover:-translate-y-2 hover:border-[#CA9817] hover:shadow-2xl group shadow-sm">
        <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm transition-all group-hover:bg-[#CA9817] group-hover:text-white group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-[#1e293b] mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{text}</p>
    </div>
);

const TimelineItem = ({ number, title, text, side }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setShow(true); observer.unobserve(entry.target); } },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`relative w-full mb-12 lg:mb-0 flex flex-col lg:flex-row items-center transition-all duration-700 ${show ? 'opacity-100 translate-x-0' : `opacity-0 ${side === 'left' ? '-translate-x-12' : 'translate-x-12'}`
                }`}
        >
            <div className={`w-full lg:w-1/2 p-4 lg:p-10 ${side === 'left' ? 'lg:text-right' : 'lg:order-2 lg:text-left'}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg relative group transition-all hover:-translate-y-1 hover:shadow-2xl border border-gray-50">
                    <span className={`absolute top-0 ${side === 'left' ? 'left-5 lg:right-5 lg:left-auto' : 'right-5'} text-5xl font-black text-[#CA9817]/10 group-hover:text-[#CA9817]/20`}>
                        {number}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1e293b] mb-3">{title}</h3>
                    <p className="text-gray-500 leading-relaxed">{text}</p>
                </div>
            </div>

            {/* Central dot */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#CA9817] z-10 shadow-[0_0_0_4px_rgba(202,152,23,0.2)]"></div>
        </div>
    );
};

/* ─── Stats Counter ─── */
const StatCounter = ({ end, suffix, label }) => {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.unobserve(entry.target); } },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let current = 0;
        const step = Math.ceil(end / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= end) { setCount(end); clearInterval(timer); }
            else setCount(current);
        }, 30);
        return () => clearInterval(timer);
    }, [started, end]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl md:text-6xl font-black text-[#CA9817]">
                {count}{suffix}
            </div>
            <p className="text-white/70 mt-2 text-lg font-medium">{label}</p>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function MEPContracting() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-hidden">

            {/* ─── Hero Banner ─── */}
            <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-center bg-cover"
                    style={{ backgroundImage: `url(${bannerImg})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1428]/90 via-[#0a1428]/70 to-[#0a1428]/50"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-6">
                    <span className="inline-block text-[#CA9817] font-semibold tracking-[3px] mb-4 text-sm uppercase">
                        Our Services
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                        MEP <br />
                        <span className="text-[#CA9817]">Contracting</span> Solutions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-10">
                        Complete Mechanical, Electrical & Plumbing services — from design to commissioning — built on precision, safety, and reliability.
                    </p>
                    <a
                        href="#contact-cta"
                        className="inline-block bg-[#CA9817] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#b08514] hover:-translate-y-1 transition-all shadow-xl text-lg"
                    >
                        Request a Quote
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-[#CA9817] rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* ─── Service Blocks ─── */}
            <ServiceBlock
                tag="Electrical"
                title="Electrical Works"
                subtitle="Power distribution & lighting systems for every scale"
                text="We deliver comprehensive electrical installations covering high-voltage and low-voltage systems. Our solutions include power distribution panels, cable tray routing, lighting design, and generator integration — all compliant with local and international standards."
                list={[
                    "Power & Lighting Installation",
                    "LV & MV Distribution Panels",
                    "Cable Trays & Conduit Systems",
                    "Generator & UPS Integration",
                    "Earthing & Lightning Protection",
                ]}
                img={electricalImg}
                icon="⚡"
            />

            <ServiceBlock
                tag="Mechanical"
                title="HVAC Systems"
                subtitle="Climate control solutions for comfort & efficiency"
                text="We provide end-to-end HVAC solutions — from system design and ductwork fabrication to installation and commissioning. Our team ensures energy-efficient climate control for residential, commercial, and industrial environments."
                list={[
                    "Chilled Water Systems",
                    "Duct Fabrication & Installation",
                    "VRF / VRV Systems",
                    "Air Handling Units (AHU)",
                    "Ventilation & Exhaust Systems",
                    "Testing & Commissioning",
                ]}
                img={hvacImg}
                icon="❄️"
                reverse
            />

            <ServiceBlock
                tag="Plumbing"
                title="Plumbing & Drainage"
                subtitle="Reliable water supply & waste management systems"
                text="Our plumbing team handles everything from fresh water supply networks to complete drainage and sewer systems. We use premium-grade materials and modern jointing techniques to ensure leak-free, long-lasting installations."
                list={[
                    "Hot & Cold Water Supply",
                    "Sewer & Drainage Networks",
                    "Rainwater Harvesting",
                    "Water Tank Installation",
                    "Pipe Insulation & Lagging",
                ]}
                img={plumbingImg}
                icon="🔧"
            />

            <ServiceBlock
                tag="Fire Safety"
                title="Fire Fighting Systems"
                subtitle="Complete fire protection & life safety solutions"
                text="We design and install fully integrated fire fighting systems that comply with civil defense regulations. From sprinkler networks to alarm panels and suppression systems, we ensure maximum safety for occupants and assets."
                list={[
                    "Fire Sprinkler Systems",
                    "Fire Hydrant Networks",
                    "Fire Alarm & Detection",
                    "FM-200 & Gas Suppression",
                    "Hose Reels & Extinguishers",
                ]}
                img={fireImg}
                icon="🔥"
                reverse
            />

            <ServiceBlock
                tag="BMS"
                title="Building Management Systems"
                subtitle="Smart automation for modern buildings"
                text="We integrate intelligent building management systems that provide centralized monitoring and control of HVAC, lighting, fire, and security systems — improving energy efficiency and operational performance."
                list={[
                    "BMS Design & Integration",
                    "HVAC & Lighting Automation",
                    "Energy Monitoring & Analytics",
                    "Access Control Systems",
                    "CCTV & Security Integration",
                ]}
                img={bmsImg}
                icon="🏗️"
            />

            {/* ─── Stats Section ─── */}
            <section className="bg-gradient-to-br from-[#0f1c2e] to-[#1a2d44] py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-[#CA9817] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#CA9817] rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <StatCounter end={500} suffix="+" label="Projects Completed" />
                    <StatCounter end={15} suffix="+" label="Years Experience" />
                    <StatCounter end={200} suffix="+" label="MEP Engineers" />
                    <StatCounter end={50} suffix="+" label="Clients Served" />
                </div>
            </section>

            {/* ─── Why Choose Section ─── */}
            <section className="bg-white py-24 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fc] to-white opacity-50 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-5xl font-bold text-[#0f172a] mb-4">
                        Why Choose <span className="text-[#CA9817]">JUST RELY</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16">
                        We combine precision engineering with industry expertise to deliver MEP solutions that stand the test of time
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <WhyChooseCard
                            icon="⚙️"
                            title="Turnkey MEP Solutions"
                            text="End-to-end mechanical, electrical, and plumbing services under one roof"
                        />
                        <WhyChooseCard
                            icon="📐"
                            title="Precision Engineering"
                            text="BIM-coordinated designs ensuring clash-free installations"
                        />
                        <WhyChooseCard
                            icon="🛡️"
                            title="Safety Compliance"
                            text="Adherence to local civil defense and international safety codes"
                        />
                        <WhyChooseCard
                            icon="⚡"
                            title="Energy Efficient"
                            text="Green building solutions that reduce operational costs"
                        />
                        <WhyChooseCard
                            icon="⏱️"
                            title="Timely Delivery"
                            text="Committed schedules with milestone-based project tracking"
                        />
                        <WhyChooseCard
                            icon="🤝"
                            title="After-Sales Support"
                            text="Comprehensive maintenance and warranty support post-handover"
                        />
                    </div>
                </div>
            </section>

            {/* ─── Process Timeline ─── */}
            <section className="bg-white py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-[#0f1c2e] mb-4">
                            Our MEP <span className="text-[#CA9817]">Process</span>
                        </h2>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto">
                            A systematic approach ensuring quality at every phase of your MEP project
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#CA9817] to-transparent -translate-x-1/2"></div>

                        <TimelineItem
                            number="01"
                            title="Site Survey & Assessment"
                            text="Detailed site analysis to understand spatial requirements, existing infrastructure, and project scope"
                            side="left"
                        />
                        <TimelineItem
                            number="02"
                            title="Design & Engineering"
                            text="BIM-based MEP design, load calculations, and system specifications tailored to your project"
                            side="right"
                        />
                        <TimelineItem
                            number="03"
                            title="Material Procurement"
                            text="Sourcing high-quality, code-compliant materials from trusted manufacturers and suppliers"
                            side="left"
                        />
                        <TimelineItem
                            number="04"
                            title="Installation & Execution"
                            text="Professional installation by certified MEP engineers with strict quality control"
                            side="right"
                        />
                        <TimelineItem
                            number="05"
                            title="Testing & Commissioning"
                            text="Comprehensive system testing, balancing, and commissioning to ensure optimal performance"
                            side="left"
                        />
                        <TimelineItem
                            number="06"
                            title="Handover & Support"
                            text="Complete documentation, training, and ongoing maintenance support"
                            side="right"
                        />
                    </div>
                </div>
            </section>

            {/* ─── CTA Section ─── */}
            <section id="contact-cta" className="py-20 bg-gradient-to-br from-[#0f1c2e] to-[#1f2f44] text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CA9817] rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <h2 className="text-5xl font-bold mb-6">
                        Ready to Build <span className="text-[#CA9817]">Smarter?</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                        Partner with JUST RELY for reliable, efficient, and code-compliant MEP solutions that power your vision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/Contact"
                            className="inline-block bg-[#CA9817] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#805e08] hover:-translate-y-1 transition-all shadow-xl text-lg"
                        >
                            Contact Us Now
                        </a>
                        <a
                            href="tel:+919224857324"
                            className="inline-block border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all text-lg"
                        >
                            📞 Call Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
