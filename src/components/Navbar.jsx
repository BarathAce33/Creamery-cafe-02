import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, MapPin, Sparkles, PhoneCall, Menu as MenuIcon, X, Instagram } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'story', label: 'Our Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservations', label: 'Reserve' },
    { id: 'location', label: 'Find Us' },
    { id: 'enquiry', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 shadow-2xl'
            : 'py-5'
        }`}
        style={{
          background: scrolled
            ? 'rgba(7, 19, 12, 0.92)'
            : 'rgba(7, 19, 12, 0.4)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderBottom: scrolled ? '1px solid rgba(232,185,49,0.1)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E8B931] to-[#D4A428] rounded-full blur-sm opacity-40 group-hover:opacity-70 transition duration-500" />
              <img
                src="/logo.jpg"
                alt="Creamery Café"
                className="relative w-full h-full rounded-full border border-[#E8B931]/60 object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-cinzel text-lg font-bold tracking-wider text-gold-gradient block leading-tight">
                CREAMERY
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-medium block" style={{ color: 'var(--text-muted)' }}>
                The Classic Café
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 group"
                style={{ color: 'var(--text-sub)' }}
              >
                <span className="relative z-10 group-hover:text-[#E8B931] transition-colors duration-300">
                  {link.label}
                </span>
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#E8B931] group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/creamery_cbe"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-medium transition-all duration-300"
              style={{ color: 'var(--text-sub)', border: '1px solid var(--border-subtle)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-gold)';
                e.currentTarget.style.color = 'var(--text-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-sub)';
              }}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@creamery_cbe</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full btn-gold text-[12px] font-bold tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#07130C] animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ color: 'var(--text-gold)' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center animate-fade-in"
          style={{ background: 'rgba(7, 19, 12, 0.97)', backdropFilter: 'blur(30px)' }}
        >
          <nav className="flex flex-col items-center gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-serif font-light tracking-wider py-3 px-8 transition-colors duration-300 animate-fade-in-up"
                style={{
                  color: 'var(--text-sub)',
                  animationDelay: `${i * 0.08}s`,
                  animationFillMode: 'both',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-sub)'}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile social links */}
          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://www.instagram.com/creamery_cbe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full"
              style={{ border: '1px solid var(--border-gold)', color: 'var(--text-gold)' }}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="tel:+919842298765"
              className="p-3 rounded-full"
              style={{ border: '1px solid var(--border-gold)', color: 'var(--text-gold)' }}
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>

          <p className="mt-6 text-[11px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
            Peelamedu, Coimbatore
          </p>
        </div>
      )}
    </>
  );
}
