import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { useAuthStore } from '../context/store';
import { colors } from '../constants/theme';
import toast from 'react-hot-toast';

const OrderHistoryPage = ({ onNavigate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    } else {
      toast.error('Please log in to view your orders');
      setLoading(false);
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getUserOrders(userId);
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load order history');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return colors.success;
      case 'PROCESSING':
        return colors.gold;
      case 'CONFIRMED':
        return '#3b82f6'; // blue
      case 'PENDING':
        return '#f59e0b'; // amber
      case 'CANCELLED':
        return colors.error;
      case 'REFUNDED':
        return '#8b5cf6'; // purple
      default:
        return '#6b7280'; // gray
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: '#666' }}>Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('profile')}
          style={{ color: colors.gold }}
          className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80"
        >
          ← Back to Account
        </button>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <div
            style={{ backgroundColor: 'white', padding: '32px', textAlign: 'center', borderRadius: '12px' }}
            className="shadow-md"
          >
            <p style={{ color: '#666' }}>You haven't placed any orders yet.</p>
            <button
              onClick={() => onNavigate('storefront')}
              style={{ color: colors.gold }}
              className="mt-4 underline font-semibold"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              // Build product list from order items
              const productNames = order.orderItems?.map(item => item.productName) || [];
              const total = order.totalAmount || 0;

              return (
                <div
                  key={order.id}
                  style={{ backgroundColor: 'white', borderLeftColor: colors.gold }}
                  className="border-l-4 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }} className="font-bold">
                        {order.orderNumber || `Order #${order.id}`}
                      </h3>
                      <p style={{ color: '#666' }} className="text-sm">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: getStatusColor(order.status),
                        color: 'white',
                      }}
                      className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                    >
                      {order.status?.toLowerCase() || 'unknown'}
                    </span>
                  </div>

                  <div style={{ borderTopColor: colors.lightGray }} className="border-t pt-4">
                    {productNames.length > 0 ? (
                      productNames.map((name, idx) => (
                        <p key={idx} style={{ color: '#666' }} className="text-sm">
                          • {name}
                        </p>
                      ))
                    ) : (
                      <p style={{ color: '#666' }} className="text-sm">No items</p>
                    )}
                  </div>

                  <div
                    className="flex justify-between items-center mt-4 pt-4"
                    style={{ borderTopColor: colors.lightGray }}
                  >
                    <span className="font-bold">${total.toFixed(2)}</span>
                    <button
                      onClick={() => onNavigate(`/order/${order.id}`)}
                      style={{ color: colors.gold }}
                      className="font-semibold hover:opacity-80"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistoryPage;