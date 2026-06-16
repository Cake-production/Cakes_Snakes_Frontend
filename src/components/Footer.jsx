// src/components/Footer.jsx
import React from 'react';
import { colors } from '../constants/theme';

const Footer = ({ onNavigate }) => {  // ← must accept onNavigate
  return (
    <footer style={{ backgroundColor: colors.darkPlum }} className="text-white py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }} className="font-bold mb-4">
            Cakes & Snacks
          </h4>
          <p style={{ color: colors.champagne, fontSize: '14px' }} className="leading-relaxed">
            Artisanal confections crafted with premium ingredients and meticulous attention to detail.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Shop</h5>
          <ul style={{ color: colors.champagne, fontSize: '14px' }} className="space-y-2">
            <li><button onClick={() => onNavigate('storefront')} className="hover:opacity-100 opacity-80 transition">Collections</button></li>
            <li><button onClick={() => onNavigate('best-sellers')} className="hover:opacity-100 opacity-80 transition">Best Sellers</button></li>
            <li><button onClick={() => onNavigate('storefront')} className="hover:opacity-100 opacity-80 transition">About</button></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Support</h5>
          <ul style={{ color: colors.champagne, fontSize: '14px' }} className="space-y-2">
            <li><button onClick={() => onNavigate('contact')} className="hover:opacity-100 opacity-80 transition">Contact</button></li>
            <li><button onClick={() => onNavigate('faqs')} className="hover:opacity-100 opacity-80 transition">FAQs</button></li>
            <li><button onClick={() => onNavigate('shipping')} className="hover:opacity-100 opacity-80 transition">Shipping Info</button></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Legal</h5>
          <ul style={{ color: colors.champagne, fontSize: '14px' }} className="space-y-2">
            <li><button onClick={() => onNavigate('privacy')} className="hover:opacity-100 opacity-80 transition">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:opacity-100 opacity-80 transition">Terms of Service</button></li>
            <li><button onClick={() => onNavigate('shipping')} className="hover:opacity-100 opacity-80 transition">Shipping Details</button></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTopColor: 'rgba(255,255,255,0.2)' }} className="border-t pt-8 text-center text-sm opacity-80">
        <p>© 2025 Cakes & Snacks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;