import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ChevronRight, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { ServiceItem } from '../types';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { services, formatPrice } = useApp();

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const categoryMeta = CATEGORIES_LIST.find(
    (c) => c.slug === categorySlug || c.id === categorySlug
  );

  // Filter services by category slug
  const categoryServices = services.filter((s) => {
    if (!s.isPublished) return false;
    if (!categorySlug) return true;
    return s.category.toLowerCase() === categorySlug.toLowerCase();
  });

  const categoryTitle = categoryMeta ? categoryMeta.name : `${categorySlug} Decorations`;
  const categoryDesc = categoryMeta ? categoryMeta.tagline : 'Explore exclusive handcrafted decoration setups for this celebration.';

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Category Banner */}
      <div className="relative bg-[#29252A] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {categoryMeta?.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={categoryMeta.image}
              alt={categoryTitle}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#29252A] via-[#29252A]/80 to-transparent" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D6B36A] font-semibold">{categoryTitle}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D6B36A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collection</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            {categoryTitle}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            {categoryDesc} Every package includes styling supervision by Ankit Kumar and our expert team.
          </p>

          {categoryMeta?.startingPrice && (
            <p className="text-xs text-[#D6B36A] font-medium pt-2">
              Starting from {formatPrice(categoryMeta.startingPrice)} • Customizable color schemes
            </p>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#F8E7EC] pb-4">
          <p className="text-xs font-semibold text-gray-600">
            Showing <strong className="text-[#701F3D]">{categoryServices.length}</strong> {categoryTitle} packages
          </p>

          <Link
            to="/services"
            className="text-xs font-semibold text-[#701F3D] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All Other Categories</span>
          </Link>
        </div>

        {categoryServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#F8E7EC] shadow-xs space-y-3">
            <p className="text-gray-600 text-sm">
              We are currently designing brand new packages for this category.
            </p>
            <Link
              to="/inquiry"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold"
            >
              Request Custom Quote
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onQuickBook={(s) => {
                  setSelectedService(s);
                  setBookingOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        service={selectedService}
      />
    </div>
  );
};
