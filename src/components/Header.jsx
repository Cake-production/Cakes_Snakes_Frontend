import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { colors } from '../constants/theme';
import { useAuthStore, useCartStore } from '../context/store';

const Header = ({ onNavigate, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuthStore();
  const totalItems = useCartStore((state) => state.totalItems);

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <header style={{ backgroundColor: colors.darkPlum }} className="text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button
            onClick={() => {
              onNavigate(userRole === 'manager' ? 'analytics' : 'storefront');
              setIsMenuOpen(false);
            }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}
            className="font-bold cursor-pointer hover:opacity-80 transition"
          >
            Cakes & Snacks
          </button>
        </div>

        <nav className="hidden md:flex gap-8 text-sm">
          {userRole === 'customer' ? (
            <>
              <button
                onClick={() => onNavigate('storefront')}
                className="opacity-80 hover:opacity-100 transition"
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('cart')}
                className="opacity-80 hover:opacity-100 transition"
              >
                About
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('analytics')}
                className="opacity-80 hover:opacity-100 transition"
              >
                Analytics
              </button>
              <button
                onClick={() => onNavigate('inventory')}
                className="opacity-80 hover:opacity-100 transition"
              >
                Inventory
              </button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-6">
          {userRole === 'customer' && (
            <button
              onClick={() => onNavigate('cart')}
              className="relative hover:opacity-80 transition"
            >
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
          <button
            onClick={() => onNavigate('profile')}
            className="hover:opacity-80 transition"
          >
            <User size={24} />
          </button>
          <button
            onClick={handleLogout}
            className="text-sm opacity-80 hover:opacity-100 transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          style={{ backgroundColor: colors.darkPlum }}
          className="md:hidden mt-4 border-t border-white/20 pt-4 flex flex-col gap-4"
        >
          {userRole === 'customer' ? (
            <>
              <button
                onClick={() => {
                  onNavigate('storefront');
                  setIsMenuOpen(false);
                }}
                className="text-left opacity-80 hover:opacity-100"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onNavigate('cart');
                  setIsMenuOpen(false);
                }}
                className="text-left opacity-80 hover:opacity-100"
              >
                Cart ({totalItems})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onNavigate('analytics');
                  setIsMenuOpen(false);
                }}
                className="text-left opacity-80 hover:opacity-100"
              >
                Analytics
              </button>
              <button
                onClick={() => {
                  onNavigate('inventory');
                  setIsMenuOpen(false);
                }}
                className="text-left opacity-80 hover:opacity-100"
              >
                Inventory
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
