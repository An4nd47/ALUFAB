import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import { staggerContainer, fadeUp } from "../../animations/variants";

const categories = [
  { id: "all", label: "All Products" },
  { id: "windows", label: "Windows" },
  { id: "doors", label: "Doors" },
  { id: "partitions", label: "Partitions" },
  { id: "cabinets", label: "Cabinets" },
  { id: "glass", label: "Glass Works" },
  { id: "structural", label: "Structural" },
];

function ProductCard({ product }) {
  return (
    <motion.div
      variants={fadeUp}
      className="product-card group hover:-translate-y-1 transition-all duration-200"
      aria-label={product.title}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Category tag */}
        <span className="absolute top-4 left-4 tag-chip">{product.category}</span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--text)' }}>
          {product.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {product.description}
        </p>
        <button className="btn-ghost text-sm p-0">
          Learn More <ArrowRight size={14} />
        </button>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}

export default function Products() {
  const location = useLocation();
  const hashFilter = location.hash ? location.hash.replace("#", "") : null;
  const initialFilter = categories.some((c) => c.id === hashFilter) ? hashFilter : "all";
  
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const currentHash = location.hash ? location.hash.replace("#", "") : null;
    if (categories.some((c) => c.id === currentHash)) {
      setActiveFilter(currentHash);
    } else if (!location.hash) {
      setActiveFilter("all");
    }
  }, [location.hash]);

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.tag === activeFilter);

  return (
    <section id="products" className="section-padding" style={{ background: 'var(--background)' }} ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Engineered for
            <span className="text-primary"> Perfection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            From elegant windows to architectural curtain walls, every product is precision-made
            to international standards.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Product filter"
        >
          {categories.map((cat) => (
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

        {/* Product Grid */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
