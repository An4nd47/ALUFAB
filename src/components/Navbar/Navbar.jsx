import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120 && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Read initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, mobileOpen]);

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

  const headerVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
    },
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Always blue background — transparent blue on hero top, solid on scroll/other pages
  const isHomePage = location.pathname === "/";
  const headerBgClass = scrolled || !isHomePage
    ? "py-3"
    : "py-5";

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={visible ? "visible" : "hidden"}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerBgClass}`}
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs tracking-tight">AF</span>
            </div>
            <span className="font-display font-bold text-xl text-white">
              Alu<span className="text-white/80">fab</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-white/90 hover:text-white`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-px bg-white transition-transform duration-200 origin-left ${
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
              className="p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/testimonials-contact"
              className="px-4 py-2 rounded-lg bg-white text-primary font-semibold text-xs tracking-wide hover:bg-white/90 transition-colors duration-200"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[99] lg:hidden flex flex-col overflow-hidden"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'var(--border)' }}>
              <span className="font-display font-bold text-xl text-white">
                Alu<span className="text-white/80">fab</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  className="p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
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
                    className="block py-3.5 border-b text-base font-medium text-white/90 hover:text-white transition-colors duration-200"
                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}
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
                className="block w-full text-center py-3 rounded-lg bg-white text-primary font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors duration-200"
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
