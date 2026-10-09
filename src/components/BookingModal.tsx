import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  IndianRupee,
  ShieldAlert,
} from 'lucide-react';
import { ServiceItem, ServiceAddon, Booking } from '../types';
import { useApp } from '../context/AppContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const { addBooking, settings, currentUser, formatPrice } = useApp();

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    customerEmail: currentUser?.email || '',
    customerPhone: currentUser?.phone || '',
    eventType: service?.categoryLabel || 'Birthday Party',
    eventDate: '',
    eventTime: '05:00 PM',
    eventCity: currentUser?.city || 'Noida',
    fullAddress: currentUser?.address || '',
    expectedBudget: service ? service.startingPrice : 5000,
    guestCount: 20,
    decorationPreferences: '',
    additionalRequirements: '',
  });

  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAddonToggle = (addon: ServiceAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    const base = service ? service.startingPrice : Number(formData.expectedBudget) || 0;
    const addonsSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return base + addonsSum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.customerName.trim() || !formData.customerPhone.trim() || !formData.eventDate) {
      setErrorMsg('Please complete customer name, mobile number, and event date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = addBooking({
        serviceId: service?.id,
        serviceTitle: service?.title || `${formData.eventType} Custom Decoration`,
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        eventCity: formData.eventCity,
        fullAddress: formData.fullAddress.trim(),
        expectedBudget: Number(formData.expectedBudget) || calculateTotal(),
        guestCount: Number(formData.guestCount) || 1,
        decorationPreferences: formData.decorationPreferences.trim(),
        additionalRequirements: formData.additionalRequirements.trim(),
        selectedAddons: selectedAddons.map((a) => ({ name: a.name, price: a.price })),
        totalEstimatedAmount: calculateTotal(),
      });

      setCreatedBooking(newBooking);
    } catch (err) {
      setErrorMsg('Failed to record booking request. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setCreatedBooking(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#F8E7EC] my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-[#D6B36A] text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Event Booking Request</span>
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            {service ? service.title : 'Custom Celebration Booking'}
          </h2>
          <p className="text-xs text-white/80 mt-1">
            {service
              ? `Starting from ${formatPrice(service.startingPrice)} • Setup by Team Ankit Kumar`
              : 'Tell us your vision, and we will tailor every detail to perfection.'}
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {createdBooking ? (
            /* Success confirmation screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#701F3D]">
                  Booking Request Submitted!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <strong className="text-gray-900">{createdBooking.customerName}</strong>. Your request has been saved and is currently being reviewed.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-[#F8E7EC]/40 border-2 border-dashed border-[#701F3D]/30 rounded-xl p-5 max-w-md mx-auto space-y-3 text-left">
                <div className="flex justify-between items-center border-b border-[#701F3D]/10 pb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Booking Reference
                  </span>
                  <span className="text-sm font-mono font-bold text-[#701F3D] bg-white px-2 py-0.5 rounded border border-[#701F3D]/20">
                    {createdBooking.referenceNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Booking Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    {createdBooking.status} (Admin Review)
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Event Date & Time:</span>
                  <span className="font-semibold text-gray-800">
                    {createdBooking.eventDate} at {createdBooking.eventTime}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Estimated Total:</span>
                  <span className="font-bold text-[#701F3D] text-sm">
                    {formatPrice(createdBooking.totalEstimatedAmount)}
                  </span>
                </div>
              </div>

              {/* Verification disclaimer as requested in MASTER PROMPT */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 flex items-start gap-2.5 text-left max-w-md mx-auto">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> Your booking is registered as <em>Pending</em>. Ankit Kumar (+91 96502 4645) will personally review slot feasibility and reach out on WhatsApp/phone before confirming the event schedule.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] transition-colors cursor-pointer"
                >
                  Close & Explore More
                </button>
                <a
                  href={`https://wa.me/${settings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi Ankit, I just submitted booking request #${createdBooking.referenceNumber} for ${createdBooking.serviceTitle} on ${createdBooking.eventDate}. Could you please check availability?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20b857] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Section 1: Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#701F3D] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F8E7EC] pb-1.5">
                  <User className="w-4 h-4 text-[#D6B36A]" />
                  <span>1. Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priya.sharma@example.com"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Event Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#701F3D] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F8E7EC] pb-1.5">
                  <Calendar className="w-4 h-4 text-[#D6B36A]" />
                  <span>2. Event Date, Timing & Location</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                    >
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                      <option value="Romantic Room Setup">Romantic Room / Cabana</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Surprise Party">Surprise Car Boot / Flash</option>
                      <option value="Wedding / Reception">Wedding / Reception Stage</option>
                      <option value="Custom Event">Custom Themed Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 05:30 PM"
                      value={formData.eventTime}
                      onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City / Region
                    </label>
                    <select
                      value={formData.eventCity}
                      onChange={(e) => setFormData({ ...formData, eventCity: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                    >
                      <option value="Noida">Noida / Greater Noida</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gurugram">Gurugram</option>
                      <option value="Ghaziabad">Ghaziabad</option>
                      <option value="Lucknow">Lucknow</option>
                      <option value="Kanpur">Kanpur</option>
                      <option value="Other">Other North India Location</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Venue Address / Apartment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 502, Tower 4, Express Greens, Sector 44"
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Budget, Guests & Addons */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#701F3D] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F8E7EC] pb-1.5">
                  <IndianRupee className="w-4 h-4 text-[#D6B36A]" />
                  <span>3. Budget & Customization</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Expected Budget (₹)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={formData.expectedBudget}
                      onChange={(e) => setFormData({ ...formData, expectedBudget: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Estimated Guests Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Add-ons Selector if service provides them */}
                {service?.availableAddons && service.availableAddons.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Optional Package Add-ons:
                    </label>
                    <div className="space-y-2">
                      {service.availableAddons.map((addon) => {
                        const isChecked = selectedAddons.some((a) => a.id === addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                              isChecked
                                ? 'bg-[#F8E7EC] border-[#701F3D] text-[#701F3D]'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleAddonToggle(addon)}
                                className="rounded text-[#701F3D] focus:ring-[#701F3D]"
                              />
                              <span className="font-medium">{addon.name}</span>
                            </div>
                            <span className="font-bold font-serif">+{formatPrice(addon.price)}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Decoration Preferences (Colors, Theme Name, Letter Foil)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pastel Rose Gold with name 'Aarohi Turns 1st'"
                    value={formData.decorationPreferences}
                    onChange={(e) => setFormData({ ...formData, decorationPreferences: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Additional Instructions or Timing Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please arrive 3 hours before party; gate pass required at entry."
                    value={formData.additionalRequirements}
                    onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>
              </div>

              {/* Price Summary Bar */}
              <div className="bg-[#FFFCFA] border border-[#F8E7EC] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                    Estimated Package Total
                  </span>
                  <span className="font-serif text-xl font-bold text-[#701F3D]">
                    {formatPrice(calculateTotal())}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    No immediate online charge. Payable after admin confirmation.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Booking Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
