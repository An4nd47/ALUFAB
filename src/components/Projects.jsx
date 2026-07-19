import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { projects, projectCategories } from "../data/projects";
import { staggerContainer, fadeUp } from "../utils";

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-xl overflow-hidden group cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={project.title}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Always-visible info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="tag-chip mb-2 inline-block">{project.category}</span>
        <h3 className="font-display text-lg text-white font-bold">{project.title}</h3>
        <div className="flex items-center gap-3 mt-1 text-white/70 text-xs">
          <span className="flex items-center gap-1"><MapPin size={10} /> {project.location}</span>
        </div>
      </div>

      {/* Hover overlay with description */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-black/40 backdrop-blur-md border border-white/10"
          >
            <span className="tag-chip mb-4 bg-white/20 text-white backdrop-blur-sm border-white/30">{project.category}</span>
            <h3 className="font-display text-xl text-white font-bold mb-2">{project.title}</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">{project.description}</p>
            <div className="flex items-center gap-3 text-white/80 text-xs mb-6 font-medium">
              <span className="flex items-center gap-1"><MapPin size={10} /> {project.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--surface)' }} ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Featured Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Our Finest
            <span className="text-primary"> Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            A curated portfolio of residential, commercial, and luxury projects
            completed across Kerala.
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
          {projectCategories.map((cat) => (
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

        {/* Projects grid */}
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
