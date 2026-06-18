import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { colors } from '../constants/theme';
import toast from 'react-hot-toast';

const PersonalInfoPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: 'Alexandra Beaumont',
    email: 'alexandra@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-05-20',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const payload = { firstName, lastName, phone: formData.phone };
    await userAPI.updateProfile(payload);
    toast.success('Profile updated successfully!');
  } catch (error) {
    toast.error('Failed to update profile');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main style={{ backgroundColor: colors.softCream }} className="py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => onNavigate('profile')} style={{ color: colors.gold }} className="flex items-center gap-2 mb-6 font-semibold hover:opacity-80">
          ← Back to Account
        </button>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px' }} className="shadow-md">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }} className="font-bold mb-6">
            Personal Information
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.darkPlum }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
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
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
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
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{ backgroundColor: colors.champagne }}
                className="w-full px-4 py-3 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: colors.gold }}
              className="w-full mt-8 py-3 font-semibold text-black rounded-lg hover:shadow-lg transition disabled:opacity-70"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PersonalInfoPage;
