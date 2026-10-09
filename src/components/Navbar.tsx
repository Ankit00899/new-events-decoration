import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  Heart,
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Calendar,
  LogOut,
  MapPin,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    settings,
    cart,
    wishlist,
    currentUser,
    logoutUser,
    isAdminLoggedIn,
    services,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredQuickServices = searchQuery.trim()
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navCategories = [
    { label: 'All Services', path: '/services' },
    { label: 'Birthday Decor', path: '/category/birthday' },
    { label: 'Anniversary Decor', path: '/category/anniversary' },
    { label: 'Wedding Stage', path: '/category/wedding' },
    { label: 'Romantic Room', path: '/category/romantic' },
    { label: 'Balloon Arches', path: '/category/balloon' },
    { label: 'Baby Shower', path: '/category/baby-shower' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFCFA] border-b border-[#F8E7EC] shadow-xs">
      {/* 1. Top Announcement Bar */}
      {settings.showAnnouncement && (
        <div className="bg-[#701F3D] text-[#FFFCFA] text-xs sm:text-sm py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-[#D6B36A] animate-pulse shrink-0" />
              <span className="font-medium tracking-wide">
                {settings.announcementText}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-normal">
              <a
                href={`tel:${settings.phoneNumber.replace(/\s+/g, '')}`}
                className="flex items-center gap-1 hover:text-[#D6B36A] transition-colors"
                title="Call Ankit Kumar directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span className="hidden md:inline">{settings.phoneNumber}</span>
              </a>
              <span className="text-white/30 hidden md:inline">|</span>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-1 hover:text-[#D6B36A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span className="hidden lg:inline">{settings.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand (Adjusted for mobile) */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0 pr-1">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] flex items-center justify-center text-[#D6B36A] shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#D6B36A]/40 shrink-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tighter">A</span>
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D6B36A] -ml-0.5 -mt-1 sm:-ml-1 sm:-mt-2" />
            </div>
            <div className="min-w-0">
              <span className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#701F3D] tracking-tight block leading-tight truncate">
                Ankit Event Decor
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-[#B9944A] font-semibold block truncate">
                Luxury Celebrations
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-medium text-[#29252A]">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  location.pathname.startsWith('/services') || location.pathname.startsWith('/category')
                    ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                    : 'hover:text-[#701F3D]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-[#701F3D]" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[#F8E7EC] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[#701F3D] uppercase tracking-wider border-b border-[#F8E7EC]/60 mb-1">
                    Event Categories
                  </div>
                  {navCategories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-[#29252A] hover:bg-[#F8E7EC]/40 hover:text-[#701F3D] transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#F8E7EC] mt-2 pt-2 px-3">
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs text-[#701F3D] font-semibold hover:underline flex items-center justify-between"
                    >
                      <span>View All 10+ Packages</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/category/birthday"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/category/birthday'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Birthday
            </Link>

            <Link
              to="/category/anniversary"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/category/anniversary'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Anniversary
            </Link>

            <Link
              to="/category/wedding"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/category/wedding'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Wedding
            </Link>

            <Link
              to="/gallery"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/gallery'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/about'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/contact'
                  ? 'text-[#701F3D] font-semibold bg-[#F8E7EC]/60'
                  : 'hover:text-[#701F3D]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Icons (Carefully adjusted for mobile) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 text-[#29252A] hover:text-[#701F3D] hover:bg-[#F8E7EC]/40 rounded-full transition-colors cursor-pointer"
              title="Search decorations"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist / Likes Button */}
            <Link
              to="/profile?tab=wishlist"
              className="p-2 sm:p-2.5 text-[#29252A] hover:text-[#701F3D] hover:bg-[#F8E7EC]/40 rounded-full transition-colors relative"
              title="Likes & Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#701F3D] text-[#FFFCFA] text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="p-2 sm:p-2.5 text-[#29252A] hover:text-[#701F3D] hover:bg-[#F8E7EC]/40 rounded-full transition-colors relative"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#D6B36A] text-[#701F3D] text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Dropdown / Login (Compact on mobile) */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 bg-[#F8E7EC]/70 hover:bg-[#F8E7EC] text-[#701F3D] rounded-full text-xs font-semibold border border-[#701F3D]/20 transition-all cursor-pointer"
                    title={currentUser.name}
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3 hidden sm:inline" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#F8E7EC] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-2 border-b border-[#F8E7EC]">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-[#701F3D] truncate">{currentUser.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#29252A] hover:bg-[#F8E7EC]/50"
                      >
                        <User className="w-4 h-4 text-[#701F3D]" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#29252A] hover:bg-[#F8E7EC]/50"
                      >
                        <Calendar className="w-4 h-4 text-[#701F3D]" />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/profile?tab=wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#29252A] hover:bg-[#F8E7EC]/50"
                      >
                        <Heart className="w-4 h-4 text-[#701F3D]" />
                        <span>My Wishlist ({wishlist.length})</span>
                      </Link>
                      <div className="border-t border-[#F8E7EC] mt-1 pt-1">
                        <button
                          onClick={() => {
                            logoutUser();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-[#701F3D] bg-[#F8E7EC] hover:bg-[#701F3D] hover:text-[#FFFCFA] rounded-full transition-all border border-[#701F3D]/20 shadow-xs"
                  title="Login to Account"
                >
                  <User className="w-3.5 h-3.5 sm:hidden" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Book Now Primary Button (Desktop/Tablet) */}
            <Link
              to="/inquiry"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all border border-[#D6B36A]/30 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A]" />
              <span className="whitespace-nowrap">Book Event</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#701F3D] rounded-lg hover:bg-[#F8E7EC] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (Enhanced with Quick Booking & Likes Cards) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F8E7EC] px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
          {/* Top Quick Actions in Mobile Drawer (Booking & Likes Prominently Placed at the Top) */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#F8E7EC]">
            <Link
              to="/inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D6B36A]" />
              <span>Book Event</span>
            </Link>

            <Link
              to="/profile?tab=wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-[#F8E7EC] text-[#701F3D] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#701F3D]/20"
            >
              <Heart className="w-4 h-4 fill-[#701F3D]" />
              <span>Likes ({wishlist.length})</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-[#FFFCFA] hover:bg-[#F8E7EC] text-[#701F3D] border border-[#F8E7EC]"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-[#FFFCFA] hover:bg-[#F8E7EC] text-[#701F3D] border border-[#F8E7EC]"
            >
              All Services
            </Link>
            <Link
              to="/category/birthday"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Birthday Decor
            </Link>
            <Link
              to="/category/anniversary"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Anniversary
            </Link>
            <Link
              to="/category/wedding"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Wedding Stage
            </Link>
            <Link
              to="/category/romantic"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Romantic Room
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              Contact Us
            </Link>
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F8E7EC] bg-gray-50 text-gray-800"
            >
              My Bookings
            </Link>
          </div>

          <div className="pt-2 border-t border-[#F8E7EC] flex items-center justify-between text-xs text-[#701F3D] px-1 font-semibold">
            <a href={`tel:${settings.phoneNumber}`} className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phoneNumber}</span>
            </a>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-1 text-gray-500 hover:text-[#701F3D]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{settings.contactEmail}</span>
            </a>
          </div>
        </div>
      )}

      {/* 4. Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#F8E7EC] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#F8E7EC]">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#701F3D]" />
                <h3 className="font-serif text-xl font-bold text-[#701F3D]">
                  Search Event Decorations
                </h3>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Ring Arch, Birthday, Rose Petal, Balloon, Mandap..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3.5 pl-11 rounded-xl border-2 border-[#701F3D]/20 focus:border-[#701F3D] focus:outline-hidden text-sm"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-4" />
                {searchQuery && (
                  <button
                    type="submit"
                    className="absolute right-2.5 top-2.5 px-3 py-1.5 bg-[#701F3D] text-white text-xs font-semibold rounded-lg hover:bg-[#52132A]"
                  >
                    Search
                  </button>
                )}
              </div>
            </form>

            {/* Instant suggestions */}
            {filteredQuickServices.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Matching Decorations
                </p>
                <div className="space-y-1">
                  {filteredQuickServices.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8E7EC]/40 transition-colors"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#29252A] truncate">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.categoryLabel} • Starting from ₹{service.startingPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#701F3D]">View →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#F8E7EC] flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-[#701F3D]">Popular Searches:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Birthday');
                  navigate('/category/birthday');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-[#F8E7EC]/70 rounded-full hover:bg-[#F8E7EC] text-[#701F3D]"
              >
                Birthday Balloons
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Anniversary');
                  navigate('/category/anniversary');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-[#F8E7EC]/70 rounded-full hover:bg-[#F8E7EC] text-[#701F3D]"
              >
                Anniversary Romance
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('Wedding');
                  navigate('/category/wedding');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-[#F8E7EC]/70 rounded-full hover:bg-[#F8E7EC] text-[#701F3D]"
              >
                Wedding Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
