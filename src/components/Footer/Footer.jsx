import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Camera, AtSign, Briefcase, Play, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products & Projects", href: "/products-projects" },
  { label: "Testimonials & Contact", href: "/testimonials-contact" },
];

const productLinks = [
  { label: "Aluminium Windows", href: "/products-projects#windows" },
  { label: "uPVC Windows", href: "/products-projects#windows" },
  { label: "Sliding Doors", href: "/products-projects#doors" },
  { label: "Glass Partitions", href: "/products-projects#partitions" },
  { label: "Kitchen Cabinets", href: "/products-projects#cabinets" },
  { label: "Curtain Walls", href: "/products-projects#structural" },
];

const socialLinks = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: AtSign, href: "#", label: "Twitter / X" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Play, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }} aria-label="Site footer">
      {/* CTA Banner */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                Ready to Start Your <span className="text-primary">Project?</span>
              </h2>
              <p style={{ color: 'var(--muted)' }}>Get a free quote from our experts today.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                to="/testimonials-contact"
                className="btn-primary"
              >
                Get Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-black text-xs">AF</span>
              </div>
              <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                Alu<span className="text-primary">fab</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Kerala&apos;s premier aluminium and uPVC fabrication company, serving clients
              across India and the GCC region with premium quality solutions since 2009.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                  style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text)' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-primary"
                    style={{ color: 'var(--muted)' }}
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text)' }}>
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group hover:text-primary"
                    style={{ color: 'var(--muted)' }}
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-200" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text)' }}>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--muted)' }}>
                  Industrial Area, Calicut (Kozhikode), Kerala 673001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm transition-colors hover:text-primary" style={{ color: 'var(--muted)' }}>
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <a href="mailto:info@alufab.in" className="text-sm transition-colors hover:text-primary" style={{ color: 'var(--muted)' }}>
                  info@alufab.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Alufab Industries. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--muted)' }}>Privacy Policy</a>
            <a href="#" className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--muted)' }}>Terms of Service</a>
            <a href="#" className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--muted)' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
