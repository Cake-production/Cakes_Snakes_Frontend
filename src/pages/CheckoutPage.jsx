import React, { useState, useEffect } from 'react';
import { useCartStore, useOrderStore, useAuthStore } from '../context/store';
import { orderAPI, paymentAPI, userAPI } from '../services/api';
import { colors } from '../constants/theme';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = ({ onNavigate }) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [placedOrder, setPlacedOrder] = useState(null); // 👈 store the placed order

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    phone: '',
    deliveryOption: 'STANDARD',
    notes: '',
  });

  const { items: cartItems, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();

  // Load user profile
  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;
      try {
        const profile = await userAPI.getProfile();
        if (profile) {
          setFormData(prev => ({
            ...prev,
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            phone: profile.phone || '',
            street: profile.address?.street || '',
            city: profile.address?.city || '',
            state: profile.address?.state || '',
            zip: profile.address?.zipCode || '',
            country: profile.address?.country || 'USA',
          }));
        }
      } catch (error) {
        console.warn('Could not load profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };
    loadUserData();
  }, [userId]);

  // Load payment methods when reaching step 2
  useEffect(() => {
    if (step === 2 && userId) {
      fetchPaymentMethods();
    }
  }, [step, userId]);

  const fetchPaymentMethods = async () => {
    try {
      const methods = await paymentAPI.getPaymentMethods(userId);
      setPaymentMethods(methods || []);
      if (methods.length > 0) {
        const defaultMethod = methods.find(m => m.isDefault) || methods[0];
        setSelectedPaymentMethodId(defaultMethod.id);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Failed to load payment methods');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliverySelect = (option) => {
    setFormData(prev => ({ ...prev, deliveryOption: option }));
  };

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and last name are required');
      return;
    }
    if (!formData.street) {
      toast.error('Street address is required');
      return;
    }
    if (!formData.city) {
      toast.error('City is required');
      return;
    }
    if (!formData.state) {
      toast.error('State is required');
      return;
    }
    if (!formData.zip) {
      toast.error('ZIP code is required');
      return;
    }
    if (!selectedPaymentMethodId) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        specialInstructions: '',
      }));

      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        country: formData.country || 'USA',
        phone: formData.phone || '',
        isDefault: false,
      };

      const orderCreateDTO = {
        orderItems,
        deliveryOption: formData.deliveryOption,
        notes: formData.notes,
        shippingAddress,
        paymentMethodId: selectedPaymentMethodId,
      };

      const createdOrder = await orderAPI.create(userId, orderCreateDTO);

      // Process payment
      const paymentData = {
        orderId: createdOrder.id,
        amount: createdOrder.totalAmount,
        paymentMethodId: selectedPaymentMethodId,
      };
      await paymentAPI.processPayment(paymentData);

      // ✅ Store the placed order
      setPlacedOrder(createdOrder);
      localStorage.setItem('lastOrderNumber', createdOrder.orderNumber);

      addOrder(createdOrder);
      clearCart();
      setStep(4);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  // Compute totals for the current cart (used in steps 1-3)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shippingCost = formData.deliveryOption === 'STANDARD' ? 0 : formData.deliveryOption === 'EXPRESS' ? 25 : 85;
  const taxAmount = subtotal * 0.08;
  const totalAmount = subtotal + shippingCost + taxAmount;

  // For step 4, use the placed order totals
  const orderTotal = placedOrder ? placedOrder.totalAmount : 0;
  const orderSubtotal = placedOrder ? placedOrder.subtotal : 0;
  const orderShipping = placedOrder ? placedOrder.shippingCost : 0;
  const orderTax = placedOrder ? placedOrder.taxAmount : 0;
  const orderNumber = placedOrder ? placedOrder.orderNumber : localStorage.getItem('lastOrderNumber') || '';

  const renderProductImage = (product) => {
    const src = product.imageUrl || product.image || '📦';
    if (typeof src === 'string' && src.startsWith('data:image/')) {
      return <img src={src} alt={product.name} className="w-full h-full object-cover rounded" />;
    }
    return <span style={{ fontSize: '24px' }}>{src}</span>;
  };

  // ============ RENDER FUNCTIONS ============

  // Step 1: Shipping (same as before)
  const renderShipping = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
        Shipping Information
      </h2>
      {loadingProfile && <p>Loading your profile...</p>}
      <form className="space-y-4">
        {/* ... same input fields ... */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{ backgroundColor: colors.champagne }}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{ backgroundColor: colors.champagne }}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ backgroundColor: colors.champagne }}
            className="w-full px-4 py-3 rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>Street Address *</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            style={{ backgroundColor: colors.champagne }}
            className="w-full px-4 py-3 rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={{ backgroundColor: colors.champagne }}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              style={{ backgroundColor: colors.champagne }}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>ZIP Code *</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              style={{ backgroundColor: colors.champagne }}
              className="w-full px-4 py-3 rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{ backgroundColor: colors.champagne }}
            className="w-full px-4 py-3 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>Delivery Options</label>
          <div className="space-y-2">
            {[
              { value: 'STANDARD', label: 'Standard Delivery', desc: '5-7 business days • Free' },
              { value: 'EXPRESS', label: 'Express Delivery', desc: '2-3 business days • $25' },
              { value: 'WHITE_GLOVE', label: 'White Glove Delivery', desc: 'Next day • White glove service • $85' },
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => handleDeliverySelect(option.value)}
                style={{
                  backgroundColor: formData.deliveryOption === option.value ? colors.gold : colors.champagne,
                  borderLeft: `4px solid ${formData.deliveryOption === option.value ? colors.gold : 'transparent'}`,
                }}
                className="p-4 rounded cursor-pointer"
              >
                <p className="font-semibold">{option.label}</p>
                <p style={{ color: '#666' }} className="text-sm">{option.desc}</p>
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
  );

  // Step 2: Payment (same as before)
  const renderPayment = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
        Payment Method
      </h2>
      {paymentMethods.length === 0 ? (
        <div className="text-center py-6">
          <p style={{ color: '#666' }}>No saved payment methods.</p>
          <button
            onClick={() => onNavigate('payment-methods')}
            style={{ color: colors.gold }}
            className="mt-2 underline font-semibold"
          >
            Add a payment method
          </button>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPaymentMethodId(method.id)}
              style={{
                backgroundColor: selectedPaymentMethodId === method.id ? colors.champagne : 'white',
                borderColor: selectedPaymentMethodId === method.id ? colors.gold : colors.lightGray,
                borderWidth: '2px',
              }}
              className="p-4 rounded-lg cursor-pointer hover:opacity-80 transition flex items-center gap-3"
            >
              <span style={{ fontSize: '24px' }}>💳</span>
              <div className="flex-1">
                <p className="font-semibold">
                  {method.cardBrand || 'Card'} ending in {method.lastFourDigits}
                </p>
                <p style={{ color: '#666' }} className="text-sm">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
                {method.isDefault && (
                  <span style={{ color: colors.gold }} className="text-xs font-semibold">✓ Default</span>
                )}
              </div>
              {selectedPaymentMethodId === method.id && <Check size={24} style={{ color: colors.gold }} />}
            </div>
          ))}
        </div>
      )}
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
          disabled={!selectedPaymentMethodId}
          style={{ backgroundColor: colors.gold }}
          className="flex-1 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition disabled:opacity-50"
        >
          Review Order
        </button>
      </div>
    </div>
  );

  // Step 3: Review (same as before)
  const renderReview = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
        Review Your Order
      </h2>
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }} className="space-y-3">
          {cartItems.map((item, idx) => (
            <div key={item.cartId} className={`flex justify-between items-center pb-3 ${idx < cartItems.length - 1 ? 'border-b' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden bg-white flex items-center justify-center">
                  {renderProductImage(item)}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p style={{ color: '#666' }} className="text-sm">Qty: {item.quantity || 1}</p>
                </div>
              </div>
              <span style={{ color: colors.gold }} className="font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Shipping Details</h3>
        <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }}>
          <p className="font-semibold mb-2">{formData.firstName} {formData.lastName}</p>
          <p style={{ color: '#666' }} className="text-sm mb-1">{formData.street}</p>
          <p style={{ color: '#666' }} className="text-sm mb-1">{formData.city}, {formData.state} {formData.zip}</p>
          <p style={{ color: '#666' }} className="text-sm">
            {formData.deliveryOption === 'STANDARD' ? 'Standard Delivery - Free' :
             formData.deliveryOption === 'EXPRESS' ? 'Express Delivery - $25' :
             'White Glove Delivery - $85'}
          </p>
        </div>
      </div>
      <div style={{ borderTopColor: colors.gold }} className="border-t-2 pt-4 space-y-2 mb-8">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (8%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span style={{ color: colors.gold }}>${totalAmount.toFixed(2)}</span>
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
  );

  // Step 4: Confirmation (use placedOrder)
  const renderConfirmation = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center' }} className="shadow-md">
      <div style={{ fontSize: '80px' }} className="mb-4">✨</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px' }} className="font-bold mb-2">Order Confirmed!</h2>
      <p style={{ color: '#666' }} className="mb-6 max-w-md mx-auto">
        Thank you for your purchase. Your artisanal creations are being crafted with care and will be delivered as scheduled.
      </p>
      <div style={{ backgroundColor: colors.champagne, padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
        <p className="text-sm" style={{ color: '#666' }}>Order Number</p>
        <p style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 'bold', color: colors.gold }}>
          {orderNumber}
        </p>
      </div>
      <button
        onClick={() => {
          onNavigate('storefront');
          setStep(1);
          setPlacedOrder(null); // reset for next order
        }}
        style={{ backgroundColor: colors.gold }}
        className="px-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
      >
        Continue Shopping
      </button>
    </div>
  );

  // ============ MAIN RENDER ============
  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
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
          <div className="md:col-span-2">
            {step === 1 && renderShipping()}
            {step === 2 && renderPayment()}
            {step === 3 && renderReview()}
            {step === 4 && renderConfirmation()}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', height: 'fit-content' }} className="shadow-md sticky top-24">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-4">Order Summary</h3>
              {step === 4 && placedOrder ? (
                // ✅ Show placed order totals on confirmation step
                <>
                  <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: `1px solid ${colors.gold}` }}>
                    {/* If you want to show items from placedOrder, you can map them here */}
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${orderSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${orderShipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${orderTax.toFixed(2)}</span>
                    </div>
                    <div style={{ borderTop: `2px solid ${colors.gold}` }} className="pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span style={{ color: colors.gold, fontSize: '18px' }}>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                // Show current cart totals for steps 1-3
                <>
                  <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: `1px solid ${colors.gold}` }}>
                    {cartItems.map((item) => (
                      <div key={item.cartId} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ borderTop: `2px solid ${colors.gold}` }} className="pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span style={{ color: colors.gold, fontSize: '18px' }}>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;