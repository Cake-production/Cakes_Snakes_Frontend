import React from 'react';
import { colors } from '../constants/theme';

const PrivacyPolicyPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Shop
        </button>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px' }} className="shadow-md">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px' }} className="font-bold mb-6">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p>Last updated: January 2025</p>
            <p>At Cakes & Snacks, we value your privacy. This policy explains how we collect, use, and protect your personal information.</p>
            <h3 className="font-semibold text-lg mt-4">Information We Collect</h3>
            <p>We collect your name, email, address, and payment details when you place an order.</p>
            <h3 className="font-semibold text-lg mt-4">How We Use Your Information</h3>
            <p>We use your information to process orders, communicate delivery updates, and improve our services.</p>
            <h3 className="font-semibold text-lg mt-4">Data Security</h3>
            <p>We use SSL encryption and never store full payment details on our servers.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;