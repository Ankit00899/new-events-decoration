import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  IndianRupee,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { bookings, inquiries, services, updateBookingStatus, formatPrice, settings } = useApp();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedEvents = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const completedEvents = bookings.filter((b) => b.status === 'Completed').length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'New').length;

  // Revenue strictly based on recorded Confirmed/Completed transactions
  const recordedRevenue = bookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'In Progress' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.totalEstimatedAmount || 0), 0);

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const upcomingBookings = bookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'In Progress')
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, 4);

  return (
    <AdminLayout pageTitle="Dashboard Overview">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#D6B36A]/30">
          <div className="space-y-1">
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-widest">
              Executive Control Console
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Welcome back, {settings.ownerName}!
            </h2>
            <p className="text-xs text-white/80">
              Manage incoming celebration bookings, customer inquiries, and live website packages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/bookings"
              className="px-4 py-2 bg-[#D6B36A] hover:bg-[#B9944A] text-[#29252A] rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Review {pendingBookings} Pending Requests
            </Link>
          </div>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Bookings</span>
              <CalendarCheck2 className="w-4 h-4 text-[#701F3D]" />
            </div>
            <p className="font-serif text-2xl font-bold text-[#29252A]">{totalBookings}</p>
            <p className="text-[10px] text-gray-400">Total recorded</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-amber-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-amber-900">{pendingBookings}</p>
            <p className="text-[10px] text-amber-700">Needs confirmation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-blue-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-blue-900">{confirmedEvents}</p>
            <p className="text-[10px] text-blue-700">Ready for setup</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-emerald-900">{completedEvents}</p>
            <p className="text-[10px] text-emerald-700">Successfully styled</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-rose-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Inquiries</span>
              <MessageSquare className="w-4 h-4 text-rose-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-rose-900">{pendingInquiries}</p>
            <p className="text-[10px] text-rose-700">Uncontacted leads</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D6B36A] bg-[#FFFCFA] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#B9944A]">
              <span className="text-[11px] font-bold uppercase tracking-wider">Revenue</span>
              <IndianRupee className="w-4 h-4 text-[#701F3D]" />
            </div>
            <p className="font-serif text-xl font-bold text-[#701F3D] truncate">{formatPrice(recordedRevenue)}</p>
            <p className="text-[10px] text-gray-500">Confirmed orders</p>
          </div>
        </div>

        {/* 2-Column: Recent Bookings & Upcoming Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Recent Bookings (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#29252A]">
                  Recent Booking Requests
                </h3>
                <p className="text-xs text-gray-500">Manage statuses and lock in client dates.</p>
              </div>

              <Link
                to="/admin/bookings"
                className="text-xs font-bold text-[#701F3D] hover:underline flex items-center gap-1"
              >
                <span>View All ({bookings.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl border border-gray-100 hover:border-[#701F3D]/20 bg-gray-50/50 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#701F3D] bg-[#F8E7EC] px-2 py-0.5 rounded">
                          {b.referenceNumber}
                        </span>
                        <span className="text-xs font-bold text-gray-900">{b.customerName}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{b.serviceTitle}</p>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-sm text-[#701F3D]">
                        {formatPrice(b.totalEstimatedAmount)}
                      </span>
                      <p className="text-[11px] text-gray-400">
                        {b.eventDate} ({b.eventTime})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        b.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : b.status === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : b.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {b.status}
                    </span>

                    {/* Quick status actions */}
                    <div className="flex items-center gap-1.5">
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Confirmed', 'Confirmed by admin on dashboard')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Confirm Event
                        </button>
                      )}
                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Completed', 'Event successfully styled and delivered')}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                      <Link
                        to="/admin/bookings"
                        className="px-2.5 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-[11px] font-semibold"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Events Calendar & Recent Inquiries (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upcoming Confirmed Events */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#29252A] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D6B36A]" />
                  <span>Upcoming Setup Schedule</span>
                </h3>
              </div>

              {upcomingBookings.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">
                  No upcoming confirmed events scheduled.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {upcomingBookings.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{ev.customerName}</p>
                        <p className="text-[11px] text-gray-600 truncate">{ev.serviceTitle}</p>
                        <p className="text-[10px] text-blue-700 font-semibold">{ev.eventCity}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-gray-800">{ev.eventDate}</span>
                        <p className="text-[10px] text-gray-500">{ev.eventTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Leads / Inquiries */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#29252A] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-rose-600" />
                  <span>Recent Customer Inquiries</span>
                </h3>
                <Link
                  to="/admin/inquiries"
                  className="text-xs font-bold text-[#701F3D] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2.5">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{inq.customerName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          inq.status === 'New'
                            ? 'bg-rose-100 text-rose-800'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-1">{inq.message}</p>
                    <p className="text-[10px] text-gray-400">
                      {inq.phone} • {inq.eventCategory}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
