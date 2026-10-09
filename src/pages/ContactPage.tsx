import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
  IndianRupee,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Inquiry } from '../types';

export const ContactPage: React.FC = () => {
  const { settings, addInquiry, currentUser } = useApp();

  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    eventCategory: 'Birthday Decoration',
    eventDate: '',
    estimatedBudget: '₹3,000 - ₹5,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const cleanPhone = settings.phoneNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name, contact phone number, and inquiry message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const savedInq = addInquiry({
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        eventCategory: formData.eventCategory,
        eventDate: formData.eventDate,
        estimatedBudget: formData.estimatedBudget,
        message: formData.message.trim(),
      });
      setSubmittedInquiry(savedInq);
    } catch (err) {
      setErrorMessage('Failed to send inquiry. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8E7EC] text-[#701F3D] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>Get In Touch with Ankit Kumar</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#29252A]">
          Contact & Event Support
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Whether you want a quotation for an upcoming birthday or need advice on a wedding reception stage, we are just a message or call away.
        </p>
      </div>

      {/* Main Grid: Direct Connect Cards & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Owner Profile & Direct Action Buttons (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Owner Card */}
          <div className="bg-[#29252A] text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl border-2 border-[#D6B36A]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#701F3D] to-[#8A264B] flex items-center justify-center text-[#D6B36A] font-serif font-bold text-2xl border border-[#D6B36A]">
                A
              </div>
              <div>
                <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-widest block">
                  Business Owner & Principal Stylist
                </span>
                <h3 className="font-serif text-2xl font-bold">{settings.ownerName}</h3>
                <p className="text-xs text-gray-300">Ankit Event Decor Management</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              "We prioritize customer delight above all else. Every celebration booked through us is treated like our own family event."
            </p>

            {/* Direct Instant Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  'Hello Ankit, I would like to inquire about event decoration services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry: {settings.phoneNumber}</span>
              </a>

              {/* Call Now Button */}
              <a
                href={`tel:${cleanPhone}`}
                className="w-full py-3.5 px-4 rounded-xl bg-[#701F3D] hover:bg-[#8A264B] text-white text-xs font-bold shadow-md transition-all border border-[#D6B36A]/50 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D6B36A]" />
                <span>Call Now: {settings.phoneNumber}</span>
              </a>

              {/* Email Us Button */}
              <a
                href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent(
                  'Event Decoration Inquiry - Ankit Event Decor'
                )}`}
                className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#D6B36A]" />
                <span>Email Us: {settings.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Business Support Information */}
          <div className="bg-[#FFFCFA] p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-4 text-xs text-gray-700">
            <h4 className="font-serif text-base font-bold text-[#701F3D]">
              Operating Details & Coverage
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Headquarters Address</p>
                  <p className="text-gray-600">{settings.fullOfficeAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Operating Hours</p>
                  <p className="text-gray-600">Monday - Sunday: 8:00 AM - 10:30 PM (Midnight setups on prior request)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#701F3D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Dedicated Service Guarantee</p>
                  <p className="text-gray-600">On-time venue arrival with all structural framing and backups.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Online Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#F8E7EC] shadow-xl">
          {submittedInquiry ? (
            /* Inquiry Success Confirmation */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#701F3D]">
                Inquiry Received by Ankit Kumar!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Thank you for contacting us, <strong>{submittedInquiry.customerName}</strong>. Your inquiry reference is:
              </p>
              <div className="inline-block px-4 py-2 bg-[#F8E7EC] font-mono font-bold text-[#701F3D] rounded-xl border border-[#701F3D]/20 text-sm">
                {submittedInquiry.referenceNumber}
              </div>
              <p className="text-xs text-gray-500">
                This has been logged in our Admin Dashboard. Ankit Kumar will review and contact you on <strong>{submittedInquiry.phone}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmittedInquiry(null);
                    setFormData({
                      customerName: '',
                      email: '',
                      phone: '',
                      eventCategory: 'Birthday Decoration',
                      eventDate: '',
                      estimatedBudget: '₹3,000 - ₹5,000',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#29252A]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-gray-500">
                  Every inquiry is saved to our central database and monitored by our event desk.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neha Verma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 96502 4645"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. neha@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Category
                  </label>
                  <select
                    value={formData.eventCategory}
                    onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                  >
                    <option value="Birthday Decoration">Birthday Decoration</option>
                    <option value="Anniversary Decoration">Anniversary Decoration</option>
                    <option value="Romantic Room Setup">Romantic Room / Cabana</option>
                    <option value="Balloon Architecture">Balloon Architecture</option>
                    <option value="Baby Shower Decoration">Baby Shower Decoration</option>
                    <option value="Surprise Party / Boot">Surprise Party / Car Boot</option>
                    <option value="Wedding / Reception Stage">Wedding / Reception Stage</option>
                    <option value="Custom Event Theme">Custom Themed Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                  >
                    <option value="Under ₹3,000">Under ₹3,000</option>
                    <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000+ (Grand / Wedding)">₹25,000+ (Grand / Wedding)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Inquiry Details / Specific Vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you have in mind: venue type (home/hotel/lawn), color palette, specific ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                  <span>{isSubmitting ? 'Transmitting Inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
