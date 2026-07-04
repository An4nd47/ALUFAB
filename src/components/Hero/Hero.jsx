import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroTextVariant } from "../../animations/variants";

// Particle canvas component
function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.05;
        // In dark mode use lighter particles, in light mode use dark
        this.color = isDark
          ? (Math.random() > 0.3 ? "200, 220, 240" : "79, 155, 199")
          : (Math.random() > 0.3 ? "0, 0, 0" : "79, 155, 199");
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
          this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: 80 }, () => new Particle());
    };

    const lineColor = isDark ? "200,220,240" : "0,0,0";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor},${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => { cancelAnimationFrame(animationId); };
  }, [isDark]);

  return <canvas ref={canvasRef} className="particles-canvas w-full h-full" />;
}

export default function Hero() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  // Observe <html> class changes so we re-render when theme switches
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image — no zoom/scale animation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80"
          alt="Luxury modern building with aluminium facade"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-gradient-left" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10">
        <ParticleCanvas isDark={isDark} />
      </div>

      {/* Floating stat cards — unchanged */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] z-10 hidden lg:block"
      >
        <div className="flat-card p-5 w-44">
          <div className="text-primary font-bold text-3xl mb-1">500+</div>
          <div className="text-muted text-xs">Projects Completed</div>
          <div className="w-8 h-0.5 bg-primary mt-2" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-1/3 right-[15%] z-10 hidden lg:block"
      >
        <div className="flat-card p-5 w-44">
          <div className="text-primary font-bold text-3xl mb-1">15+</div>
          <div className="text-muted text-xs">Years of Excellence</div>
          <div className="w-8 h-0.5 bg-primary mt-2" />
        </div>
      </motion.div>

        {/* New floating cards */}
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-[5%] z-10 hidden lg:block"
        >
          <div className="flat-card p-5 w-44">
            <div className="text-primary font-bold text-3xl mb-1">200+</div>
            <div className="text-muted text-xs">Happy Clients</div>
            <div className="w-8 h-0.5 bg-primary mt-2" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0.5, -0.5, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-1/4 left-[12%] z-10 hidden lg:block"
        >
          <div className="flat-card p-5 w-44">
            <div className="text-primary font-bold text-3xl mb-1">50+</div>
            <div className="text-muted text-xs">Commercial Works</div>
            <div className="w-8 h-0.5 bg-primary mt-2" />
          </div>
        </motion.div>

        {/* Light reflection sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute top-0 left-0 w-1/3 h-full z-10 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(113,188,225,0.06) 50%, transparent 60%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 container-custom pt-20  pb-16">
        {/*
          Content container:
          - Light mode: frosted-glass panel so text pops against the background image
          - Dark mode: fully transparent, elements render as-is on the dark gradient
        */}
        <div
          className="max-w-3xl mx-auto transition-all duration-500 shadow-xl rounded-2xl p-6 sm:p-8"
          style={{
            background: isDark ? "rgba(250, 249, 246, 0)" : "rgba(250, 249, 246, 0.55)",
            backdropFilter: isDark ? "blur(0px)" : "blur(16px)",
            WebkitBackdropFilter: isDark ? "blur(0px)" : "blur(16px)",
            border: isDark ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.35)",
            boxShadow: isDark ? "none" : "0 8px 40px rgba(0,0,0,0.10), 0 1.5px 0 rgba(255,255,255,0.6) inset",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroTextVariant}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-8 h-px bg-primary" />
            <span className="section-subtitle mb-0 text-xs">Premium Aluminium &amp; uPVC Fabrication</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-clip mb-3">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={heroTextVariant}
              className="font-display text-4xl sm:text-5xl md:text-[52px] leading-[1.08] font-bold"
              style={{ color: 'var(--text)' }}
            >
              Precision Crafted
              <br />
              <span className="text-primary">Aluminium</span> &amp;
              <br />
              uPVC Solutions
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroTextVariant}
            className="text-base leading-relaxed max-w-md mb-6"
            style={{ color: 'var(--muted)' }}
          >
            Premium windows, doors, cabinets and architectural fabrication
            designed for modern living and commercial excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroTextVariant}
            className="flex flex-wrap items-center gap-3"
          >
            <Link to="/products-projects">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                aria-label="Explore our products"
              >
                Explore Products
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link to="/testimonials-contact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
                aria-label="Get a free quote"
              >
                Get Free Quote
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
