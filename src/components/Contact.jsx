import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { fadeLeft, fadeRight } from "../utils";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["Malapallipuram, near Chenthuruthi Bridge Road", "Poyya, Mala, Kerala 680732, India"],
    href: "https://www.google.com/maps/search/?api=1&query=Alufab+uPVC+Windows+%26+Doors,+Malapallipuram,+near+Chenthuruthi+Bridge,+Road,+Poyya,+Mala,+Kerala+680732,+India"
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    lines: ["+91 99461 38681"],
    href: "tel:+919946138681"
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["alufabenterprises@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: By Appointment Only"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", projectType: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/alufabenterprises@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "New Project Inquiry - Alufab",
          Name: formData.name,
          "Phone / WhatsApp": formData.phone,
          "Email Address": formData.email || "Not provided",
          "Project Type": formData.projectType,
          "Message / Details": formData.message || "No message details provided"
        })
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send message. Please try again or contact us directly.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-light relative overflow-hidden" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full 
                      bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-subtitle"
          >
            Contact Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Let&apos;s Start Your
            <span className="text-primary"> Project</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-desc mx-auto text-center"
          >
            Get a free consultation and quote from our team within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <Send size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl" style={{ color: "var(--text)" }}>Message Sent!</h3>
                <p className="text-center leading-relaxed" style={{ color: "var(--muted)" }}>
                  Thank you for reaching out. Our team will contact you within 24 hours with a free quote.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline mt-4"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-8 space-y-5"
                noValidate
              >
                <h3 className="font-display text-xl mb-2" style={{ color: "var(--text)" }}>Get a Free Quote</h3>
                <div className="w-12 h-0.5 bg-primary mb-6" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Phone / WhatsApp *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9946138681"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourmail@gmail.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="form-label">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select project type</option>
                    <option>Residential – Windows & Doors</option>
                    <option>Commercial – Office Partitions</option>
                    <option>Kitchen Cabinets & Wardrobes</option>
                    <option>Curtain Wall System</option>
                    <option>uPVC Windows & Doors</option>
                    <option>Structural Fabrication</option>
                    <option>Other / Custom Project</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">Message / Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project requirements, dimensions, location, etc."
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: Info + Map */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Contact info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map(({ icon: Icon, title, lines, href }) => (
                <div key={title} className="glass-card p-5 group hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 
                                  group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h4 className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>{title}</h4>
                  {lines.map((l) => (
                    href ? (
                      <a key={l} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} className="text-sm block hover:text-primary transition-colors" style={{ color: "var(--text)" }}>{l}</a>
                    ) : (
                      <p key={l} className="text-sm block" style={{ color: "var(--text)" }}>{l}</p>
                    )
                  ))}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="flex-1 min-h-[240px] rounded-xl overflow-hidden relative group" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
              <iframe
                title="Alufab Location Map"
                src="https://maps.google.com/maps?q=Alufab%20uPVC%20Windows%20%26%20Doors,%20Malapallipuram,%20near%20Chenthuruthi%20Bridge,%20Road,%20Poyya,%20Mala,%20Kerala%20680732,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Alufab+uPVC+Windows+%26+Doors,+Malapallipuram,+near+Chenthuruthi+Bridge,+Road,+Poyya,+Mala,+Kerala+680732,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-primary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                  <MapPin size={20} />
                  Open in Google Maps
                </div>
              </a>
            </div>

            {/* CTA Banner */}
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-1" style={{ color: "var(--text)" }}>WhatsApp us directly</h4>
                <p className="text-sm" style={{ color: "var(--muted)" }}>Get a quick response on WhatsApp</p>
              </div>
              <a
                href="https://wa.me/919946138681?text=Hi%2C%20I%20am%20interested%20in%20getting%20a%20quote%20from%20Alufab."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold text-sm
                           hover:bg-[#20BD5C] transition-colors duration-200"
              >
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
