import React, { useState, useEffect } from 'react';
import { paymentAPI } from '../services/api';
import { colors } from '../constants/theme';
import { useAuthStore } from '../context/store';
import { Trash2, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentMethodsPage = ({ onNavigate }) => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  // Form state for new card
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    paymentType: 'CREDIT_CARD',
    cardBrand: 'Visa',
  });

  // Get user ID from auth store
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchPaymentMethods();
    } else {
      toast.error('Please log in to manage payment methods');
      setLoading(false);
    }
  }, [userId]);

  const fetchPaymentMethods = async () => {
    try {
      const data = await paymentAPI.getPaymentMethods(userId);
      setMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Failed to load payment methods');
      setMethods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cardholderName.trim()) {
      toast.error('Cardholder name is required');
      return;
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Valid card number is required (16 digits)');
      return;
    }
    if (!formData.expiryMonth || !formData.expiryYear) {
      toast.error('Expiry date is required');
      return;
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      toast.error('Valid CVC is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        paymentType: formData.paymentType,
        cardBrand: formData.cardBrand,
        lastFourDigits: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cardholderName: formData.cardholderName,
        isDefault: methods.length === 0, // first card becomes default
      };

      const newMethod = await paymentAPI.savePaymentMethod({ userId, ...payload });
      setMethods(prev => [...prev, newMethod]);
      toast.success('Payment method added successfully');
      setShowAddForm(false);
      // Reset form
      setFormData({
        cardholderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
        paymentType: 'CREDIT_CARD',
        cardBrand: 'Visa',
      });
    } catch (error) {
      console.error('Add card error:', error);
      toast.error(error.response?.data?.message || 'Failed to add payment method');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) return;

    try {
      await paymentAPI.deletePaymentMethod(id);
      setMethods(methods.filter(m => m.id !== id));
      toast.success('Payment method deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete payment method');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const updated = await paymentAPI.setDefault(id);
      setMethods(methods.map(m => 
        m.id === id ? { ...m, isDefault: true } : { ...m, isDefault: false }
      ));
      toast.success('Default payment method updated');
    } catch (error) {
      console.error('Set default error:', error);
      toast.error('Failed to set default');
    }
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/(\d{1,4})/g);
    return groups ? groups.join(' ') : digits;
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p style={{ color: '#666' }}>Loading payment methods...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => onNavigate('profile')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Account
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold">
            Payment Methods
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ backgroundColor: colors.gold }}
            className="px-6 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Card
          </button>
        </div>

        {showAddForm && (
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md mb-6">
            <h3 className="font-semibold mb-4">Add New Card</h3>
            <form onSubmit={handleAddCard} className="space-y-4">
              <input
                type="text"
                name="cardholderName"
                placeholder="Cardholder Name"
                value={formData.cardholderName}
                onChange={handleInputChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\s/g, '');
                  if (raw.length <= 16) {
                    setFormData(prev => ({ ...prev, cardNumber: raw }));
                  }
                }}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                maxLength="16"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="expiryMonth"
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.champagne }}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    maxLength="2"
                    required
                  />
                  <span className="text-lg font-bold self-center">/</span>
                  <input
                    type="text"
                    name="expiryYear"
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.champagne }}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    maxLength="2"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.champagne }}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  maxLength="4"
                  required
                />
              </div>

              {/* Optional: Brand and type selection – you can add dropdowns if needed */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="cardBrand"
                  value={formData.cardBrand}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.champagne }}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.champagne }}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="DEBIT_CARD">Debit Card</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: colors.gold }}
                className="w-full py-3 font-semibold text-black rounded-lg hover:shadow-lg transition disabled:opacity-70"
              >
                {isSubmitting ? 'Adding...' : 'Add Card'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {methods.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center' }} className="shadow-md">
              <p style={{ color: '#666' }}>No payment methods saved yet.</p>
              <p className="text-sm mt-2">Click "Add Card" to add your first payment method.</p>
            </div>
          ) : (
            methods.map((card) => (
              <div key={card.id} style={{ backgroundColor: 'white', borderLeftColor: colors.gold }} className="border-l-4 p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">
                    💳 {card.cardBrand || 'Card'} ending in {card.lastFourDigits}
                  </h3>
                  <p style={{ color: '#666' }} className="text-sm">
                    Expires {card.expiryMonth}/{card.expiryYear}
                  </p>
                  {card.isDefault && (
                    <span style={{ color: colors.gold }} className="text-xs font-semibold mt-1 inline-block">
                      ✓ Default payment method
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      style={{ color: colors.gold }}
                      className="text-sm font-semibold hover:opacity-80 transition"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(card.id)}
                    style={{ color: colors.error }}
                    className="hover:opacity-80 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default PaymentMethodsPage;