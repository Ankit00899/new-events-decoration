import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Sparkles,
  MapPin,
  Phone,
  User,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartTotal, createOrder, currentUser, formatPrice } = useApp();

  const couponDiscount = (location.state as any)?.couponDiscount || 0;
  const appliedCode = (location.state as any)?.appliedCode || '';

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.address || '');
  const [eventDate, setEventDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'CashOnDelivery'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0 && !createdOrder) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#701F3D]">Your Cart is Empty</h2>
        <Link to="/services" className="text-xs font-semibold text-[#701F3D] underline">
          Explore Services
        </Link>
      </div>
    );
  }

  const finalTotal = Math.max(0, cartTotal - couponDiscount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !customerPhone.trim() || !eventDate || !deliveryAddress.trim()) {
      setErrorMessage('Please fill in your name, contact phone, event date, and full venue address.');
      return;
    }

    setIsProcessing(true);

    try {
      const order = createOrder({
        userId: currentUser?.id || `guest-${Date.now()}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        items: cart.map((item) => ({
          serviceId: item.serviceId,
          title: item.title,
          image: item.image,
          quantity: item.quantity,
          price: item.calculatedPrice,
          selectedAddons: item.selectedAddons,
        })),
        subtotal: cartTotal,
        discount: couponDiscount,
        total: finalTotal,
        couponCode: appliedCode || undefined,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'CashOnDelivery' ? 'Pending' : 'Paid',
        orderStatus: 'Confirmed',
        deliveryAddress: deliveryAddress.trim(),
        eventDate: eventDate,
      });

      setCreatedOrder(order);
    } catch (err) {
      setErrorMessage('Could not record order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {createdOrder ? (
        /* Order Confirmed Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F8E7EC] shadow-xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment Confirmed
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#701F3D]">
              Decoration Order Placed!
            </h1>
            <p className="text-xs text-gray-500">
              Order Ref:{' '}
              <strong className="font-mono text-[#701F3D]">{createdOrder.orderNumber}</strong>
            </p>
          </div>

          <div className="bg-[#FFFCFA] p-5 rounded-2xl border border-[#F8E7EC] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#F8E7EC] pb-2">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold text-gray-800">{createdOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Event Date:</span>
              <span className="font-semibold text-gray-800">{createdOrder.eventDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status:</span>
              <span className="font-bold text-emerald-700">{createdOrder.paymentStatus} via {createdOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-[#F8E7EC] pt-2 font-bold text-sm text-[#701F3D]">
              <span>Total Paid:</span>
              <span>{formatPrice(createdOrder.total)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Founder Ankit Kumar and our crew will arrive at the scheduled venue on {createdOrder.eventDate}.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="px-6 py-2.5 rounded-xl bg-[#701F3D] text-white text-xs font-semibold hover:bg-[#52132A]"
            >
              Continue Browsing
            </Link>
            <Link
              to="/my-bookings"
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E7EC] shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#29252A] flex items-center gap-2">
                <User className="w-5 h-5 text-[#D6B36A]" />
                <span>Customer & Venue Details</span>
              </h2>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98112 33445"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="rohan@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Venue Address (with Apartment/House number) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. Flat 301, Tower C, Lotus Boulevard, Sector 100, Noida"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8E7EC] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#29252A] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D6B36A]" />
                <span>Select Payment Mode</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'UPI'
                      ? 'bg-[#F8E7EC] border-[#701F3D] text-[#701F3D] font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>UPI / QR</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="text-[#701F3D]"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-normal">
                    Google Pay, PhonePe, Paytm
                  </span>
                </label>

                <label
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'Card'
                      ? 'bg-[#F8E7EC] border-[#701F3D] text-[#701F3D] font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Credit / Debit Card</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="text-[#701F3D]"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-normal">
                    Visa, Mastercard, RuPay
                  </span>
                </label>

                <label
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    paymentMethod === 'CashOnDelivery'
                      ? 'bg-[#F8E7EC] border-[#701F3D] text-[#701F3D] font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Pay Post-Setup</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CashOnDelivery'}
                      onChange={() => setPaymentMethod('CashOnDelivery')}
                      className="text-[#701F3D]"
                    />
                  </div>
                  <span className="text-[11px] text-gray-500 font-normal">
                    Inspect decor, then pay
                  </span>
                </label>
              </div>

              <p className="text-[11px] text-gray-400 italic">
                * Note: Live Razorpay/bank gateway triggers in production upon entering commercial API keys. All mock payments succeed instantly.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#F8E7EC] shadow-sm space-y-4 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-[#29252A]">
                Review Order ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-gray-100 text-xs">
                {cart.map((item) => (
                  <div key={item.serviceId} className="pt-2 flex justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#701F3D]">
                      {formatPrice(item.calculatedPrice)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F8E7EC] pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount:</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#701F3D] pt-2 border-t border-[#F8E7EC]">
                  <span>Grand Total:</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#701F3D] to-[#8A264B] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#D6B36A]" />
                <span>{isProcessing ? 'Confirming...' : 'Place Order & Confirm'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
