import React from 'react';
import { colors } from '../constants/theme';
import { User, Package, CreditCard, Bell } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold mb-12">
          Account Settings
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Personal Info', icon: User, page: 'personal-info' },
            { name: 'Order History', icon: Package, page: 'order-history' },
            { name: 'Payment Methods', icon: CreditCard, page: 'payment-methods' },
            { name: 'Notifications', icon: Bell, page: 'notifications' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(item.page)}
              style={{ backgroundColor: 'white', borderLeftColor: colors.gold }}
              className="border-l-4 p-6 rounded-lg shadow-md hover:shadow-lg transition text-left"
            >
              <div style={{ color: colors.gold, marginBottom: '16px' }}>
                <item.icon size={32} />
              </div>
              <h3 className="font-semibold">{item.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
