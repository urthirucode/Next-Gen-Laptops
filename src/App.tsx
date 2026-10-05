import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { MainLayout } from './components/layout/MainLayout';
import { PageContainer } from './components/layout/PageContainer';
import { ProductCardSkeleton } from './components/ui/Skeleton';

// Lazy-loaded route views for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Compare = lazy(() => import('./pages/Compare'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback: React.FC = () => (
  <PageContainer className="py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  </PageContainer>
);

function getRouterBasename(): string {
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
    return firstSegment ? `/${firstSegment}` : '/';
  }
  return '/';
}

export default function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <BrowserRouter basename={getRouterBasename()}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/laptops/:id" element={<ProductDetails />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CompareProvider>
    </CartProvider>
  );
}
