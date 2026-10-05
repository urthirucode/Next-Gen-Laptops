import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../hooks/useCompare';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { totalItemsCount, wishlistIds } = useCart();
  const { comparedProducts } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const quickResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) =>
        [p.brand, p.name, p.cpu, p.gpu, p.gpuShort, ...p.useCases]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#121212]/90 backdrop-blur-md border-[#2A2A2A]'
          : 'bg-[#121212] border-[#2A2A2A]/70'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F5F5F5] hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-sm"
        >
          NextGen Laptops
        </Link>

        {/* Zone 2: 5 clean single-line navigation links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
          <NavLink
            to="/shop"
            end
            className={({ isActive }) =>
              `whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                isActive && !location.search
                  ? 'border-[#00E5FF] text-[#F5F5F5]'
                  : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`
            }
          >
            Shop
          </NavLink>
          <Link
            to="/shop?useCase=gaming"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
              location.search.includes('useCase=gaming')
                ? 'border-[#00E5FF] text-[#F5F5F5]'
                : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
            }`}
          >
            Gaming
          </Link>
          <Link
            to="/shop?useCase=development"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
              location.search.includes('useCase=development')
                ? 'border-[#00E5FF] text-[#F5F5F5]'
                : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
            }`}
          >
            Developer
          </Link>
          <Link
            to="/shop?useCase=business"
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
              location.search.includes('useCase=business')
                ? 'border-[#00E5FF] text-[#F5F5F5]'
                : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
            }`}
          >
            Business
          </Link>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                isActive
                  ? 'border-[#00E5FF] text-[#F5F5F5]'
                  : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`
            }
          >
            Compare{comparedProducts.length > 0 ? ` (${comparedProducts.length})` : ''}
          </NavLink>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search laptops"
            className="p-2 text-[#A3A3A3] hover:text-[#00E5FF] hover:bg-[#1C1C1C] rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            className="relative p-2 text-[#A3A3A3] hover:text-[#00E5FF] hover:bg-[#1C1C1C] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00E5FF]" />
            )}
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping cart (${totalItemsCount} items)`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#242424] border border-[#2A2A2A] hover:border-[#00E5FF]/60 rounded-md text-sm font-medium text-[#F5F5F5] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          >
            <ShoppingBag className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-mono-tech text-xs">{totalItemsCount}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-[#A3A3A3] hover:text-[#F5F5F5] rounded-md cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Instant Hardware Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#2A2A2A] bg-[#181818]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-3">
              <Search className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand, model, GPU (e.g., 4060, RTX 4080, Lenovo, Core Ultra)..."
                className="w-full bg-transparent text-sm text-[#F5F5F5] placeholder-[#737373] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#737373] hover:text-[#F5F5F5] cursor-pointer whitespace-nowrap"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#00E5FF] text-[#121212] text-xs font-semibold rounded hover:bg-[#33ECFF] transition-colors cursor-pointer whitespace-nowrap"
              >
                Search All
              </button>
            </form>

            {quickResults.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#2A2A2A] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {quickResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/laptops/${item.id}`}
                    onClick={() => setSearchOpen(false)}
                    className="p-2.5 rounded bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#00E5FF] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-[#737373] uppercase">{item.brand}</div>
                      <div className="text-xs font-semibold text-[#F5F5F5] truncate mt-0.5">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#A3A3A3] truncate mt-1">
                        {item.gpuShort} · {item.ramShort}
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#2A2A2A]/60 flex items-center justify-between">
                      <span className="text-xs font-mono-tech text-[#00E5FF] font-semibold">
                        {formatPrice(item.price)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2A] bg-[#181818] px-4 py-4 space-y-2">
          {[
            { label: 'Shop All Laptops', to: '/shop' },
            { label: 'Gaming Machines', to: '/shop?useCase=gaming' },
            { label: 'AI / ML Workstations', to: '/shop?useCase=ai-ml' },
            { label: 'Developer Systems', to: '/shop?useCase=development' },
            { label: 'Business & Enterprise', to: '/shop?useCase=business' },
            { label: `Compare Models (${comparedProducts.length}/4)`, to: '/compare' },
            { label: 'Engineering & About', to: '/about' },
            { label: 'Technical Support & Contact', to: '/contact' }
          ].map((nav) => (
            <Link
              key={nav.to}
              to={nav.to}
              className="block py-2.5 px-3 rounded-md text-sm font-medium text-[#F5F5F5] hover:bg-[#202020] hover:text-[#00E5FF] transition-colors"
            >
              {nav.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
