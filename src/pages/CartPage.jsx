import React from 'react';
import { useCartStore } from '../context/store';
import { colors } from '../constants/theme';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = ({ onNavigate }) => {
  const { items, removeItem } = useCartStore();
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const tax = (totalPrice * 0.08).toFixed(2);
  const shipping = 15;
  const finalTotal = (parseFloat(totalPrice) + parseFloat(tax) + shipping).toFixed(2);

  const handleRemove = (cartId, name) => {
    if (window.confirm(`Remove "${name}" from your cart?`)) {
      removeItem(cartId);
      toast.success(`${name} removed from cart`);
    }
  };

  const renderProductImage = (product) => {
    const src = product.imageUrl || product.image || '📦';
    if (typeof src === 'string' && src.startsWith('data:image/')) {
      return <img src={src} alt={product.name} className="w-full h-full object-cover rounded" />;
    }
    return <span style={{ fontSize: '60px' }}>{src}</span>;
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold mb-12">
          Your Cart
        </h2>

        {items.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '64px', borderRadius: '12px', textAlign: 'center' }} className="shadow-md">
            <div style={{ fontSize: '80px' }} className="mb-4">🛒</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }} className="font-bold mb-2">
              Your cart is empty
            </h3>
            <p style={{ color: '#666' }} className="mb-6">
              Explore our collection and add your favorite creations.
            </p>
            <button
              onClick={() => onNavigate('storefront')}
              style={{ backgroundColor: colors.gold }}
              className="px-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }} className="shadow-md">
                {items.map((item, idx) => (
                  <div
                    key={item.cartId}
                    style={{ borderBottomColor: colors.lightGray }}
                    className={`border-b p-6 flex gap-6 ${idx === items.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <div style={{ backgroundColor: colors.champagne }} className="w-24 h-24 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {renderProductImage(item)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p style={{ color: '#666' }} className="text-sm mb-4">Premium artisanal quality</p>
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.gold }} className="text-lg font-bold">${item.price}</span>
                        <button
                          onClick={() => handleRemove(item.cartId, item.name)}
                          style={{ color: colors.error }}
                          className="text-sm font-semibold hover:opacity-80 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-6">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: `1px solid ${colors.gold}` }}>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold mb-6">
                  <span>Total</span>
                  <span style={{ color: colors.gold, fontSize: '20px' }}>${finalTotal}</span>
                </div>
                <button
                  onClick={() => onNavigate('checkout')}
                  style={{ backgroundColor: colors.gold }}
                  className="w-full py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => onNavigate('storefront')}
                  style={{ color: colors.gold, borderColor: colors.gold }}
                  className="w-full mt-3 py-3 font-semibold border-2 rounded-lg hover:opacity-80 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;