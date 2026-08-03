import React, { useEffect, useRef, useState } from 'react';
import { Star, Users, Clock, Award, Heart } from 'lucide-react';

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient">
      {prefix}{typeof end === 'number' && end % 1 !== 0 ? count.toFixed(1) : count}{suffix}
    </span>
  );
}

export default function StorySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Star, value: 4.9, suffix: '', label: 'Google Rating', prefix: '' },
    { icon: Users, value: 1250, suffix: '+', label: 'Happy Reviews', prefix: '' },
    { icon: Heart, value: 2167, suffix: '+', label: 'Instagram Family', prefix: '' },
    { icon: Clock, value: 365, suffix: '', label: 'Days Open', prefix: '' },
  ];

  return (
    <section id="story" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}
      />

      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Label */}
        <div className="text-center mb-16">
          <span
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase font-medium mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
            Our Story
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2
            className={`font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-tight transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-main)' }}>Handcrafted with </span>
            <em className="text-gold-gradient font-normal">Passion</em>
            <br />
            <span style={{ color: 'var(--text-main)' }}>in the Heart of </span>
            <em className="text-gold-gradient font-normal">Coimbatore</em>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Story Image */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <img
                src="/hero-bg.png"
                alt="Creamery Café Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(7,19,12,0.6) 0%, transparent 50%)' }}
              />
              {/* Gold border accent */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ border: '1px solid var(--border-gold)' }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 glass-gold rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 fill-current" style={{ color: 'var(--text-gold)' }} />
                <span className="font-mono text-lg font-bold" style={{ color: 'var(--text-gold)' }}>4.9</span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-sub)' }}>
                Google Rating
              </p>
            </div>
          </div>

          {/* Story Text */}
          <div
            className={`space-y-6 transition-all duration-700 delay-500 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <p className="font-cormorant text-xl sm:text-2xl leading-relaxed italic" style={{ color: 'var(--text-sub)' }}>
              "Every shake we craft is a love letter to flavor — a tribute to the art of slow craftsmanship 
              in a fast-paced world."
            </p>

            <div className="w-12 h-px" style={{ background: 'var(--text-gold)' }} />

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              Born from a simple dream of creating the perfect milkshake, Creamery Café emerged in 
              the vibrant neighborhood of Peelamedu, Coimbatore. What started as a small artisanal 
              shake counter has blossomed into a beloved culinary destination.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              Our signature Lotus Biscoff thickshakes, hand-churned fresh fruit creams, charcoal-grilled 
              gourmet burgers, and delicate steamed momos have earned us the title of 
              <strong style={{ color: 'var(--text-gold)' }}> "The Gold Standard in Milkshakes"</strong> — 
              a promise we renew with every creation that leaves our kitchen.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              We source the finest Belgian speculoos, Ratnagiri Alphonso mangoes, and Mahabaleshwar 
              strawberries. Every ingredient tells a story, every dish is a masterpiece.
            </p>

            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 mt-4 btn-outline px-6 py-3 rounded-full text-sm"
            >
              <span>Discover Our Menu</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`text-center glass-card rounded-2xl p-6 sm:p-8 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
              >
                <Icon className="w-5 h-5 mx-auto mb-3" style={{ color: 'var(--text-gold)' }} />
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={stat.value > 100 ? 2500 : 2000}
                />
                <p className="mt-2 text-[11px] tracking-wider uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
