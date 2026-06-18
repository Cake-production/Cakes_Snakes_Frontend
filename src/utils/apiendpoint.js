// src/services/endpoints.js (no TypeScript)
const BASE = '/api';

export const ENDPOINTS = {
  // Payments
  addPaymentMethod: (userId) => `${BASE}/payments/methods?userId=${userId}`,
  getUserPaymentMethods: (userId) => `${BASE}/payments/methods/user/${userId}`,
  getPaymentMethod: (methodId) => `${BASE}/payments/methods/detail/${methodId}`,
  updatePaymentMethod: (methodId) => `${BASE}/payments/methods/${methodId}`,
  deletePaymentMethod: (methodId) => `${BASE}/payments/methods/${methodId}`,
  setDefaultPaymentMethod: (methodId) => `${BASE}/payments/methods/${methodId}/set-default`,
  processPayment: `${BASE}/payments/process`,
  getPaymentById: (paymentId) => `${BASE}/payments/${paymentId}`,
  getPaymentByOrderId: (orderId) => `${BASE}/payments/order/${orderId}`,
  refundPayment: (paymentId) => `${BASE}/payments/${paymentId}/refund`,

  // Analytics
  getDashboardStats: `${BASE}/analytics/dashboard`,
  getTopSellingProducts: `${BASE}/analytics/top-products`,
  getMonthlyStats: `${BASE}/analytics/monthly-stats`,
  getTotalRevenue: `${BASE}/analytics/revenue`,
  getTotalOrdersCount: `${BASE}/analytics/orders-count`,
  getTotalCustomersCount: `${BASE}/analytics/customers-count`,

  // Auth
  register: `${BASE}/auth/register`,
  login: `${BASE}/auth/login`,
  refreshToken: (refreshToken) => `${BASE}/auth/refresh-token?refreshToken=${refreshToken}`,
  logout: `${BASE}/auth/logout`,

  // Orders
  createOrder: (userId) => `${BASE}/orders?userId=${userId}`,
  getOrderById: (id) => `${BASE}/orders/${id}`,
  getUserOrders: (userId) => `${BASE}/orders/user/${userId}`,
  updateOrderStatus: (id, status) => `${BASE}/orders/${id}/status?status=${status}`,
  cancelOrder: (id) => `${BASE}/orders/${id}/cancel`,

  // Products
  createProduct: `${BASE}/products`,
  getProductById: (id) => `${BASE}/products/${id}`,
  getAllProducts: `${BASE}/products`,
  getProductsByCategory: (category) => `${BASE}/products/category/${category}`,
  getTopSellingProducts: `${BASE}/products/top-selling`,
  getLatestProducts: `${BASE}/products/latest`,
  updateProduct: (id) => `${BASE}/products/${id}`,
  deleteProduct: (id) => `${BASE}/products/${id}`,

  // Users
  registerUser: `${BASE}/users/register`,
  getUserById: (id) => `${BASE}/users/${id}`,
  updateUser: (id) => `${BASE}/users/${id}`,
  getAllCustomers: `${BASE}/users`,
  deleteUser: (id) => `${BASE}/users/${id}`,
  getUserByEmail: (email) => `${BASE}/users/email/${email}`,
};