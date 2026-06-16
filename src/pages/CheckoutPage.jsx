import React, { useState } from 'react';
import { useCartStore, useOrderStore } from '../context/store';
import { orderAPI } from '../services/api';
import { colors } from '../constants/theme';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card1');
  const [formData, setFormData] = useState({
    firstName: 'Alexandra',
    lastName: 'Beaumont',
    email: 'alexandra@example.com',
    street: '123 Elegance Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    delivery: 'standard',
  });

  const { items: cartItems, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = (totalPrice * 0.08).toFixed(2);
  const shipping = formData.delivery === 'standard' ? 0 : formData.delivery === 'express' ? 25 : 85;
  const finalTotal = (parseFloat(totalPrice) + parseFloat(tax) + shipping).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          },
        },
        items: cartItems,
        total: finalTotal,
        payment: selectedPayment,
        delivery: formData.delivery,
      };

      const order = await orderAPI.create(orderData);
      addOrder(order);
      clearCart();
      setStep(4);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Indicators */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-4 flex-1">
              <button
                onClick={() => s < step && setStep(s)}
                style={{
                  backgroundColor: step >= s ? colors.gold : colors.lightGray,
                  color: step >= s ? colors.darkPlum : '#999',
                }}
                className="w-10 h-10 rounded-full font-bold flex items-center justify-center flex-shrink-0"
              >
                {s === 4 ? '✓' : s}
              </button>
              {s < 4 && (
                <div
                  style={{
                    backgroundColor: step > s ? colors.gold : colors.lightGray,
                    height: '2px',
                  }}
                  className="flex-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
                  Shipping Information
                </h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={{ backgroundColor: colors.champagne }}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={{ backgroundColor: colors.champagne }}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ backgroundColor: colors.champagne }}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      style={{ backgroundColor: colors.champagne }}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{ backgroundColor: colors.champagne }}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        style={{ backgroundColor: colors.champagne }}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        style={{ backgroundColor: colors.champagne }}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                      Delivery Options
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'standard', label: 'Standard Delivery', desc: '5-7 business days • Free' },
                        { value: 'express', label: 'Express Delivery', desc: '2-3 business days • $25' },
                        { value: 'whiteglove', label: 'White Glove Delivery', desc: 'Next day • White glove service • $85' },
                      ].map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setFormData((prev) => ({ ...prev, delivery: option.value }))}
                          style={{
                            backgroundColor: formData.delivery === option.value ? colors.gold : colors.champagne,
                            borderLeft: `4px solid ${formData.delivery === option.value ? colors.gold : 'transparent'}`,
                          }}
                          className="p-4 rounded cursor-pointer"
                        >
                          <p className="font-semibold">{option.label}</p>
                          <p style={{ color: '#666' }} className="text-sm">
                            {option.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
                <button
                  onClick={() => setStep(2)}
                  style={{ backgroundColor: colors.gold }}
                  className="w-full mt-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
                  Payment Method
                </h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'card1', emoji: '💳', label: 'Visa ending in 4242', desc: 'Expires 12/26' },
                    { id: 'card2', emoji: '💳', label: 'Mastercard ending in 5555', desc: 'Expires 03/27' },
                    { id: 'apple', emoji: '🍎', label: 'Apple Pay' },
                    { id: 'paypal', emoji: '🅿️', label: 'PayPal' },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      style={{
                        backgroundColor: selectedPayment === method.id ? colors.champagne : 'white',
                        borderColor: selectedPayment === method.id ? colors.gold : colors.lightGray,
                        borderWidth: '2px',
                      }}
                      className="p-4 rounded-lg cursor-pointer hover:opacity-80 transition flex items-center gap-3"
                    >
                      <span style={{ fontSize: '24px' }}>{method.emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{method.label}</p>
                        {method.desc && <p style={{ color: '#666' }} className="text-sm">{method.desc}</p>}
                      </div>
                      {selectedPayment === method.id && <Check size={24} style={{ color: colors.gold }} />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    style={{ color: colors.gold, borderColor: colors.gold }}
                    className="flex-1 border-2 py-3 font-semibold rounded-lg hover:opacity-80 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    style={{ backgroundColor: colors.gold }}
                    className="flex-1 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
                  Review Your Order
                </h2>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }} className="space-y-3">
                    {cartItems.map((item, idx) => (
                      <div key={item.cartId} className="flex justify-between items-center pb-3" style={{ borderBottomColor: colors.lightGray }} className={idx < cartItems.length - 1 ? 'border-b' : ''}>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p style={{ color: '#666' }} className="text-sm">Qty: 1</p>
                        </div>
                        <span style={{ color: colors.gold }} className="font-bold">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Shipping Details</h3>
                  <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }}>
                    <p className="font-semibold mb-2">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p style={{ color: '#666' }} className="text-sm mb-1">
                      {formData.street}
                    </p>
                    <p style={{ color: '#666' }} className="text-sm mb-1">
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                    <p style={{ color: '#666' }} className="text-sm">
                      {formData.delivery === 'standard' ? 'Standard Delivery - Free' : formData.delivery === 'express' ? 'Express Delivery - $25' : 'White Glove Delivery - $85'}
                    </p>
                  </div>
                </div>

                <div style={{ borderTopColor: colors.gold }} className="border-t-2 pt-4 space-y-2 mb-8">
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span style={{ color: colors.gold }}>${finalTotal}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    style={{ color: colors.gold, borderColor: colors.gold }}
                    className="flex-1 border-2 py-3 font-semibold rounded-lg hover:opacity-80 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    style={{ backgroundColor: colors.gold }}
                    className="flex-1 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition disabled:opacity-70"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center' }} className="shadow-md">
                <div style={{ fontSize: '80px' }} className="mb-4">
                  ✨
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px' }} className="font-bold mb-2">
                  Order Confirmed!
                </h2>
                <p style={{ color: '#666' }} className="mb-6 max-w-md mx-auto">
                  Thank you for your purchase. Your artisanal creations are being crafted with care and will be delivered as scheduled.
                </p>
                <div style={{ backgroundColor: colors.champagne, padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                  <p className="text-sm" style={{ color: '#666' }}>
                    Order Number
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 'bold', color: colors.gold }}>
                    ORD-#{Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('storefront');
                    setStep(1);
                  }}
                  style={{ backgroundColor: colors.gold }}
                  className="px-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', height: 'fit-content' }} className="shadow-md sticky top-24">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 mb-4 pb-4" style={{ borderBottomColor: colors.gold }} className="border-b">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
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
                <div style={{ borderTopColor: colors.gold }} className="border-t-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span style={{ color: colors.gold, fontSize: '18px' }}>${finalTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
