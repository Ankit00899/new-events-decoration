import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  IndianRupee,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService, formatPrice } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'birthday',
    categoryLabel: 'Birthday Decoration',
    startingPrice: 2999,
    discountPrice: 3499,
    shortDescription: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    inclusions: '120 Pastel Balloons\nCustom Foil Name\nWarm Fairy Lights',
    customizationOptions: 'Pastel Blue & Silver, Blush Pink & Rose Gold',
    setupTimeHours: 2,
    idealFor: 'Indoor' as 'Indoor' | 'Outdoor' | 'Both',
    tier: 'Budget-Friendly' as 'Budget-Friendly' | 'Standard' | 'Luxury' | 'Grand',
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isPublished: true,
  });

  const filtered = services.filter((s) => {
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      category: 'birthday',
      categoryLabel: 'Birthday Decoration',
      startingPrice: 2999,
      discountPrice: 3499,
      shortDescription: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      inclusions: '120 Pastel Balloons\nCustom Foil Name\nWarm Fairy Lights',
      customizationOptions: 'Pastel Blue & Silver, Blush Pink & Rose Gold',
      setupTimeHours: 2,
      idealFor: 'Indoor',
      tier: 'Standard',
      isFeatured: false,
      isTrending: false,
      isBestSeller: false,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      category: service.category,
      categoryLabel: service.categoryLabel,
      startingPrice: service.startingPrice,
      discountPrice: service.discountPrice || service.startingPrice,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      image: service.image,
      inclusions: service.inclusions.join('\n'),
      customizationOptions: service.customizationOptions.join(', '),
      setupTimeHours: service.setupTimeHours,
      idealFor: service.idealFor,
      tier: service.tier,
      isFeatured: service.isFeatured,
      isTrending: service.isTrending,
      isBestSeller: service.isBestSeller,
      isPublished: service.isPublished,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const inclusionsArray = formData.inclusions
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const customizationArray = formData.customizationOptions
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    if (editingService) {
      updateService({
        ...editingService,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        startingPrice: Number(formData.startingPrice),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        image: formData.image,
        inclusions: inclusionsArray,
        customizationOptions: customizationArray,
        setupTimeHours: Number(formData.setupTimeHours),
        idealFor: formData.idealFor,
        tier: formData.tier,
        isFeatured: formData.isFeatured,
        isTrending: formData.isTrending,
        isBestSeller: formData.isBestSeller,
        isPublished: formData.isPublished,
      });
    } else {
      addService({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        startingPrice: Number(formData.startingPrice),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        image: formData.image,
        additionalImages: [],
        inclusions: inclusionsArray,
        customizationOptions: customizationArray,
        availableAddons: [
          { id: 'custom-foil', name: 'Personalized Foil Lettering', price: 499 },
          { id: 'cake-stand', name: 'Pedestal Cake Stand', price: 399 },
        ],
        rating: 4.9,
        reviewsCount: 1,
        isFeatured: formData.isFeatured,
        isTrending: formData.isTrending,
        isBestSeller: formData.isBestSeller,
        isPublished: formData.isPublished,
        setupTimeHours: Number(formData.setupTimeHours),
        idealFor: formData.idealFor,
        tier: formData.tier,
      });
    }

    setModalOpen(false);
  };

  const categoryLabels: Record<string, string> = {
    birthday: 'Birthday Decoration',
    anniversary: 'Anniversary Decoration',
    wedding: 'Wedding Decoration',
    romantic: 'Romantic Room Decoration',
    balloon: 'Balloon Decoration',
    'baby-shower': 'Baby Shower Decoration',
    surprise: 'Surprise Party Decoration',
    customized: 'Customized Events',
  };

  return (
    <AdminLayout pageTitle="Decoration Services Management">
      <div className="space-y-6">
        {/* Actions & Filters Header */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
            >
              <option value="all">All Categories</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="wedding">Wedding Stage</option>
              <option value="romantic">Romantic Room</option>
              <option value="balloon">Balloon Arch</option>
              <option value="baby-shower">Baby Shower</option>
              <option value="surprise">Surprise Party</option>
              <option value="customized">Customized</option>
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Decoration Package</span>
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Package</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Setup / Tier</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{service.title}</p>
                          <p className="text-[11px] text-gray-400 line-clamp-1">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {service.categoryLabel}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold font-serif text-sm text-[#701F3D]">
                        {formatPrice(service.startingPrice)}
                      </span>
                      {service.discountPrice && (
                        <p className="text-[10px] text-gray-400 line-through">
                          {formatPrice(service.discountPrice)}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      <p>{service.setupTimeHours} hrs ({service.idealFor})</p>
                      <span className="text-[10px] font-semibold text-gray-400">{service.tier}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {service.isFeatured && (
                          <span className="bg-[#D6B36A] text-[#29252A] text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                        {service.isBestSeller && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Best Seller
                          </span>
                        )}
                        {service.isTrending && (
                          <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Trending
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          updateService({ ...service, isPublished: !service.isPublished })
                        }
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                          service.isPublished
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {service.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{service.isPublished ? 'Live' : 'Draft'}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-gray-500 hover:text-[#701F3D] hover:bg-gray-100 rounded-lg cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
                              deleteService(service.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add / Edit Service */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="font-serif text-xl font-bold text-[#701F3D]">
                  {editingService ? 'Edit Decoration Service' : 'Add New Decoration Service'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Event Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({
                          ...formData,
                          category: val,
                          categoryLabel: categoryLabels[val] || val,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                    >
                      <option value="birthday">Birthday Decoration</option>
                      <option value="anniversary">Anniversary Decoration</option>
                      <option value="wedding">Wedding Decoration</option>
                      <option value="romantic">Romantic Room Decoration</option>
                      <option value="balloon">Balloon Decoration</option>
                      <option value="baby-shower">Baby Shower Decoration</option>
                      <option value="surprise">Surprise Party Decoration</option>
                      <option value="customized">Customized Events</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Tier
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden bg-white"
                    >
                      <option value="Budget-Friendly">Budget-Friendly</option>
                      <option value="Standard">Standard</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Grand">Grand Royale</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Starting Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Discount Strikethrough Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Setup Time (Hours)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.setupTimeHours}
                      onChange={(e) => setFormData({ ...formData, setupTimeHours: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    High-Res Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                  {formData.image && (
                    <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden border">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Package Inclusions (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.inclusions}
                    onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Customization Color Schemes (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.customizationOptions}
                    onChange={(e) => setFormData({ ...formData, customizationOptions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-[#701F3D]"
                    />
                    <span>Mark as Featured</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="rounded text-[#701F3D]"
                    />
                    <span>Mark as Best Seller</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                      className="rounded text-[#701F3D]"
                    />
                    <span>Mark as Trending</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded text-[#701F3D]"
                    />
                    <span>Published (Live on Site)</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#701F3D] hover:bg-[#52132A] text-white font-bold rounded-xl"
                  >
                    Save Package
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
