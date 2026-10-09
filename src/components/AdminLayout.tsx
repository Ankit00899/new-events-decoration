import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  CalendarCheck2,
  MessageSquare,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldAlert,
  Bell,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLayout: React.FC<{ children: React.ReactNode; pageTitle: string }> = ({
  children,
  pageTitle,
}) => {
  const {
    isAdminLoggedIn,
    adminUser,
    logoutAdmin,
    settings,
    bookings,
    inquiries,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFFCFA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-xl border border-red-200 space-y-4">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#701F3D]">
            Access Restricted
          </h2>
          <p className="text-sm text-gray-600">
            This administrative control panel is restricted to the business owner (Ankit Kumar) and authorized coordinators.
          </p>
          <div className="pt-2">
            <Link
              to="/admin/login"
              className="inline-block w-full py-2.5 rounded-xl bg-[#701F3D] text-white text-sm font-semibold hover:bg-[#52132A] transition-colors"
            >
              Go to Admin Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  const navItems = [
    {
      label: 'Overview',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Services & Packages',
      path: '/admin/services',
      icon: Package,
      badge: null,
    },
    {
      label: 'Bookings Management',
      path: '/admin/bookings',
      icon: CalendarCheck2,
      badge: pendingBookingsCount > 0 ? pendingBookingsCount : null,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      label: 'Customer Inquiries',
      path: '/admin/inquiries',
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : null,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      label: 'Customers List',
      path: '/admin/customers',
      icon: Users,
      badge: null,
    },
    {
      label: 'Event Gallery',
      path: '/admin/gallery',
      icon: ImageIcon,
      badge: null,
    },
    {
      label: 'Business Settings',
      path: '/admin/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#29252A] text-white flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] flex items-center justify-center text-[#D6B36A] font-serif font-bold text-xl border border-[#D6B36A]/40">
              A
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-white leading-tight">
                Ankit Event Decor
              </h1>
              <span className="text-[10px] text-[#D6B36A] tracking-wider uppercase font-semibold">
                Owner Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10">
          <p className="text-xs text-gray-400">Authenticated Administrator</p>
          <p className="text-sm font-semibold text-white">{adminUser?.name || settings.ownerName}</p>
          <p className="text-[11px] text-[#D6B36A] truncate">{adminUser?.email || settings.contactEmail}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#701F3D] text-white shadow-sm border border-[#D6B36A]/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6B36A]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.badgeColor || 'bg-gray-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs text-gray-300 hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#D6B36A]" />
              <span>View Live Website</span>
            </span>
            <span className="text-[10px] text-gray-400">↗</span>
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#701F3D]">
              {pageTitle}
            </h2>
            <p className="text-xs text-gray-500">
              Logged in as {settings.ownerName} • Contact: {settings.phoneNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {pendingBookingsCount > 0 && (
              <Link
                to="/admin/bookings"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100"
              >
                <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                <span>{pendingBookingsCount} Pending Bookings</span>
              </Link>
            )}

            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-xl border border-gray-300 hover:border-[#701F3D] text-[#701F3D] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
