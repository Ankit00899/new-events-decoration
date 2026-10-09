import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Heart,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Palette,
  Phone,
  MessageCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST, TESTIMONIALS, FAQS } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { LightboxModal } from '../components/LightboxModal';
import { ServiceItem } from '../types';

export const HomePage: React.FC = () => {
  const { services, gallery, settings, formatPrice } = useApp();
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Copied code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  const bestSellers = services.filter((s) => s.isBestSeller && s.isPublished);
  const trendingServices = services.filter((s) => s.isTrending && s.isPublished);

  const openBookingWithService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#29252A]">
        {/* Background image with cinematic gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Event Decoration Setup"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29252A] via-[#29252A]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#701F3D]/20 to-[#29252A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D6B36A]/50 text-[#D6B36A] text-xs font-semibold mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-[#D6B36A]" />
            <span>Curated by Ankit Kumar • Delhi NCR & Lucknow</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            We Make Every Celebration <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] via-[#F8E7EC] to-[#D6B36A]">
              Unforgettable.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            From dreamy birthdays to romantic anniversaries, we transform your special moments into beautiful memories with bespoke balloon arches, fresh florals, and fairy lighting.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D6B36A] hover:bg-[#B9944A] text-[#29252A] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Decorations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setSelectedServiceForBooking(null);
                setIsBookingModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#701F3D] hover:bg-[#8A264B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all border border-[#D6B36A]/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D6B36A]" />
              <span>Book Your Event</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">1,450+</p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Events Styled</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">4.9 ★</p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Average Rating</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">100%</p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">On-Time Setup</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">₹1,999</p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Starting Packages</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            Tailored For Every Milestone
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
            Featured Event Categories
          </h2>
          <p className="text-sm text-gray-600">
            Browse our signature decoration collections tailored specifically for birthdays, anniversaries, intimate romantic setups, and grand weddings.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col bg-white border border-[#F8E7EC]"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-semibold text-[#D6B36A] uppercase tracking-wider block">
                    From {formatPrice(category.startingPrice)}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#D6B36A] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-3 bg-white flex items-center justify-between text-xs text-gray-600">
                <span className="truncate">{category.tagline}</span>
                <ChevronRight className="w-4 h-4 text-[#701F3D] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Best-Selling Decoration Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Best-Selling Decoration Packages
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Hand-picked packages loved and booked most frequently across Delhi NCR and Lucknow.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 4. Special Offers & Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#701F3D] via-[#52132A] to-[#29252A] text-white p-8 sm:p-12 shadow-2xl border border-[#D6B36A]/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B36A] text-[#29252A] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Period Festive Promotion</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Get Flat 15% OFF on Birthday & Anniversary Packages!
            </h3>

            <p className="text-sm text-white/80 leading-relaxed">
              Planning a celebration this month? Apply coupon code during checkout or mention it when booking your consultation with Ankit Kumar.
            </p>

            {/* Coupon Code Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-white/10 border-2 border-dashed border-[#D6B36A] rounded-xl px-4 py-2 text-sm font-mono font-bold tracking-widest text-[#D6B36A]">
                <span>CELEBRATE15</span>
                <button
                  onClick={() => handleCopyCoupon('CELEBRATE15')}
                  className="ml-3 p-1 hover:text-white transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedServiceForBooking(null);
                  setIsBookingModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#D6B36A] hover:bg-[#B9944A] text-[#29252A] font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Claim Discount & Book
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending Decoration Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Viral & Aesthetic
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Trending Celebrations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Unique photo-worthy setups including midnight car trunk surprises, bohemian cabanas, and marquee numbers.
            </p>
          </div>

          <Link
            to="/services?sort=popularity"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>See Trending Setups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingServices.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section className="bg-[#F8E7EC]/40 py-16 border-y border-[#F8E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-xs">
              Simple 4-Step Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
              How Booking Works
            </h2>
            <p className="text-sm text-gray-600">
              We eliminate stress so you can simply arrive and immerse yourself in the celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Choose Theme</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore our catalog of balloon rings, rose canopies, baby showers, or custom themes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Customize & Add-ons</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pick your favorite color palette, personalized name foil, cakes, or marquee lighting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Submit Booking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Receive instant reference ID. Founder Ankit Kumar contacts you to lock timings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                4
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Flawless Setup</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our crew arrives 2-3 hours early with clean equipment, leaving venue spotless after.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Event Gallery Preview with Lightbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Recent Event Setups
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Click on any photograph to view high-resolution details and location.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.slice(0, 8).map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] text-[#D6B36A] font-semibold">{item.categoryLabel}</span>
                <p className="text-xs font-bold font-serif line-clamp-1">{item.title}</p>
                {item.eventLocation && (
                  <p className="text-[10px] text-gray-300">{item.eventLocation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="bg-white py-16 border-t border-[#F8E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Real Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
              What Our Happy Clients Say
            </h2>
            <p className="text-sm text-gray-600">
              Verified feedback from families and couples who trusted Ankit Event Decor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FFFCFA] p-6 rounded-2xl border border-[#F8E7EC] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D6B36A]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F8E7EC] space-y-0.5">
                  <p className="text-xs font-bold text-[#29252A]">{t.name}</p>
                  <p className="text-[11px] text-[#701F3D] font-medium">{t.event}</p>
                  <p className="text-[10px] text-gray-400">{t.location} • {t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about setup timelines, customizations, and booking.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-[#F8E7EC] p-5 [&_summary::-webkit-details-marker]:hidden shadow-xs"
            >
              <summary className="flex items-center justify-between cursor-pointer font-serif text-base font-bold text-[#29252A] group-open:text-[#701F3D]">
                <span>{faq.q}</span>
                <span className="text-lg font-mono text-[#701F3D] group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#F8E7EC] pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Direct Connect Callout for Ankit Kumar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#29252A] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[#D6B36A]">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B36A]">
              Have a Custom Request or Date in Mind?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Speak Directly with Ankit Kumar
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Get an instant quote, check availability, or discuss custom color themes for your wedding, birthday, or surprise.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${settings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hi Ankit, I would like to discuss a customized event decoration package.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Ankit</span>
            </a>

            <a
              href={`tel:${settings.phoneNumber.replace(/[^0-9]/g, '')}`}
              className="px-6 py-3 rounded-xl bg-[#701F3D] hover:bg-[#8A264B] text-white text-xs font-bold shadow-md transition-all border border-[#D6B36A]/40 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D6B36A]" />
              <span>Call: {settings.phoneNumber}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedServiceForBooking}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={gallery}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onBookStyle={(item) => {
          setLightboxOpen(false);
          setIsBookingModalOpen(true);
        }}
      />
    </div>
  );
};
