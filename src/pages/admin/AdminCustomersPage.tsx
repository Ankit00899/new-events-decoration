import React, { useState } from 'react';
import { Users, Search, Phone, Mail, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';

export const AdminCustomersPage: React.FC = () => {
  const { bookings, formatPrice } = useApp();
  const [search, setSearch] = useState('');

  // Extract unique customers from bookings
  const customersMap = new Map<string, {
    name: string;
    email: string;
    phone: string;
    city: string;
    bookingCount: number;
    totalSpent: number;
    lastEventDate: string;
  }>();

  bookings.forEach((b) => {
    const key = b.customerPhone || b.customerEmail || b.customerName;
    if (!customersMap.has(key)) {
      customersMap.set(key, {
        name: b.customerName,
        email: b.customerEmail,
        phone: b.customerPhone,
        city: b.eventCity,
        bookingCount: 1,
        totalSpent: b.totalEstimatedAmount || 0,
        lastEventDate: b.eventDate,
      });
    } else {
      const existing = customersMap.get(key)!;
      existing.bookingCount += 1;
      existing.totalSpent += b.totalEstimatedAmount || 0;
      if (new Date(b.eventDate) > new Date(existing.lastEventDate)) {
        existing.lastEventDate = b.eventDate;
      }
    }
  });

  const customersList = Array.from(customersMap.values()).filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout pageTitle="Client Relationship Roster">
      <div className="space-y-6">
        {/* Header & Search */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search customers by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <p className="text-xs text-gray-500 font-semibold">
            Total Clients: <strong className="text-[#701F3D]">{customersList.length}</strong>
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Phone / WhatsApp</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Total Bookings</th>
                  <th className="py-3.5 px-4">Recorded Value</th>
                  <th className="py-3.5 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customersList.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700">
                      {c.phone}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {c.email || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 font-medium">
                      {c.city}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                        {c.bookingCount} Event{c.bookingCount > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-[#701F3D]">
                      {formatPrice(c.totalSpent)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${c.name}, this is Ankit Kumar from Ankit Event Decor.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20b857]"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${c.phone.replace(/[^0-9]/g, '')}`}
                          className="p-1.5 rounded-lg bg-[#701F3D] text-white hover:bg-[#52132A]"
                          title="Call"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
