import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onBookStyle?: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  onBookStyle,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Container */}
      <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black max-h-[70vh] flex items-center justify-center">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto object-contain rounded-xl"
          />
        </div>

        {/* Caption Card */}
        <div className="mt-4 bg-white/10 backdrop-blur-md text-white rounded-xl p-4 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-white/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D6B36A] text-[#29252A]">
                {currentItem.categoryLabel}
              </span>
              <span className="text-xs text-white/60">
                {currentIndex + 1} of {items.length}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white mt-1">
              {currentItem.title}
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">{currentItem.description}</p>
            {currentItem.eventLocation && (
              <p className="text-[11px] text-[#D6B36A] flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>Executed at {currentItem.eventLocation}</span>
              </p>
            )}
          </div>

          {onBookStyle && (
            <button
              onClick={() => onBookStyle(currentItem)}
              className="px-4 py-2 rounded-xl bg-[#701F3D] hover:bg-[#8A264B] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>Book Similar Theme</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
