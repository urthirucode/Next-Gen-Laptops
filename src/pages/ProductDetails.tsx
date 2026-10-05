import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Truck,
  CreditCard,
  Heart
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductSpecs } from '../components/products/ProductSpecs';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useCompare } from '../hooks/useCompare';
import { calculateMonthlyEmi, formatPrice } from '../utils/formatPrice';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, allProducts } = useProducts();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { isCompared, toggleCompare } = useCompare();

  const [pincode, setPincode] = useState('560001');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(
    'Express Insured Air Dispatch available — Delivered in 24–48 hours.'
  );
  const [emiModalOpen, setEmiModalOpen] = useState(false);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <PageContainer className="py-16">
        <EmptyState
          title="Laptop not found."
          description="The product you're looking for may have been removed."
          actionLabel="Back to Shop"
          onAction={() => navigate('/shop')}
        />
      </PageContainer>
    );
  }

  const compared = isCompared(product.id);
  const wishlisted = isWishlisted(product.id);
  const savingsAmount = product.originalPrice - product.price;
  const monthlyEmi12 = calculateMonthlyEmi(product.price, 12);

  const similarProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.useCases.some((u) => product.useCases.includes(u)) || p.gpuShort === product.gpuShort)
    )
    .slice(0, 3);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (/^\d{6}$/.test(cleaned)) {
      setDeliveryStatus(
        `Verified for PIN ${cleaned}: Priority Air Courier (Next-Day Dispatch from Lab).`
      );
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian postal PIN code.');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <PageContainer className="py-8 lg:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between text-xs text-[#A3A3A3]">
        <div className="flex items-center gap-2 truncate">
          <Link to="/shop" className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?brand=${product.brand}`} className="hover:text-[#F5F5F5]">
            {product.brand}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#F5F5F5] truncate">{product.name}</span>
        </div>
      </nav>

      {/* Primary Split Layout: Gallery Left, Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <ProductGallery product={product} />
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
              <span className="uppercase tracking-wider font-semibold text-[#00E5FF]">
                {product.brand} · {product.series}
              </span>
              <span className="font-mono-tech text-[#F5F5F5]">
                <span className="text-[#00E5FF] mr-1">★★★★★</span>
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F5] mt-2">
              {product.name}
            </h1>

            <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">{product.tagline}</p>
          </div>

          {/* Pricing & Savings Block */}
          <div className="pt-4 border-t border-[#2A2A2A] flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="text-3xl font-bold font-mono-tech text-[#F5F5F5]">
                {formatPrice(product.price)}
              </div>
              <div className="mt-1 flex items-center gap-2.5 text-sm font-mono-tech">
                <span className="text-[#737373] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-[#22C55E] font-medium">
                  Save {formatPrice(savingsAmount)} ({product.discount}% Off)
                </span>
              </div>
              <div className="text-[11px] text-[#737373] mt-1">
                Inclusive of GST · GST Invoice available for 18% B2B input credit
              </div>
            </div>

            {/* Stock Indicator */}
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22C55E]">
              <CheckCircle2 className="w-4 h-4" />
              <span>In Stock ({product.stockCount} units)</span>
            </div>
          </div>

          {/* Core Hardware Snapshot */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-md bg-[#181818] border border-[#2A2A2A] text-xs">
            <div>
              <span className="text-[#737373] block">Processor</span>
              <span className="text-[#F5F5F5] font-medium mt-0.5 block truncate">
                {product.cpu}
              </span>
            </div>
            <div>
              <span className="text-[#737373] block">Graphics</span>
              <span className="text-[#00E5FF] font-mono-tech font-semibold mt-0.5 block truncate">
                {product.gpuShort} ({product.gpuVram.split(' ')[0]})
              </span>
            </div>
            <div>
              <span className="text-[#737373] block">Memory & Storage</span>
              <span className="text-[#F5F5F5] font-mono-tech mt-0.5 block truncate">
                {product.ramShort} · {product.storageShort} SSD
              </span>
            </div>
            <div>
              <span className="text-[#737373] block">Display</span>
              <span className="text-[#F5F5F5] font-mono-tech mt-0.5 block truncate">
                {product.displayResolution.split(' ')[0]} · {product.refreshRate}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons: Add to Cart, Buy Now, Add to Compare */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => addToCart(product, 1)}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </Button>

              <Button variant="secondary" size="lg" fullWidth onClick={handleBuyNow}>
                <span>Buy Now</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={compared ? 'outline' : 'ghost'}
                size="md"
                fullWidth
                onClick={() => toggleCompare(product)}
                className="border border-[#2A2A2A]"
              >
                <Layers className="w-4 h-4 text-[#00E5FF]" />
                <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
              </Button>

              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => toggleWishlist(product.id)}
                className="border border-[#2A2A2A]"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'text-[#00E5FF] fill-[#00E5FF]' : 'text-[#A3A3A3]'
                  }`}
                />
                <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </Button>
            </div>
          </div>

          {/* EMI Information Placeholder */}
          <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-[#A3A3A3]">
              <CreditCard className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <span>
                No-Cost EMI starts at{' '}
                <strong className="font-mono-tech text-[#F5F5F5]">
                  {formatPrice(monthlyEmi12)}/mo
                </strong>{' '}
                (12 months)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEmiModalOpen(true)}
              className="text-[#00E5FF] hover:underline font-medium shrink-0 cursor-pointer"
            >
              EMI Plans →
            </button>
          </div>

          {/* Delivery Availability Pincode Checker */}
          <div className="pt-4 border-t border-[#2A2A2A] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#F5F5F5]">
              <Truck className="w-4 h-4 text-[#00E5FF]" />
              <span>Delivery & Dispatch Verification</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit PIN"
                aria-label="Enter 6-digit postal PIN code"
                className="bg-[#121212] border border-[#2A2A2A] focus:border-[#00E5FF] rounded px-3 py-1.5 text-xs font-mono-tech text-[#F5F5F5] focus:outline-none w-40"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#202020] hover:bg-[#2A2A2A] border border-[#2A2A2A] rounded text-xs font-medium text-[#00E5FF] transition-colors cursor-pointer"
              >
                Check Availability
              </button>
            </form>
            {deliveryStatus && (
              <p className="text-xs text-[#A3A3A3]">{deliveryStatus}</p>
            )}
          </div>

          {/* Warranty & Engineering Highlights */}
          <div className="pt-4 border-t border-[#2A2A2A] space-y-3">
            <div className="flex items-start gap-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F5F5F5]">Official OEM Warranty: </span>
                <span className="text-[#A3A3A3]">{product.warranty}</span>
              </div>
            </div>

            <ul className="space-y-1.5 pt-1 text-xs text-[#A3A3A3]">
              {product.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00E5FF] font-bold">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full Specifications & Benchmarks Section */}
      <ProductSpecs product={product} />

      {/* Similar Configurations */}
      {similarProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono-tech text-[#00E5FF] uppercase">
                ALTERNATIVE ARCHITECTURES
              </div>
              <h2 className="font-display text-2xl font-bold text-[#F5F5F5] mt-1">
                Comparable High-Performance Systems
              </h2>
            </div>
            <Link to="/compare" className="text-xs font-semibold text-[#00E5FF] hover:underline">
              Compare Side-by-Side →
            </Link>
          </div>
          <ProductGrid products={similarProducts} columns={3} />
        </section>
      )}

      {/* Interactive EMI Breakdown Modal */}
      <Modal
        isOpen={emiModalOpen}
        onClose={() => setEmiModalOpen(false)}
        title={`Financing & No-Cost EMI — ${product.name}`}
      >
        <div className="space-y-4 text-sm">
          <p className="text-xs text-[#A3A3A3]">
            Zero-processing-fee corporate and retail EMI plans available across major credit cards.
          </p>
          <div className="border border-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181818] border-b border-[#2A2A2A] text-[#A3A3A3]">
                <tr>
                  <th className="p-3">Tenure</th>
                  <th className="p-3">Monthly Installment</th>
                  <th className="p-3">Interest</th>
                  <th className="p-3 text-right">Total Payable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A] font-mono-tech">
                {[3, 6, 9, 12].map((months) => (
                  <tr key={months}>
                    <td className="p-3 text-[#F5F5F5]">{months} Months</td>
                    <td className="p-3 text-[#00E5FF] font-semibold">
                      {formatPrice(calculateMonthlyEmi(product.price, months))}/mo
                    </td>
                    <td className="p-3 text-[#22C55E]">0% No-Cost</td>
                    <td className="p-3 text-right text-[#F5F5F5]">{formatPrice(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default ProductDetails;
