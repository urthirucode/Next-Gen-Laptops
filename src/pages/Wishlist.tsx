import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ProductGrid } from '../components/products/ProductGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export const Wishlist: React.FC = () => {
  const { wishlistIds } = useCart();
  const navigate = useNavigate();

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <PageContainer className="py-8 lg:py-12">
      <div className="pb-8 border-b border-[#2A2A2A]">
        <div className="text-xs font-mono-tech text-[#00E5FF] uppercase tracking-wider mb-1.5">
          SAVED CONFIGURATIONS ({wishlistedProducts.length})
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
          Hardware Wishlist
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-6">
          <EmptyState
            icon={<Heart className="w-5 h-5" />}
            title="Your wishlist is empty."
            description="Bookmark high-performance configurations while browsing the catalog to track pricing and specs."
            actionLabel="Explore Laptops"
            onAction={() => navigate('/shop')}
          />
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={wishlistedProducts} columns={3} />
        </div>
      )}
    </PageContainer>
  );
};

export default Wishlist;
