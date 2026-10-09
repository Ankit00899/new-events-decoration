import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageCircle,
  FileText,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus } from '../types';

export const MyBookingsPage: React.FC = () => {
  const { bookings, currentUser, settings, formatPrice } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchRef, setSearchRef] = useState('');

  // Show bookings matching current user email or phone, or sample bookings if demo user
  const userBookings = bookings.filter((b) => {
    if (!currentUser) return true; // show demo list
    return (
      b.userId === currentUser.id ||
      b.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      b.customerPhone === currentUser.phone ||
      currentUser.role === 'customer'
    );
  });

  const filteredBookings = userBookings.filter((b) => {
    if (activeTab !== 'all' && b.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    if (searchRef.trim()) {
      const q = searchRef.toLowerCase();
      return (
        b.referenceNumber.toLowerCase().includes(q) ||
        b.serviceTitle.toLowerCase().includes(q) ||
        b.eventCity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F8E7EC] pb-6">
        <div>
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            Client Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
            My Event Bookings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time tracking of decoration dates, setup confirmations, and invoices.
          </p>
        </div>

        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] transition-colors self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>Book New Package</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', 'Pending', 'Confirmed', 'In Progress', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                activeTab === tab
                  ? 'bg-[#701F3D] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-[#F8E7EC] border border-[#F8E7EC]'
              }`}
            >
              {tab === 'all' ? 'All Bookings' : tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reference # or package..."
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#F8E7EC] shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#29252A]">
              No Bookings Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              You haven't submitted any booking requests matching this status filter yet.
            </p>
            <div className="pt-2">
              <Link
                to="/services"
                className="px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A]"
              >
                Explore Celebration Packages
              </Link>
            </div>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E7EC] shadow-sm hover:shadow-md transition-shadow space-y-6"
            >
              {/* Top Row: Title, Reference & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F8E7EC] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#701F3D] bg-[#F8E7EC] px-2.5 py-0.5 rounded-md border border-[#701F3D]/20">
                      {b.referenceNumber}
                    </span>
                    <span className="text-xs text-gray-400">• Booked on {new Date(b.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29252A] mt-1">
                    {b.serviceTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    Status: {b.status}
                  </span>
                  <span className="font-serif text-xl font-bold text-[#701F3D]">
                    {formatPrice(b.totalEstimatedAmount)}
                  </span>
                </div>
              </div>

              {/* Event Specifics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 bg-[#FFFCFA] p-4 rounded-2xl border border-[#F8E7EC]">
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-400 uppercase text-[10px]">Event Date & Time</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                    <span>{b.eventDate} at {b.eventTime}</span>
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="font-bold text-gray-400 uppercase text-[10px]">Location / City</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                    <span>{b.eventCity}</span>
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="font-bold text-gray-400 uppercase text-[10px]">Contact Person</span>
                  <p className="font-semibold text-gray-900 truncate">
                    {b.customerName} ({b.customerPhone})
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="font-bold text-gray-400 uppercase text-[10px]">Estimated Guests</span>
                  <p className="font-semibold text-gray-900">{b.guestCount} Attendees</p>
                </div>
              </div>

              {/* Address & Preferences */}
              <div className="text-xs text-gray-600 space-y-1">
                {b.fullAddress && (
                  <p>
                    <strong className="text-gray-800">Venue Address:</strong> {b.fullAddress}
                  </p>
                )}
                {b.decorationPreferences && (
                  <p>
                    <strong className="text-gray-800">Decor Preferences:</strong> {b.decorationPreferences}
                  </p>
                )}
                {b.selectedAddons && b.selectedAddons.length > 0 && (
                  <p>
                    <strong className="text-gray-800">Add-ons:</strong>{' '}
                    {b.selectedAddons.map((a) => `${a.name} (+${formatPrice(a.price)})`).join(', ')}
                  </p>
                )}
              </div>

              {/* Status History Timeline */}
              {b.statusHistory && b.statusHistory.length > 0 && (
                <div className="border-t border-[#F8E7EC] pt-4 space-y-2">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Activity & Status Updates
                  </p>
                  <div className="space-y-1.5">
                    {b.statusHistory.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-[#701F3D] mt-1.5 shrink-0" />
                        <div>
                          <span className="font-bold text-gray-800">{h.status}</span>
                          <span className="text-gray-400 text-[10px] ml-2">
                            {new Date(h.timestamp).toLocaleString()} by {h.updatedBy}
                          </span>
                          {h.note && <p className="text-gray-600 italic mt-0.5">{h.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="border-t border-[#F8E7EC] pt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">
                  {b.status === 'Pending'
                    ? 'Pending admin confirmation before lock-in.'
                    : 'Confirmed and assigned to Ankit Decor setup crew.'}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${settings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello Ankit, regarding my booking #${b.referenceNumber} (${b.serviceTitle}) for ${b.eventDate}: could you share the arrival timing?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-semibold shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Ankit</span>
                  </a>

                  <a
                    href={`tel:${settings.phoneNumber.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold"
                  >
                    <span>Call Support</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
