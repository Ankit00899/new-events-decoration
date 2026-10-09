import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Clock,
  Heart,
  Phone,
  CheckCircle2,
  Users,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/initialData';

export const AboutPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-[#29252A] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80"
            alt="Decor background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29252A] via-[#29252A]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D6B36A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Passionate Celebration Stylists</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Crafting Magical Celebrations with Heart & Precision
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Founded by <strong>{settings.ownerName}</strong>, Ankit Event Decor transforms spaces into unforgettable visual experiences across Delhi NCR and Lucknow.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#29252A]">
              From Humble Beginnings to Over 1,450+ Styled Events
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              What began 7 years ago as a passionate endeavor to elevate milestone birthdays into immersive experiences has blossomed into one of the most trusted event decor brands in the region.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founder Ankit Kumar observed that clients frequently encountered delayed decorators, punctured low-quality balloons, or damaging tape on newly painted walls. He instituted our three golden rules:
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Punctual completion at least 60 minutes before guest arrival.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero wall damage using painter-safe adhesion techniques.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thick, high-density balloons and imported silks for true opacity.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] shadow-md transition-colors"
              >
                <span>Browse Our Packages</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
                alt="Event Decoration Setup"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FFFCFA] p-5 rounded-2xl border border-[#F8E7EC] shadow-xl max-w-xs space-y-1">
              <p className="text-xs font-bold text-[#701F3D] uppercase tracking-wider">Meet the Founder</p>
              <p className="font-serif text-lg font-bold text-[#29252A]">{settings.ownerName}</p>
              <p className="text-[11px] text-gray-500">
                Principal Stylist & Founder. Actively coordinates every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#FFFCFA] py-16 border-y border-[#F8E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              The Ankit Decor Standard
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#29252A]">
              Why Families & Planners Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">100% Punctuality</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our crew arrives 2 to 3 hours in advance. No rushed setups or delayed cake cutting moments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Wall & Paint Safety</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Specially formulated painter's masking tape and free-standing metallic frames to protect walls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Double-Stuffed Balloons</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We use rich pastel and chrome balloons that retain luster for 24+ hours without oxidizing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#F8E7EC] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Transparent Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No hidden transport surcharges or unexpected add-on costs. Starting prices clearly posted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-serif text-3xl font-bold text-[#29252A]">Common Questions</h2>
          <p className="text-xs text-gray-500">Need specific details before reserving? Here are quick answers.</p>
        </div>
        <div className="space-y-3">
          {FAQS.slice(0, 4).map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-[#F8E7EC] space-y-1">
              <h3 className="font-bold text-sm text-[#701F3D]">{f.q}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Content Disclosure Notice */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-[11px] text-gray-400 border border-gray-200 rounded-xl p-3 bg-gray-50">
          <strong>Note:</strong> Customer testimonials and ratings shown on this website reflect sample demo experiences. For live portfolios, contact founder Ankit Kumar at {settings.phoneNumber}.
        </p>
      </div>
    </div>
  );
};
