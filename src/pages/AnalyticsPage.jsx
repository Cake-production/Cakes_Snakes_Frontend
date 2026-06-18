import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import { colors } from '../constants/theme';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    topProducts: [],
    monthlySales: [],
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await analyticsAPI.getDashboardStats();
      // Ensure data is an object with the expected properties
      setStats({
        totalRevenue: data.totalRevenue || 0,
        totalOrders: data.totalOrders || 0,
        totalCustomers: data.totalCustomers || 0,
        topProducts: Array.isArray(data.topProducts) ? data.topProducts : [],
        monthlySales: Array.isArray(data.monthlySales) ? data.monthlySales : [],
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Unable to load analytics data. Showing demo data.');
      // Fallback demo data
      setStats({
        totalRevenue: 12450,
        totalOrders: 156,
        totalCustomers: 89,
        topProducts: [
          { name: 'Truffle Canelé Cake', sales: 45 },
          { name: 'Gold Leaf Macarons', sales: 38 },
          { name: 'Champagne Tier Cake', sales: 27 },
        ],
        monthlySales: [
          { month: 'Jan', sales: 3200 },
          { month: 'Feb', sales: 2800 },
          { month: 'Mar', sales: 4100 },
          { month: 'Apr', sales: 3800 },
          { month: 'May', sales: 5200 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.softCream }}>
        <p className="text-lg" style={{ color: colors.darkPlum }}>Loading analytics...</p>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: colors.darkPlum }}>
          Analytics Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold" style={{ color: colors.gold }}>${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign size={40} style={{ color: colors.gold }} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold" style={{ color: colors.darkPlum }}>{stats.totalOrders}</p>
            </div>
            <ShoppingBag size={40} style={{ color: colors.darkPlum }} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold" style={{ color: colors.darkPlum }}>{stats.totalCustomers}</p>
            </div>
            <Users size={40} style={{ color: colors.darkPlum }} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Growth</p>
              <p className="text-2xl font-bold text-green-600">+12.5%</p>
            </div>
            <TrendingUp size={40} className="text-green-600" />
          </div>
        </div>

        {/* Monthly Sales Chart (simple bar representation) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.darkPlum }}>Monthly Sales</h3>
          <div className="flex items-end space-x-4 h-48">
            {stats.monthlySales.length > 0 ? (
              stats.monthlySales.map((item) => {
                const max = Math.max(...stats.monthlySales.map(m => m.sales), 1);
                const height = (item.sales / max) * 100;
                return (
                  <div key={item.month} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full rounded-t"
                      style={{ backgroundColor: colors.gold, height: `${height}%`, minHeight: '4px' }}
                    />
                    <p className="text-xs mt-2">{item.month}</p>
                    <p className="text-xs font-semibold">${item.sales}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No monthly sales data available</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.darkPlum }}>Top Selling Products</h3>
          {stats.topProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-sm" style={{ color: colors.gold }}>{product.sales} units</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No product data available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default AnalyticsPage;