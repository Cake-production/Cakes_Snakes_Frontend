import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { colors } from '../constants/theme';
import { useCartStore } from '../context/store';
import toast from 'react-hot-toast';

const BestSellersPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAll();
      const bestSellers = data.filter(p => p.badge?.toLowerCase().includes('best') || p.badge?.toLowerCase().includes('seller'));
      setProducts(bestSellers);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load best sellers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => onNavigate('storefront')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Shop
        </button>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold mb-8">Our Best Sellers</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '12px' }} className="shadow-md overflow-hidden">
                <div style={{ backgroundColor: colors.champagne, fontSize: '80px' }} className="h-48 flex items-center justify-center">{product.image}</div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500 my-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span style={{ color: colors.gold }} className="text-xl font-bold">${product.price}</span>
                    <button onClick={() => { addItem(product); toast.success('Added to cart'); }} style={{ backgroundColor: colors.darkPlum }} className="text-white px-3 py-1 rounded">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BestSellersPage;