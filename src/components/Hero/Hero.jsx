import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroTextVariant, fadeUp } from "../../animations/variants";

// Particle canvas component
function ParticleCanvas() {
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
        this.color = Math.random() > 0.3 ? "0, 0, 0" : "79, 155, 199";
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,0,0,${0.05 * (1 - dist / 120)})`;
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
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas w-full h-full" />;
}

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image with zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80"
            alt="Luxury modern building with aluminium facade"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-gradient-left" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-10">
        <ParticleCanvas />
      </div>

      {/* Floating glass elements */}
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

      {/* Light reflection effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute top-0 left-0 w-1/3 h-full z-10 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(113,188,225,0.06) 50%, transparent 60%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 container-custom pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroTextVariant}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-primary" />
            <span className="section-subtitle mb-0">Premium Aluminium & uPVC Fabrication</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-clip mb-6">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={heroTextVariant}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[1.05] 
                         font-bold"
              style={{ color: 'var(--text)' }}
            >
              Precision Crafted
              <br />
              <span className="text-primary">Aluminium</span> &
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
            className="text-lg md:text-xl leading-relaxed max-w-xl mb-10"
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
            className="flex flex-wrap items-center gap-4"
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

          {/* Stats row */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={heroTextVariant}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-black/10"
          >
            {[
              { num: "15+", label: "Years Experience" },
              { num: "500+", label: "Projects Done" },
              { num: "200+", label: "Happy Clients" },
              { num: "50+", label: "Commercial Works" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-primary font-bold text-2xl">{s.num}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-black/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
