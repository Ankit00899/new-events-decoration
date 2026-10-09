import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    validateCoupon,
    formatPrice,
  } = useApp();

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [appliedCode, setAppliedCode] = useState<string>('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = validateCoupon(couponCode, cartTotal);
    if (res.valid) {
      setCouponDiscount(res.discount);
      setAppliedCode(couponCode.toUpperCase().trim());
      setCouponMessage({ text: res.message, isError: false });
    } else {
      setCouponDiscount(0);
      setAppliedCode('');
      setCouponMessage({ text: res.message, isError: true });
    }
  };

  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F8E7EC] text-[#701F3D] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#29252A]">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          You haven't added any decoration packages or add-on upgrades to your shopping cart.
        </p>
        <div className="pt-2">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D6B36A]" />
            <span>Browse All Packages</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#F8E7EC] pb-6">
        <div>
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            E-Commerce Cart
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
            Shopping Cart ({cart.length} Item{cart.length > 1 ? 's' : ''})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.serviceId}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-[#F8E7EC] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#29252A]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Base: {formatPrice(item.basePrice)}
                  </p>
                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <div className="text-[11px] text-gray-500">
                      Add-ons:{' '}
                      {item.selectedAddons.map((a) => `${a.name} (+${formatPrice(a.price)})`).join(', ')}
                    </div>
                  )}
                  {item.eventDate && (
                    <p className="text-[11px] text-[#701F3D] flex items-center gap-1 font-semibold">
                      <Calendar className="w-3 h-3" />
                      <span>Target Date: {item.eventDate}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => updateCartQuantity(item.serviceId, item.quantity - 1)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.serviceId, item.quantity + 1)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="font-serif text-lg font-bold text-[#701F3D]">
                  {formatPrice(item.calculatedPrice)}
                </span>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.serviceId)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#F8E7EC] shadow-sm space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-[#29252A]">
              Order Summary
            </h3>

            {/* Subtotal Breakdown */}
            <div className="space-y-3 text-xs text-gray-600 border-b border-[#F8E7EC] pb-4">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon ({appliedCode}):</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Setup & Transport Charge:</span>
                <span className="font-semibold text-emerald-600">FREE Included</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-sm text-gray-900">Total Payable:</span>
              <span className="font-serif text-2xl font-bold text-[#701F3D]">
                {formatPrice(finalTotal)}
              </span>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>Have a Coupon Code?</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. CELEBRATE15"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 uppercase focus:border-[#701F3D] focus:outline-hidden font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <div
                  className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                    couponMessage.isError
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {couponMessage.isError ? (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{couponMessage.text}</span>
                </div>
              )}
            </form>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout', { state: { couponDiscount, appliedCode } })}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
