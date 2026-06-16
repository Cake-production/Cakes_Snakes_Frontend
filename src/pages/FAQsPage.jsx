import React from 'react';
import { colors } from '../constants/theme';

const FAQsPage = ({ onNavigate }) => {
  const faqs = [
    { q: "How do I place an order?", a: "Simply browse our products, add items to your cart, and proceed to checkout." },
    { q: "What are your delivery times?", a: "Standard delivery takes 5-7 business days, express takes 2-3 days, and white glove is next day." },
    { q: "Can I customize my cake?", a: "Yes! Contact our support team with your requirements and we'll create a custom design." },
    { q: "Do you offer refunds?", a: "We offer refunds for damaged or incorrect items within 7 days of delivery." },
  ];

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Shop
        </button>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }} className="shadow-md">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p style={{ color: '#666' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQsPage;