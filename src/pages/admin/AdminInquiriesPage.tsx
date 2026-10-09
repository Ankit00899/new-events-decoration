import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Edit2,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { Inquiry, InquiryStatus } from '../../types';

export const AdminInquiriesPage: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry, settings } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Modal edit fields
  const [modalStatus, setModalStatus] = useState<InquiryStatus>('New');
  const [internalNotes, setInternalNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filtered = inquiries.filter((inq) => {
    if (statusFilter !== 'all' && inq.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inq.customerName.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.message.toLowerCase().includes(q) ||
        inq.eventCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openInquiryModal = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setModalStatus(inq.status);
    setInternalNotes(inq.internalNotes || '');
    setFollowUpDate(inq.followUpDate || '');
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    updateInquiryStatus(selectedInquiry.id, modalStatus, internalNotes, followUpDate || undefined);
    setSaveSuccess(true);
    setSelectedInquiry({
      ...selectedInquiry,
      status: modalStatus,
      internalNotes,
      followUpDate,
    });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <AdminLayout pageTitle="Customer Inquiries Management">
      <div className="space-y-6">
        {/* Search & Filter Header */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search leads by name, phone, message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white font-medium"
            >
              <option value="all">All Inquiries ({inquiries.length})</option>
              <option value="new">New Leads</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted to Booking</option>
              <option value="closed">Closed / Inactive</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 font-semibold">
            Showing <strong className="text-[#701F3D]">{filtered.length}</strong> inquiries
          </p>
        </div>

        {/* Inquiries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500">
                    {inq.referenceNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(inq.status)}`}>
                    {inq.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{inq.customerName}</h3>
                  <p className="text-xs text-[#701F3D] font-semibold">{inq.eventCategory}</p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  "{inq.message}"
                </p>

                <div className="text-[11px] text-gray-500 space-y-1">
                  <p>
                    <strong>Target Date:</strong> {inq.eventDate || 'Flexible'}
                  </p>
                  <p>
                    <strong>Budget:</strong> {inq.estimatedBudget || 'Not specified'}
                  </p>
                  {inq.followUpDate && (
                    <p className="text-blue-700 font-semibold">
                      Follow-up: {inq.followUpDate}
                    </p>
                  )}
                  {inq.internalNotes && (
                    <p className="text-gray-700 italic bg-amber-50 p-1.5 rounded">
                      Note: {inq.internalNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${inq.customerName}, this is Ankit Kumar regarding your inquiry for ${inq.eventCategory}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-[#25D366] text-white rounded-lg hover:bg-[#20b857]"
                    title="WhatsApp Client"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`}
                    className="p-1.5 bg-[#701F3D] text-white rounded-lg hover:bg-[#52132A]"
                    title="Call Client"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => openInquiryModal(inq)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold cursor-pointer"
                >
                  Manage Status
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Status & Internal Notes */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#701F3D]">
                  Manage Lead: {selectedInquiry.customerName}
                </h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {saveSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lead status updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Inquiry Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as InquiryStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white font-bold"
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted via Phone/WhatsApp</option>
                    <option value="Converted">Converted to Formal Booking</option>
                    <option value="Closed">Closed / Not Interested</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Next Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Internal Staff Notes
                  </label>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="e.g. Discussed balloon theme over call. Customer requested quote for 30th March."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this inquiry?')) {
                        deleteInquiry(selectedInquiry.id);
                        setSelectedInquiry(null);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Delete Inquiry
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(null)}
                      className="px-4 py-2 border rounded-xl text-gray-600"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#701F3D] text-white font-bold rounded-xl"
                    >
                      Save Lead
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
