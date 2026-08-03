import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Shankar',
    location: 'RS Puram, Coimbatore',
    rating: 5,
    text: 'The Lotus Biscoff shake is absolutely divine! The richest, most decadent milkshake I have ever had. The ambiance is premium and cozy. A must-visit!',
    avatar: '🧑‍🦱',
    date: '2 weeks ago',
  },
  {
    name: 'Arun Vijay',
    location: 'Gandhipuram',
    rating: 5,
    text: 'Best milkshakes in Coimbatore, hands down. The Chocolate Hazelnut Fudge is unreal. Staff is super friendly, and the café has a really premium feel to it.',
    avatar: '👨',
    date: '1 month ago',
  },
  {
    name: 'Sneha Reddy',
    location: 'Peelamedu',
    rating: 5,
    text: 'We celebrated my birthday here and it was magical! The VIP booth, the Ferrero Rocher shake, and those momos — everything was perfect. Thank you Creamery! ❤️',
    avatar: '👩',
    date: '3 weeks ago',
  },
  {
    name: 'Karthik Raman',
    location: 'Saibaba Colony',
    rating: 5,
    text: 'Came for the shakes, stayed for the burgers. The BBQ Chicken Burger is insanely good. This is what a café should feel like — warm, inviting, and premium.',
    avatar: '🧔',
    date: '1 week ago',
  },
  {
    name: 'Divya Prakash',
    location: 'Tidel Park Area',
    rating: 5,
    text: 'The Royal Sitaphal Cream Shake is my absolute favorite. So fresh, so creamy! The whole café feels like a luxury experience. Highly recommend!',
    avatar: '👩‍🦰',
    date: '2 months ago',
  },
  {
    name: 'Mohammed Irfan',
    location: 'Fun Republic Mall',
    rating: 5,
    text: 'Best place near Peelamedu for hangouts. The tender coconut shake is super refreshing and the paneer momos are to die for. Coming back every week!',
    avatar: '🧑',
    date: '5 days ago',
  },
  {
    name: 'Lakshmi Narayanan',
    location: 'Race Course',
    rating: 5,
    text: 'Ordered through WhatsApp and it was seamless. The quality and presentation of food is top-notch. Creamery is setting a gold standard indeed!',
    avatar: '👨‍🦳',
    date: '3 days ago',
  },
  {
    name: 'Anitha Krishnan',
    location: 'Singanallur',
    rating: 4,
    text: 'Beautiful café with amazing food. The strawberry cream pot was fresh and delicious. Would love if they opened a branch closer to Singanallur!',
    avatar: '👩‍🦱',
    date: '1 month ago',
  },
];

function TestimonialCard({ item }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] sm:w-[380px] glass-card rounded-2xl p-6 relative group"
      style={{ border: '1px solid var(--border-subtle)' }}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: 'var(--text-gold)' }} />

      {/* Review Text */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-sub)' }}>
        "{item.text}"
      </p>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-current' : 'opacity-20'}`}
            style={{ color: i < item.rating ? 'var(--text-gold)' : 'var(--text-muted)' }}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-gold)' }}
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{item.name}</p>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {item.location} · {item.date}
          </p>
        </div>
      </div>

      {/* Hover gold glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 40px rgba(232,185,49,0.05)' }}
      />
    </div>
  );
}

export default function TestimonialsSection() {
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

  // Double the array for infinite scroll
  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-5 mb-14">
          <span
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase font-medium mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
            Testimonials
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2
            className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-main)' }}>What Our </span>
            <em className="text-gold-gradient font-normal">Guests</em>
            <span style={{ color: 'var(--text-main)' }}> Say</span>
          </h2>

          <p
            className={`mt-4 text-sm leading-relaxed transition-all duration-700 delay-300 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            Over 1,250+ glowing reviews from food lovers across Coimbatore
          </p>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
          />

          <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
            {doubled.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://www.google.com/maps/place/CREAMERY/@11.0149409,77.0094414,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full btn-outline text-[12px] font-medium tracking-wide"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>View All Reviews on Google</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
