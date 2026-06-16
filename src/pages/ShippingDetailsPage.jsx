import React from 'react';
import { colors } from '../constants/theme';

const ShippingDetailsPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Shop
        </button>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px' }} className="shadow-md">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px' }} className="font-bold mb-6">Shipping Information</h2>
          <div className="space-y-4 text-gray-700">
            <h3 className="font-semibold text-lg">Delivery Options</h3>
            <ul className="list-disc pl-5">
              <li><strong>Standard Delivery</strong> – 5–7 business days · Free</li>
              <li><strong>Express Delivery</strong> – 2–3 business days · $25</li>
              <li><strong>White Glove Delivery</strong> – Next day · $85</li>
            </ul>
            <h3 className="font-semibold text-lg mt-4">Tracking</h3>
            <p>A tracking link will be emailed once your order ships.</p>
            <h3 className="font-semibold text-lg mt-4">International Shipping</h3>
            <p>Currently we only ship within the United States.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShippingDetailsPage;