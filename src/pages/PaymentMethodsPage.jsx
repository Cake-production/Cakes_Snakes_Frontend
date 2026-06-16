import React, { useState } from 'react';
import { paymentAPI } from '../services/api';
import { colors } from '../constants/theme';
import { mockPaymentMethods } from '../data/mockData';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentMethodsPage = ({ onNavigate }) => {
  const [methods, setMethods] = useState(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setMethods(methods.filter((m) => m.id !== id));
      toast.success('Payment method deleted');
    }
  };

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
            <form className="space-y-4">
              <input type="text" placeholder="Cardholder Name" style={{ backgroundColor: colors.champagne }} className="w-full px-4 py-3 rounded-lg focus:outline-none" />
              <input type="text" placeholder="Card Number" style={{ backgroundColor: colors.champagne }} className="w-full px-4 py-3 rounded-lg focus:outline-none" maxLength="16" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" style={{ backgroundColor: colors.champagne }} className="w-full px-4 py-3 rounded-lg focus:outline-none" />
                <input type="text" placeholder="CVC" style={{ backgroundColor: colors.champagne }} className="w-full px-4 py-3 rounded-lg focus:outline-none" maxLength="3" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  toast.success('Card added successfully');
                }}
                style={{ backgroundColor: colors.gold }}
                className="w-full py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
              >
                Add Card
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {methods.map((card) => (
            <div key={card.id} style={{ backgroundColor: 'white', borderLeftColor: colors.gold }} className="border-l-4 p-6 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold">💳 {card.brand} ending in {card.last4}</h3>
                <p style={{ color: '#666' }} className="text-sm">
                  Expires {card.expiry}
                </p>
                {card.isDefault && (
                  <p style={{ color: colors.gold }} className="text-xs font-semibold mt-1">
                    Default payment method
                  </p>
                )}
              </div>
              <button onClick={() => handleDelete(card.id)} style={{ color: colors.error }} className="hover:opacity-80 transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PaymentMethodsPage;
