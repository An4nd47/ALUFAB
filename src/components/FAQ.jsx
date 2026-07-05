import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/faqs";
import { staggerContainer, fadeUp } from "../utils";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`accordion-item ${isOpen ? "border-primary/30" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-${faq.id}`}
      >
        <span
          className={`font-medium text-base transition-colors duration-300 ${isOpen ? "text-primary" : ""}`}
          style={{ color: isOpen ? undefined : "var(--text)" }}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-primary text-white" : "bg-accent/20"
          }`}
          style={{ color: isOpen ? "white" : "var(--muted)" }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm leading-relaxed border-t pt-4" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--background)' }} ref={sectionRef}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="section-subtitle"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title mb-6"
            >
              Common
              <br />
              <span className="text-primary">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--muted)" }}
            >
              Can&apos;t find your answer? Contact us and we&apos;ll get back to you within 24 hours.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline inline-flex"
            >
              Contact Us
            </motion.a>
          </div>

          {/* Right: FAQ list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
