import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { settings, isAdminLoggedIn } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
  };

  const cleanPhone = settings.phoneNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#29252A] text-[#FFFCFA] pt-16 pb-12 border-t-4 border-[#D6B36A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Founder */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] flex items-center justify-center text-[#D6B36A] shadow-md border border-[#D6B36A]/50">
                <span className="font-serif text-2xl font-bold">A</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D6B36A] -ml-1 -mt-2" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#FFFCFA] tracking-tight block">
                  {settings.businessName}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-medium block">
                  Owned & Curated by {settings.ownerName}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              We make every celebration unforgettable. From dreamy birthdays and romantic candlelight suites to grand wedding stages, our team transforms spaces into breathtaking memories.
            </p>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  'Hi Ankit, I would like to inquire about event decoration packages for an upcoming celebration.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#701F3D] hover:bg-[#8A264B] text-white text-xs font-semibold shadow-sm transition-all border border-[#D6B36A]/40"
              >
                <Phone className="w-4 h-4 text-[#D6B36A]" />
                <span>Call Now</span>
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 pt-2">
              <span>Cities Served:</span>
              <span className="text-[#D6B36A] font-medium">Delhi NCR • Noida • Gurugram • Lucknow</span>
            </div>
          </div>

          {/* Col 2: Decoration Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#D6B36A] tracking-wide">
              Event Categories
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/category/birthday" className="hover:text-[#D6B36A] transition-colors">
                  Birthday Decoration
                </Link>
              </li>
              <li>
                <Link to="/category/anniversary" className="hover:text-[#D6B36A] transition-colors">
                  Anniversary Decoration
                </Link>
              </li>
              <li>
                <Link to="/category/romantic" className="hover:text-[#D6B36A] transition-colors">
                  Romantic Room & Cabana
                </Link>
              </li>
              <li>
                <Link to="/category/balloon" className="hover:text-[#D6B36A] transition-colors">
                  Balloon Arches & Pillars
                </Link>
              </li>
              <li>
                <Link to="/category/baby-shower" className="hover:text-[#D6B36A] transition-colors">
                  Baby Shower Celebrations
                </Link>
              </li>
              <li>
                <Link to="/category/surprise" className="hover:text-[#D6B36A] transition-colors">
                  Surprise Car Boot Setup
                </Link>
              </li>
              <li>
                <Link to="/category/wedding" className="hover:text-[#D6B36A] transition-colors">
                  Wedding & Mandap Stages
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#D6B36A] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/services" className="hover:text-[#D6B36A] transition-colors">
                  All 10+ Packages
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D6B36A] transition-colors">
                  Real Event Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D6B36A] transition-colors">
                  About Ankit Kumar
                </Link>
              </li>
              <li>
                <Link to="/inquiry" className="hover:text-[#D6B36A] transition-colors">
                  Custom Event Inquiry
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-[#D6B36A] transition-colors">
                  Track My Bookings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D6B36A] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#D6B36A] transition-colors">
                  Customer Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#D6B36A] tracking-wide">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
                <span>{settings.fullOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B36A] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-[#D6B36A]">
                  {settings.phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6B36A] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#D6B36A]">
                  {settings.contactEmail}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#D6B36A] mb-1.5 uppercase tracking-wider">
                Get Celebration Offers
              </p>
              {newsletterSubmitted ? (
                <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-900/30 p-2 rounded-lg border border-green-500/30">
                  <CheckCircle className="w-4 h-4" />
                  <span>Thank you! You will receive special festive discount codes.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-hidden focus:border-[#D6B36A]"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#701F3D] hover:bg-[#8A264B] text-white rounded-lg transition-colors cursor-pointer"
                    title="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © {new Date().getFullYear()} {settings.businessName}. Owned by Ankit Kumar. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#D6B36A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Premium Decor</span>
            </span>
            <span>•</span>
            <Link to="/contact" className="hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
