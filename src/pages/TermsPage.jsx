import React from 'react';
import { colors } from '../constants/theme';

const TermsPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Shop
        </button>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px' }} className="shadow-md">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px' }} className="font-bold mb-6">Terms of Service</h2>
          <div className="space-y-4 text-gray-700">
            <p>By using our website, you agree to these terms.</p>
            <h3 className="font-semibold text-lg mt-4">Order Acceptance</h3>
            <p>We reserve the right to cancel any order if the product is unavailable or if payment verification fails.</p>
            <h3 className="font-semibold text-lg mt-4">Pricing</h3>
            <p>All prices are in USD and include applicable taxes. Shipping costs are calculated at checkout.</p>
            <h3 className="font-semibold text-lg mt-4">Returns</h3>
            <p>Perishable items are non-returnable unless damaged. Contact us within 24 hours of delivery.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;