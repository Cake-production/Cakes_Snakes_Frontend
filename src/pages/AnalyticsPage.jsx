import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import { colors } from '../constants/theme';
import { mockDashboardStats, mockTopSellingProducts } from '../data/mockData';

const AnalyticsPage = () => {
  const [stats, setStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState(mockTopSellingProducts);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const dashboardData = await analyticsAPI.getDashboardStats();
      setStats(dashboardData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold">
            Analytics Dashboard
          </h2>
          <select style={{ borderColor: colors.gold }} className="border-2 px-4 py-2 rounded-lg focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last Quarter</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderTopColor: colors.gold }} className="border-t-4 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p style={{ color: '#666' }} className="text-sm mb-2">
                {stat.label}
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-2">
                {stat.value}
              </h3>
              <p style={{ color: stat.trend === 'up' ? colors.success : colors.error }} className="text-sm font-semibold">
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-6">
              Revenue Trend
            </h3>
            <div style={{ backgroundColor: colors.champagne, height: '300px', borderRadius: '8px' }} className="flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div style={{ fontSize: '40px' }} className="mb-2">
                  📈
                </div>
                <p>Revenue Chart Visualization</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-6">
              Sales by Category
            </h3>
            <div style={{ backgroundColor: colors.champagne, height: '300px', borderRadius: '8px' }} className="flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div style={{ fontSize: '40px' }} className="mb-2">
                  🥧
                </div>
                <p>Category Distribution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Products */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-6">
            Top Performing Products
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {topProducts.map((prod, idx) => (
              <div key={idx} style={{ backgroundColor: colors.champagne, borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '12px' }}>
                  {prod.image}
                </div>
                <h4 className="font-semibold mb-2">{prod.name}</h4>
                <div style={{ color: colors.gold }} className="text-sm font-semibold mb-1">
                  {prod.price} per unit
                </div>
                <div style={{ color: colors.success }} className="text-lg font-bold">
                  {prod.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px' }} className="shadow-md mt-12">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }} className="font-bold mb-6">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.darkPlum, color: 'white' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'ORD-001', customer: 'Alexandra M.', items: 2, status: 'delivered', total: '$145.00' },
                  { id: 'ORD-002', customer: 'James P.', items: 1, status: 'processing', total: '$95.00' },
                  { id: 'ORD-003', customer: 'Elena R.', items: 3, status: 'confirmed', total: '$210.50' },
                ].map((order, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? colors.champagne : 'white', borderBottomColor: colors.lightGray }} className="border-b">
                    <td className="px-6 py-4 font-semibold">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.items} items</td>
                    <td className="px-6 py-4">
                      <span
                        style={{
                          backgroundColor: order.status === 'delivered' ? colors.success : colors.gold,
                          color: order.status === 'delivered' ? 'white' : colors.darkPlum,
                        }}
                        className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnalyticsPage;
