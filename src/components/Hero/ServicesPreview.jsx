import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Pencil, Ruler, Settings, Wrench } from "lucide-react";
import { staggerContainer, fadeUp } from "../../animations/variants";

const featuredServices = [
  {
    icon: Pencil,
    title: "Design Consultation",
    description: "Expert architectural design consultation tailored to your vision, space, and budget.",
  },
  {
    icon: Ruler,
    title: "Site Measurement",
    description: "Precise on-site measurement by experienced technicians to ensure perfect fit.",
  },
  {
    icon: Settings,
    title: "Custom Manufacturing",
    description: "In-house precision manufacturing using premium aluminium and uPVC profiles.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Skilled installation teams ensuring flawless fitting with professional finishing.",
  },
];

function ServicePreviewCard({ service }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={fadeUp}
      className="group p-6 rounded-xl border border-white/15 bg-white/8
                 hover:border-white/30 hover:bg-white/15 transition-all duration-200
                 flex flex-col gap-4 cursor-default"
    >
      <div
        className="w-12 h-12 rounded-lg bg-white/15 flex items-center justify-center
                    group-hover:bg-white/25 transition-colors duration-200"
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <h3
          className="font-display text-base text-white font-semibold mb-1.5"
        >
          {service.title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
      </div>
      <div className="w-0 h-px bg-white/60 group-hover:w-10 transition-all duration-300 mt-auto" />
    </motion.div>
  );
}

export default function ServicesPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services-preview"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 60%, var(--primary) 100%)" }}
      ref={sectionRef}
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="section-subtitle !text-white/80"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title text-white"
            >
              Our Expert
              <br />
              <span className="text-secondary">Services</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed"
          >
            From initial design consultation to final installation, Alufab provides
            a complete end-to-end service for all your aluminium and uPVC needs.
          </motion.p>
        </div>

        {/* Service cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {featuredServices.map((service) => (
            <ServicePreviewCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-200 hover:border-white hover:bg-white hover:text-primary"
            aria-label="Explore all services"
          >
            Explore All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
