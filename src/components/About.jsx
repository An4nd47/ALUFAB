import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Award, Users, Building2 } from "lucide-react";
import { fadeLeft, fadeRight, staggerContainer, fadeUp } from "../utils";
import { useCounter } from "../useCounter";

const stats = [
  { end: 5, suffix: "+", label: "Years Experience", icon: Award },
  { end: 200, suffix: "+", label: "Projects Completed", icon: Building2 },
  { end: 100, suffix: "+", label: "Happy Clients", icon: Users },
  { end: 50, suffix: "+", label: "Commercial Works", icon: Building2 },
];

const values = [
  "ISO-certified premium aluminium profiles",
  "In-house design and manufacturing",
  "Experienced & certified installers",
  "Serving India & GCC countries",
  "5-year product warranty",
  "24/7 after-sales support",
];

function StatCounter({ end, suffix, label }) {
  const { count, ref } = useCounter(end, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-primary font-display">
        {count}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-light relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-subtitle"
          >
            About Alufab
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-title"
          >
            Built on Trust,
            <br />
            <span className="text-primary">Crafted for Excellence</span>
          </motion.h2>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/5]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Alufab manufacturing facility"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-6 flat-card p-6 w-40 text-center z-10"
            >
              <div className="text-primary font-bold text-3xl font-display"> 5+</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Years of Precision</div>
            </motion.div>
            {/* Corner accent */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="section-subtitle">Our Story</span>
            <h3 className="font-display text-3xl md:text-4xl mb-6 leading-tight" style={{ color: 'var(--text)' }}>
              Kerala&apos;s Premier Aluminium &
              <span className="text-primary"> uPVC Specialists</span>
            </h3>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Founded over 5 years ago, Alufab has grown into one of Kerala&apos;s most trusted names
              in premium aluminium and uPVC fabrication. From humble beginnings, we have expanded
              our operations to serve clients across India and the UAE/GCC region.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Our state-of-the-art manufacturing facility, combined with experienced craftsmen and
              cutting-edge technology, allows us to deliver world-class products that meet international
              standards of quality, durability, and aesthetics.
            </p>

            {/* Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {values.map((v) => (
                <div key={v} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
                <h4 className="text-primary font-semibold mb-2 text-sm uppercase tracking-wider">Our Mission</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  To deliver precision-engineered aluminium and uPVC solutions that elevate architectural spaces.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-surface">
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{ color: 'var(--text)' }}>Our Vision</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  To be the most trusted fabrication company in South Asia and the Gulf region.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          {stats.map((s) => (
            <StatCounter key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
