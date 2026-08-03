import React, { useState, useRef, useEffect, useCallback } from 'react';
import { menuCategories, menuItems } from '../data/menuData';
import { Search, Star, Plus, Check, X, Sparkles, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

/* ─── 3D Tilt Card Hook ─── */
function useTilt() {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -8;
    const tiltY = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.setProperty('--mouse-x', `${x * 100}%`);
    el.style.setProperty('--mouse-y', `${y * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

/* ─── Menu Item Card ─── */
function MenuCard({ item, onCustomize }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-200 ease-out group"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Tilt shine overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(232,185,49,0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)' }}
        />

        {/* Diet Badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase"
          style={{
            background: 'rgba(7,19,12,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: item.isVeg ? '#10B981' : '#EF4444' }}
          />
          {item.isVeg ? 'Veg' : 'Non-Veg'}
        </div>

        {/* Bestseller Badge */}
        {item.isBestseller && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
            style={{ background: 'var(--gold-gradient)', color: 'var(--bg-primary)' }}
          >
            <Star className="w-3 h-3 fill-current" />
            Bestseller
          </div>
        )}

        {/* Rating */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-mono font-bold"
          style={{
            background: 'rgba(7,19,12,0.8)',
            backdropFilter: 'blur(8px)',
            color: 'var(--text-gold)',
          }}
        >
          <Star className="w-3 h-3 fill-current" />
          {item.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--text-gold)' }}>
          {item.tagline}
        </span>
        <h3
          className="font-serif text-base font-semibold leading-snug group-hover:text-gold-gradient transition-colors duration-300"
          style={{ color: 'var(--text-main)' }}
        >
          {item.name}
        </h3>
        <p className="text-xs mt-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {item.description}
        </p>

        {/* Price & Add */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Price</span>
            <span className="text-xl font-bold font-mono" style={{ color: 'var(--text-gold)' }}>₹{item.price}</span>
          </div>
          <button
            onClick={() => onCustomize(item)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl btn-gold text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Menu Section ─── */
export default function MenuSection({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietFilter === 'all' ||
                        (dietFilter === 'veg' && item.isVeg) ||
                        (dietFilter === 'non-veg' && !item.isVeg);
    return matchesCategory && matchesSearch && matchesDiet;
  });

  const openCustomization = (item) => {
    setCustomizingItem(item);
    setSelectedAddons([]);
    setItemQuantity(1);
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    onAddToCart(customizingItem, itemQuantity, selectedAddons);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#E8B931', '#F5D060', '#34D399'],
    });
    setCustomizingItem(null);
  };

  return (
    <section id="menu" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
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
            Our Menu
            <span className="w-8 h-px" style={{ background: 'var(--text-gold)' }} />
          </span>

          <h2
            className={`font-serif text-3xl sm:text-5xl font-light leading-tight transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span style={{ color: 'var(--text-main)' }}>Signature </span>
            <em className="text-gold-gradient font-normal">Creations</em>
          </h2>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="glass-gold rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search shakes, burgers, momos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-10 text-xs"
            />
          </div>

          {/* Diet Filter */}
          <div className="flex items-center gap-2 ml-auto">
            {['all', 'veg', 'non-veg'].map((filter) => (
              <button
                key={filter}
                onClick={() => setDietFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 ${
                  dietFilter === filter
                    ? 'text-xs font-bold'
                    : ''
                }`}
                style={{
                  background: dietFilter === filter
                    ? filter === 'veg' ? '#10B981' : filter === 'non-veg' ? '#EF4444' : 'var(--gold-gradient)'
                    : 'transparent',
                  color: dietFilter === filter ? (filter === 'all' ? 'var(--bg-primary)' : '#fff') : 'var(--text-muted)',
                  border: dietFilter === filter ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                {filter === 'all' ? 'All' : filter === 'veg' ? '● Veg' : '● Non-Veg'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedCategory === cat.id ? 'font-bold' : ''
              }`}
              style={{
                background: selectedCategory === cat.id ? 'var(--gold-gradient)' : 'transparent',
                color: selectedCategory === cat.id ? 'var(--bg-primary)' : 'var(--text-sub)',
                border: selectedCategory === cat.id ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl">
            <p className="text-lg" style={{ color: 'var(--text-sub)' }}>No items found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setDietFilter('all'); }}
              className="mt-4 px-6 py-2 rounded-full btn-gold text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                className={`transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              >
                <MenuCard item={item} onCustomize={openCustomization} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(7,19,12,0.9)', backdropFilter: 'blur(20px)' }}
          onClick={() => setCustomizingItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-6 animate-scale-in"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors"
              style={{ color: 'var(--text-sub)', border: '1px solid var(--border-subtle)' }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={customizingItem.image}
                alt={customizingItem.name}
                className="w-16 h-16 rounded-xl object-cover"
                style={{ border: '1px solid var(--border-gold)' }}
              />
              <div>
                <span className="text-[10px] font-mono uppercase" style={{ color: 'var(--text-gold)' }}>
                  {customizingItem.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
                <h3 className="font-serif text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                  {customizingItem.name}
                </h3>
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-gold)' }}>
                  ₹{customizingItem.price}
                </span>
              </div>
            </div>

            {/* Addons */}
            {customizingItem.customizations?.length > 0 && (
              <div className="mb-6">
                <label className="text-[11px] font-mono uppercase tracking-wider block mb-3" style={{ color: 'var(--text-gold)' }}>
                  Customize:
                </label>
                <div className="space-y-2">
                  {customizingItem.customizations.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.name === addon.name);
                    return (
                      <div
                        key={addon.name}
                        onClick={() => toggleAddon(addon)}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200"
                        style={{
                          background: isSelected ? 'rgba(232,185,49,0.08)' : 'var(--bg-primary)',
                          border: `1px solid ${isSelected ? 'var(--border-gold-hover)' : 'var(--border-subtle)'}`,
                        }}
                      >
                        <div className="flex items-center gap-2.5 text-xs font-medium">
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center"
                            style={{
                              background: isSelected ? 'var(--text-gold)' : 'transparent',
                              border: `1.5px solid ${isSelected ? 'var(--text-gold)' : 'var(--text-muted)'}`,
                            }}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" style={{ color: 'var(--bg-primary)' }} />}
                          </div>
                          <span style={{ color: 'var(--text-main)' }}>{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-gold)' }}>
                          {addon.price > 0 ? `+₹${addon.price}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Total */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-3 p-1 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-gold)' }}
                >
                  −
                </button>
                <span className="font-mono text-sm font-bold px-2" style={{ color: 'var(--text-main)' }}>
                  {itemQuantity}
                </span>
                <button
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-gold)' }}
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Total</span>
                <span className="text-xl font-bold font-mono" style={{ color: 'var(--text-gold)' }}>
                  ₹{(customizingItem.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)) * itemQuantity}
                </span>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleConfirmAddToCart}
              className="mt-6 w-full py-3.5 rounded-xl btn-gold text-sm font-bold tracking-wide"
            >
              Add to Order
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
