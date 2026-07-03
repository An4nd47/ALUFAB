import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { fadeUp } from "../../animations/variants";

function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-primary fill-primary" : "text-primary/20"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const intervalRef = useRef(null);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current, isPaused]);

  // Visible cards: center + sides
  const visibleIndices = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--background)' }}
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            What Our Clients
            <span className="text-primary"> Say</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards */}
          <div className="hidden md:flex gap-6 items-center justify-center">
            {visibleIndices.map((idx, position) => {
              const t = testimonials[idx];
              const isCenter = position === 1;
              return (
                <motion.div
                  key={`${idx}-${position}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.5,
                    scale: isCenter ? 1 : 0.9,
                    y: isCenter ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`flat-card p-8 flex flex-col gap-5 transition-all duration-500
                    ${isCenter ? "w-[480px] flex-shrink-0" : "w-[320px] flex-shrink-0 hidden lg:flex"}`}
                  aria-hidden={!isCenter}
                >
                  <Quote size={32} className="text-primary/40" />
                  <p className="text-text/75 leading-relaxed text-sm italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-text font-semibold text-sm">{t.name}</div>
                      <div className="text-muted text-xs">{t.location}</div>
                      <StarRating rating={t.rating} />
                    </div>
                    <div className="ml-auto text-right">
                      <span className="tag-chip text-xs">{t.project}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="flat-card p-8"
              >
                <Quote size={32} className="text-primary/40 mb-4" />
                <p className="text-text/75 leading-relaxed text-sm italic mb-6">
                  &ldquo;{testimonials[current].review}&rdquo;
                </p>
                <div className="pt-4 border-t border-border flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <div className="text-text font-semibold text-sm">{testimonials[current].name}</div>
                    <div className="text-muted text-xs">{testimonials[current].location}</div>
                    <StarRating rating={testimonials[current].rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center
                         text-muted hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-200 rounded-lg ${i === current
                      ? "w-6 h-2 bg-primary"
                      : "bg-accent/30 hover:bg-accent/50 w-2 h-2"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center
                         text-muted hover:text-primary hover:border-primary transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
