import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut, BarChart3, Package, Home } from 'lucide-react';
import { colors } from '../constants/theme';
import { useAuthStore, useCartStore } from '../context/store';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userRole, logout } = useAuthStore(); // changed from 'role' to 'userRole'
  const totalItems = useCartStore((state) => state.totalItems);

  const isManager = userRole === 'MANAGER' || userRole === 'ADMIN';

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    onNavigate('login');
  };

  const handleNav = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header style={{ backgroundColor: colors.darkPlum }} className="text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button
            onClick={() => handleNav(isManager ? 'analytics' : 'storefront')}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}
            className="font-bold cursor-pointer hover:opacity-80 transition"
          >
            Cakes & Snacks
          </button>
        </div>

        <nav className="hidden md:flex gap-8 text-sm">
          {isManager ? (
            <>
              <button onClick={() => handleNav('analytics')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
                <BarChart3 size={16} /> Analytics
              </button>
              <button onClick={() => handleNav('inventory')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
                <Package size={16} /> Inventory
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('storefront')} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
                <Home size={16} /> Shop
              </button>
              <button onClick={() => handleNav('about')} className="opacity-80 hover:opacity-100 transition">
                About
              </button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-6">
          {!isManager && (
            <button onClick={() => handleNav('cart')} className="relative hover:opacity-80 transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span
                  style={{ backgroundColor: colors.gold }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-black text-xs flex items-center justify-center font-bold"
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}
          <button onClick={() => handleNav('profile')} className="hover:opacity-80 transition">
            <User size={24} />
          </button>
          <button onClick={handleLogout} className="hover:opacity-80 transition">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div style={{ backgroundColor: colors.darkPlum }} className="md:hidden mt-4 border-t border-white/20 pt-4 flex flex-col gap-4">
          {isManager ? (
            <>
              <button onClick={() => handleNav('analytics')} className="text-left opacity-80 hover:opacity-100">Analytics</button>
              <button onClick={() => handleNav('inventory')} className="text-left opacity-80 hover:opacity-100">Inventory</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav('storefront')} className="text-left opacity-80 hover:opacity-100">Shop</button>
              <button onClick={() => handleNav('about')} className="text-left opacity-80 hover:opacity-100">About</button>
              <button onClick={() => handleNav('cart')} className="text-left opacity-80 hover:opacity-100">Cart ({totalItems})</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;