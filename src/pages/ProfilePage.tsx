import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  LogOut,
  Sparkles,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { MyBookingsPage } from './MyBookingsPage';

export const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    updateUserProfile,
    logoutUser,
    wishlist,
    services,
    toggleWishlist,
    formatPrice,
  } = useApp();

  const tabParam = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(tabParam);

  const [name, setName] = useState(currentUser?.name || 'Rohan Sharma');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98112 33445');
  const [city, setCity] = useState(currentUser?.city || 'Noida');
  const [address, setAddress] = useState(currentUser?.address || 'Tower B, Prateek Edifice, Sector 107');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, city, address });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const wishlistedServices = services.filter((s) => wishlist.includes(s.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E7EC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-2xl flex items-center justify-center border-2 border-[#D6B36A]">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <span className="text-[10px] text-[#701F3D] font-bold uppercase tracking-wider bg-[#F8E7EC] px-2.5 py-0.5 rounded-full">
              Customer Account
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#29252A] mt-1">
              {name || 'Valued Client'}
            </h1>
            <p className="text-xs text-gray-500">{currentUser?.email || 'customer@example.com'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={logoutUser}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#F8E7EC] gap-4 text-sm font-semibold">
        <button
          onClick={() => {
            setActiveTab('profile');
            setSearchParams({ tab: 'profile' });
          }}
          className={`pb-3 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-[#701F3D] text-[#701F3D]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>My Profile & Details</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('wishlist');
            setSearchParams({ tab: 'wishlist' });
          }}
          className={`pb-3 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-[#701F3D] text-[#701F3D]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>My Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('bookings');
            setSearchParams({ tab: 'bookings' });
          }}
          className={`pb-3 px-2 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-[#701F3D] text-[#701F3D]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Bookings</span>
        </button>
      </div>

      {/* Tab 1: Profile & Contact Details */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F8E7EC] shadow-sm max-w-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#29252A]">
              Personal Contact Details
            </h2>
            <p className="text-xs text-gray-500">
              These details pre-fill your event booking requests for faster coordination.
            </p>
          </div>

          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Contact details saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number (WhatsApp)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Default City / Region
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
              >
                <option value="Noida">Noida / Greater Noida</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Kanpur">Kanpur</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Saved Address / Society
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Save Profile Details
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedServices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#F8E7EC] shadow-xs space-y-4">
              <Heart className="w-12 h-12 text-[#701F3D] mx-auto opacity-50" />
              <h3 className="font-serif text-2xl font-bold text-[#29252A]">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-gray-500">
                Tap the heart icon on any decoration package to save it here for later.
              </p>
              <Link
                to="/services"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold"
              >
                Explore Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedServices.map((service) => (
                <div key={service.id} className="relative group">
                  <ServiceCard service={service} />
                  <button
                    onClick={() => toggleWishlist(service.id)}
                    className="absolute bottom-4 right-4 z-20 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Bookings */}
      {activeTab === 'bookings' && <MyBookingsPage />}
    </div>
  );
};
