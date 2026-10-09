import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  Booking,
  BookingStatus,
  Inquiry,
  InquiryStatus,
  User,
  CartItem,
  Order,
  GalleryItem,
  Coupon,
  WebsiteSettings,
  ServiceAddon,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_GALLERY,
  INITIAL_COUPONS,
  INITIAL_SETTINGS,
} from '../data/initialData';

interface AppContextType {
  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id' | 'createdAt'>) => ServiceItem;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  getServiceById: (id: string) => ServiceItem | undefined;

  // Bookings
  bookings: Booking[];
  addBooking: (bookingInput: Omit<Booking, 'id' | 'referenceNumber' | 'status' | 'statusHistory' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, note?: string) => void;
  updateBookingNotes: (id: string, internalNotes: string) => void;
  deleteBooking: (id: string) => void;

  // Inquiries
  inquiries: Inquiry[];
  addInquiry: (inquiryInput: Omit<Inquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => Inquiry;
  updateInquiryStatus: (id: string, status: InquiryStatus, internalNotes?: string, followUpDate?: string) => void;
  deleteInquiry: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => GalleryItem;
  deleteGalleryItem: (id: string) => void;

  // Coupons
  coupons: Coupon[];
  validateCoupon: (code: string, subtotal: number) => { valid: boolean; discount: number; message: string; coupon?: Coupon };
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (id: string) => void;

  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (service: ServiceItem, addons?: ServiceAddon[], eventDate?: string, quantity?: number) => void;
  removeFromCart: (serviceId: string) => void;
  updateCartQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (serviceId: string) => void;
  isInWishlist: (serviceId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;

  // Authentication
  currentUser: User | null;
  loginUser: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  signupUser: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminUser: { email: string; name: string } | null;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logoutAdmin: () => void;

  // Helpers
  formatPrice: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    referenceNumber: 'AED-2025-8831',
    serviceId: 'premium-birthday-decor',
    serviceTitle: 'Premium Ring Arch Birthday Backdrop',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+91 98112 33445',
    eventType: 'Birthday Party',
    eventDate: '2025-03-28',
    eventTime: '05:30 PM',
    eventCity: 'Noida',
    fullAddress: 'Tower B, Flat 402, Prateek Edifice, Sector 107, Noida',
    expectedBudget: 5500,
    guestCount: 25,
    decorationPreferences: 'Rose gold, champagne gold, customized neon sign with name "Aarav turns 5"',
    additionalRequirements: 'Needs to be completed before 4:30 PM for cake photoshoot.',
    selectedAddons: [
      { name: 'Personalized Welcome Easel Board', price: 799 },
    ],
    status: 'Confirmed',
    statusHistory: [
      { status: 'Pending', timestamp: '2025-03-10T11:00:00Z', updatedBy: 'System' },
      { status: 'Confirmed', timestamp: '2025-03-11T09:30:00Z', note: 'Customer paid 30% advance via UPI. Team assigned.', updatedBy: 'Ankit Kumar (Admin)' },
    ],
    internalNotes: 'Staff Rohit & Manoj scheduled. Setup start time 2:00 PM.',
    totalEstimatedAmount: 5298,
    createdAt: '2025-03-10T11:00:00Z',
  },
  {
    id: 'b-102',
    referenceNumber: 'AED-2025-9120',
    serviceId: 'anniversary-room-decor',
    serviceTitle: 'Romantic Candlelight & Rose Petal Room Decor',
    customerName: 'Kabir Singhania',
    customerEmail: 'kabir.s@example.com',
    customerPhone: '+91 97110 56789',
    eventType: '1st Anniversary Surprise',
    eventDate: '2025-04-02',
    eventTime: '07:00 PM',
    eventCity: 'Delhi',
    fullAddress: 'House 14, Greater Kailash 1, New Delhi',
    expectedBudget: 4000,
    guestCount: 2,
    decorationPreferences: 'Deep red roses, warm fairy lights, memory clips on wall.',
    additionalRequirements: 'Strict secret setup while wife is at work.',
    selectedAddons: [
      { name: '30 Premium Red Rose Bouquet', price: 999 },
    ],
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', timestamp: '2025-03-15T14:20:00Z', updatedBy: 'System' },
    ],
    internalNotes: 'Customer requested quick call back regarding gate entry permissions.',
    totalEstimatedAmount: 4198,
    createdAt: '2025-03-15T14:20:00Z',
  },
  {
    id: 'b-103',
    referenceNumber: 'AED-2025-9344',
    serviceId: 'wedding-stage-decor',
    serviceTitle: 'Grand Royal Mandap & Reception Stage Setup',
    customerName: 'Aditya & Ritu Mehra',
    customerEmail: 'mehra.events@example.com',
    customerPhone: '+91 99551 22334',
    eventType: 'Wedding Reception',
    eventDate: '2025-04-18',
    eventTime: '06:00 PM',
    eventCity: 'Lucknow',
    fullAddress: 'The Imperial Lawn, Shaheed Path, Lucknow',
    expectedBudget: 35000,
    guestCount: 400,
    decorationPreferences: 'Royal brass heritage look with mogra & marigold fresh flowers and velvet couch.',
    additionalRequirements: 'Low fog machine needed during groom & bride stage entry.',
    selectedAddons: [
      { name: 'Heavy Low Dry-Ice Cloud Fog for Couple Dance', price: 4999 },
      { name: '8 Synchronized Cold Pyro Fountains', price: 3499 },
    ],
    status: 'In Progress',
    statusHistory: [
      { status: 'Pending', timestamp: '2025-03-01T10:00:00Z', updatedBy: 'System' },
      { status: 'Confirmed', timestamp: '2025-03-02T16:00:00Z', note: 'Advance received ₹10,000.', updatedBy: 'Ankit Kumar' },
      { status: 'In Progress', timestamp: '2025-03-12T12:00:00Z', note: 'Floral procurement and carpentry framing finalized.', updatedBy: 'Ankit Kumar' },
    ],
    internalNotes: 'Site visit completed with venue manager. Extra generator approved.',
    totalEstimatedAmount: 33497,
    createdAt: '2025-03-01T10:00:00Z',
  },
  {
    id: 'b-104',
    referenceNumber: 'AED-2025-7809',
    serviceId: 'baby-shower-decor',
    serviceTitle: 'Dreamy Cloud & Hot Air Balloon Baby Shower',
    customerName: 'Sunita Arora',
    customerEmail: 'sunita.arora@example.com',
    customerPhone: '+91 98990 11223',
    eventType: 'Baby Shower',
    eventDate: '2025-02-14',
    eventTime: '04:00 PM',
    eventCity: 'Gurugram',
    fullAddress: 'Clubhouse, Nirvana Country, Sector 50, Gurugram',
    expectedBudget: 7500,
    guestCount: 45,
    decorationPreferences: 'Mint and pastel yellow, cloud arches.',
    additionalRequirements: 'Mom-to-be throne chair included.',
    status: 'Completed',
    statusHistory: [
      { status: 'Pending', timestamp: '2025-02-05T09:00:00Z', updatedBy: 'System' },
      { status: 'Confirmed', timestamp: '2025-02-06T11:00:00Z', updatedBy: 'Ankit Kumar' },
      { status: 'Completed', timestamp: '2025-02-14T20:00:00Z', note: 'Event concluded smoothly. Customer left 5 star review.', updatedBy: 'Ankit Kumar' },
    ],
    internalNotes: 'All props returned to warehouse in top condition.',
    totalEstimatedAmount: 7498,
    createdAt: '2025-02-05T09:00:00Z',
  },
];

const INITIAL_SAMPLE_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    referenceNumber: 'INQ-2025-3011',
    customerName: 'Harsh Vardhan',
    email: 'harsh.v@gmail.com',
    phone: '+91 98101 98101',
    eventCategory: 'Corporate & Anniversary Gala',
    eventDate: '2025-04-12',
    estimatedBudget: '₹15,000 - ₹20,000',
    message: 'We are organizing our 10th startup anniversary at a terrace venue in DLF Phase 5. Need customized branding, ambient lighting, and floral stage.',
    status: 'New',
    createdAt: '2025-03-18T10:30:00Z',
  },
  {
    id: 'inq-2',
    referenceNumber: 'INQ-2025-2984',
    customerName: 'Meenakshi Iyer',
    email: 'meenakshi.iyer@yahoo.com',
    phone: '+91 99100 44556',
    eventCategory: 'Romantic Room Decoration',
    eventDate: '2025-03-30',
    estimatedBudget: '₹3,000 - ₹5,000',
    message: 'Want to decorate our hotel room in Noida for my husband’s birthday surprise. Can you provide helium balloons and red rose pathway?',
    status: 'Contacted',
    internalNotes: 'Spoke over phone. Shared package PDF via WhatsApp.',
    followUpDate: '2025-03-22',
    createdAt: '2025-03-16T15:45:00Z',
  },
  {
    id: 'inq-3',
    referenceNumber: 'INQ-2025-2910',
    customerName: 'Rajeev Malhotra',
    email: 'rajeev.m@outlook.com',
    phone: '+91 98200 33445',
    eventCategory: 'Wedding Stage Decoration',
    eventDate: '2025-05-10',
    estimatedBudget: '₹40,000+',
    message: 'Looking for turnkey floral setup and mandap decoration for a destination wedding in Lucknow.',
    status: 'Converted',
    internalNotes: 'Converted to formal booking. Advanced discussion with venue manager.',
    createdAt: '2025-03-12T11:20:00Z',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('aed_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('aed_bookings');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_BOOKINGS;
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('aed_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_INQUIRIES;
  });

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('aed_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('aed_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  // Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('aed_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new phone number is updated
        parsed.phoneNumber = '+91 96502 46245';
        parsed.whatsappNumber = '919650246245';
        return parsed;
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aed_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aed_wishlist');
    return saved ? JSON.parse(saved) : ['premium-birthday-decor', 'anniversary-room-decor'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aed_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // User Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aed_current_user');
    return saved ? JSON.parse(saved) : {
      id: 'cust-demo-1',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98112 33445',
      city: 'Noida',
      address: 'Tower B, Prateek Edifice, Sector 107',
      role: 'customer',
      createdAt: '2025-01-10T10:00:00Z',
    };
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('aed_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('aed_admin_user');
    return saved ? JSON.parse(saved) : (localStorage.getItem('aed_admin_auth') === 'true' ? {
      email: 'contact211@gmail.com',
      name: 'Ankit Kumar (Owner)',
    } : null);
  });

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('aed_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('aed_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('aed_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('aed_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('aed_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('aed_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('aed_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aed_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aed_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aed_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aed_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aed_admin_auth', isAdminLoggedIn ? 'true' : 'false');
    if (adminUser) {
      localStorage.setItem('aed_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('aed_admin_user');
    }
  }, [isAdminLoggedIn, adminUser]);

  // Service helpers
  const getServiceById = (id: string) => {
    return services.find(s => s.id === id || s.slug === id);
  };

  const addService = (serviceInput: Omit<ServiceItem, 'id' | 'createdAt'>) => {
    const id = serviceInput.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `service-${Date.now()}`;
    const newService: ServiceItem = {
      ...serviceInput,
      id,
      createdAt: new Date().toISOString(),
    };
    setServices(prev => [newService, ...prev]);
    return newService;
  };

  const updateService = (updated: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Booking helpers
  const addBooking = (bookingInput: Omit<Booking, 'id' | 'referenceNumber' | 'status' | 'statusHistory' | 'createdAt'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNum = `AED-${new Date().getFullYear()}-${randomSuffix}`;
    const newBooking: Booking = {
      ...bookingInput,
      id: `book-${Date.now()}`,
      referenceNumber: refNum,
      status: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: 'Booking request received via website. Awaiting admin review.',
          updatedBy: 'System',
        },
      ],
      createdAt: new Date().toISOString(),
      userId: currentUser?.id,
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, note?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b;
      const historyEntry = {
        status,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${status}`,
        updatedBy: adminUser?.name || 'Admin',
      };
      return {
        ...b,
        status,
        statusHistory: [...b.statusHistory, historyEntry],
      };
    }));
  };

  const updateBookingNotes = (id: string, internalNotes: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, internalNotes } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Inquiry helpers
  const addInquiry = (inquiryInput: Omit<Inquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNum = `INQ-${new Date().getFullYear()}-${randomSuffix}`;
    const newInquiry: Inquiry = {
      ...inquiryInput,
      id: `inq-${Date.now()}`,
      referenceNumber: refNum,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, internalNotes?: string, followUpDate?: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id !== id) return inq;
      return {
        ...inq,
        status,
        ...(internalNotes !== undefined && { internalNotes }),
        ...(followUpDate !== undefined && { followUpDate }),
      };
    }));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Gallery helpers
  const addGalleryItem = (itemInput: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemInput,
      id: `gallery-${Date.now()}`,
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Coupons
  const validateCoupon = (code: string, subtotal: number) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code.' };
    }
    if (subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of ${settings.currencySymbol}${coupon.minOrderValue} required for this coupon.`,
      };
    }
    const discount = coupon.discountType === 'percentage'
      ? Math.round((subtotal * coupon.discountValue) / 100)
      : coupon.discountValue;
    return {
      valid: true,
      discount,
      message: `Coupon ${coupon.code} applied successfully! You saved ${settings.currencySymbol}${discount}.`,
      coupon,
    };
  };

  const addCoupon = (couponInput: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponInput,
      id: `coupon-${Date.now()}`,
      code: couponInput.code.toUpperCase().trim(),
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Cart
  const addToCart = (service: ServiceItem, addons: ServiceAddon[] = [], eventDate?: string, quantity = 1) => {
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const calculatedPrice = (service.startingPrice + addonsTotal) * quantity;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.serviceId === service.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          selectedAddons: addons,
          eventDate: eventDate || updated[existingIndex].eventDate,
          calculatedPrice: (service.startingPrice + addonsTotal) * (updated[existingIndex].quantity + quantity),
        };
        return updated;
      }
      return [
        ...prev,
        {
          serviceId: service.id,
          title: service.title,
          image: service.image,
          basePrice: service.startingPrice,
          selectedAddons: addons,
          eventDate,
          quantity,
          calculatedPrice,
        },
      ];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prev => prev.filter(item => item.serviceId !== serviceId));
  };

  const updateCartQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.serviceId !== serviceId) return item;
      const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
      return {
        ...item,
        quantity,
        calculatedPrice: (item.basePrice + addonsTotal) * quantity,
      };
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.calculatedPrice, 0);

  // Wishlist
  const toggleWishlist = (serviceId: string) => {
    setWishlist(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const isInWishlist = (serviceId: string) => wishlist.includes(serviceId);

  // Orders
  const createOrder = (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ORD-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      ...orderInput,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Auth
  const loginUser = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Look up or mock authenticate
    const existing = currentUser && currentUser.email.toLowerCase() === email.toLowerCase()
      ? currentUser
      : {
          id: `cust-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' '),
          email: email.toLowerCase(),
          phone: '+91 98765 43210',
          city: 'Delhi NCR',
          role: 'customer' as const,
          createdAt: new Date().toISOString(),
        };
    setCurrentUser(existing);
    return { success: true, message: `Welcome back, ${existing.name}!` };
  };

  const signupUser = async (name: string, email: string, phone: string): Promise<{ success: boolean; message: string }> => {
    const newUser: User = {
      id: `cust-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    return { success: true, message: 'Account created successfully! Welcome to Ankit Event Decor.' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...data } : null);
  };

  // Admin Auth
  const loginAdmin = async (usernameOrEmail: string, password: string): Promise<{ success: boolean; message: string }> => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    // Authorized admin credentials matching business owner Ankit Kumar
    const validUsers = ['ankit', 'contact211@gmail.com', 'admin@ankiteventdecor.com', 'admin'];
    const validPasswords = ['ankit@123', 'admin123', 'ankit2026'];
    if (validUsers.includes(cleanUser) && validPasswords.includes(password)) {
      setIsAdminLoggedIn(true);
      setAdminUser({
        email: cleanUser.includes('@') ? cleanUser : 'contact211@gmail.com',
        name: 'Ankit Kumar (Business Owner)',
      });
      return { success: true, message: 'Admin authentication verified. Welcome Ankit Kumar!' };
    }
    return {
      success: false,
      message: 'Invalid administrative credentials. Use Username: ankit, Password: ankit@123',
    };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  const formatPrice = (amount: number) => {
    return `${settings.currencySymbol}${amount.toLocaleString('en-IN')}`;
  };

  return (
    <AppContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        getServiceById,
        bookings,
        addBooking,
        updateBookingStatus,
        updateBookingNotes,
        deleteBooking,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        coupons,
        validateCoupon,
        addCoupon,
        deleteCoupon,
        settings,
        updateSettings,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        currentUser,
        loginUser,
        signupUser,
        logoutUser,
        updateUserProfile,
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
