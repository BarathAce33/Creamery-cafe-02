import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EnquirySection() {
  const [topic, setTopic] = useState('Party Catering');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const topics = [
    { id: 'Party Catering', label: 'Party & Events', icon: '🎉' },
    { id: 'Bulk Shake Orders', label: 'Bulk Orders', icon: '🥤' },
    { id: 'Franchise Enquiry', label: 'Franchise', icon: '🏢' },
    { id: 'Customer Feedback', label: 'Feedback', icon: '💬' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }
    setSubmitted(true);
    confetti({ particleCount: 30, spread: 50, colors: ['#E8B931', '#F5D060', '#34D399'] });
  };

  return (
    <section id="enquiry" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}
      />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase font-medium mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
            Contact
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2 className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span style={{ color: 'var(--text-main)' }}>Get in </span>
            <em className="text-gold-gradient font-normal">Touch</em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Catering, bulk orders, franchise inquiries, or feedback — we'd love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-gold rounded-2xl p-8 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 animate-scale-in">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-gold)', color: 'var(--text-gold)' }}>
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-light" style={{ color: 'var(--text-gold)' }}>Enquiry Sent!</h3>
              <div className="max-w-md mx-auto mt-4 p-4 rounded-xl text-left" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
                  Hi <strong style={{ color: 'var(--text-main)' }}>{name}</strong>, thank you for reaching out regarding{' '}
                  <strong style={{ color: 'var(--text-gold)' }}>{topic}</strong>. Our store manager will contact you on{' '}
                  <strong style={{ color: 'var(--text-main)' }}>{phone}</strong> within 30 minutes.
                </p>
              </div>
              <button onClick={() => { setSubmitted(false); setName(''); setPhone(''); setEmail(''); setMessage(''); }}
                className="mt-6 px-6 py-2.5 rounded-full btn-gold text-xs font-bold">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-gold)' }}>Enquiry Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {topics.map((t) => (
                    <button key={t.id} type="button" onClick={() => setTopic(t.id)}
                      className="p-3 rounded-xl text-xs font-medium text-center transition-all"
                      style={{
                        background: topic === t.id ? 'rgba(232,185,49,0.08)' : 'var(--bg-primary)',
                        color: topic === t.id ? 'var(--text-gold)' : 'var(--text-sub)',
                        border: `1px solid ${topic === t.id ? 'var(--border-gold-hover)' : 'var(--border-subtle)'}`,
                        fontWeight: topic === t.id ? 700 : 500,
                      }}
                    >
                      <span className="block text-lg mb-1">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Name</label>
                  <input type="text" required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium text-xs" />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Phone</label>
                  <input type="tel" required placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-premium text-xs" />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Email (Optional)</label>
                  <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium text-xs" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Message</label>
                <textarea rows="3" placeholder="Tell us about your event, guest count, or feedback..."
                  value={message} onChange={(e) => setMessage(e.target.value)} className="input-premium text-xs resize-none" />
              </div>

              <button type="submit" className="w-full py-4 rounded-xl btn-gold text-sm font-bold tracking-wide flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
