import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CompareBar } from '../compare/CompareBar';
import { useCart } from '../../context/CartContext';
import { useCompare } from '../../hooks/useCompare';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { notification, dismissNotification } = useCart();
  const { compareWarning, dismissCompareWarning } = useCompare();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-[#F5F5F5]">
      <Navbar />

      {/* Global Toast Feedback for Cart & Compare Limit */}
      <div
        aria-live="polite"
        className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {notification && (
          <div className="pointer-events-auto bg-[#202020] border border-[#00E5FF]/50 shadow-2xl rounded-lg p-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-[#F5F5F5]">{notification.message}</p>
                {notification.productName && (
                  <p className="text-[#A3A3A3] mt-0.5">{notification.productName}</p>
                )}
                {notification.message === 'Added to cart' && (
                  <Link
                    to="/cart"
                    onClick={dismissNotification}
                    className="inline-block mt-1.5 text-[#00E5FF] font-medium hover:underline"
                  >
                    View Cart & Checkout →
                  </Link>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={dismissNotification}
              aria-label="Dismiss notification"
              className="text-[#737373] hover:text-[#F5F5F5] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {compareWarning && (
          <div className="pointer-events-auto bg-[#202020] border border-[#F59E0B] shadow-2xl rounded-lg p-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-[#F5F5F5]">{compareWarning}</p>
                <Link
                  to="/compare"
                  onClick={dismissCompareWarning}
                  className="inline-block mt-1 text-[#00E5FF] hover:underline"
                >
                  Open Comparison Table →
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissCompareWarning}
              aria-label="Dismiss warning"
              className="text-[#737373] hover:text-[#F5F5F5] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <CompareBar />
      <Footer />
    </div>
  );
};
