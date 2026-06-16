import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../context/store';
import { productAPI } from '../services/api';
import { colors } from '../constants/theme';
import toast from 'react-hot-toast';

const StorefrontPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const heroRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY(((x - centerX) / centerX) * 5);
    setRotateX(((centerY - y) / centerY) * 5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // ✅ fetchProducts moved inside useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll();
        const enriched = data.map(p => ({
          ...p,
          category: p.category || inferCategory(p.name, p.badge)
        }));
        setProducts(enriched);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const inferCategory = (name, badge) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('cake') || badge?.toLowerCase().includes('cake')) return 'Cakes';
    if (lowerName.includes('tart')) return 'Tarts';
    if (lowerName.includes('pastry') || lowerName.includes('croissant')) return 'Pastries';
    return 'Seasonal';
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    toast.success(`Showing ${category} collection`);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    toast.success('Showing all products');
  };

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main style={{ backgroundColor: colors.softCream }}>
      {/* Hero Section with CSS particles (as provided earlier) */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: colors.darkPlum,
          position: 'relative',
          overflow: 'hidden',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="text-white py-20 px-6"
      >
        {/* CSS particle background (same as before) */}
        <div className="hero-particle-bg" style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}>
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.08)',
            top: '-50px',
            left: '-50px',
            animation: 'float 12s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.06)',
            bottom: '-30px',
            right: '-30px',
            animation: 'float 15s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.05)',
            top: '40%',
            left: '30%',
            animation: 'float 18s ease-in-out infinite 2s',
          }} />
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.04)',
            bottom: '20%',
            left: '60%',
            animation: 'float 10s ease-in-out infinite 1s',
          }} />
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'rgba(255, 215, 0, 0.03)',
            top: '10%',
            right: '20%',
            animation: 'float 14s ease-in-out infinite 0.5s',
          }} />
        </div>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(255,215,0,0.1) 0%, transparent 60%)',
          animation: 'pulseGlow 8s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ color: colors.gold }} className="text-sm font-semibold uppercase mb-4">
                Signature Collection
              </p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: '1.2' }} className="mb-4 font-bold">
                Champagne Elegance
              </h2>
              <p style={{ color: colors.champagne }} className="text-lg mb-6 leading-relaxed">
                Our flagship three-tier champagne cake, exquisitely layered with premium vanilla bean cream and delicate edible gold leaf accents.
              </p>
              <button
                onClick={() => onNavigate('checkout')}
                style={{ backgroundColor: colors.gold }}
                className="px-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition"
              >
                Reserve Now →
              </button>
            </div>
            <div style={{ fontSize: '280px', textAlign: 'center' }}>
              🥂
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers section (unchanged) */}
      <section id="products-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-center flex-wrap gap-4">
            <div>
              <p style={{ color: colors.gold }} className="text-sm font-semibold uppercase mb-2">
                Most Loved
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold">
                {selectedCategory ? `${selectedCategory} Collection` : 'Best Sellers'}
              </h3>
            </div>
            {selectedCategory && (
              <button
                onClick={clearFilter}
                style={{ backgroundColor: colors.gold, color: colors.darkPlum }}
                className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-80 transition"
              >
                Show All Products
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p style={{ color: '#666' }}>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: '#666' }}>No products found in {selectedCategory}.</p>
              <button
                onClick={clearFilter}
                style={{ color: colors.gold }}
                className="mt-4 underline font-semibold"
              >
                Browse all products
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ backgroundColor: 'white', borderRadius: '12px' }}
                  className="product-card shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <div
                    style={{ backgroundColor: colors.champagne, fontSize: '100px' }}
                    className="product-image h-56 flex items-center justify-center group-hover:scale-105 transition"
                  >
                    {product.image}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                    </div>
                    <p style={{ color: '#666' }} className="text-sm mb-2">
                      {product.description}
                    </p>
                    <div style={{ backgroundColor: colors.gold, color: colors.darkPlum }} className="inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4">
                      {product.badge}
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: colors.gold }} className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{ backgroundColor: colors.darkPlum }}
                        className="text-white px-4 py-2 rounded hover:shadow-lg transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories (unchanged) */}
      <section style={{ backgroundColor: colors.champagne }} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '40px' }} className="font-bold mb-12">
            Explore Collections
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {['Cakes', 'Tarts', 'Pastries', 'Seasonal'].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  backgroundColor: 'white',
                  borderLeft: `4px solid ${selectedCategory === cat ? colors.gold : colors.lightGray}`,
                  transition: 'all 0.2s'
                }}
                className="p-6 rounded-lg hover:shadow-lg transition text-left"
              >
                <h4 className="font-semibold text-lg mb-2">{cat}</h4>
                <p style={{ color: '#666' }} className="text-sm">
                  Browse our collection
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
};

export default StorefrontPage;