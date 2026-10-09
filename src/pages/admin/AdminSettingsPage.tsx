import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Tag,
  Plus,
  Trash2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, coupons, addCoupon, deleteCoupon, formatPrice } = useApp();

  const [ownerName, setOwnerName] = useState(settings.ownerName);
  const [businessName, setBusinessName] = useState(settings.businessName);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [phoneNumber, setPhoneNumber] = useState(settings.phoneNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [fullOfficeAddress, setFullOfficeAddress] = useState(settings.fullOfficeAddress);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [showAnnouncement, setShowAnnouncement] = useState(settings.showAnnouncement);
  const [experienceYears, setExperienceYears] = useState(settings.experienceYears);
  const [completedEventsCount, setCompletedEventsCount] = useState(settings.completedEventsCount);

  // New Coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponMin, setNewCouponMin] = useState(2000);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ownerName: ownerName.trim(),
      businessName: businessName.trim(),
      contactEmail: contactEmail.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber.replace(/[^0-9]/g, ''),
      fullOfficeAddress: fullOfficeAddress.trim(),
      announcementText: announcementText.trim(),
      showAnnouncement,
      experienceYears: Number(experienceYears),
      completedEventsCount: Number(completedEventsCount),
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: Number(newCouponValue),
      minOrderValue: Number(newCouponMin),
      isActive: true,
      description:
        newCouponDesc.trim() ||
        (newCouponType === 'percentage'
          ? `${newCouponValue}% OFF on orders above ${formatPrice(newCouponMin)}`
          : `Flat ${formatPrice(newCouponValue)} OFF on orders above ${formatPrice(newCouponMin)}`),
    });

    setNewCouponCode('');
    setNewCouponDesc('');
  };

  return (
    <AdminLayout pageTitle="Business & System Settings">
      <div className="space-y-8 max-w-4xl">
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Business settings updated successfully across the entire website!</span>
          </div>
        )}

        {/* Form: Owner & Contact Information */}
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-serif text-xl font-bold text-[#29252A] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#D6B36A]" />
              <span>Owner & Business Contact Configuration</span>
            </h3>
            <p className="text-xs text-gray-500">
              As mandated by Ankit Kumar, changes here update website headers, footers, call links, and WhatsApp triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Business Owner Full Name
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Official Business Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Support / Contact Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Primary Phone Number (Calling)
              </label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                WhatsApp Phone Number (with Country Code e.g. 91965024645)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Years of Styling Experience
              </label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">
                Full Office / Studio Address
              </label>
              <input
                type="text"
                required
                value={fullOfficeAddress}
                onChange={(e) => setFullOfficeAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2 space-y-2 pt-2 border-t border-gray-100">
              <label className="block font-semibold text-gray-700">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={showAnnouncement}
                  onChange={(e) => setShowAnnouncement(e.target.checked)}
                  className="rounded text-[#701F3D]"
                />
                <span className="font-semibold text-gray-700">
                  Enable Announcement Bar on Public Header
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </form>

        {/* Coupons & Discount Codes Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-serif text-xl font-bold text-[#29252A] flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#D6B36A]" />
              <span>Discount Coupons & Promo Codes</span>
            </h3>
            <p className="text-xs text-gray-500">
              Manage coupons available for clients to apply during booking or e-commerce checkout.
            </p>
          </div>

          {/* Active Coupons List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="p-4 rounded-2xl border-2 border-dashed border-[#701F3D]/20 bg-[#FFFCFA] space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#701F3D] bg-white px-2 py-0.5 rounded border border-[#701F3D]/20">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => deleteCoupon(coupon.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-gray-700 font-semibold">{coupon.description}</p>
                <p className="text-[10px] text-gray-400">
                  Min order: {formatPrice(coupon.minOrderValue)}
                </p>
              </div>
            ))}
          </div>

          {/* Add Coupon Form */}
          <form onSubmit={handleAddCoupon} className="pt-4 border-t border-gray-100 space-y-3 text-xs">
            <p className="font-bold text-gray-800">Add New Promo Code</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-gray-600 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LUXE20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Discount Type</label>
                <select
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">
                  Discount Value ({newCouponType === 'percentage' ? '%' : '₹'})
                </label>
                <input
                  type="number"
                  required
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Min. Order Value (₹)</label>
                <input
                  type="number"
                  required
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 bg-[#701F3D] hover:bg-[#52132A] text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Coupon</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
