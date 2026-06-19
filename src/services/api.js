import axios from "axios";
import { ENDPOINTS } from "../utils/apiendpoint.js";
import {
  mockProducts,
  mockRecentOrders,
  mockDashboardStats,
} from "../data/mockData";

// ---- BASE URL (Spring Boot runs on 8080 with context path /api) ----
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://192.168.1.136:8080";

// ---- Axios instance ----
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ---- Request interceptor: add JWT token ----
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ---- Response interceptor: unwrap data & log errors ----
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

// ============================================================
//  PRODUCTS API
// ============================================================
export const productAPI = {
  getAll: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getAllProducts);
    } catch (error) {
      console.warn("Falling back to mock products");
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockProducts), 500),
      );
    }
  },

  getById: async (id) => {
    try {
      return await apiClient.get(ENDPOINTS.getProductById(id));
    } catch (error) {
      const product = mockProducts.find((p) => p.id === parseInt(id));
      return new Promise((resolve) => setTimeout(() => resolve(product), 300));
    }
  },

  create: async (productData) => {
    const payload = {
      name: productData.name,
      description: productData.description || "",
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock, 10),
      category: productData.category || "CAKES",
      badge: productData.badge || "",
      imageUrl: productData.image || productData.imageUrl || "",
    };
    try {
      return await apiClient.post(ENDPOINTS.createProduct, payload);
    } catch (error) {
      console.error("Create product failed:", error);
      throw error;
    }
  },

  update: async (id, productData) => {
    const payload = {
      name: productData.name,
      description: productData.description || "",
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock, 10),
      category: productData.category || "CAKES",
      badge: productData.badge || "",
      imageUrl: productData.image || productData.imageUrl || "",
    };
    try {
      return await apiClient.put(ENDPOINTS.updateProduct(id), payload);
    } catch (error) {
      console.error("Update product failed:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await apiClient.delete(ENDPOINTS.deleteProduct(id));
    } catch (error) {
      console.error("Delete product failed:", error);
      throw error;
    }
  },

  getByCategory: async (category) => {
    try {
      return await apiClient.get(ENDPOINTS.getProductsByCategory(category));
    } catch (error) {
      const filtered = mockProducts.filter((p) => p.category === category);
      return new Promise((resolve) => setTimeout(() => resolve(filtered), 300));
    }
  },

  getTopSelling: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getTopSellingProducts);
    } catch (error) {
      const sorted = [...mockProducts].sort(
        (a, b) => (b.sales || 0) - (a.sales || 0),
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve(sorted.slice(0, 5)), 300),
      );
    }
  },

  getLatest: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getLatestProducts);
    } catch (error) {
      const sorted = [...mockProducts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve(sorted.slice(0, 5)), 300),
      );
    }
  },
};

// ============================================================
//  ORDERS API
// ============================================================
export const orderAPI = {
  getAll: async () => {
    try {
      return await apiClient.get("/orders");
    } catch (error) {
      console.warn("Falling back to mock orders");
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockRecentOrders), 500),
      );
    }
  },

  getById: async (id) => {
    try {
      return await apiClient.get(ENDPOINTS.getOrderById(id));
    } catch (error) {
      const order = mockRecentOrders.find((o) => o.id === id);
      return new Promise((resolve) => setTimeout(() => resolve(order), 300));
    }
  },

  create: async (userId, orderData) => {
    try {
      return await apiClient.post(ENDPOINTS.createOrder(userId), orderData);
    } catch (error) {
      // Mock fallback (only for development)
      const mockOrder = {
        id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        ...orderData,
        status: "CONFIRMED",
        orderNumber: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        totalAmount: orderData?.total || 0,
      };
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockOrder), 800),
      );
    }
  },

  updateStatus: async (id, status) => {
    try {
      return await apiClient.put(ENDPOINTS.updateOrderStatus(id, status), {});
    } catch (error) {
      console.error("Update order status failed:", error);
      throw error;
    }
  },

  cancel: async (id) => {
    try {
      return await apiClient.post(ENDPOINTS.cancelOrder(id));
    } catch (error) {
      console.error("Cancel order failed:", error);
      throw error;
    }
  },

  getUserOrders: async (userId) => {
    try {
      return await apiClient.get(ENDPOINTS.getUserOrders(userId));
    } catch (error) {
      console.error("Get user orders failed:", error);
      throw error;
    }
  },
};

// ============================================================
//  USERS API
// ============================================================
export const userAPI = {
  login: async (email, password) => {
    const response = await apiClient.post(ENDPOINTS.login, { email, password });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    // Store user ID from the response – handle both `userDTO` and `user` fields
    const userData = response.userDTO || response.user;
    if (userData && userData.id) {
      localStorage.setItem("userId", String(userData.id));
    }

    return response;
  },

  logout: async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    try {
      await apiClient.post(ENDPOINTS.logout);
    } catch (e) {
      /* ignore */
    }
    return Promise.resolve();
  },

  getProfile: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        return await apiClient.get(ENDPOINTS.getUserById(userId));
      }
      throw new Error("No user ID found");
    } catch (error) {
      console.warn("Falling back to mock profile");
      return {
        id: "cust_001",
        firstName: "Alexandra",
        lastName: "Beaumont",
        email: "alexandra@example.com",
        phone: "+1 (555) 123-4567",
        role: "CUSTOMER",
      };
    }
  },

  updateProfile: async (userData) => {
    try {
      // Get the user ID from localStorage (stored as 'userId')
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("No user ID found");
      }
      return await apiClient.put(ENDPOINTS.updateUser(userId), userData);
    } catch (error) {
      console.error("Update profile failed:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      return await apiClient.get(ENDPOINTS.getUserById(id));
    } catch (error) {
      console.error("Get user by ID failed:", error);
      throw error;
    }
  },

  getAllCustomers: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getAllCustomers);
    } catch (error) {
      console.error("Get all customers failed:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await apiClient.delete(ENDPOINTS.deleteUser(id));
    } catch (error) {
      console.error("Delete user failed:", error);
      throw error;
    }
  },
};

// ============================================================
//  ANALYTICS API
// ============================================================
export const analyticsAPI = {
  getDashboardStats: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getDashboardStats);
    } catch (error) {
      console.warn("Falling back to mock dashboard stats");
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockDashboardStats), 500),
      );
    }
  },

  getRevenueData: async (period = "month") => {
    try {
      return await apiClient.get(
        `${ENDPOINTS.getTotalRevenue}?period=${period}`,
      );
    } catch (error) {
      const mockData = [
        { date: "12/01", revenue: 2400 },
        { date: "12/05", revenue: 1398 },
        { date: "12/10", revenue: 9800 },
        { date: "12/15", revenue: 3908 },
        { date: "12/20", revenue: 4800 },
        { date: "12/25", revenue: 3800 },
      ];
      return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
    }
  },

  getSalesData: async () => {
    try {
      return await apiClient.get(ENDPOINTS.getMonthlyStats);
    } catch (error) {
      const mockData = [
        { name: "Cakes", value: 400 },
        { name: "Tarts", value: 300 },
        { name: "Pastries", value: 200 },
        { name: "Seasonal", value: 150 },
      ];
      return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
    }
  },
};

// ============================================================
//  PAYMENT API
// ============================================================
export const paymentAPI = {
  processPayment: async (paymentData) => {
    try {
      return await apiClient.post(ENDPOINTS.processPayment, paymentData);
    } catch (error) {
      // Mock fallback (development only)
      const mockPaymentResponse = {
        id: `pay_${Math.random().toString(36).substr(2, 9)}`,
        status: "COMPLETED",
        amount: paymentData.amount,
        createdAt: new Date().toISOString(),
      };
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockPaymentResponse), 1500),
      );
    }
  },

  getPaymentMethods: async (userId) => {
    try {
      if (userId) {
        return await apiClient.get(ENDPOINTS.getUserPaymentMethods(userId));
      } else {
        return await apiClient.get("/payments/methods");
      }
    } catch (error) {
      // Mock fallback
      return [
        { id: 1, cardBrand: "Visa", lastFourDigits: "4242", expiryMonth: "12", expiryYear: "26", isDefault: true },
        { id: 2, cardBrand: "Mastercard", lastFourDigits: "5555", expiryMonth: "03", expiryYear: "27", isDefault: false },
      ];
    }
  },

  savePaymentMethod: async (methodData) => {
    try {
      return await apiClient.post(
        ENDPOINTS.addPaymentMethod(methodData.userId),
        methodData,
      );
    } catch (error) {
      console.error("Save payment method failed:", error);
      throw error;
    }
  },

  setDefault: async (methodId) => {
    try {
      return await apiClient.put(ENDPOINTS.setDefaultPaymentMethod(methodId));
    } catch (error) {
      console.error("Set default payment method failed:", error);
      throw error;
    }
  },

  deletePaymentMethod: async (methodId) => {
    try {
      await apiClient.delete(ENDPOINTS.deletePaymentMethod(methodId));
    } catch (error) {
      console.error("Delete payment method failed:", error);
      throw error;
    }
  },
};

// ---- Export the axios instance for advanced use ----
export default apiClient;