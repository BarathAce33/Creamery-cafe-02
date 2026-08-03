import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { cafeInfo } from '../data/menuData';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const subtotal = cartItems.reduce((sum, item) => {
    const addonTotal = (item.addons || []).reduce((a, addon) => a + addon.price, 0);
    return sum + (item.price + addonTotal) * item.quantity;
  }, 0);

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let msg = `🛒 *CREAMERY CAFÉ — NEW ORDER* 🛒\n\n`;
    cartItems.forEach((item, i) => {
      const addonTotal = (item.addons || []).reduce((a, addon) => a + addon.price, 0);
      msg += `${i + 1}. *${item.name}* × ${item.quantity} — ₹${(item.price + addonTotal) * item.quantity}\n`;
      if (item.addons?.length > 0) {
        msg += `   Extras: ${item.addons.map(a => a.name).join(', ')}\n`;
      }
    });
    msg += `\n───────────────\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    msg += `GST (5%): ₹${gst}\n`;
    msg += `*Total: ₹${total}*\n`;
    msg += `───────────────\n`;
    msg += `📍 Creamery Café, Peelamedu\n`;
    msg += `_Sent via creamery-cbe.com_`;

    confetti({ particleCount: 25, spread: 40, colors: ['#D4923A', '#F5B862', '#E28728'] });

    window.open(
      `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] animate-fade-in"
          style={{ background: 'rgba(26,18,11,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[56] flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-gold)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" style={{ color: 'var(--text-gold)' }} />
            <div>
              <h3 className="font-serif text-lg font-semibold" style={{ color: 'var(--text-main)' }}>Your Order</h3>
              <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full transition-colors"
            style={{ color: 'var(--text-sub)', border: '1px solid var(--border-subtle)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-serif text-base" style={{ color: 'var(--text-sub)' }}>Your cart is empty</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Browse our menu and add delicious items
              </p>
              <button onClick={onClose} className="mt-4 px-6 py-2 rounded-full btn-outline text-xs font-medium">
                Explore Menu
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => {
              const addonTotal = (item.addons || []).reduce((a, addon) => a + addon.price, 0);
              const itemTotal = (item.price + addonTotal) * item.quantity;

              return (
                <div key={index} className="rounded-xl p-4 transition-all"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-start gap-3">
                    <img src={item.image} alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/logo.jpg'; }}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      style={{ border: '1px solid var(--border-subtle)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--text-main)' }}>{item.name}</h4>
                          <span className="text-[10px] font-mono" style={{ color: 'var(--text-gold)' }}>₹{item.price}</span>
                        </div>
                        <button onClick={() => onRemoveItem(index)} className="p-1 rounded-lg transition-colors flex-shrink-0"
                          style={{ color: 'var(--text-muted)' }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.addons?.length > 0 && (
                        <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                          + {item.addons.map(a => a.name).join(', ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 p-0.5 rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                          <button onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ color: 'var(--text-gold)' }}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold px-1" style={{ color: 'var(--text-main)' }}>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{ color: 'var(--text-gold)' }}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-gold)' }}>₹{itemTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t space-y-4" style={{ borderColor: 'var(--border-subtle)' }}>
            {/* Totals */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-sub)' }}>Subtotal</span>
                <span className="font-mono font-medium" style={{ color: 'var(--text-main)' }}>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-sub)' }}>GST (5%)</span>
                <span className="font-mono font-medium" style={{ color: 'var(--text-main)' }}>₹{gst}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="font-bold" style={{ color: 'var(--text-main)' }}>Total</span>
                <span className="font-mono font-bold text-lg" style={{ color: 'var(--text-gold)' }}>₹{total}</span>
              </div>
            </div>

            {/* WhatsApp Order */}
            <button onClick={handleWhatsAppOrder}
              className="w-full py-3.5 rounded-xl btn-gold text-sm font-bold tracking-wide flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </button>

            <button onClick={onClearCart}
              className="w-full py-2 rounded-xl text-xs font-medium text-center transition-colors"
              style={{ color: 'var(--text-muted)' }}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
