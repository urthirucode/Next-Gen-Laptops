import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../hooks/useCompare';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { LaptopVisual } from '../ui/LaptopVisual';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { isCompared, toggleCompare } = useCompare();

  const compared = isCompared(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <article
      className={`group bg-[#1C1C1C] border rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#00E5FF] hover:shadow-[0_10px_30px_rgba(0,229,255,0.08)] ${
        compared ? 'border-[#00E5FF]/80' : 'border-[#2A2A2A]'
      }`}
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] bg-[#151518] border-b border-[#2A2A2A] overflow-hidden">
          <Link
            to={`/laptops/${product.id}`}
            aria-label={`View details for ${product.brand} ${product.name}`}
            className="block w-full h-full focus-visible:outline-none"
          >
            <LaptopVisual product={product} preferPhoto />
          </Link>

          {/* Subtle top-left status text (maximum 1 quiet label per retail guidelines) */}
          {product.isNewArrival && (
            <span className="absolute top-3 left-3 text-[11px] font-mono-tech uppercase tracking-wider text-[#00E5FF] bg-[#121212]/85 px-2 py-0.5 rounded-sm border border-[#2A2A2A]">
              2026 Architecture
            </span>
          )}

          {/* Top-right Wishlist Action */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            className={`absolute top-3 right-3 p-2 rounded-md bg-[#121212]/80 backdrop-blur-sm border border-[#2A2A2A] transition-colors cursor-pointer ${
              wishlisted
                ? 'text-[#00E5FF] border-[#00E5FF]/50'
                : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#00E5FF]' : ''}`} />
          </button>
        </div>

        {/* Product Header & Technical Specifications */}
        <div className="p-5 pb-4">
          {/* Clean unboxed metadata header: Brand + Rating */}
          <div className="flex items-center justify-between text-xs text-[#A3A3A3] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#737373]">
              {product.brand}
            </span>
            <span className="font-mono-tech text-[#F5F5F5]" aria-label={`Rated ${product.rating} out of 5`}>
              <span className="text-[#00E5FF] mr-1" aria-hidden="true">
                ★★★★★
              </span>
              {product.rating.toFixed(1)}
              <span className="text-[#737373] ml-1">({product.reviews})</span>
            </span>
          </div>

          <Link
            to={`/laptops/${product.id}`}
            className="block text-[19px] font-semibold text-[#F5F5F5] group-hover:text-[#00E5FF] transition-colors leading-snug line-clamp-1 focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </Link>

          {/* Structured 5-Line Hardware Specification List */}
          <dl className="mt-3.5 pt-3.5 border-t border-[#2A2A2A]/80 space-y-1.5 text-[13px] leading-snug">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-[#737373] shrink-0">CPU</dt>
              <dd className="text-[#F5F5F5] font-medium text-right truncate">{product.cpu}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-[#737373] shrink-0">GPU</dt>
              <dd className="text-[#00E5FF] font-mono-tech font-medium text-right truncate">
                {product.gpuShort} · {product.gpuVram.split(' ')[0]}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-[#737373] shrink-0">RAM</dt>
              <dd className="text-[#A3A3A3] font-mono-tech text-right truncate">{product.ram}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-[#737373] shrink-0">SSD</dt>
              <dd className="text-[#A3A3A3] font-mono-tech text-right truncate">{product.storage}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="text-[#737373] shrink-0">Display</dt>
              <dd className="text-[#A3A3A3] text-right truncate">
                {product.display.split(' ')[0]} {product.refreshRate}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-[#2A2A2A] bg-[#181818]/50 space-y-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className="text-[22px] font-bold font-mono-tech text-[#F5F5F5] leading-none">
              {formatPrice(product.price)}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs font-mono-tech">
              <span className="text-[#737373] line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-[#22C55E] font-medium">Save {product.discount}%</span>
            </div>
          </div>

          <Checkbox
            id={`compare-${product.id}`}
            checked={compared}
            onChange={() => toggleCompare(product)}
            label="Compare"
          />
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => addToCart(product, 1)}
          aria-label={`Add ${product.brand} ${product.name} to cart`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </article>
  );
};
