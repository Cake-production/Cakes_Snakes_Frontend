const BASE = "/api";

export const ENDPOINTS = {
  // ========== PAYMENTS ==========
  // Payment methods
  addPaymentMethod: (userId: number) => `${BASE}/payments/methods?userId=${userId}`,
  getUserPaymentMethods: (userId: number) => `${BASE}/payments/methods/user/${userId}`,
  getPaymentMethod: (methodId: number) => `${BASE}/payments/methods/detail/${methodId}`,
  updatePaymentMethod: (methodId: number) => `${BASE}/payments/methods/${methodId}`,
  deletePaymentMethod: (methodId: number) => `${BASE}/payments/methods/${methodId}`,
  setDefaultPaymentMethod: (methodId: number) => `${BASE}/payments/methods/${methodId}/set-default`,

  // Payments processing
  processPayment: `${BASE}/payments/process`,
  getPaymentById: (paymentId: number) => `${BASE}/payments/${paymentId}`,
  getPaymentByOrderId: (orderId: number) => `${BASE}/payments/order/${orderId}`,
  refundPayment: (paymentId: number) => `${BASE}/payments/${paymentId}/refund`,

  // ========== ANALYTICS ==========
  getDashboardStats: `${BASE}/analytics/dashboard`,
  getTopSellingProducts: `${BASE}/analytics/top-products`,
  getMonthlyStats: `${BASE}/analytics/monthly-stats`,
  getTotalRevenue: `${BASE}/analytics/revenue`,
  getTotalOrdersCount: `${BASE}/analytics/orders-count`,
  getTotalCustomersCount: `${BASE}/analytics/customers-count`,

  // ========== AUTH ==========
  register: `${BASE}/auth/register`,
  login: `${BASE}/auth/login`,
  refreshToken: (refreshToken: string) => `${BASE}/auth/refresh-token?refreshToken=${refreshToken}`,
  logout: `${BASE}/auth/logout`,

  // ========== ORDERS ==========
  createOrder: (userId: number) => `${BASE}/orders?userId=${userId}`,
  getOrderById: (id: number) => `${BASE}/orders/${id}`,
  getUserOrders: (userId: number) => `${BASE}/orders/user/${userId}`,
  updateOrderStatus: (id: number, status: string) => `${BASE}/orders/${id}/status?status=${status}`,
  cancelOrder: (id: number) => `${BASE}/orders/${id}/cancel`,

  // ========== PRODUCTS ==========
  createProduct: `${BASE}/products`,
  getProductById: (id: number) => `${BASE}/products/${id}`,
  getAllProducts: `${BASE}/products`,
  getProductsByCategory: (category: string) => `${BASE}/products/category/${category}`,
  getTopSellingProducts: `${BASE}/products/top-selling`,
  getLatestProducts: `${BASE}/products/latest`,
  updateProduct: (id: number) => `${BASE}/products/${id}`,
  deleteProduct: (id: number) => `${BASE}/products/${id}`,

  // ========== USERS ==========
  registerUser: `${BASE}/users/register`,   // Note: Also available via /auth/register
  getUserById: (id: number) => `${BASE}/users/${id}`,
  updateUser: (id: number) => `${BASE}/users/${id}`,
  getAllCustomers: `${BASE}/users`,
  deleteUser: (id: number) => `${BASE}/users/${id}`,
  getUserByEmail: (email: string) => `${BASE}/users/email/${email}`,
};