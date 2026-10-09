import React, { useState } from 'react';
import {
  CalendarCheck2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  MessageCircle,
  FileText,
  AlertCircle,
  Sparkles,
  Eye,
  X,
  IndianRupee,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, updateBookingNotes, deleteBooking, formatPrice, settings } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Status Change State in modal
  const [newStatus, setNewStatus] = useState<BookingStatus>('Pending');
  const [statusNote, setStatusNote] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.referenceNumber.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.serviceTitle.toLowerCase().includes(q) ||
        b.eventCity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusNote('');
    setInternalNotes(booking.internalNotes || '');
    setUpdateSuccess(false);
  };

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    updateBookingStatus(selectedBooking.id, newStatus, statusNote.trim() || undefined);
    if (internalNotes !== selectedBooking.internalNotes) {
      updateBookingNotes(selectedBooking.id, internalNotes.trim());
    }

    setUpdateSuccess(true);
    // Refresh modal's local object
    const updated = bookings.find((b) => b.id === selectedBooking.id);
    if (updated) {
      setSelectedBooking({
        ...updated,
        status: newStatus,
        internalNotes: internalNotes.trim(),
      });
    }
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

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
    <AdminLayout pageTitle="Event Bookings Management">
      <div className="space-y-6">
        {/* Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by ref #, customer, phone, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white font-medium"
            >
              <option value="all">All Statuses ({bookings.length})</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="text-xs text-gray-500 font-semibold self-end md:self-center">
            Showing <strong className="text-[#701F3D]">{filtered.length}</strong> bookings
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Ref #</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Package</th>
                  <th className="py-3.5 px-4">Event Date & Time</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Est. Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#701F3D] bg-[#F8E7EC] px-2 py-0.5 rounded">
                        {b.referenceNumber}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-gray-900">{b.customerName}</p>
                      <a
                        href={`tel:${b.customerPhone.replace(/[^0-9]/g, '')}`}
                        className="text-[11px] text-gray-500 hover:text-[#701F3D]"
                      >
                        {b.customerPhone}
                      </a>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800 line-clamp-1">{b.serviceTitle}</p>
                      <span className="text-[10px] text-gray-400">{b.eventType}</span>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-900">{b.eventDate}</p>
                      <span className="text-[10px] text-gray-400">{b.eventTime}</span>
                    </td>

                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {b.eventCity}
                    </td>

                    <td className="py-3 px-4 font-serif font-bold text-sm text-[#701F3D]">
                      {formatPrice(b.totalEstimatedAmount)}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openDetails(b)}
                        className="px-3 py-1.5 rounded-lg bg-[#701F3D] hover:bg-[#52132A] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Manage Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Modal: Status Management, Notes & Specs */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8 max-h-[85vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#701F3D] bg-[#F8E7EC] px-2.5 py-0.5 rounded">
                      {selectedBooking.referenceNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#29252A] mt-1">
                    {selectedBooking.serviceTitle}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {updateSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Booking status & internal notes updated successfully!</span>
                </div>
              )}

              {/* Customer & Venue Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="space-y-1">
                  <p className="font-bold text-gray-500 uppercase text-[10px]">Client Details</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedBooking.customerName}</p>
                  <p className="text-gray-600">{selectedBooking.customerPhone}</p>
                  {selectedBooking.customerEmail && (
                    <p className="text-gray-600">{selectedBooking.customerEmail}</p>
                  )}
                  <div className="pt-1 flex gap-2">
                    <a
                      href={`https://wa.me/${selectedBooking.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${selectedBooking.customerName}, this is Ankit Kumar regarding your booking #${selectedBooking.referenceNumber}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded bg-[#25D366] text-white font-bold text-[10px] flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${selectedBooking.customerPhone.replace(/[^0-9]/g, '')}`}
                      className="px-2 py-1 rounded bg-[#701F3D] text-white font-bold text-[10px] flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-gray-500 uppercase text-[10px]">Event Logistics</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBooking.eventDate} at {selectedBooking.eventTime}
                  </p>
                  <p className="text-gray-700">City: <strong>{selectedBooking.eventCity}</strong></p>
                  <p className="text-gray-600">Guests: {selectedBooking.guestCount}</p>
                  <p className="text-gray-600">Venue: {selectedBooking.fullAddress || 'Not provided'}</p>
                </div>
              </div>

              {/* Preferences & Add-ons */}
              <div className="text-xs space-y-2 border-t border-gray-100 pt-3">
                <p>
                  <strong className="text-gray-700">Decoration Preferences:</strong>{' '}
                  {selectedBooking.decorationPreferences || 'None'}
                </p>
                {selectedBooking.additionalRequirements && (
                  <p>
                    <strong className="text-gray-700">Client Instructions:</strong>{' '}
                    {selectedBooking.additionalRequirements}
                  </p>
                )}
                {selectedBooking.selectedAddons && selectedBooking.selectedAddons.length > 0 && (
                  <p>
                    <strong className="text-gray-700">Selected Add-ons:</strong>{' '}
                    {selectedBooking.selectedAddons.map((a) => `${a.name} (+${formatPrice(a.price)})`).join(', ')}
                  </p>
                )}
                <p className="font-bold text-[#701F3D] text-sm pt-1">
                  Total Estimated Amount: {formatPrice(selectedBooking.totalEstimatedAmount)}
                </p>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleStatusUpdate} className="space-y-4 pt-4 border-t border-gray-200 text-xs">
                <h4 className="font-serif text-base font-bold text-[#701F3D]">
                  Update Status & Log Internal Note
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Change Status To
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as BookingStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white font-bold"
                    >
                      <option value="Pending">Pending (Under review)</option>
                      <option value="Confirmed">Confirmed (Advance paid / slot locked)</option>
                      <option value="In Progress">In Progress (Crew dispatching)</option>
                      <option value="Completed">Completed (Event concluded)</option>
                      <option value="Cancelled">Cancelled (Rejected / client canceled)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Status Change Reason / Log
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30% advance received via UPI."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Confidential Internal Staff Notes (Only visible to Admin)
                  </label>
                  <textarea
                    rows={2}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="e.g. Assigned staff: Rahul and Amit. Car boot props loaded in van."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this booking record permanently?')) {
                        deleteBooking(selectedBooking.id);
                        setSelectedBooking(null);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete Booking
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(null)}
                      className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#701F3D] hover:bg-[#52132A] text-white font-bold rounded-xl"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
