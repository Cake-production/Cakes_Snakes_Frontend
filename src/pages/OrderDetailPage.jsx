import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useAuthStore } from '../context/store';
import { colors } from '../constants/theme';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderDetailPage = ({ onNavigate }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const userId = user?.id;

  // Get order ID from URL or state
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Check if we have an order ID passed via location state
    const state = window.history.state?.state;
    if (state?.orderId) {
      setOrderId(state.orderId);
    } else {
      // Fallback: try to extract from URL path
      const pathParts = window.location.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart && !isNaN(lastPart)) {
        setOrderId(parseInt(lastPart));
      } else {
        toast.error('Order not found');
        onNavigate('order-history');
      }
    }
  }, []);

  useEffect(() => {
    if (orderId && userId) {
      fetchOrderDetails();
    }
  }, [orderId, userId]);

  const fetchOrderDetails = async () => {
    try {
      const data = await orderAPI.getById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
      onNavigate('order-history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED': return colors.success;
      case 'PROCESSING': return colors.gold;
      case 'CONFIRMED': return '#3b82f6';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return colors.error;
      case 'REFUNDED': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: '#666' }}>Loading order details...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: '#666' }}>Order not found</p>
          <button
            onClick={() => onNavigate('order-history')}
            style={{ color: colors.gold }}
            className="mt-4 underline font-semibold"
          >
            Back to Orders
          </button>
        </div>
      </main>
    );
  }

  const subtotal = order.subtotal || 0;
  const shipping = order.shippingCost || 0;
  const tax = order.taxAmount || 0;
  const total = order.totalAmount || 0;

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('order-history')}
          style={{ color: colors.gold }}
          className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold">
                Order Details
              </h2>
              <p style={{ color: '#666' }} className="text-sm mt-1">
                {order.orderNumber || `Order #${order.id}`}
              </p>
              <p style={{ color: '#666' }} className="text-sm">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              style={{
                backgroundColor: getStatusColor(order.status),
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {order.status?.toLowerCase() || 'unknown'}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Package size={20} style={{ color: colors.gold }} />
              Order Items
            </h3>
            <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }}>
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center py-2 ${idx < order.orderItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div>
                      <p className="font-semibold">{item.productName || 'Product'}</p>
                      <p style={{ color: '#666' }} className="text-sm">
                        Qty: {item.quantity || 1} × ${(item.unitPrice || 0).toFixed(2)}
                      </p>
                      {item.specialInstructions && (
                        <p style={{ color: '#666' }} className="text-xs italic">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    <span style={{ color: colors.gold, fontWeight: 'bold' }}>
                      ${(item.lineTotal || (item.quantity * item.unitPrice) || 0).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666' }}>No items found</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin size={20} style={{ color: colors.gold }} />
              Shipping Details
            </h3>
            <div style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }}>
              <p className="font-semibold">
                {order.shippingAddress?.firstName || ''} {order.shippingAddress?.lastName || ''}
              </p>
              <p style={{ color: '#666' }} className="text-sm">
                {order.shippingAddress?.street || ''}
              </p>
              <p style={{ color: '#666' }} className="text-sm">
                {order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} {order.shippingAddress?.zipCode || ''}
              </p>
              <p style={{ color: '#666' }} className="text-sm">
                {order.shippingAddress?.country || 'USA'}
              </p>
              <p style={{ color: '#666' }} className="text-sm mt-2">
                <strong>Delivery:</strong> {order.deliveryOption || 'Standard'}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <CreditCard size={20} style={{ color: colors.gold }} />
              Payment Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: `2px solid ${colors.gold}` }} className="pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span style={{ color: colors.gold }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailPage;