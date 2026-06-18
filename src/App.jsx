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
      <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="mb-6 flex items-center gap-2 font-semibold">← Back to Shop</button>
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4">About Cakes & Snacks</h2>
        <p className="mb-4">We are a premium artisanal bakery, crafting exquisite pastries, cakes, and confections with love and the finest ingredients.</p>
        <p>Our journey began in a small kitchen, and today we serve customers worldwide with our signature creations.</p>
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