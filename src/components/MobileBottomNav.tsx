import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Heart, Calendar, Grid } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { wishlist, bookings, currentUser } = useApp();

  const userPendingCount = bookings.filter((b) => {
    if (!currentUser) return b.status === 'Pending';
    return (b.userId === currentUser.id || b.customerEmail === currentUser.email) && b.status === 'Pending';
  }).length;

  // Don't show bottom nav inside admin panel
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = location.pathname === '/';
  const isServices = location.pathname.startsWith('/services') || location.pathname.startsWith('/category');
  const isWishlist = location.pathname === '/profile' && location.search.includes('wishlist');
  const isBookings = location.pathname === '/my-bookings';
  const isBookNow = location.pathname === '/inquiry';

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F8E7EC] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 transition-all"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isHome ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className={`text-[10px] mt-0.5 ${isHome ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Home
          </span>
        </Link>

        {/* 2. Services */}
        <Link
          to="/services"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isServices ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <Grid className={`w-5 h-5 ${isServices ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className={`text-[10px] mt-0.5 ${isServices ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Services
          </span>
        </Link>

        {/* 3. Center Floating "Book Event" Button */}
        <Link
          to="/inquiry"
          className="flex flex-col items-center justify-center -translate-y-3 group"
          title="Book Your Celebration"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] text-white flex items-center justify-center shadow-lg border-2 border-[#D6B36A] group-hover:scale-105 group-active:scale-95 transition-all">
            <Sparkles className="w-5 h-5 text-[#D6B36A] animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-[#701F3D] mt-0.5">
            Book Event
          </span>
        </Link>

        {/* 4. Likes / Wishlist */}
        <Link
          to="/profile?tab=wishlist"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors relative ${
            isWishlist ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
          title="Likes & Wishlist"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isWishlist ? 'stroke-[2.5] fill-[#701F3D]' : 'stroke-[1.75]'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#701F3D] text-white text-[9px] font-bold px-1 rounded-full min-w-[15px] h-[15px] flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-0.5 ${isWishlist ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Likes
          </span>
        </Link>

        {/* 5. My Bookings */}
        <Link
          to="/my-bookings"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors relative ${
            isBookings ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 ${isBookings ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            {userPendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </div>
          <span className={`text-[10px] mt-0.5 ${isBookings ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Bookings
          </span>
        </Link>
      </div>
    </nav>
  );
};
