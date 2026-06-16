import React, { useState } from 'react';
import { colors } from '../constants/theme';
import { mockNotifications } from '../data/mockData';

const NotificationsPage = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleToggle = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => onNavigate('profile')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Account
        </button>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
          Notification Preferences
        </h2>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md space-y-6">
          {notifications.map((notif, idx) => (
            <div key={notif.id} style={{ borderBottomColor: colors.lightGray }} className={`flex justify-between items-start pb-6 ${idx < notifications.length - 1 ? 'border-b' : ''}`}>
              <div>
                <h3 className="font-semibold">{notif.title}</h3>
                <p style={{ color: '#666' }} className="text-sm">
                  {notif.description}
                </p>
              </div>
              <button
                onClick={() => handleToggle(notif.id)}
                style={{
                  backgroundColor: notif.enabled ? colors.gold : colors.lightGray,
                  width: '48px',
                  height: '24px',
                }}
                className="rounded-full cursor-pointer transition flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotificationsPage;
