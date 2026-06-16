import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { colors } from '../constants/theme';
import { mockRecentOrders } from '../data/mockData';

const OrderHistoryPage = ({ onNavigate }) => {
  const [orders, setOrders] = useState(mockRecentOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('profile')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Account
        </button>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
          Your Orders
        </h2>

        {loading ? (
          <p style={{ color: '#666' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '32px', textAlign: 'center', borderRadius: '12px' }} className="shadow-md">
            <p style={{ color: '#666' }}>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} style={{ backgroundColor: 'white', borderLeftColor: colors.gold }} className="border-l-4 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }} className="font-bold">
                      {order.id}
                    </h3>
                    <p style={{ color: '#666' }} className="text-sm">
                      {order.date}
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: order.status === 'delivered' ? colors.success : colors.gold,
                      color: order.status === 'delivered' ? 'white' : colors.darkPlum,
                    }}
                    className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                  >
                    {order.status}
                  </span>
                </div>
                <div style={{ borderTopColor: colors.lightGray }} className="border-t pt-4">
                  {order.products?.map((product, idx) => (
                    <p key={idx} style={{ color: '#666' }} className="text-sm">
                      • {product}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTopColor: colors.lightGray }} className="border-t">
                  <span className="font-bold">{order.total}</span>
                  <button style={{ color: colors.gold }} className="font-semibold hover:opacity-80">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderHistoryPage;
