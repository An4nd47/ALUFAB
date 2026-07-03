import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Pencil, Ruler, Settings, Wrench, RefreshCw,
  Shield, Building2, Home
} from "lucide-react";
import { services } from "../../data/services";
import { staggerContainer, fadeUp } from "../../animations/variants";

const iconMap = {
  Pencil, Ruler, Settings, Wrench, RefreshCw, Shield, Building2, Home,
};

function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || Settings;
  return (
    <motion.div
      variants={fadeUp}
      className="group p-7 rounded-xl border border-border bg-surface
                 hover:border-primary/30 hover:shadow-md transition-all duration-200
                 flex flex-col gap-4 cursor-default"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center
                      group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={24} className="text-primary" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300" style={{ color: 'var(--text)' }}>
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{service.description}</p>
      </div>
      <div className="w-0 h-0.5 bg-primary group-hover:w-12 transition-all duration-500 mt-auto" />
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--background)' }} ref={sectionRef}>

      <div className="container-custom relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="section-subtitle"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Complete Fabrication
              <br />
              <span className="text-primary">Services</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            From initial design consultation to final installation, Alufab provides
            a complete end-to-end service for all your aluminium and uPVC needs.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
