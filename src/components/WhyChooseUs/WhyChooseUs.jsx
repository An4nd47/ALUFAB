import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star, Shield, Droplets, Zap, Wrench, Palette,
  DollarSign, Award, Cpu, Users
} from "lucide-react";
import { staggerContainer, fadeUp } from "../../animations/variants";

const features = [
  { icon: Star, title: "High Quality Materials", desc: "Premium-grade 6063 T5 aluminium alloys and certified uPVC profiles sourced from trusted suppliers." },
  { icon: Shield, title: "Weather Resistant", desc: "All products are engineered to withstand extreme temperatures, humidity, and harsh weather conditions." },
  { icon: Droplets, title: "Rust & Corrosion Free", desc: "Our aluminium is anodized or powder-coated for complete protection against rust and oxidation." },
  { icon: Zap, title: "Energy Efficient", desc: "Thermal break technology and double glazing options reduce energy consumption significantly." },
  { icon: Wrench, title: "Precision Installation", desc: "Factory-trained installation teams ensure perfect fitting with professional finishing every time." },
  { icon: Palette, title: "Custom Designs", desc: "Bespoke designs in 200+ colour options to match any architectural vision or interior theme." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality products at competitive pricing with flexible payment options available." },
  { icon: Award, title: "Warranty Support", desc: "5-year product warranty with dedicated after-sales support and maintenance contracts." },
  { icon: Cpu, title: "Modern Equipment", desc: "State-of-the-art CNC and automated manufacturing equipment for precision at scale." },
  { icon: Users, title: "Experienced Team", desc: "Over 15 years of expertise with a skilled team of engineers, designers and craftsmen." },
];

function FeatureCard({ feature, index }) {
  const { icon: Icon, title, desc } = feature;
  return (
    <motion.div
      variants={fadeUp}
      className="feature-card group animate-fade-in"
      aria-label={title}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4
                      group-hover:bg-primary/20 transition-colors duration-200">
        <Icon size={22} className="text-primary" />
      </div>
      <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--text)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="why-choose-us" className="section-padding relative overflow-hidden" style={{ background: 'var(--background)' }} ref={sectionRef}>
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[600px] rounded-full 
                        bg-primary/5 blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            The Alufab
            <span className="text-primary"> Advantage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            We don&apos;t just fabricate — we engineer experiences that last decades.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
