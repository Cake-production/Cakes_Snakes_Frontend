import axios from 'axios';
import { mockProducts, mockRecentOrders, mockDashboardStats } from '../data/mockData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ============ PRODUCTS API ============
export const productAPI = {
  getAll: async () => {
    try {
      // Try real API first
      return await apiClient.get('/products');
    } catch (error) {
      console.log('Using mock data for products');
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockProducts), 500);
      });
    }
  },

  getById: async (id) => {
    try {
      return await apiClient.get(`/products/${id}`);
    } catch (error) {
      const product = mockProducts.find((p) => p.id === parseInt(id));
      return new Promise((resolve) => {
        setTimeout(() => resolve(product), 300);
      });
    }
  },

  create: async (productData) => {
    try {
      return await apiClient.post('/products', productData);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  update: async (id, productData) => {
    try {
      return await apiClient.put(`/products/${id}`, productData);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  delete: async (id) => {
    try {
      return await apiClient.delete(`/products/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

// ============ ORDERS API ============
export const orderAPI = {
  getAll: async () => {
    try {
      return await apiClient.get('/orders');
    } catch (error) {
      console.log('Using mock data for orders');
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockRecentOrders), 500);
      });
    }
  },

  getById: async (id) => {
    try {
      return await apiClient.get(`/orders/${id}`);
    } catch (error) {
      const order = mockRecentOrders.find((o) => o.id === id);
      return new Promise((resolve) => {
        setTimeout(() => resolve(order), 300);
      });
    }
  },

  create: async (orderData) => {
    try {
      return await apiClient.post('/orders', orderData);
    } catch (error) {
      // Mock order creation
      const mockOrder = {
        id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        ...orderData,
        status: 'confirmed',
        date: new Date().toLocaleDateString(),
      };
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockOrder), 800);
      });
    }
  },

  updateStatus: async (id, status) => {
    try {
      return await apiClient.patch(`/orders/${id}`, { status });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

// ============ USERS API ============
export const userAPI = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      // Mock login
      const mockToken = 'mock_token_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('authToken', mockToken);
      return {
        token: mockToken,
        user: {
          id: email.includes('manager') ? 'mgr_001' : 'cust_001',
          email,
          role: email.includes('manager') ? 'manager' : 'customer',
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },

  getProfile: async () => {
    try {
      return await apiClient.get('/users/profile');
    } catch (error) {
      // Mock profile
      return {
        id: 'cust_001',
        name: 'Alexandra Beaumont',
        email: 'alexandra@example.com',
        phone: '+1 (555) 123-4567',
        role: 'customer',
      };
    }
  },

  updateProfile: async (userData) => {
    try {
      return await apiClient.put('/users/profile', userData);
    } catch (error) {
      return Promise.resolve(userData);
    }
  },
};

// ============ ANALYTICS API ============
export const analyticsAPI = {
  getDashboardStats: async () => {
    try {
      return await apiClient.get('/analytics/dashboard');
    } catch (error) {
      console.log('Using mock data for analytics');
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDashboardStats), 500);
      });
    }
  },

  getRevenueData: async (period = 'month') => {
    try {
      return await apiClient.get(`/analytics/revenue?period=${period}`);
    } catch (error) {
      // Mock revenue data
      const mockData = [
        { date: '12/01', revenue: 2400 },
        { date: '12/05', revenue: 1398 },
        { date: '12/10', revenue: 9800 },
        { date: '12/15', revenue: 3908 },
        { date: '12/20', revenue: 4800 },
        { date: '12/25', revenue: 3800 },
      ];
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500);
      });
    }
  },

  getSalesData: async () => {
    try {
      return await apiClient.get('/analytics/sales');
    } catch (error) {
      // Mock sales data
      const mockData = [
        { name: 'Cakes', value: 400 },
        { name: 'Tarts', value: 300 },
        { name: 'Pastries', value: 200 },
        { name: 'Seasonal', value: 150 },
      ];
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500);
      });
    }
  },
};

// ============ PAYMENT API ============
export const paymentAPI = {
  processPayment: async (paymentData) => {
    try {
      return await apiClient.post('/payments/process', paymentData);
    } catch (error) {
      // Mock payment processing
      const mockPaymentResponse = {
        id: `pay_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount: paymentData.amount,
        timestamp: new Date().toISOString(),
      };
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockPaymentResponse), 1500);
      });
    }
  },

  getPaymentMethods: async () => {
    try {
      return await apiClient.get('/payments/methods');
    } catch (error) {
      return [
        { id: 'pm_001', brand: 'Visa', last4: '4242', expiry: '12/26' },
        { id: 'pm_002', brand: 'Mastercard', last4: '5555', expiry: '03/27' },
      ];
    }
  },

  savePaymentMethod: async (methodData) => {
    try {
      return await apiClient.post('/payments/methods', methodData);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default apiClient;
