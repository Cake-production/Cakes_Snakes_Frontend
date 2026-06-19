import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import { useAuthStore } from '../context/store';
import { colors } from '../constants/theme';
import toast from 'react-hot-toast';

const PersonalInfoPage = ({ onNavigate }) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });

  // Load user data on mount
  useEffect(() => {
    if (!userId) {
      toast.error('Please log in to view your profile');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        // If you have a dedicated /users/profile endpoint, use that.
        // Otherwise, use getById with the stored userId.
        const profile = await userAPI.getProfile(); // returns user DTO (id, email, firstName, lastName, phone, role...)
        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth: profile.dateOfBirth || '', // if your DTO includes it
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
        // Set fallback from auth store if available
        if (user) {
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            dateOfBirth: '',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth, // if backend supports it
      };

      await userAPI.updateProfile(payload);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p style={{ color: '#666' }}>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('profile')}
          style={{ color: colors.gold }}
          className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80"
        >
          ← Back to Account
        </button>

        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
            Personal Information
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              style={{ backgroundColor: colors.gold }}
              className="w-full mt-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PersonalInfoPage;