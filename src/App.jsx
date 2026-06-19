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

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// ------------------------------------------------------------------
// Footer / Static Pages (kept as inline components)
// ------------------------------------------------------------------
const FAQsPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div><h3 className="font-bold">How do I place an order?</h3><p>Add items to cart and proceed to checkout.</p></div>
          <div><h3 className="font-bold">What is your delivery time?</h3><p>Standard: 5-7 days, Express: 2-3 days, White Glove: next day.</p></div>
          <div><h3 className="font-bold">Can I customize my cake?</h3><p>Yes, contact our support team.</p></div>
        </div>
      </div>
    </div>
  </main>
);

const PrivacyPolicyPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
        <p>Your privacy is important to us. We collect only necessary information to process your orders and never share your data with third parties.</p>
      </div>
    </div>
  </main>
);

const TermsPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Terms of Service</h2>
        <p>By using our website, you agree to these terms. All orders are subject to availability.</p>
      </div>
    </div>
  </main>
);

const ShippingDetailsPage = ({ onNavigate }) => (
  <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Shipping Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Standard Delivery</strong> – 5-7 business days · Free</li>
          <li><strong>Express Delivery</strong> – 2-3 business days · $25</li>
          <li><strong>White Glove Delivery</strong> – Next day · $85</li>
        </ul>
      </div>
    </div>
  </main>
);

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
    <div className="max-w-2xl mx-auto">
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: hello@cakesnsnacks.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Elegance Avenue, San Francisco, CA</p>
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