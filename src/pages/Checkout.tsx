import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export const Checkout: React.FC = () => {
  const { items, subtotal, promoDiscount, estimatedTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [postalCode, setPostalCode] = useState('560001');
  const [gstNumber, setGstNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'emi' | 'cod'>('upi');

  const [orderCompleted, setOrderCompleted] = useState<{
    orderId: string;
    total: number;
    customerName: string;
    address: string;
    payment: string;
    itemCount: number;
  } | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `NGL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCompleted({
      orderId: generatedId,
      total: estimatedTotal,
      customerName: fullName || 'Valued Engineer',
      address: `${address}, ${city} — ${postalCode}`,
      payment:
        paymentMethod === 'upi'
          ? 'Instant UPI Verified'
          : paymentMethod === 'emi'
          ? '12-Month No-Cost EMI'
          : paymentMethod === 'card'
          ? 'Corporate / Credit Card'
          : 'Cash on Delivery (Insured Courier)',
      itemCount: items.reduce((acc, i) => acc + i.quantity, 0)
    });
    clearCart();
  };

  if (orderCompleted) {
    return (
      <PageContainer className="py-16">
        <div className="max-w-xl mx-auto bg-[#1C1C1C] border border-[#00E5FF]/50 rounded-lg p-8 space-y-6">
          <div className="flex items-center gap-3 text-[#22C55E]">
            <CheckCircle2 className="w-7 h-7 shrink-0" />
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-wider text-[#00E5FF]">
                DISPATCH ALLOCATED
              </div>
              <h1 className="text-2xl font-bold text-[#F5F5F5]">
                Order #{orderCompleted.orderId} Confirmed — Preparing Shipment
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            Thank you, <strong className="text-[#F5F5F5]">{orderCompleted.customerName}</strong>. Your hardware configuration has been queued at our ISO-9001 Thermal & Display QC bench prior to insured air dispatch.
          </p>

          <dl className="bg-[#181818] border border-[#2A2A2A] rounded-md p-4 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <dt className="text-[#737373]">Order Reference</dt>
              <dd className="font-mono-tech text-[#00E5FF] font-semibold">
                #{orderCompleted.orderId}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#737373]">Delivery Destination</dt>
              <dd className="text-[#F5F5F5] text-right">{orderCompleted.address}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#737373]">Payment Mode</dt>
              <dd className="text-[#F5F5F5]">{orderCompleted.payment}</dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#2A2A2A]">
              <dt className="text-[#F5F5F5] font-semibold">Total Amount</dt>
              <dd className="font-mono-tech text-sm font-bold text-[#00E5FF]">
                {formatPrice(orderCompleted.total)}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" onClick={() => navigate('/shop')}>
              Continue Exploring Hardware
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Return to Showroom
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (items.length === 0) {
    return (
      <PageContainer className="py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#F5F5F5]">Your checkout bag is empty</h1>
        <p className="text-sm text-[#A3A3A3]">
          Add a laptop configuration before proceeding to checkout.
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Browse Laptops
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 lg:py-12">
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#00E5FF]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="font-display text-3xl font-bold text-[#F5F5F5] mt-2">
          Secure Hardware Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 7 Columns: Customer & Payment Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-[#F5F5F5] border-b border-[#2A2A2A] pb-3">
              1. Recipient & Dispatch Verification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="full-name" className="block text-xs text-[#A3A3A3] mb-1.5">
                  Full Name *
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs text-[#A3A3A3] mb-1.5">
                  Mobile Number (For Courier OTP) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm font-mono-tech text-[#F5F5F5] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs text-[#A3A3A3] mb-1.5">
                Work or Personal Email (For GST Invoice & Warranty Certificate) *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@engineering.io"
                className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-xs text-[#A3A3A3] mb-1.5">
                Street Address / Tech Park Building *
              </label>
              <input
                id="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Suite 402, Prestige Tech Park, Outer Ring Road"
                className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-xs text-[#A3A3A3] mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm text-[#F5F5F5] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="postal-code" className="block text-xs text-[#A3A3A3] mb-1.5">
                  Postal PIN Code *
                </label>
                <input
                  id="postal-code"
                  type="text"
                  required
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm font-mono-tech text-[#F5F5F5] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="gst-no" className="block text-xs text-[#A3A3A3] mb-1.5">
                  GSTIN (Optional B2B)
                </label>
                <input
                  id="gst-no"
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="29ABCDE1234F1Z5"
                  className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3.5 py-2.5 text-sm font-mono-tech uppercase text-[#F5F5F5] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-[#F5F5F5] border-b border-[#2A2A2A] pb-3">
              2. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'upi',
                  title: 'UPI Instant Transfer',
                  desc: 'Google Pay, PhonePe, BHIM (Zero Fee)'
                },
                {
                  id: 'emi',
                  title: 'No-Cost 12-Month EMI',
                  desc: '0% interest on HDFC, ICICI, Axis, SBI'
                },
                {
                  id: 'card',
                  title: 'Credit / Corporate Card',
                  desc: 'Visa, Mastercard, Amex, Diners'
                },
                {
                  id: 'cod',
                  title: 'Cash / Card on Delivery',
                  desc: 'Pay upon physical inspection at delivery'
                }
              ].map((method) => {
                const active = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF]'
                        : 'bg-[#181818] border-[#2A2A2A] hover:border-[#737373]'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#F5F5F5]">{method.title}</div>
                    <div className="text-xs text-[#A3A3A3] mt-1">{method.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Order Review & Submit */}
        <div className="lg:col-span-5 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-[#F5F5F5] border-b border-[#2A2A2A] pb-3">
            Hardware Summary ({items.reduce((a, b) => a + b.quantity, 0)} Units)
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-[#F5F5F5]">
                    {product.brand} {product.name} × {quantity}
                  </div>
                  <div className="font-mono-tech text-[#737373]">
                    {product.gpuShort} · {product.ramShort}
                  </div>
                </div>
                <div className="font-mono-tech text-[#F5F5F5] font-medium shrink-0">
                  {formatPrice(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>

          <dl className="pt-4 border-t border-[#2A2A2A] space-y-2.5 text-sm">
            <div className="flex justify-between text-[#A3A3A3]">
              <dt>Subtotal</dt>
              <dd className="font-mono-tech text-[#F5F5F5]">{formatPrice(subtotal)}</dd>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-[#00E5FF]">
                <dt>Hardware Grant Discount</dt>
                <dd className="font-mono-tech">− {formatPrice(promoDiscount)}</dd>
              </div>
            )}
            <div className="flex justify-between text-[#A3A3A3]">
              <dt>Insured Air Freight</dt>
              <dd className="font-mono-tech text-[#22C55E]">FREE</dd>
            </div>
            <div className="pt-3 border-t border-[#2A2A2A] flex justify-between items-baseline">
              <dt className="text-base font-bold text-[#F5F5F5]">Total Payable</dt>
              <dd className="text-2xl font-bold font-mono-tech text-[#00E5FF]">
                {formatPrice(estimatedTotal)}
              </dd>
            </div>
          </dl>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            <Lock className="w-4 h-4" />
            <span>Authorize & Place Order</span>
          </Button>

          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0" />
            <span>Direct OEM factory-sealed or Lab-QC verified with full manufacturer warranty.</span>
          </div>
        </div>
      </form>
    </PageContainer>
  );
};

export default Checkout;
