import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products & Projects", href: "/products-projects" },
  { label: "Testimonials & Contact", href: "/testimonials-contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Read initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "navbar-glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs tracking-tight">AF</span>
            </div>
            <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
              Alu<span className="text-primary">fab</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-primary" : "hover:text-primary"
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--muted)' })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-px bg-primary transition-transform duration-200 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-accent/10"
              style={{ color: 'var(--muted)' }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/testimonials-contact"
              className="btn-primary text-xs"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-accent/10"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] lg:hidden flex flex-col"
            style={{ background: 'var(--surface)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'var(--border)' }}>
              <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                Alu<span className="text-primary">fab</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors hover:bg-accent/10"
                  style={{ color: 'var(--muted)' }}
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  className="p-2 rounded-lg transition-colors hover:bg-accent/10"
                  style={{ color: 'var(--muted)' }}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-3.5 border-b text-base font-medium transition-colors duration-200 ${
                        isActive ? "text-primary" : "hover:text-primary"
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--primary)' : 'var(--text)',
                      borderColor: 'var(--border)'
                    })}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <Link
                to="/testimonials-contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
