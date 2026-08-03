import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, Instagram, ExternalLink, Car } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function GoogleMapSection() {
  const [userLocation, setUserLocation] = useState('Gandhipuram');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const distances = {
    'Gandhipuram': '12 mins (4.2 km)',
    'RS Puram': '18 mins (6.8 km)',
    'Saibaba Colony': '20 mins (7.5 km)',
    'Fun Republic Mall': '6 mins (1.8 km)',
    'TIDEL Park': '8 mins (2.5 km)',
  };

  return (
    <section id="location" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
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
            Find Us
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2 className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span style={{ color: 'var(--text-main)' }}>Visit </span>
            <em className="text-gold-gradient font-normal">Creamery</em>
            <span style={{ color: 'var(--text-main)' }}> Café</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl overflow-hidden min-h-[400px] relative">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d77.0120163!3d11.0149409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85763abc9bdaf%3A0x22b5c969078133e5!2sCREAMERY!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'saturate(0.8) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Creamery Café Location"
            />

            {/* Navigate CTA overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <a
                href={cafeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gold text-xs font-bold tracking-wide shadow-xl"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            {/* Address & Hours */}
            <div className="glass-gold rounded-2xl p-6 space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-primary)', color: 'var(--text-gold)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase" style={{ color: 'var(--text-gold)' }}>Address</h4>
                  <p className="text-sm font-medium mt-0.5 leading-snug" style={{ color: 'var(--text-main)' }}>
                    {cafeInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="p-2.5 rounded-xl" style={{ background: 'var(--bg-primary)', color: 'var(--text-gold)' }}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase" style={{ color: 'var(--text-gold)' }}>Hours</h4>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text-main)' }}>{cafeInfo.openingHours}</p>
                  <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    Open Now
                  </span>
                </div>
              </div>
            </div>

            {/* Distance Estimator */}
            <div className="glass-gold rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase" style={{ color: 'var(--text-gold)' }}>
                <Car className="w-4 h-4" />
                Drive Time Estimate
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(distances).map((loc) => (
                  <button key={loc} onClick={() => setUserLocation(loc)}
                    className="px-3 py-2 rounded-lg text-[10px] font-medium transition-all"
                    style={{
                      background: userLocation === loc ? 'var(--gold-gradient)' : 'var(--bg-primary)',
                      color: userLocation === loc ? 'var(--bg-primary)' : 'var(--text-sub)',
                      border: userLocation === loc ? 'none' : '1px solid var(--border-subtle)',
                      fontWeight: userLocation === loc ? 700 : 500,
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <span className="text-xs" style={{ color: 'var(--text-sub)' }}>From {userLocation}:</span>
                <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-gold)' }}>{distances[userLocation]}</span>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="glass-card p-4 rounded-xl flex items-center gap-3 text-xs font-medium transition-all"
                style={{ color: 'var(--text-sub)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-sub)'}
              >
                <Phone className="w-4 h-4" style={{ color: 'var(--text-gold)' }} />
                Call Café
              </a>
              <a href={cafeInfo.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="glass-card p-4 rounded-xl flex items-center gap-3 text-xs font-medium transition-all"
                style={{ color: 'var(--text-sub)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-sub)'}
              >
                <Instagram className="w-4 h-4" style={{ color: 'var(--text-gold)' }} />
                @creamery_cbe
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
