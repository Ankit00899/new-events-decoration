import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Sparkles, Clock, Palette, ShoppingBag, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { useApp } from '../context/AppContext';

interface ServiceCardProps {
  service: ServiceItem;
  onQuickBook?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onQuickBook }) => {
  const { isInWishlist, toggleWishlist, addToCart, formatPrice } = useApp();
  const wishlisted = isInWishlist(service.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#F8E7EC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-[#701F3D]/90 text-white text-[11px] font-semibold backdrop-blur-xs tracking-wide">
            {service.categoryLabel}
          </span>
          {service.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-[#D6B36A] text-[#29252A] text-[10px] font-bold shadow-xs">
              ★ Best Seller
            </span>
          )}
          {service.isTrending && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(service.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
            wishlisted
              ? 'bg-[#701F3D] text-[#FFFCFA]'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-[#701F3D]'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Rating overlay */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#D6B36A] text-[#D6B36A]" />
          <span className="font-bold">{service.rating}</span>
          <span className="text-gray-300 text-[10px]">({service.reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <Link to={`/services/${service.id}`} className="block">
            <h3 className="font-serif text-lg font-bold text-[#29252A] hover:text-[#701F3D] transition-colors line-clamp-1">
              {service.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Customization Options Badges */}
          {service.customizationOptions && service.customizationOptions.length > 0 && (
            <div className="pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#701F3D] font-medium mb-1">
                <Palette className="w-3 h-3 text-[#D6B36A]" />
                <span>Custom color themes available:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {service.customizationOptions.slice(0, 2).map((opt, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#F8E7EC] text-[#701F3D] px-2 py-0.5 rounded-md font-medium"
                  >
                    {opt}
                  </span>
                ))}
                {service.customizationOptions.length > 2 && (
                  <span className="text-[10px] text-gray-400 self-center">
                    +{service.customizationOptions.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#F8E7EC] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block">
                Starting from
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-serif text-[#701F3D]">
                  {formatPrice(service.startingPrice)}
                </span>
                {service.discountPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(service.discountPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D6B36A]" />
              <span>{service.setupTimeHours} hrs setup</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/services/${service.id}`}
              className="w-full py-2 px-2 sm:px-3 rounded-xl border border-[#701F3D] text-[#701F3D] hover:bg-[#F8E7EC] text-[11px] sm:text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
            >
              <span>View Details</span>
            </Link>

            {onQuickBook ? (
              <button
                onClick={() => onQuickBook(service)}
                className="w-full py-2 px-2 sm:px-3 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-[11px] sm:text-xs font-semibold text-center shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D6B36A] shrink-0" />
                <span>Book Now</span>
              </button>
            ) : (
              <Link
                to={`/services/${service.id}#book`}
                className="w-full py-2 px-2 sm:px-3 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-[11px] sm:text-xs font-semibold text-center shadow-xs transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D6B36A] shrink-0" />
                <span>Book Now</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
