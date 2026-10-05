import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Bookmark,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { LaptopVisual } from '../components/ui/LaptopVisual';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export const Cart: React.FC = () => {
  const {
    items,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    removeFromSaved,
    subtotal,
    productSavings,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    estimatedTotal
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
  };

  return (
    <PageContainer className="py-8 lg:py-12">
      <div className="pb-8 border-b border-[#2A2A2A]">
        <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-1.5">
          HARDWARE PROCUREMENT BAG
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
          Your Shopping Cart
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-6">
          <EmptyState
            icon={<ShoppingBag className="w-5 h-5" />}
            title="Your cart is empty."
            description="Find your next machine."
            actionLabel="Explore Laptops"
            onAction={() => navigate('/shop')}
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 8 Columns: Itemized Cart List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <Link
                    to={`/laptops/${product.id}`}
                    className="w-28 sm:w-36 aspect-[4/3] rounded overflow-hidden border border-[#2A2A2A] shrink-0 block"
                  >
                    <LaptopVisual product={product} preferPhoto />
                  </Link>

                  <div className="min-w-0 space-y-1">
                    <div className="text-xs text-[#737373] uppercase font-semibold">
                      {product.brand}
                    </div>
                    <Link
                      to={`/laptops/${product.id}`}
                      className="text-base sm:text-lg font-semibold text-[#F5F5F5] hover:text-[#00E5FF] transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs font-mono-tech text-[#A3A3A3]">
                      {product.cpu} · {product.gpuShort} · {product.ramShort} · {product.storageShort}
                    </div>
                    <div className="text-xs text-[#22C55E] pt-1">
                      In Stock · Insured Priority Dispatch
                    </div>
                  </div>
                </div>

                {/* Right Controls: Price + Quantity Stepper + Remove / Save for Later */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#2A2A2A]">
                  <div className="text-left sm:text-right">
                    <div className="text-lg font-bold font-mono-tech text-[#F5F5F5]">
                      {formatPrice(product.price * quantity)}
                    </div>
                    {quantity > 1 && (
                      <div className="text-xs font-mono-tech text-[#737373]">
                        {formatPrice(product.price)} each
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center bg-[#121212] border border-[#2A2A2A] rounded">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono-tech font-semibold text-[#F5F5F5]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 text-[#A3A3A3] hover:text-[#F5F5F5] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => saveForLater(product.id)}
                      className="text-xs text-[#A3A3A3] hover:text-[#00E5FF] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save for later</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="text-xs text-[#737373] hover:text-[#EF4444] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right 4 Columns: Order Summary */}
          <div className="lg:col-span-4 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 space-y-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-[#F5F5F5] pb-3 border-b border-[#2A2A2A]">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handlePromoSubmit} className="space-y-2">
              <label htmlFor="promo-input" className="block text-xs text-[#A3A3A3]">
                Hardware Grant / Promo Code (Try <span className="font-mono-tech text-[#00E5FF]">NEXTGEN5</span> or <span className="font-mono-tech text-[#00E5FF]">DEVPRO</span>)
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-input"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3 py-2 text-xs font-mono-tech uppercase text-[#F5F5F5] focus:outline-none"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </div>
              {promoFeedback && (
                <p
                  className={`text-xs ${
                    promoFeedback.success ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}
                >
                  {promoFeedback.message}
                </p>
              )}
              {promoCode && (
                <div className="flex items-center justify-between text-xs bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded px-2.5 py-1.5 text-[#00E5FF]">
                  <span className="inline-flex items-center gap-1 font-mono-tech">
                    <Tag className="w-3.5 h-3.5" />
                    {promoCode} active
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removePromoCode();
                      setPromoFeedback(null);
                    }}
                    className="underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Financial Breakdown */}
            <dl className="space-y-3 text-sm pt-2 border-t border-[#2A2A2A]">
              <div className="flex justify-between text-[#A3A3A3]">
                <dt>Subtotal</dt>
                <dd className="font-mono-tech text-[#F5F5F5]">{formatPrice(subtotal)}</dd>
              </div>

              <div className="flex justify-between text-[#A3A3A3]">
                <dt>Instant Catalog Discount</dt>
                <dd className="font-mono-tech text-[#22C55E]">
                  − {formatPrice(productSavings)}
                </dd>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#00E5FF]">
                  <dt>Promo Discount ({promoCode})</dt>
                  <dd className="font-mono-tech">− {formatPrice(promoDiscount)}</dd>
                </div>
              )}

              <div className="flex justify-between text-[#A3A3A3]">
                <dt>Insured Air Delivery</dt>
                <dd className="font-mono-tech text-[#22C55E]">FREE</dd>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex justify-between items-baseline">
                <dt className="text-base font-bold text-[#F5F5F5]">Estimated Total</dt>
                <dd className="text-2xl font-bold font-mono-tech text-[#00E5FF]">
                  {formatPrice(estimatedTotal)}
                </dd>
              </div>
            </dl>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2 text-xs text-[#737373] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>Includes 48-point pre-dispatch thermal & pixel QC report.</span>
            </div>
          </div>
        </div>
      )}

      {/* Saved For Later Section */}
      {savedForLater.length > 0 && (
        <section className="mt-14 pt-10 border-t border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-[#F5F5F5] mb-5">
            Saved for Later ({savedForLater.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedForLater.map((item) => (
              <div
                key={item.id}
                className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-4 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-20 aspect-[4/3] rounded overflow-hidden border border-[#2A2A2A] shrink-0">
                    <LaptopVisual product={item} preferPhoto />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#737373]">{item.brand}</div>
                    <Link
                      to={`/laptops/${item.id}`}
                      className="text-sm font-semibold text-[#F5F5F5] hover:text-[#00E5FF] truncate block"
                    >
                      {item.name}
                    </Link>
                    <div className="text-sm font-mono-tech text-[#00E5FF] font-semibold mt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-[#2A2A2A]">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => moveToCartFromSaved(item)}
                  >
                    Move to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromSaved(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
};

export default Cart;
