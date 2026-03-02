import React, { useEffect, useRef, useState } from 'react';

// Assets
import bannerImg from '../assets/images/civil.jpg';
import buildingImg from '../assets/navbar/civil-construction.webp'; // Placeholder for construction site
import foundationImg from '../assets/navbar/infra.jpg'; // Placeholder for foundations
import concreteImg from '../assets/navbar/civil-construction.webp'; // Placeholder for RCC
import roadImg from '../assets/images/highway.jpg.jpeg'; // Road works
import excavationImg from '../assets/navbar/civil-construction.webp'; // Placeholder for earthwork
import waterproofingImg from '../assets/navbar/infra.jpg'; // Placeholder for waterproofing

const ServiceBlock = ({ tag, title, subtitle, text, list, img, icon, reverse }) => {
  return (
    <section className={`py-20 ${reverse ? 'bg-white' : 'bg-[#f7f8fa]'}`}>
      <div className={`container mx-auto px-6 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
        {/* Media Side */}
        <div className="flex-1 w-full relative">
          <img 
            src={img} 
            alt={title} 
            className="w-full rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-5 left-5 bg-[#E5C547] w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white shadow-xl">
            {icon}
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 w-full space-y-6">
          <span className="inline-block bg-[#ffe4c4] text-[#CA9817] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {tag}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0d1b2a]">
            {title}
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            {subtitle}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {text}
          </p>
          <ul className="space-y-3">
            {list.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-[#2d3748]">
                <span className="text-[#CA9817]">✔</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <a 
              href="#" 
              className="inline-block bg-[#CA9817] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#b08514] transition-all"
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
    <h3 className="text-2xl font-bold text-[#1e293b] mb-3">
      {title}
    </h3>
    <p className="text-gray-500 leading-relaxed">
      {text}
    </p>
  </div>
);

const TimelineItem = ({ number, title, text, side }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative w-full mb-12 lg:mb-0 flex flex-col lg:flex-row items-center transition-all duration-700 ${
        show ? 'opacity-100 translate-x-0' : `opacity-0 ${side === 'left' ? '-translate-x-12' : 'translate-x-12'}`
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
      
      {/* Central Point */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#CA9817] z-10 shadow-[0_0_0_4px_rgba(202,152,23,0.2)]"></div>
    </div>
  );
};

export default function CivilContractingWorks() {
  return (
    <div className="overflow-hidden">
      {/* Banner */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover no-repeat"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1428]/85 via-[#0a1428]/60 to-[#0a1428]/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6">
          <span className="inline-block text-[#CA9817] font-semibold tracking-[2px] mb-4">OUR SERVICES</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Complete <br />
            Construction <span className="text-[#CA9817]">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            We provide end-to-end construction services built on expertise, innovation, and excellence.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <ServiceBlock 
        tag="SERVICE"
        title="Building Construction"
        subtitle="Complete construction solutions for residential and commercial buildings"
        text="We deliver turnkey building construction services with expert engineering, quality materials, and skilled workforce. From foundation to finishing, we ensure every detail meets the highest standards."
        list={["Residential Buildings", "Commercial Complexes", "High-rise Structures", "Renovation & Remodeling"]}
        img={buildingImg}
        icon="🏢"
      />

      <ServiceBlock 
        tag="SERVICE"
        title="Foundations & structural works"
        subtitle="Plotted layouts and township developments with modern amenities"
        text="We plan and execute complete residential ventures including plotted layouts, gated communities, and townships. Our developments feature proper infrastructure, amenities, and clear legal documentation."
        list={["Plotted Layout Ventures", "Gated Communities", "Township Planning", "Infrastructure Development"]}
        img={foundationImg}
        icon="🏛️"
        reverse
      />

      <ServiceBlock 
        tag="SERVICE"
        title="Concrete & RCC works"
        subtitle="Complete Concrete & RCC works solutions for all scales"
        text="We provide comprehensive concrete and reinforced cement concrete (RCC) solutions for residential, commercial, and industrial projects. Our team ensures precision in mixing, reinforcement, and placement to deliver durable, high-strength structures that meet engineering and safety standards."
        list={["RCC Foundations & Footings", "Columns, Beams & Slabs", "Concrete Flooring & Pavements", "Retaining Walls & Structural Elements", "Formwork, Reinforcement & Pouring"]}
        img={concreteImg}
        icon="🏢"
      />

      <ServiceBlock 
        tag="SERVICE"
        title="Road works & paving"
        subtitle="Complete Road works solutions for all scales"
        text="We offer end-to-end road construction and paving services for residential layouts, commercial spaces, and infrastructure projects. Our solutions focus on durability, smooth finishes, and long-term performance under varying traffic and weather conditions."
        list={["Asphalt & Concrete Road Construction", "Interlocking Paver Installation", "Road Base Preparation & Compaction", "Driveways, Pathways & Parking Areas", "Resurfacing & Road Repairs", "Kerbs, Drainage & Finishing Works"]}
        img={roadImg}
        icon="🏛️"
        reverse
      />

      <ServiceBlock 
        tag="SERVICE"
        title="Excavation & earthworks"
        subtitle="Complete Excavation & earthworks works solutions for all scales"
        text="We deliver precise excavation and earthworks services, ensuring safe site preparation, accurate grading, and a strong foundation for every project."
        list={["Site Clearing & Preparation", "Earth Excavation & Backfilling", "Leveling & Grading", "Trenching & Foundation Excavation"]}
        img={excavationImg}
        icon="🏢"
      />

      <ServiceBlock 
        tag="SERVICE"
        title="Waterproofing"
        subtitle="Complete Waterproofing works solutions for all scales"
        text="We provide reliable waterproofing solutions to protect structures from water damage, ensuring durability and long-term performance."
        list={["Terrace & Roof Waterproofing", "Basement & Foundation Protection", "Bathroom & Wet Area Treatment", "Crack Filling & Leakage Repair"]}
        img={waterproofingImg}
        icon="🏛️"
        reverse
      />

      {/* Why Choose Section */}
      <section className="bg-white py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fc] to-white opacity-50 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-[#0f172a] mb-4">Why Choose JUST RELY</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16">
            We combine experience, expertise, and commitment to deliver exceptional construction solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WhyChooseCard 
              icon="🛡️" 
              title="25+ Years Experience" 
              text="Proven track record since 1998 in construction and development"
            />
            <WhyChooseCard 
              icon="👷" 
              title="Expert Team" 
              text="Skilled engineers, architects, and construction professionals"
            />
            <WhyChooseCard 
              icon="⏱️" 
              title="Timely Delivery" 
              text="Committed to meeting deadlines without compromising quality"
            />
            <WhyChooseCard 
              icon="👍" 
              title="Quality Assurance" 
              text="Rigorous quality checks at every stage of construction"
            />
            <WhyChooseCard 
              icon="🎯" 
              title="Client-Focused" 
              text="Transparent communication and personalized service"
            />
            <WhyChooseCard 
              icon="✔️" 
              title="Complete Solutions" 
              text="End-to-end services from planning to handover"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0f1c2e] mb-4">Our Process</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              A streamlined approach to ensure quality delivery at every stage
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#CA9817] to-transparent -translate-x-1/2"></div>
            
            <TimelineItem 
              number="01" 
              title="Consultation & Planning" 
              text="Understanding your requirements and creating detailed project plans" 
              side="left"
            />
            <TimelineItem 
              number="02" 
              title="Design & Approval" 
              text="Developing designs and securing necessary approvals and permits" 
              side="right"
            />
            <TimelineItem 
              number="03" 
              title="Execution" 
              text="On-site construction with quality materials and expert supervision" 
              side="left"
            />
            <TimelineItem 
              number="04" 
              title="Quality Check" 
              text="Rigorous inspections to ensure compliance with standards" 
              side="right"
            />
            <TimelineItem 
              number="05" 
              title="Project Handover" 
              text="Final delivery with complete documentation and client walkthrough" 
              side="left"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f1c2e] to-[#1f2f44] text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Contact us today for a free consultation and quote for your construction needs
          </p>
          <a 
            href="#" 
            className="inline-block bg-[#CA9817] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#805e08] hover:-translate-y-1 transition-all shadow-xl"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
}