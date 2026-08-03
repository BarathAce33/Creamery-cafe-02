import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, QrCode, Share2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cafeInfo } from '../data/menuData';

export default function ReservationSection({ onTriggerReservationAutomation }) {
  const [reservationDate, setReservationDate] = useState('2026-08-05');
  const [reservationTime, setReservationTime] = useState('07:30 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingZone, setSeatingZone] = useState('lounge');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [confirmedPass, setConfirmedPass] = useState(null);
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

  const timeSlots = ['12:30 PM', '01:40 PM', '04:00 PM', '06:00 PM', '07:30 PM', '09:00 PM', '10:15 PM'];

  const seatingZones = [
    { id: 'lounge', name: 'Emerald Lounge', tag: 'Indoor AC • Ambient Light', icon: '🛋️' },
    { id: 'terrace', name: 'Garden Terrace', tag: 'Outdoor • Peelamedu View', icon: '🌿' },
    { id: 'vip', name: 'Gold VIP Booth', tag: 'Private • Leather Seating', icon: '👑' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const passData = {
      id: `CR-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name, phone,
      date: reservationDate,
      time: reservationTime,
      guests: guestsCount,
      zone: seatingZones.find(z => z.id === seatingZone)?.name || 'Lounge',
      occasion, note: specialNote,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConfirmedPass(passData);
    confetti({ particleCount: 40, spread: 60, colors: ['#E8B931', '#F5D060', '#34D399'] });
    if (onTriggerReservationAutomation) onTriggerReservationAutomation(passData);
  };

  const handleWhatsAppSharePass = () => {
    if (!confirmedPass) return;
    const msg = `🎉 *CREAMERY CAFÉ TABLE RESERVATION* 🎉\nPass: *${confirmedPass.id}*\nGuest: *${confirmedPass.name}*\nParty: *${confirmedPass.guests} Guests*\nDate: *${confirmedPass.date} at ${confirmedPass.time}*\nZone: *${confirmedPass.zone}*\nLocation: Peelamedu, Coimbatore\n_Status: CONFIRMED_`;
    window.open(`https://wa.me/${confirmedPass.phone.replace(/[^0-9]/g, '') || cafeInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="reservations" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}
      />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.4em] uppercase font-medium mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
            Reservations
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2 className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span style={{ color: 'var(--text-main)' }}>Reserve Your </span>
            <em className="text-gold-gradient font-normal">Table</em>
          </h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Skip the queue. Get your instant digital VIP pass.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 glass-gold rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-gold)' }}>Date</label>
                  <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} className="input-premium text-xs font-mono" />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-gold)' }}>
                    Guests ({guestsCount})
                  </label>
                  <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                    <input type="range" min="1" max="12" value={guestsCount} onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      className="w-full" style={{ accentColor: 'var(--text-gold)' }} />
                    <span className="font-mono text-sm font-bold min-w-[28px] text-center" style={{ color: 'var(--text-gold)' }}>{guestsCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-gold)' }}>Time Slot</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot} type="button" onClick={() => setReservationTime(slot)}
                      className="px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all"
                      style={{
                        background: reservationTime === slot ? 'var(--gold-gradient)' : 'var(--bg-primary)',
                        color: reservationTime === slot ? 'var(--bg-primary)' : 'var(--text-sub)',
                        border: reservationTime === slot ? 'none' : '1px solid var(--border-subtle)',
                        fontWeight: reservationTime === slot ? 700 : 500,
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider block mb-2" style={{ color: 'var(--text-gold)' }}>Seating Zone</label>
                <div className="grid grid-cols-3 gap-2">
                  {seatingZones.map((zone) => (
                    <div key={zone.id} onClick={() => setSeatingZone(zone.id)}
                      className="p-3 rounded-xl cursor-pointer transition-all text-center"
                      style={{
                        background: seatingZone === zone.id ? 'rgba(232,185,49,0.08)' : 'var(--bg-primary)',
                        border: `1px solid ${seatingZone === zone.id ? 'var(--border-gold-hover)' : 'var(--border-subtle)'}`,
                      }}
                    >
                      <div className="text-xl mb-1">{zone.icon}</div>
                      <h4 className="text-[11px] font-semibold" style={{ color: seatingZone === zone.id ? 'var(--text-gold)' : 'var(--text-main)' }}>{zone.name}</h4>
                      <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{zone.tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Your Name</label>
                  <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium text-xs" />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Mobile</label>
                  <input type="tel" required placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-premium text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Occasion</label>
                  <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="input-premium text-xs">
                    <option>Casual Dining</option>
                    <option>Birthday Party 🎉</option>
                    <option>Anniversary 💕</option>
                    <option>Business Meet 💼</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider block mb-1" style={{ color: 'var(--text-gold)' }}>Special Requests</label>
                  <input type="text" placeholder="Quiet corner, high chair..." value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} className="input-premium text-xs" />
                </div>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl btn-gold text-sm font-bold tracking-wide">
                Generate VIP Pass
              </button>
            </form>
          </div>

          {/* VIP Pass Preview */}
          <div className="lg:col-span-5">
            {confirmedPass ? (
              <div className="glass-gold rounded-2xl p-6 shadow-2xl animate-scale-in" style={{ border: '1px solid var(--border-gold-hover)' }}>
                <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: 'var(--border-gold)' }}>
                  <div className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-[#E8B931]" />
                    <div>
                      <h4 className="font-cinzel text-sm font-bold" style={{ color: 'var(--text-gold)' }}>CREAMERY VIP PASS</h4>
                      <p className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>CONFIRMED</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-primary)', color: 'var(--text-gold)', border: '1px solid var(--border-gold)' }}>
                    {confirmedPass.id}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    ['Guest', confirmedPass.name],
                    ['Party', `${confirmedPass.guests} Guests`],
                    ['Date & Time', `${confirmedPass.date} @ ${confirmedPass.time}`],
                    ['Zone', confirmedPass.zone],
                    ['Location', 'Peelamedu, Coimbatore'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
                      <span className="font-semibold" style={{ color: 'var(--text-main)' }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl flex flex-col items-center gap-2" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center">
                    <QrCode className="w-24 h-24 stroke-[1.5]" style={{ color: '#07130C' }} />
                  </div>
                  <p className="text-[9px] font-mono tracking-wider" style={{ color: 'var(--text-gold)' }}>SCAN AT RECEPTION</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={handleWhatsAppSharePass} className="flex-1 py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center justify-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> WhatsApp Pass
                  </button>
                  <button onClick={() => setConfirmedPass(null)} className="px-4 py-2.5 rounded-xl text-xs font-bold btn-outline">
                    New
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-gold)', color: 'var(--text-gold)' }}>
                  <QrCode className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-base font-semibold" style={{ color: 'var(--text-main)' }}>VIP Pass Preview</h4>
                <p className="text-xs mt-2 max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Fill in your details to generate an instant digital reservation pass with QR code for express entry.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
