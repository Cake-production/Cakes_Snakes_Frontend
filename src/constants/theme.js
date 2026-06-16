// src/constants/theme.js
export const colors = {
  darkPlum: '#5b3a5e',      // deep royal purple
  gold: '#e8a0b4',          // pink gold / rose pink
  champagne: '#faf5fc',     // lavender blush (very light purple-pink)
  softCream: '#fff0f5',     // lavender pink (soft background)
  charcoal: '#2a2a2a',
  lightGray: '#f2e6f0',
  error: '#d32f2f',
  success: '#2e7d32',
  warning: '#f57c00',
  white: '#ffffff',
};

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const ROUTES = {
  LOGIN: '/login',
  STOREFRONT: '/storefront',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation',
  PROFILE: '/profile',
  ANALYTICS: '/analytics',
  INVENTORY: '/inventory',
  PERSONAL_INFO: '/profile/personal-info',
  ORDER_HISTORY: '/profile/order-history',
  PAYMENT_METHODS: '/profile/payment-methods',
  NOTIFICATIONS: '/profile/notifications',
};