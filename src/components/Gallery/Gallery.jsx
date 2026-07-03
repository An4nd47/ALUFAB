import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { galleryItems, galleryCategories } from "../../data/projects";
import { staggerContainer, scaleIn } from "../../animations/variants";

function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="lightbox-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl max-h-[90vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.image.replace("w=600", "w=1200")}
            alt={item.title}
            className="rounded-xl max-h-[85vh] object-contain shadow-md"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent rounded-b-xl">
            <h3 className="text-white font-display text-xl font-semibold">{item.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/80 border border-white/10 
                       flex items-center justify-center text-white hover:text-primary transition-colors"
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryItem({ item }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="gallery-item">
        <motion.div
          variants={scaleIn}
          className="relative group rounded-xl overflow-hidden cursor-pointer shadow-sm
                     hover:shadow-md transition-shadow duration-200"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View ${item.title}`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <ZoomIn size={28} className="text-white" />
            <span className="text-white text-sm font-medium">{item.title}</span>
          </div>
        </motion.div>
      </div>

      {lightboxOpen && (
        <Lightbox item={item} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.tag === activeFilter);

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--background)' }} ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Craftsmanship in
            <span className="text-primary"> Every Frame</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            Explore our portfolio of completed works across various categories.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`filter-tab ${activeFilter === cat.id ? "active" : ""}`}
              role="tab"
              aria-selected={activeFilter === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="gallery-grid"
        >
          {filtered.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
