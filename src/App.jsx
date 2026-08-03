import React, { useState, useEffect, useCallback } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import ReservationSection from './components/ReservationSection';
import GoogleMapSection from './components/GoogleMapSection';
import EnquirySection from './components/EnquirySection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Live Theme Switcher State: 'espresso-caramel' | 'gold-emerald'
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('creamery_theme') || 'espresso-caramel';
    } catch {
      return 'espresso-caramel';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('creamery_theme', currentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('creamery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reservationPasses, setReservationPasses] = useState(() => {
    try {
      const saved = localStorage.getItem('creamery_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try { localStorage.setItem('creamery_cart', JSON.stringify(cartItems)); } catch {}
  }, [cartItems]);

  useEffect(() => {
    try { localStorage.setItem('creamery_reservations', JSON.stringify(reservationPasses)); } catch {}
  }, [reservationPasses]);

  // Smooth scroll with Lenis
  useEffect(() => {
    if (loading) return;

    let lenis;
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Lenis not loaded, falling back to native scroll');
      }
    };

    initLenis();
    return () => { if (lenis) lenis.destroy(); };
  }, [loading]);

  // Cart handlers
  const handleAddToCart = useCallback((item, quantity, selectedAddons) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        (cItem) => cItem.id === item.id &&
                   JSON.stringify(cItem.addons) === JSON.stringify(selectedAddons)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity, addons: selectedAddons }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((index, newQty) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setCartItems(prev => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  }, []);

  const handleRemoveItem = useCallback((index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleReservation = useCallback((pass) => {
    setReservationPasses(prev => [pass, ...prev]);
  }, []);

  const cartTotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Cinematic Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Site */}
      <div
        className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-main)' }}
      >
        {/* Navigation */}
        <Navbar
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />

        {/* Page Sections */}
        <main>
          <Hero currentTheme={currentTheme} />
          <StorySection />
          <MenuSection onAddToCart={handleAddToCart} />
          <GallerySection />
          <TestimonialsSection />
          <ReservationSection onTriggerReservationAutomation={handleReservation} />
          <GoogleMapSection />
          <EnquirySection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919842298765"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl animate-gold-pulse transition-transform hover:scale-110"
          style={{ background: '#25D366' }}
          title="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
