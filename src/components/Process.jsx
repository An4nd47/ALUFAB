import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare, Ruler, Pencil, Settings, Wrench, CheckCircle
} from "lucide-react";
import { fadeUp, staggerContainer } from "../utils";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Consultation",
    desc: "We begin with a detailed discussion to understand your requirements, budget, and design preferences.",
  },
  {
    step: "02",
    icon: Ruler,
    title: "Site Measurement",
    desc: "Our technicians visit your site for precise measurements and structural assessment.",
  },
  {
    step: "03",
    icon: Pencil,
    title: "Design & Planning",
    desc: "Our designers create detailed drawings and 3D visualizations for your approval.",
  },
  {
    step: "04",
    icon: Settings,
    title: "Manufacturing",
    desc: "Precision manufacturing using premium profiles and hardware in our state-of-the-art facility.",
  },
  {
    step: "05",
    icon: Wrench,
    title: "Installation",
    desc: "Our expert installation team ensures flawless fitting with proper sealing and finishing.",
  },
  {
    step: "06",
    icon: CheckCircle,
    title: "Completion & Handover",
    desc: "Final quality inspection, cleaning, and handover with complete warranty documentation.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="process" className="section-padding relative overflow-hidden" style={{ background: 'var(--background)' }} ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            From Concept to
            <span className="text-primary"> Completion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            Our streamlined 6-step process ensures a seamless experience
            from first contact to final handover.
          </motion.p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-7 left-[calc(100%/12)] right-[calc(100%/12)] h-0.5 
                          bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full bg-primary origin-left"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-6 gap-4"
          >
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.step} variants={fadeUp} className="flex flex-col items-center text-center">
                  {/* Dot */}
                  <div className="relative mb-6 z-10">
                    <div className="process-dot">
                      <Icon size={20} />
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                  </div>
                  <span className="text-primary/60 text-xs font-bold mb-1">{s.step}</span>
                  <h3 className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-primary/20">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-primary origin-top"
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-10 pl-20">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-[52px] top-0 process-dot w-10 h-10 text-sm">
                    <Icon size={16} />
                  </div>
                  <span className="text-primary/60 text-xs font-bold block mb-1">{s.step}</span>
                  <h3 className="font-display font-semibold mb-1" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
