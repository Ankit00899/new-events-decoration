import React, { useState } from 'react';
import { Sparkles, Filter, MapPin, ZoomIn, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LightboxModal } from '../components/LightboxModal';
import { BookingModal } from '../components/BookingModal';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filterCategories = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'romantic', label: 'Romantic Room' },
    { id: 'wedding', label: 'Wedding Stage' },
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'balloon', label: 'Balloon Arch' },
    { id: 'surprise', label: 'Surprise Boot' },
    { id: 'customized', label: 'Customized' },
  ];

  const filteredItems = gallery.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8E7EC] text-[#701F3D] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>Real Celebrations Executed by Ankit Kumar</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#29252A]">
          Event Decoration Gallery & Portfolio
        </h1>
        <p className="text-sm text-gray-600">
          Discover actual photographs of our balloon architecture, stage florals, candlelight bedroom surprises, and outdoor bohemian gatherings.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedFilter === cat.id
                ? 'bg-[#701F3D] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-[#F8E7EC] border border-[#F8E7EC]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-[#F8E7EC] cursor-pointer transition-all flex flex-col transform hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#701F3D]/90 text-white text-[10px] font-semibold backdrop-blur-xs">
                {item.categoryLabel}
              </span>
            </div>

            {/* Caption */}
            <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#29252A] group-hover:text-[#701F3D] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                  {item.description}
                </p>
              </div>

              {item.eventLocation && (
                <div className="pt-2 text-[11px] text-[#B9944A] font-medium flex items-center gap-1 border-t border-[#F8E7EC]">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.eventLocation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onBookStyle={(item) => {
          setLightboxOpen(false);
          setBookingOpen(true);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
};
