import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================================
// AUTH STORE
// ============================================================
export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      userRole: 'customer',

      login: (user, role) => {
        set({ isLoggedIn: true, user, userRole: role });
        localStorage.setItem('user', JSON.stringify({ user, role }));
      },

      logout: () => {
        set({ isLoggedIn: false, user: null, userRole: 'customer' });
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      },

      loadFromStorage: () => {
        const stored = localStorage.getItem('user');
        if (stored) {
          const { user, role } = JSON.parse(stored);
          set({ isLoggedIn: true, user, userRole: role });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ============================================================
// CART STORE
// ============================================================
export const useCartStore = create((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (product) => {
    set((state) => {
      const newItems = [...state.items, { ...product, cartId: Date.now() }];
      const total = newItems.reduce((sum, item) => sum + item.price, 0);
      return {
        items: newItems,
        totalItems: newItems.length,
        totalPrice: total,
      };
    });
  },

  removeItem: (cartId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.cartId !== cartId);
      const total = newItems.reduce((sum, item) => sum + item.price, 0);
      return {
        items: newItems,
        totalItems: newItems.length,
        totalPrice: total,
      };
    });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));

// ============================================================
// ORDER STORE
// ============================================================
export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  setOrders: (orders) => set({ orders }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  setLoading: (loading) => set({ loading }),

  addOrder: (order) => {
    set((state) => ({
      orders: [...state.orders, order],
      currentOrder: order,
    }));
  },
}));

// ============================================================
// PRODUCT STORE
// ============================================================
export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));