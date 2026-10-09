export type BookingStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';

export type InquiryStatus = 'New' | 'Contacted' | 'Converted' | 'Closed';

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ServiceReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBooking?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string; // birthday, anniversary, balloon, romantic, baby-shower, surprise, wedding, customized
  categoryLabel: string;
  startingPrice: number;
  discountPrice?: number;
  shortDescription: string;
  fullDescription: string;
  image: string;
  additionalImages: string[];
  inclusions: string[];
  customizationOptions: string[];
  availableAddons: ServiceAddon[];
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  setupTimeHours: number;
  idealFor: 'Indoor' | 'Outdoor' | 'Both';
  tier: 'Budget-Friendly' | 'Standard' | 'Luxury' | 'Grand';
  createdAt: string;
}

export interface BookingStatusHistory {
  status: BookingStatus;
  timestamp: string;
  note?: string;
  updatedBy: string;
}

export interface Booking {
  id: string;
  referenceNumber: string; // e.g. AED-2026-4921
  serviceId?: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventCity: string;
  fullAddress: string;
  expectedBudget: number;
  guestCount: number;
  decorationPreferences: string;
  additionalRequirements: string;
  selectedAddons?: { name: string; price: number }[];
  status: BookingStatus;
  statusHistory: BookingStatusHistory[];
  internalNotes?: string;
  totalEstimatedAmount: number;
  createdAt: string;
  userId?: string;
}

export interface Inquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  eventCategory: string;
  eventDate?: string;
  estimatedBudget?: string;
  message: string;
  status: InquiryStatus;
  internalNotes?: string;
  followUpDate?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface CartItem {
  serviceId: string;
  title: string;
  image: string;
  basePrice: number;
  selectedAddons: ServiceAddon[];
  eventDate?: string;
  quantity: number;
  calculatedPrice: number;
}

export interface OrderItem {
  serviceId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
  selectedAddons: ServiceAddon[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'CashOnDelivery';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Processing' | 'Confirmed' | 'Delivered' | 'Cancelled';
  deliveryAddress: string;
  eventDate: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  description: string;
  eventLocation?: string;
  serviceId?: string;
  isFeatured?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  isActive: boolean;
  description: string;
}

export interface WebsiteSettings {
  businessName: string;
  ownerName: string;
  contactEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  fullOfficeAddress: string;
  announcementText: string;
  showAnnouncement: boolean;
  currencySymbol: string;
  experienceYears: number;
  completedEventsCount: number;
  citiesServed: string[];
}
