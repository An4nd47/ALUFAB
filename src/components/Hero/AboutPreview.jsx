import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Building2, Users, CheckCircle } from "lucide-react";
import { fadeLeft, fadeRight } from "../../animations/variants";

const highlights = [
  "ISO-certified premium aluminium profiles",
  "In-house design and manufacturing",
  "Serving India & GCC countries",
  "5-year product warranty",
];

export default function AboutPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about-preview"
      className="section-padding bg-light relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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

            {/* Floating stats badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-6 flat-card p-6 w-44 text-center z-10"
            >
              <div className="text-primary font-bold text-3xl font-display">15+</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Years of Precision</div>
              <div className="w-8 h-0.5 bg-primary mx-auto mt-2" />
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-14 h-14 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-14 h-14 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="section-subtitle">About Alufab</span>
            <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight" style={{ color: 'var(--text)' }}>
              Built on Trust,
              <br />
              <span className="text-primary">Crafted for Excellence</span>
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Founded over 15 years ago, Alufab has grown into one of Kerala&apos;s most trusted names
              in premium aluminium and uPVC fabrication. Our state-of-the-art facility and experienced
              craftsmen deliver world-class products meeting international standards.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((v) => (
                <div key={v} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mb-8 py-6 border-t border-b" style={{ borderColor: 'var(--border)' }}>
              {[
                { icon: Award, num: "15+", label: "Years" },
                { icon: Building2, num: "500+", label: "Projects" },
                { icon: Users, num: "200+", label: "Clients" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon size={20} className="text-primary mx-auto mb-1" />
                  <div className="font-bold text-xl" style={{ color: 'var(--text)' }}>{s.num}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/about" className="btn-primary" aria-label="Learn more about Alufab">
              Learn More About Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
