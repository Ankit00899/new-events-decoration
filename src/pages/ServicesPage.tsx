import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Heart,
  ChevronDown,
  Star,
  Layers,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { ServiceItem } from '../types';

export const ServicesPage: React.FC = () => {
  const { services, formatPrice } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Booking Modal
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Filters State
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'popular';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocationType, setSelectedLocationType] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync url param if changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Filtering Logic
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (!service.isPublished) return false;

      // Search keyword match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(query);
        const matchesCat = service.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = service.shortDescription.toLowerCase().includes(query) ||
          service.fullDescription.toLowerCase().includes(query);
        const matchesOptions = service.customizationOptions?.some((opt) =>
          opt.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesCat && !matchesDesc && !matchesOptions) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }

      // Location type filter (Indoor / Outdoor / Both)
      if (selectedLocationType !== 'all') {
        if (selectedLocationType === 'Indoor' && service.idealFor !== 'Indoor' && service.idealFor !== 'Both') {
          return false;
        }
        if (selectedLocationType === 'Outdoor' && service.idealFor !== 'Outdoor' && service.idealFor !== 'Both') {
          return false;
        }
      }

      // Tier filter
      if (selectedTier !== 'all' && service.tier !== selectedTier) {
        return false;
      }

      // Price filter
      if (service.startingPrice > maxPrice) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && service.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.startingPrice - b.startingPrice;
      }
      if (sortBy === 'price-high') {
        return b.startingPrice - a.startingPrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // default: popularity / best seller
      return (b.isBestSeller ? 2 : b.isTrending ? 1 : 0) - (a.isBestSeller ? 2 : a.isTrending ? 1 : 0);
    });
  }, [
    services,
    searchQuery,
    selectedCategory,
    selectedLocationType,
    selectedTier,
    maxPrice,
    minRating,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocationType('all');
    setSelectedTier('all');
    setMinRating(0);
    setMaxPrice(30000);
    setSortBy('popular');
    setSearchParams({});
  };

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'wedding', label: 'Wedding Stage' },
    { id: 'romantic', label: 'Romantic Room' },
    { id: 'balloon', label: 'Balloon Arch' },
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'surprise', label: 'Surprise Party' },
    { id: 'customized', label: 'Customized' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#F8E7EC] pb-6 space-y-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701F3D] uppercase tracking-wider bg-[#F8E7EC] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>Event Decoration Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
              Explore Decoration Packages
            </h1>
            <p className="text-sm text-gray-600">
              Handcrafted setups with editable starting prices in Indian Rupees (₹).
            </p>
          </div>

          <p className="text-xs font-semibold text-gray-500">
            Showing <strong className="text-[#701F3D]">{filteredServices.length}</strong> available packages
          </p>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F8E7EC] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search packages, themes, balloons, mandaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden text-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </div>

        {/* Quick Category Chips for Desktop */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#701F3D] text-white shadow-xs'
                  : 'bg-[#FFFCFA] text-[#29252A] hover:bg-[#F8E7EC] border border-[#F8E7EC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8E7EC] text-[#701F3D] text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden text-xs bg-white font-medium cursor-pointer"
            >
              <option value="popular">Popularity & Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`lg:col-span-1 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white p-5 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#F8E7EC]">
              <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#701F3D]">
                <Filter className="w-4 h-4 text-[#D6B36A]" />
                <span>Refine Search</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-gray-500 hover:text-[#701F3D] flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#F8E7EC] text-[#701F3D] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#701F3D]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Budget Slider */}
            <div className="space-y-2 pt-3 border-t border-[#F8E7EC]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-xs font-bold font-serif text-[#701F3D]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1999"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#701F3D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹1,999</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Indoor / Outdoor Venue */}
            <div className="space-y-2 pt-3 border-t border-[#F8E7EC]">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Venue Type
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['all', 'Indoor', 'Outdoor'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedLocationType(type)}
                    className={`py-1.5 px-2 text-center rounded-lg text-xs font-medium cursor-pointer ${
                      selectedLocationType === type
                        ? 'bg-[#701F3D] text-white font-bold'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {type === 'all' ? 'Any' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Package Tier */}
            <div className="space-y-2 pt-3 border-t border-[#F8E7EC]">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Package Tier
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
              >
                <option value="all">All Tiers</option>
                <option value="Budget-Friendly">Budget-Friendly (₹1,999 - ₹3,500)</option>
                <option value="Standard">Standard (₹3,500 - ₹6,500)</option>
                <option value="Luxury">Luxury (₹6,500 - ₹15,000)</option>
                <option value="Grand">Grand Royale (₹15,000+)</option>
              </select>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-3 border-t border-[#F8E7EC]">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Minimum Rating
              </label>
              <div className="flex items-center gap-2">
                {[0, 4.5, 4.8, 4.9].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1 px-1 rounded-lg text-xs font-medium text-center cursor-pointer ${
                      minRating === rating
                        ? 'bg-[#D6B36A] text-[#29252A] font-bold'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Services Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredServices.length === 0 ? (
            /* Clear Empty State */
            <div className="bg-white rounded-2xl p-12 text-center border border-[#F8E7EC] shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#29252A]">
                No Matching Decorations Found
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                We couldn't find any packages matching your exact criteria. Try adjusting your search query, increasing your budget range, or clearing filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onQuickBook={(s) => {
                    setSelectedServiceForBooking(s);
                    setIsBookingModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedServiceForBooking}
      />
    </div>
  );
};
