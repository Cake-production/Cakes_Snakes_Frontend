// src/App.jsx
import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from './context/store';
import { colors } from './constants/theme';

// Pages
import LoginPage from './pages/LoginPage';
import StorefrontPage from './pages/StorefrontPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AnalyticsPage from './pages/AnalyticsPage';
import InventoryPage from './pages/InventoryPage';
import ProfilePage from './pages/ProfilePage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import NotificationsPage from './pages/NotificationsPage';
import OrderDetailPage from './pages/OrderDetailPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// ------------------------------------------------------------------
// Footer / Static Pages (kept as inline components)
// ------------------------------------------------------------------
const FAQsPage = ({ onNavigate }) => {
  const faqCategories = [
    {
      title: "🛒 Ordering",
      icon: "🛒",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our collections, add items to your cart, and proceed to checkout. You’ll be guided step‑by‑step – it’s quick and easy."
        },
        {
          q: "Can I modify my order after placing it?",
          a: "Yes – contact us within 1 hour of placing your order and we’ll do our best to accommodate changes."
        }
      ]
    },
    {
      title: "🚚 Delivery",
      icon: "🚚",
      questions: [
        {
          q: "What delivery options do you offer?",
          a: "Standard (5–7 days, free), Express (2–3 days, $25), and White Glove (next day, $85). All orders include tracking."
        },
        {
          q: "Do you deliver outside Sri Lanka?",
          a: "Currently we deliver only within Sri Lanka. We’re working on expanding internationally – stay tuned!"
        }
      ]
    },
    {
      title: "🎨 Customisation",
      icon: "🎨",
      questions: [
        {
          q: "Can I customise my cake?",
          a: "Absolutely! We love bespoke creations. Just share your ideas – flavours, fillings, designs – and we’ll bring them to life."
        }
      ]
    },
    {
      title: "🔄 Returns & Refunds",
      icon: "🔄",
      questions: [
        {
          q: "What is your return policy?",
          a: "If your order arrives damaged or incorrect, notify us within 24 hours. We’ll replace it or issue a full refund – your satisfaction matters."
        },
        {
          q: "Can I cancel my order?",
          a: "Orders can be cancelled within 1 hour of placement. After that, we’ve already started crafting your treats."
        }
      ]
    },
    {
      title: "📦 Tracking",
      icon: "📦",
      questions: [
        {
          q: "How can I track my order?",
          a: "Once dispatched, you’ll receive a tracking link via email. You can monitor your delivery in real time."
        }
      ]
    },
    {
      title: "💳 Payment",
      icon: "💳",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept Visa, Mastercard, Apple Pay, and PayPal – all securely processed."
        }
      ]
    }
  ];

  return (
    <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate('storefront')}
          style={{ color: colors.gold }}
          className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
        >
          ← Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div style={{ backgroundColor: colors.darkPlum }} className="px-8 py-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="opacity-80 text-sm mt-1">
              Everything you need to know – from ordering to delivery and beyond.
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {faqCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <span style={{ fontSize: '24px' }}>{category.icon}</span>
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.questions.map((item, qIdx) => (
                      <div key={qIdx} className="border-l-2 border-gold pl-3">
                        <p className="font-semibold text-gray-800 text-sm">{item.q}</p>
                        <p className="text-gray-600 text-sm mt-0.5">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: colors.champagne }} className="px-8 py-6 text-center">
            <p className="text-gray-700">
              Still have questions?{' '}
              <button
                onClick={() => onNavigate('contact')}
                style={{ color: colors.gold }}
                className="font-semibold hover:underline"
              >
                Contact our team
              </button>
              – we’re always happy to help.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

const PrivacyPolicyPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('storefront')}
          style={{ color: colors.gold }}
          className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
        >
          ← Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div style={{ backgroundColor: colors.darkPlum }} className="px-8 py-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Privacy Policy
            </h2>
            <p className="opacity-80 text-sm mt-1">
              Your trust matters to us – here's how we protect your information.
            </p>
          </div>

          <div className="p-8 space-y-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500 mb-2">Last Updated: June 2025</p>
              <p>
                At <strong style={{ color: colors.darkPlum }}>Cakes & Snacks</strong>, we value your privacy
                and are committed to protecting your personal information. This policy explains how we
                collect, use, and safeguard your data.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🔒</span> Information We Collect
              </h3>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-sm">
                <li><strong>Personal Details:</strong> Name, email, phone number, and delivery address.</li>
                <li><strong>Order History:</strong> Products purchased, preferences, and feedback.</li>
                <li><strong>Payment Information:</strong> Securely processed via our trusted payment partners – we never store full card details.</li>
                <li><strong>Website Usage:</strong> Cookies to improve your browsing experience.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📊</span> How We Use Your Information
              </h3>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-sm">
                <li>To process orders and deliver your purchases.</li>
                <li>To communicate order updates, promotions, and new collections (only with your consent).</li>
                <li>To improve our products and services based on your feedback.</li>
                <li>To ensure a safe and secure shopping experience.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🤝</span> Sharing Your Information
              </h3>
              <p className="text-sm mt-1">
                We never sell or rent your personal data. We may share information with trusted partners
                solely for order fulfilment (e.g., delivery services, payment processors) – they are
                contractually bound to keep your data secure.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🛡️</span> Data Security
              </h3>
              <p className="text-sm mt-1">
                We implement industry‑standard security measures, including SSL encryption, to protect
                your data during transmission. Access to your personal information is restricted to
                authorised personnel only.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🍪</span> Cookies
              </h3>
              <p className="text-sm mt-1">
                We use cookies to enhance your shopping experience. You can manage cookie preferences
                in your browser settings. By continuing to use our site, you consent to our use of cookies.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📧</span> Your Rights
              </h3>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-sm">
                <li>Access, update, or correct your personal data at any time.</li>
                <li>Request deletion of your account and data (subject to legal obligations).</li>
                <li>Opt out of marketing communications with one click.</li>
                <li>Withdraw consent for data processing at any time.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📬</span> Contact Us
              </h3>
              <p className="text-sm mt-1">
                If you have any questions about our privacy practices, please reach out:
              </p>
              <div style={{ backgroundColor: colors.champagne }} className="mt-2 p-4 rounded-lg text-sm">
                <p><strong>Email:</strong> <a href="mailto:info@cakesandsnacks.com" style={{ color: colors.gold }}>info@cakesandsnacks.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:0769248360" style={{ color: colors.gold }}>076 924 8360</a></p>
                <p><strong>Address:</strong> Nagapossani Amman Lane, Kondavil East, Kondavil</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 italic border-t pt-4">
              We reserve the right to update this policy. Changes will be posted on this page.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const TermsPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('storefront')}
          style={{ color: colors.gold }}
          className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
        >
          ← Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div style={{ backgroundColor: colors.darkPlum }} className="px-8 py-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Terms of Service
            </h2>
            <p className="opacity-80 text-sm mt-1">
              Your use of our website and services is subject to the following terms.
            </p>
          </div>

          <div className="p-8 space-y-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500 mb-2">Last Updated: June 2025</p>
              <p>
                Welcome to <strong style={{ color: colors.darkPlum }}>Cakes & Snacks</strong>. By using our website
                and placing an order, you agree to these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📋</span> 1. Acceptance of Terms
              </h3>
              <p className="text-sm mt-1">
                By accessing or using our website, you agree to be bound by these terms and our Privacy Policy.
                If you do not agree, please do not use our services.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🛒</span> 2. Order Acceptance
              </h3>
              <p className="text-sm mt-1">
                All orders are subject to acceptance and availability. We reserve the right to cancel or refuse
                any order for reasons including but not limited to product unavailability, payment verification,
                or suspected fraudulent activity.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>💰</span> 3. Pricing and Payment
              </h3>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-sm">
                <li>All prices are in Sri Lankan Rupees (LKR) and include applicable taxes unless stated otherwise.</li>
                <li>Delivery costs are calculated at checkout and vary based on your selected delivery option.</li>
                <li>We accept Visa, Mastercard, Apple Pay, and PayPal – all payments are securely processed.</li>
                <li>We reserve the right to update prices without prior notice, but changes will not affect confirmed orders.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🚚</span> 4. Delivery
              </h3>
              <p className="text-sm mt-1">
                Delivery times are estimated and not guaranteed. We strive to deliver within the timeframe
                selected, but unforeseen circumstances may cause delays. Standard, Express, and White Glove
                options are available – full details are provided at checkout.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🔄</span> 5. Returns and Cancellations
              </h3>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-sm">
                <li>Perishable items are non‑returnable unless damaged or incorrect upon arrival.</li>
                <li>If your order is damaged or incorrect, notify us within 24 hours of delivery for a replacement or refund.</li>
                <li>Orders can be cancelled within 1 hour of placement – after that, our team begins crafting your treats.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🔒</span> 6. Intellectual Property
              </h3>
              <p className="text-sm mt-1">
                All content on this website – including text, images, logos, and product designs – is the
                property of Cakes & Snacks. Unauthorised use, reproduction, or distribution is strictly prohibited.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>⚠️</span> 7. Limitation of Liability
              </h3>
              <p className="text-sm mt-1">
                To the fullest extent permitted by law, Cakes & Snacks shall not be liable for any indirect,
                incidental, or consequential damages arising from the use of our products or services.
                Our liability is limited to the total amount paid for the relevant order.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🔗</span> 8. Third‑Party Links
              </h3>
              <p className="text-sm mt-1">
                Our website may contain links to third‑party sites. We are not responsible for their content or
                privacy practices – we encourage you to review their policies before engaging.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>⚖️</span> 9. Governing Law
              </h3>
              <p className="text-sm mt-1">
                These terms are governed by and construed in accordance with the laws of Sri Lanka.
                Any disputes shall be resolved in the competent courts of Jaffna, Sri Lanka.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📞</span> 10. Contact Us
              </h3>
              <p className="text-sm mt-1">
                If you have any questions about these terms, please reach out:
              </p>
              <div style={{ backgroundColor: colors.champagne }} className="mt-2 p-4 rounded-lg text-sm">
                <p><strong>Email:</strong> <a href="mailto:info@cakesandsnacks.com" style={{ color: colors.gold }}>info@cakesandsnacks.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:0769248360" style={{ color: colors.gold }}>076 924 8360</a></p>
                <p><strong>Address:</strong> Nagapossani Amman Lane, Kondavil East, Kondavil</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 italic border-t pt-4">
              We reserve the right to update these terms. Changes will be posted on this page.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ShippingDetailsPage = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('storefront')}
          style={{ color: colors.gold }}
          className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
        >
          ← Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div style={{ backgroundColor: colors.darkPlum }} className="px-8 py-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shipping Information
            </h2>
            <p className="opacity-80 text-sm mt-1">
              Fast, reliable delivery to your doorstep – crafted with care.
            </p>
          </div>

          <div className="p-8 space-y-6 text-gray-700">
            {/* Delivery Options */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🚚</span> Delivery Options
              </h3>
              <div className="mt-3 space-y-3">
                <div
                  style={{
                    backgroundColor: colors.champagne,
                    borderLeft: `4px solid ${colors.gold}`,
                  }}
                  className="p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Standard Delivery</p>
                      <p className="text-sm text-gray-600">5–7 business days</p>
                    </div>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Reliable delivery with tracking</p>
                </div>

                <div
                  style={{
                    backgroundColor: colors.champagne,
                    borderLeft: `4px solid ${colors.gold}`,
                  }}
                  className="p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Express Delivery</p>
                      <p className="text-sm text-gray-600">2–3 business days</p>
                    </div>
                    <span className="font-bold" style={{ color: colors.gold }}>$25.00</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Priority handling with real‑time tracking</p>
                </div>

                <div
                  style={{
                    backgroundColor: colors.champagne,
                    borderLeft: `4px solid ${colors.gold}`,
                  }}
                  className="p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">White Glove Delivery</p>
                      <p className="text-sm text-gray-600">Next day delivery</p>
                    </div>
                    <span className="font-bold" style={{ color: colors.gold }}>$85.00</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Premium white‑glove service with personalised care and setup
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📍</span> Order Tracking
              </h3>
              <p className="text-sm mt-1">
                Once your order is dispatched, you will receive a <strong>tracking link</strong> via email.
                You can monitor your delivery in real time and receive estimated arrival updates.
              </p>
            </div>

            {/* Delivery Area */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🌍</span> Delivery Area
              </h3>
              <p className="text-sm mt-1">
                We currently deliver across <strong>all regions of Sri Lanka</strong>.
                For orders outside our regular delivery zones, please <button
                  onClick={() => onNavigate('contact')}
                  style={{ color: colors.gold }}
                  className="font-semibold hover:underline"
                >
                  contact us
                </button> and we’ll do our best to accommodate.
              </p>
            </div>

            {/* Packaging */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>📦</span> Packaging & Freshness
              </h3>
              <p className="text-sm mt-1">
                Every order is carefully packed to preserve freshness and presentation.
                We use premium, food‑grade packaging that keeps your treats safe and beautiful
                during transit.
              </p>
            </div>

            {/* Delivery Hours */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🕐</span> Delivery Hours
              </h3>
              <p className="text-sm mt-1">
                Deliveries are made <strong>Monday – Saturday</strong> between 8:00 AM and 8:00 PM.
                Sunday deliveries are available on request for special occasions.
              </p>
            </div>

            {/* Shop Address */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span style={{ color: colors.gold }}>🏪</span> Visit Our Shop
              </h3>
              <div style={{ backgroundColor: colors.champagne }} className="p-4 rounded-lg text-sm">
                <p><strong>Address:</strong> Nagapossani Amman Lane, Kondavil East, Kondavil</p>
                <p className="mt-1"><strong>Phone:</strong> <a href="tel:0769248360" style={{ color: colors.gold }}>076 924 8360</a></p>
                <p><strong>Hours:</strong> Monday – Saturday, 8:00 AM – 8:00 PM</p>
                <p className="text-gray-500 text-xs mt-1">Sunday – Closed</p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ borderTop: `1px solid ${colors.lightGray}` }} className="pt-6 text-center">
              <p className="text-sm">
                Need help with your delivery?{' '}
                <button
                  onClick={() => onNavigate('contact')}
                  style={{ color: colors.gold }}
                  className="font-semibold hover:underline"
                >
                  Contact our support team
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const BestSellersPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-7xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
      <p>Our most loved products – coming soon!</p>
    </div>
  </main>
);

const ContactPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => onNavigate('storefront')}
        style={{ color: colors.gold }}
        className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
      >
        ← Back to Shop
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gold accent */}
        <div
          style={{ backgroundColor: colors.darkPlum }}
          className="px-8 py-6 text-white"
        >
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Get in Touch
          </h2>
          <p className="opacity-80 text-sm mt-1">
            We’d love to hear from you – drop us a message or visit our bakery.
          </p>
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Left column: Contact details */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase font-semibold text-gray-400 tracking-wider">Reach us</h4>
              <div className="mt-4 space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: '20px' }}>📍</span>
                  <div>
                    <p className="font-semibold">Visit Our Bakery</p>
                    <p className="text-sm text-gray-600">
                      Nagapossani Amman Lane,<br />
                      Kondavil East, Kondavil
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: '20px' }}>📞</span>
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <a href="tel:0769248360" className="text-sm text-gray-600 hover:text-gold transition">
                      076 924 8360
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: '20px' }}>✉️</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@cakesandsnacks.com" className="text-sm text-gray-600 hover:text-gold transition">
                      info@cakesandsnacks.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundColor: colors.champagne }}
              className="p-4 rounded-lg"
            >
              <h4 className="text-sm uppercase font-semibold text-gray-500 tracking-wider">Hours</h4>
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Mon – Sat:</span> 8:00 AM – 8:00 PM</p>
                <p><span className="font-medium">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>

          {/* Right column: Brand story & CTA */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase font-semibold text-gray-400 tracking-wider">Our Promise</h4>
            <p className="text-gray-700 leading-relaxed">
              Every cake, every pastry, every bite is made with love and the finest ingredients.
              We believe in creating moments of joy – whether it’s a celebration, a quiet treat,
              or a shared memory.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Have a special request or custom order? We’d be delighted to bring your vision to life.
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate('storefront')}
                style={{ backgroundColor: colors.gold }}
                className="px-6 py-2 font-semibold text-black rounded-lg hover:shadow-lg transition"
              >
                Explore Our Collection
              </button>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.darkPlum }}
                className="text-2xl hover:opacity-70 transition"
              >
                📘
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.darkPlum }}
                className="text-2xl hover:opacity-70 transition"
              >
                📸
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// ===== NEW ABOUT PAGE =====
const AboutPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => onNavigate('storefront')} 
        style={{ color: colors.gold }} 
        className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
      >
        ← Back to Shop
      </button>
      
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div style={{ fontSize: '64px' }} className="mb-4">🧁</div>
          <h2 
            className="text-4xl font-bold mb-2" 
            style={{ fontFamily: 'Playfair Display, serif', color: colors.darkPlum }}
          >
            About Cakes & Snacks
          </h2>
          <div 
            style={{ backgroundColor: colors.gold, width: '80px', height: '3px' }} 
            className="mx-auto rounded"
          />
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Welcome to <strong style={{ color: colors.darkPlum }}>Cakes & Snacks</strong> – where every bite tells a story of passion, 
            tradition, and the finest craftsmanship. 
          </p>

          <p>
            Our journey began in a small kitchen in <strong>Kondavil</strong>, driven by a simple belief: that 
            extraordinary treats start with extraordinary ingredients. Today, we are proud to be a 
            beloved name in Jaffna and beyond, crafting cakes and snacks that bring joy to every occasion.
          </p>

          <div 
            style={{ 
              backgroundColor: colors.champagne, 
              padding: '24px', 
              borderRadius: '12px',
              borderLeft: `4px solid ${colors.gold}`
            }}
            className="my-6"
          >
            <h4 className="font-semibold text-lg mb-2" style={{ color: colors.darkPlum }}>
              Meet Our Founder
            </h4>
            <p className="text-gray-700">
              Our shop is lovingly run by <strong>Kashthury Tharsan</strong>, whose dedication to quality 
              and creativity has made Cakes & Snacks a destination for those who appreciate the art of 
              fine baking. From classic butter cakes to innovative seasonal creations, every product 
              reflects her commitment to excellence.
            </p>
          </div>

          <p>
            Nestled at <strong>Nagapossani Amman Lane, Kondavil East</strong>, our cozy bakery is a place 
            where the aroma of freshly baked goods welcomes you like an old friend. Whether you're 
            craving a decadent cake for a celebration or a quick snack to brighten your day, we're here 
            to make every moment special.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div 
              style={{ backgroundColor: colors.champagne }} 
              className="p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">🎂</div>
              <h5 className="font-semibold" style={{ color: colors.darkPlum }}>Premium Cakes</h5>
              <p className="text-sm text-gray-600">Signature & custom creations</p>
            </div>
            <div 
              style={{ backgroundColor: colors.champagne }} 
              className="p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">🍪</div>
              <h5 className="font-semibold" style={{ color: colors.darkPlum }}>Artisanal Snacks</h5>
              <p className="text-sm text-gray-600">Freshly baked daily</p>
            </div>
            <div 
              style={{ backgroundColor: colors.champagne }} 
              className="p-4 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">❤️</div>
              <h5 className="font-semibold" style={{ color: colors.darkPlum }}>Made with Love</h5>
              <p className="text-sm text-gray-600">Family recipes & traditions</p>
            </div>
          </div>

          <div 
            style={{ 
              backgroundColor: colors.darkPlum, 
              color: 'white', 
              padding: '24px', 
              borderRadius: '12px' 
            }}
            className="text-center"
          >
            <h4 className="font-semibold text-lg mb-3">Visit Our Shop</h4>
            <p className="text-sm opacity-90">
              📍 Nagapossani Amman Lane, Kondavil East, Kondavil
            </p>
            <p className="text-sm opacity-90 mt-1">
              📞 <a href="tel:0769248360" style={{ color: colors.gold }}>076 924 8360</a>
            </p>
            <p className="text-xs opacity-70 mt-3">
              Open Monday – Saturday · 8:00 AM – 8:00 PM
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 italic mt-4">
            "Every cake tells a story, and every snack is a memory in the making."
          </p>
        </div>
      </div>
    </div>
  </main>
);


// ------------------------------------------------------------------
// Main App Component
// ------------------------------------------------------------------
const App = () => {
  const [currentPage, setCurrentPage] = React.useState('login');
  const { isLoggedIn, userRole, loadFromStorage } = useAuthStore();

  const isManager = userRole === 'MANAGER' || userRole === 'ADMIN';

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleNavigate = (page) => {
    // Restrict manager-only pages
    const managerOnly = ['analytics', 'inventory'];
    if (managerOnly.includes(page) && !isManager) {
      toast.error('Access denied. Manager privileges required.');
      return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return (
        <LoginPage
          onLoginSuccess={() =>
            handleNavigate(isManager ? 'analytics' : 'storefront')
          }
        />
      );
    }

    // Base pages (available to both roles)
    const pages = {
      storefront: <StorefrontPage onNavigate={handleNavigate} />,
      cart: <CartPage onNavigate={handleNavigate} />,
      checkout: <CheckoutPage onNavigate={handleNavigate} />,
      profile: <ProfilePage onNavigate={handleNavigate} />,
      'personal-info': <PersonalInfoPage onNavigate={handleNavigate} />,
      'order-history': <OrderHistoryPage onNavigate={handleNavigate} />,
      'payment-methods': <PaymentMethodsPage onNavigate={handleNavigate} />,
      notifications: <NotificationsPage onNavigate={handleNavigate} />,
      about: <AboutPage onNavigate={handleNavigate} />, // about page for customers
      // Footer routes
      faqs: <FAQsPage onNavigate={handleNavigate} />,
      privacy: <PrivacyPolicyPage onNavigate={handleNavigate} />,
      terms: <TermsPage onNavigate={handleNavigate} />,
      shipping: <ShippingDetailsPage onNavigate={handleNavigate} />,
      'best-sellers': <BestSellersPage onNavigate={handleNavigate} />,
      contact: <ContactPage onNavigate={handleNavigate} />,
      'order-detail': <OrderDetailPage onNavigate={handleNavigate} />,
    };

    // Manager-only pages (protected)
    if (isManager) {
      pages.analytics = <AnalyticsPage />;
      pages.inventory = <InventoryPage />;
    }

    return pages[currentPage] || pages.storefront;
  };

  return (
    <div style={{ backgroundColor: colors.softCream, minHeight: '100vh' }}>
      {isLoggedIn && <Header onNavigate={handleNavigate} />}
      {renderPage()}
      {isLoggedIn && <Footer onNavigate={handleNavigate} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;