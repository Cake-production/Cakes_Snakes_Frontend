# Cakes & Snacks - Premium Artisanal Bakery E-commerce SPA

A production-ready React single-page application for an artisanal bakery e-commerce platform with customer and manager dashboards.

## 🎨 Design System: "Velvet & Gold"

- **Dark Plum (#3b1e30)** - Primary brand color for headers and accents
- **Artisanal Gold (#d4af37)** - CTAs, highlights, and interactive elements
- **Champagne Cream (#f5f1e8)** - Warm, inviting background tones
- **Playfair Display** - Elegant serif headings
- **Inter** - Clean sans-serif body text

## 📁 Project Structure

```
cakes-and-snacks-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Page components
│   │   ├── LoginPage.jsx
│   │   ├── StorefrontPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── InventoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── PersonalInfoPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── PaymentMethodsPage.jsx
│   │   └── NotificationsPage.jsx
│   ├── services/           # API services
│   │   └── api.js         # Axios instance with mock data fallback
│   ├── context/            # State management
│   │   └── store.js       # Zustand stores
│   ├── data/              # Mock data
│   │   └── mockData.js
│   ├── constants/         # Theme & configuration
│   │   └── theme.js
│   ├── App.jsx            # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

## ✨ Features

### Customer Features
- ✅ User Authentication (Login/Logout)
- ✅ Responsive Storefront with Product Showcase
- ✅ Shopping Cart with Real-time Updates
- ✅ Multi-step Checkout Process
  - Shipping Information
  - Payment Integration (Cards, Apple Pay, PayPal, Crypto)
  - Order Review
  - Order Confirmation
- ✅ Customer Profile Dashboard
  - Personal Information
  - Order History
  - Payment Methods
  - Notification Preferences
- ✅ Responsive Mobile Design

### Manager Features
- ✅ Analytics Dashboard
  - KPI Statistics
  - Revenue Trends
  - Sales by Category
  - Top Performing Products
  - Recent Orders
- ✅ Inventory Management
  - Product CRUD Operations
  - Stock Level Tracking
  - Revenue Calculations

### Technical Features
- ✅ Mock Data System (Works without backend)
- ✅ Axios API Integration (Ready for real backend)
- ✅ Zustand State Management
- ✅ Responsive Design with Tailwind CSS
- ✅ Toast Notifications
- ✅ Authentication Token Management
- ✅ Smooth Page Transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Create Environment File**
```bash
cp .env.example .env.local
```

3. **Start Development Server**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🔐 Demo Credentials

**Customer Login:**
- Email: customer@example.com
- Password: (any password)

**Manager Login:**
- Email: manager@example.com
- Password: (any password)

*Note: Use any email/password combination for demo purposes*

## 📡 API Integration

The app uses Axios with automatic fallback to mock data:

1. **Mock Data Mode** (Default)
   - No backend required
   - Automatic delays simulate API calls
   - Perfect for development/demo

2. **Real API Mode**
   - Set `REACT_APP_API_URL` in `.env.local`
   - API endpoints: `/api/products`, `/api/orders`, `/api/users`, etc.

### API Service Structure

```javascript
// Example usage
import { productAPI, orderAPI, userAPI } from './services/api';

// Get all products (with fallback to mock data)
const products = await productAPI.getAll();

// Create order
const order = await orderAPI.create(orderData);

// User login
const user = await userAPI.login(email, password);
```

## 🎯 Key Dependencies

- **React 18** - UI Framework
- **Zustand** - State Management
- **Axios** - HTTP Client
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon Library
- **React Hot Toast** - Toast Notifications

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🛠️ Development

### Add New Page
1. Create page component in `src/pages/`
2. Import in `src/App.jsx`
3. Add to routing logic

### Add New API Call
1. Add method to `src/services/api.js`
2. Include mock data fallback
3. Use in components with try-catch

### Customize Colors
Edit `src/constants/theme.js`:
```javascript
export const colors = {
  darkPlum: '#3b1e30',
  gold: '#d4af37',
  // ... more colors
};
```

## 📦 Build Output

The build folder contains:
- Minified JS bundles
- Optimized images
- HTML file
- Service worker (optional)

## 🔒 Security Features

- JWT token management in localStorage
- Protected routes (login required)
- API request interceptors
- Error handling and logging

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop build folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload build folder to your server
```

## 📝 Environment Variables

Create `.env.local` file:
```
REACT_APP_API_URL=http://192.168.1.136:8080
REACT_APP_ENV=development
```

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
npx kill-port 3000
npm start
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not showing:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review mock data in `src/data/mockData.js`
3. Inspect browser console for errors
4. Test API with Postman

## 🎉 Ready to Use!

This is a complete, production-ready React application. You can:
- Use it as-is for a demo/portfolio
- Connect it to a real backend API
- Customize colors and branding
- Deploy to any hosting provider
- Extend with additional features

Happy coding! 🚀
