import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, MapPin, X, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'birthday',
    categoryLabel: 'Birthday',
    imageUrl: '',
    description: '',
    eventLocation: 'Noida Sector 50',
    isFeatured: true,
  });

  const categoryLabels: Record<string, string> = {
    birthday: 'Birthday',
    anniversary: 'Anniversary',
    romantic: 'Romantic Room',
    wedding: 'Wedding',
    'baby-shower': 'Baby Shower',
    balloon: 'Balloon Decor',
    surprise: 'Surprise Party',
    customized: 'Customized Events',
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;

    addGalleryItem({
      title: formData.title,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      imageUrl: formData.imageUrl,
      description: formData.description,
      eventLocation: formData.eventLocation,
      isFeatured: formData.isFeatured,
    });

    setModalOpen(false);
    setFormData({
      title: '',
      category: 'birthday',
      categoryLabel: 'Birthday',
      imageUrl: '',
      description: '',
      eventLocation: 'Noida',
      isFeatured: true,
    });
  };

  return (
    <AdminLayout pageTitle="Event Gallery & Portfolio Manager">
      <div className="space-y-6">
        {/* Action Header */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#29252A]">
              Live Showcase Photos ({gallery.length})
            </h3>
            <p className="text-xs text-gray-500">
              Photographs displayed across the public gallery and homepage showcases.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#701F3D] text-white text-[10px] font-bold">
                  {item.categoryLabel}
                </span>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete photo "${item.title}"?`)) {
                      deleteGalleryItem(item.id);
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-xs"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 space-y-1">
                <h4 className="font-serif font-bold text-sm text-gray-900 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                {item.eventLocation && (
                  <p className="text-[10px] text-[#B9944A] flex items-center gap-1 pt-1 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>{item.eventLocation}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Gallery Photo */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#701F3D]">
                  Add Portfolio Image
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ring Arch Birthday setup"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

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
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="romantic">Romantic Room</option>
                    <option value="wedding">Wedding Stage</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="balloon">Balloon Decor</option>
                    <option value="surprise">Surprise Party</option>
                    <option value="customized">Customized Events</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    High-Res Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Event Execution Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Noida Sector 50, Villa"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Caption / Brief Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border rounded-xl text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#701F3D] text-white font-bold rounded-xl"
                  >
                    Add to Gallery
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
