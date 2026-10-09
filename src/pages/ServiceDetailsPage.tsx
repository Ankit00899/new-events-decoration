import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Users,
  AlertCircle,
  ShoppingBag,
  Share2,
  ChevronRight,
  ShieldAlert,
  Palette,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceAddon, Booking } from '../types';

export const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getServiceById,
    isInWishlist,
    toggleWishlist,
    addToCart,
    addBooking,
    settings,
    currentUser,
    formatPrice,
  } = useApp();

  const service = id ? getServiceById(id) : undefined;

  const [activeImage, setActiveImage] = useState<string>(service?.image || '');
  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<string>(
    service?.customizationOptions?.[0] || 'Default Signature Style'
  );

  // Booking Form State
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('05:30 PM');
  const [eventCity, setEventCity] = useState(currentUser?.city || 'Noida');
  const [fullAddress, setFullAddress] = useState(currentUser?.address || '');
  const [guestCount, setGuestCount] = useState<number>(20);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');
  const [cartSuccess, setCartSuccess] = useState(false);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#701F3D]">
          Decoration Service Not Found
        </h2>
        <p className="text-gray-600 text-sm">
          The requested package might have been renamed or archived.
        </p>
        <Link
          to="/services"
          className="inline-block px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold"
        >
          Back to All Services
        </Link>
      </div>
    );
  }

  const allImages = [service.image, ...(service.additionalImages || [])];
  const currentImage = activeImage || service.image;

  const handleAddonToggle = (addon: ServiceAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const calculateTotalPrice = () => {
    const addonsSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return service.startingPrice + addonsSum;
  };

  const handleAddToCart = () => {
    addToCart(service, selectedAddons, eventDate || undefined, 1);
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 4000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim() || !customerPhone.trim() || !eventDate) {
      setFormError('Please enter customer full name, contact mobile number, and event date.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = addBooking({
        serviceId: service.id,
        serviceTitle: service.title,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        eventType: service.categoryLabel,
        eventDate,
        eventTime,
        eventCity,
        fullAddress: fullAddress.trim(),
        expectedBudget: calculateTotalPrice(),
        guestCount,
        decorationPreferences: `Color Theme: ${selectedPalette}`,
        additionalRequirements: additionalRequirements.trim(),
        selectedAddons: selectedAddons.map((a) => ({ name: a.name, price: a.price })),
        totalEstimatedAmount: calculateTotalPrice(),
      });
      setCreatedBooking(newBooking);
    } catch (err) {
      setFormError('An error occurred while creating booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-[#701F3D]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/services" className="hover:text-[#701F3D]">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${service.category}`} className="hover:text-[#701F3D]">
          {service.categoryLabel}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#701F3D] font-semibold truncate max-w-xs">{service.title}</span>
      </nav>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-gray-100 shadow-lg border border-[#F8E7EC]">
            <img
              src={currentImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-[#701F3D]/90 text-white text-xs font-semibold backdrop-blur-xs">
                {service.categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D6B36A] text-[#29252A] text-xs font-bold shadow-xs">
                {service.tier}
              </span>
            </div>

            <button
              onClick={() => toggleWishlist(service.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-colors cursor-pointer ${
                isInWishlist(service.id)
                  ? 'bg-[#701F3D] text-[#FFFCFA]'
                  : 'bg-white/80 hover:bg-white text-gray-700'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(service.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    currentImage === img
                      ? 'border-[#701F3D] scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Inclusions Card */}
          <div className="bg-[#FFFCFA] p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#701F3D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D6B36A]" />
              <span>What’s Included in This Package</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              {service.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#F8E7EC]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Customizations & Booking (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Pricing */}
          <div className="space-y-3 pb-6 border-b border-[#F8E7EC]">
            <div className="flex items-center gap-2 text-xs text-[#D6B36A]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#29252A]">{service.rating}</span>
              <span className="text-gray-400">({service.reviewsCount} verified reviews)</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#29252A]">
              {service.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block">
                  Starting Package Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-[#701F3D]">
                    {formatPrice(service.startingPrice)}
                  </span>
                  {service.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(service.discountPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right text-xs text-gray-500">
                <p className="flex items-center gap-1 justify-end font-semibold text-gray-700">
                  <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>{service.setupTimeHours} Hours Setup</span>
                </p>
                <p className="text-[11px] text-gray-500">Ideal for {service.idealFor} Venues</p>
              </div>
            </div>
          </div>

          {/* Color Palettes Selection */}
          {service.customizationOptions?.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#D6B36A]" />
                <span>Select Color Combination:</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {service.customizationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedPalette(opt)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                      selectedPalette === opt
                        ? 'bg-[#701F3D] text-white border-[#701F3D] shadow-xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-[#F8E7EC]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Selector */}
          {service.availableAddons?.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Upgrade with Add-ons:
              </label>
              <div className="space-y-2">
                {service.availableAddons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#F8E7EC] border-[#701F3D] text-[#701F3D]'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAddonToggle(addon)}
                          className="rounded text-[#701F3D] focus:ring-[#701F3D]"
                        />
                        <span className="font-semibold">{addon.name}</span>
                      </div>
                      <span className="font-serif font-bold text-sm">+{formatPrice(addon.price)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* E-Commerce Add to Cart Action */}
          <div className="p-4 bg-[#FFFCFA] rounded-2xl border border-[#F8E7EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Calculated Total with Add-ons:</span>
              <span className="text-xl font-serif font-bold text-[#701F3D]">
                {formatPrice(calculateTotalPrice())}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl border-2 border-[#701F3D] text-[#701F3D] hover:bg-[#F8E7EC] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <a
                href="#book"
                className="flex-1 py-3 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                <span>Book This Setup</span>
              </a>
            </div>

            {cartSuccess && (
              <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center justify-between border border-emerald-200">
                <span>Added to cart!</span>
                <Link to="/cart" className="font-bold underline">
                  Go to Cart →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Booking Request Form (#book) */}
      <section id="book" className="pt-8 border-t border-[#F8E7EC]">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F8E7EC] shadow-xl max-w-4xl mx-auto">
          {createdBooking ? (
            /* Confirmation */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#701F3D]">
                Booking Request Recorded!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong>{createdBooking.customerName}</strong>. Your request for <em>{createdBooking.serviceTitle}</em> has been stored in our system.
              </p>

              <div className="bg-[#F8E7EC]/50 border-2 border-dashed border-[#701F3D]/30 p-5 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-[#701F3D]/20 pb-2">
                  <span className="font-bold text-gray-500">Booking Reference</span>
                  <span className="font-mono font-bold text-[#701F3D] text-sm bg-white px-2 py-0.5 rounded border border-[#701F3D]/20">
                    {createdBooking.referenceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Date:</span>
                  <span className="font-semibold">{createdBooking.eventDate} ({createdBooking.eventTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{createdBooking.eventCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Pending Admin Confirmation
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#701F3D]/20 pt-2 font-bold text-sm text-[#701F3D]">
                  <span>Total Amount:</span>
                  <span>{formatPrice(createdBooking.totalEstimatedAmount)}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs max-w-md mx-auto flex items-start gap-2 text-left">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Pending Status Note:</strong> Ankit Kumar will call or WhatsApp you within 2-4 hours to confirm crew schedule and venue entry specifics.
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  to="/my-bookings"
                  className="px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A]"
                >
                  View My Bookings
                </Link>
                <a
                  href={`https://wa.me/${settings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi Ankit, I booked ${createdBooking.serviceTitle} (Ref: ${createdBooking.referenceNumber}). Can you confirm my date?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20b857] flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Ankit</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
                  Official Reservation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#29252A]">
                  Reserve {service.title}
                </h2>
                <p className="text-xs text-gray-500">
                  Fill in your details to secure this setup. No immediate online payment required.
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 96502 4645"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rohan.sharma@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 06:00 PM"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Area
                  </label>
                  <select
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
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

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Venue Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tower B, Flat 402, Prateek Edifice, Sector 107"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Expected Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Selected Color Palette
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedPalette}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Additional Requirements or Venue Guidelines
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Balloon colors should match cake, need low smoke during cake cutting."
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#F8E7EC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Estimated Price</span>
                  <p className="font-serif text-2xl font-bold text-[#701F3D]">
                    {formatPrice(calculateTotalPrice())}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                  <span>{isSubmitting ? 'Registering Booking...' : 'Submit Booking Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
