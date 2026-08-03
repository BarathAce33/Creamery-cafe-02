import React from 'react';
import { MapPin, Phone, Instagram, Heart, ArrowUp, Star, Clock, MessageCircle } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Top gold divider */}
      <div className="section-divider" />

      {/* Newsletter / CTA Band */}
      <div className="relative py-16 text-center px-5">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,185,49,0.05) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-light mb-3" style={{ color: 'var(--text-main)' }}>
            Stay <em className="text-gold-gradient font-normal">Connected</em>
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Follow us on Instagram for new menu drops, seasonal specials, and café vibes.
          </p>
          <a
            href={cafeInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-gold text-sm font-bold"
          >
            <Instagram className="w-4 h-4" />
            Follow @creamery_cbe
          </a>
        </div>
      </div>

      <div className="section-divider" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid var(--text-gold)' }}>
                <img src="/logo.jpg" alt="Creamery Café" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-gold-gradient">CREAMERY CAFÉ</h3>
                <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  The Classic Café • Peelamedu
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-sub)' }}>
              Coimbatore's gold standard in artisanal milkshakes, fresh fruit creams, gourmet charcoal burgers, 
              and steamed momos. Crafted with passion, served with perfection.
            </p>

            <div className="flex items-center gap-3">
              <a href={cafeInfo.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl transition-all"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', color: 'var(--text-gold)' }}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2.5 rounded-xl transition-all"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', color: 'var(--text-gold)' }}>
                <Phone className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${cafeInfo.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-xl transition-all"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', color: 'var(--text-gold)' }}>
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-gold)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', href: '#story' },
                { label: 'Menu & Shakes', href: '#menu' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Table Reservations', href: '#reservations' },
                { label: 'Find Us', href: '#location' },
                { label: 'Contact & Catering', href: '#enquiry' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-xs transition-colors duration-300"
                    style={{ color: 'var(--text-sub)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-sub)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-gold)' }}>
              Visit Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--text-gold)' }} />
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
                  124, Ram Lakshman Nagar, Peelamedu,<br />
                  Coimbatore, Tamil Nadu 641004
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-gold)' }} />
                <p className="text-xs" style={{ color: 'var(--text-sub)' }}>
                  Open Daily: 11:00 AM – 11:30 PM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current flex-shrink-0" style={{ color: 'var(--text-gold)' }} />
                <p className="text-xs" style={{ color: 'var(--text-sub)' }}>
                  4.9★ Rating · 1,250+ Reviews
                </p>
              </div>
            </div>

            <a href={cafeInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium btn-outline px-4 py-2 rounded-full">
              <MapPin className="w-3 h-3" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Creamery Café, Coimbatore. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            Handcrafted with <Heart className="w-3 h-3 inline fill-current" style={{ color: '#EF4444' }} /> in Peelamedu
          </p>
          <button onClick={scrollToTop}
            className="p-2 rounded-full transition-all"
            style={{ border: '1px solid var(--border-gold)', color: 'var(--text-gold)' }}>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
