import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp, FileText } from "lucide-react";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navigateToContact = () => navigate("/testimonials-contact");

  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20getting%20a%20quote%20from%20Alufab."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" fill="white" />
      </motion.a>

      {/* Quote button */}
      <motion.button
        onClick={navigateToContact}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="quote-float"
        aria-label="Get a free quote"
      >
        <FileText size={16} />
        <span className="hidden sm:inline">Free Quote</span>
      </motion.button>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
