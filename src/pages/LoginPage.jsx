import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../context/store';
import { userAPI } from '../services/api';
import { colors } from '../constants/theme';
import toast from 'react-hot-toast';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (role) => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      // Call real backend login
      const response = await userAPI.login(email, password);
      
      // The response should contain: { token, refreshToken, user, role }
      // userAPI.login already saves the token in localStorage
      if (response.token && response.user) {
        // Update Zustand store with user data
        login(
          {
            id: response.user.id,
            email: response.user.email,
            name: `${response.user.firstName || ''} ${response.user.lastName || ''}`.trim() || response.user.email,
            role: response.role || role, // use backend role if available, else fallback to button role
          },
          response.role || role
        );
        toast.success(`Welcome back, ${response.user.firstName || 'User'}!`);
        onLoginSuccess(); // Navigate to dashboard
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        const message = error.response.data?.message || 'Login failed. Please check your credentials.';
        toast.error(message);
      } else if (error.request) {
        // Network error (no response)
        toast.error('Cannot reach the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        backgroundColor: colors.softCream,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
      }}
    >
      {/* ===== Animated Background ===== */}
      <div
        className="login-bg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Rotating rings */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: `2px solid ${colors.gold}20`,
            top: '-200px',
            right: '-100px',
            animation: 'spin 40s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: `2px solid ${colors.darkPlum}15`,
            bottom: '-100px',
            left: '-50px',
            animation: 'spinReverse 30s linear infinite',
          }}
        />

        {/* Floating shapes */}
        <div
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: `radial-gradient(circle, ${colors.gold}40, transparent)`,
            top: '15%',
            left: '10%',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.darkPlum}30, transparent)`,
            bottom: '25%',
            right: '8%',
            animation: 'float 16s ease-in-out infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '10px',
            background: colors.gold,
            opacity: 0.15,
            top: '60%',
            left: '20%',
            animation: 'spin 20s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: colors.darkPlum,
            opacity: 0.1,
            bottom: '10%',
            left: '30%',
            animation: 'float 10s ease-in-out infinite 1s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.champagne}50, transparent)`,
            top: '40%',
            right: '30%',
            animation: 'pulseGlow 8s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* ===== Login Form ===== */}
      <div className="w-full max-w-md relative z-10">
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '48px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}
        >
          <div className="text-center mb-8">
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '32px',
                color: colors.darkPlum,
              }}
              className="font-bold mb-2"
            >
              Cakes & Snacks
            </h1>
            <p style={{ color: '#666' }} className="text-sm">
              Artisanal Boutique Experience
            </p>
          </div>

          <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={{ color: colors.darkPlum }} className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: colors.champagne, borderColor: colors.gold }}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
            </div>

            <div>
              <label style={{ color: colors.darkPlum }} className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: colors.champagne, borderColor: colors.gold }}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                  style={{ color: colors.darkPlum }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <button type="button" style={{ color: colors.gold }} className="font-semibold hover:opacity-80">
                Forgot password?
              </button>
            </div>
          </form>

          <button
            onClick={() => handleLogin('CUSTOMER')}
            disabled={isLoading}
            style={{ backgroundColor: colors.gold }}
            className="w-full py-3 font-bold text-black rounded-lg mb-3 hover:shadow-lg transition disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign In as Customer'}
          </button>

          <button
            onClick={() => handleLogin('MANAGER')}
            disabled={isLoading}
            style={{ backgroundColor: colors.darkPlum, color: 'white' }}
            className="w-full py-3 font-bold rounded-lg hover:shadow-lg transition disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign In as Manager'}
          </button>

          <p style={{ color: '#666' }} className="text-center text-sm mt-6">
            Demo: Use any email/password from the database
          </p>
        </div>
      </div>

      {/* ===== Keyframe Animations ===== */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
};

export default LoginPage;