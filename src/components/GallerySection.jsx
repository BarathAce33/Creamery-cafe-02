import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const galleryImages = [
  { src: '/hero-bg.png', alt: 'Creamery Café Premium Interior', category: 'Ambiance' },
  { src: '/gallery-shake.png', alt: 'Artisan Lotus Biscoff Milkshake', category: 'Shakes' },
  { src: '/gallery-burger.png', alt: 'Gourmet BBQ Charcoal Burger', category: 'Food' },
  { src: '/gallery-momos.png', alt: 'Steamed Artisan Momos', category: 'Food' },
  { src: '/gallery-dessert.png', alt: 'Fresh Strawberry Cream Dessert', category: 'Desserts' },
  { src: '/gallery-interior.png', alt: 'Cozy Café Evening Ambiance', category: 'Ambiance' },
];

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir) => {
    if (lightbox === null) return;
    const newIndex = (lightbox + dir + galleryImages.length) % galleryImages.length;
    setLightbox(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}
      />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase font-medium mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
            Gallery
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2
            className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-main)' }}>A Glimpse of </span>
            <em className="text-gold-gradient font-normal">Creamery</em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => {
            // Varied heights for masonry effect
            const isLarge = i === 0 || i === 3;
            return (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className={`relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-700 ${
                  isLarge ? 'row-span-2' : ''
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{
                  transitionDelay: `${0.3 + i * 0.1}s`,
                  aspectRatio: isLarge ? '3/4' : '4/3',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(7,19,12,0.8) 0%, transparent 60%)' }}
                >
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium mb-1.5"
                      style={{ background: 'rgba(232,185,49,0.15)', color: 'var(--text-gold)' }}
                    >
                      <Camera className="w-3 h-3" />
                      {img.category}
                    </span>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-main)' }}>
                      {img.alt}
                    </p>
                  </div>
                </div>

                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ border: '1px solid var(--border-gold)' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(7,19,12,0.95)', backdropFilter: 'blur(30px)' }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full transition-colors"
            style={{ color: 'var(--text-sub)', border: '1px solid var(--border-subtle)' }}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 sm:left-8 p-3 rounded-full transition-colors"
            style={{ color: 'var(--text-gold)', border: '1px solid var(--border-gold)' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 sm:right-8 p-3 rounded-full transition-colors"
            style={{ color: 'var(--text-gold)', border: '1px solid var(--border-gold)' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-8 text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
              {galleryImages[lightbox].alt}
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {lightbox + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
