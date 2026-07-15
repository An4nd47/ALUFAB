import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products-projects" },
  { label: "Contact", href: "/testimonials-contact" },
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
  { icon: FacebookIcon, href: "https://www.facebook.com/alufabenterprises", label: "Facebook" },
  { icon: InstagramIcon, href: "http://instagram.com/alufab.upvc/?hl=en", label: "Instagram" },
];

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (href) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  };
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
                to="/testimonials-contact#contact"
                className="btn-primary"
              >
                Get Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919946138681"
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
              <img src="/img/logo.webp" alt="Alufab Logo" className="w-10 h-10 object-contain" />
              <span className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>
                Alu<span className="text-primary">fab</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
              Kerala&apos;s premier uPVC fabrication company, serving clients
              across India and the GCC region with premium quality solutions since 2009.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                  style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  <Icon />
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
                    onClick={() => handleLinkClick(l.href)}
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
              <li>
                <a href="tel:+919946138681" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors hover:text-primary group" style={{ color: 'var(--muted)' }}>
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <span className="group-hover:text-primary">+91 99461 38681</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/919946138681" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors hover:text-primary group" style={{ color: 'var(--muted)' }}>
                  <MessageCircle size={14} className="text-primary flex-shrink-0" />
                  <span className="group-hover:text-primary">WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&to=alufabenterprises@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors hover:text-primary group" style={{ color: 'var(--muted)' }}>
                  <Mail size={14} className="text-primary flex-shrink-0" />
                  <span className="group-hover:text-primary">alufabenterprises@gmail.com</span>
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
