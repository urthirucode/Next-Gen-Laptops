import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '../types/product';
import { products } from '../data/products';

interface CartNotification {
  id: number;
  message: string;
  productName?: string;
}

interface CartContextValue {
  items: CartItem[];
  savedForLater: Product[];
  wishlistIds: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (product: Product) => void;
  removeFromSaved: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  totalItemsCount: number;
  subtotal: number;
  totalOriginalPrice: number;
  productSavings: number;
  promoCode: string;
  promoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  deliveryFee: number;
  estimatedTotal: number;
  notification: CartNotification | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'nextgen_cart_v1';
const SAVED_STORAGE_KEY = 'nextgen_saved_v1';
const WISHLIST_STORAGE_KEY = 'nextgen_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed: { id: string; quantity: number }[] = JSON.parse(raw);
        return parsed
          .map((entry) => {
            const found = products.find((p) => p.id === entry.id);
            return found ? { product: found, quantity: entry.quantity } : null;
          })
          .filter((item): item is CartItem => Boolean(item));
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return raw ? JSON.parse(raw) : ['asus-rog-strix-scar-16'];
    } catch {
      return ['asus-rog-strix-scar-16'];
    }
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [notification, setNotification] = useState<CartNotification | null>(null);

  useEffect(() => {
    try {
      const serialized = items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3200);
    return () => clearTimeout(timer);
  }, [notification]);

  const triggerNotification = useCallback((message: string, productName?: string) => {
    setNotification({ id: Date.now(), message, productName });
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(5, updated[existingIndex].quantity + quantity)
          };
          return updated;
        }
        return [...prev, { product, quantity }];
      });
      triggerNotification('Added to cart', product.name);
    },
    [triggerNotification]
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(5, Math.max(1, quantity)) }
          : item
      )
    );
  }, []);

  const saveForLater = useCallback(
    (productId: string) => {
      const target = items.find((i) => i.product.id === productId);
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      setSavedIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
      if (target) {
        triggerNotification('Saved for later', target.product.name);
      }
    },
    [items, triggerNotification]
  );

  const moveToCartFromSaved = useCallback(
    (product: Product) => {
      setSavedIds((prev) => prev.filter((id) => id !== product.id));
      addToCart(product, 1);
    },
    [addToCart]
  );

  const removeFromSaved = useCallback((productId: string) => {
    setSavedIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode('');
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const prod = products.find((p) => p.id === productId);
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          triggerNotification('Removed from wishlist', prod?.name);
          return prev.filter((id) => id !== productId);
        } else {
          triggerNotification('Saved to wishlist', prod?.name);
          return [...prev, productId];
        }
      });
    },
    [triggerNotification]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const savedForLater = useMemo(
    () =>
      savedIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [savedIds]
  );

  const totalItemsCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [items]
  );

  const totalOriginalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0),
    [items]
  );

  const productSavings = useMemo(
    () => Math.max(0, totalOriginalPrice - subtotal),
    [totalOriginalPrice, subtotal]
  );

  const promoDiscount = useMemo(() => {
    if (!promoCode || subtotal === 0) return 0;
    if (promoCode === 'NEXTGEN5') return Math.min(10000, Math.round(subtotal * 0.05));
    if (promoCode === 'DEVPRO') return 5000;
    return 0;
  }, [promoCode, subtotal]);

  const applyPromoCode = useCallback((rawCode: string) => {
    const normalized = rawCode.trim().toUpperCase();
    if (normalized === 'NEXTGEN5') {
      setPromoCode('NEXTGEN5');
      return { success: true, message: '5% instant hardware discount applied (up to ₹10,000).' };
    }
    if (normalized === 'DEVPRO') {
      setPromoCode('DEVPRO');
      return { success: true, message: '₹5,000 developer workstation grant applied.' };
    }
    return {
      success: false,
      message: 'Invalid code. Try NEXTGEN5 or DEVPRO.'
    };
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode('');
  }, []);

  const deliveryFee = 0; // Complimentary insured air-freight on all premium laptops

  const estimatedTotal = useMemo(
    () => Math.max(0, subtotal - promoDiscount + deliveryFee),
    [subtotal, promoDiscount, deliveryFee]
  );

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        savedForLater,
        wishlistIds,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCartFromSaved,
        removeFromSaved,
        clearCart,
        toggleWishlist,
        isWishlisted,
        totalItemsCount,
        subtotal,
        totalOriginalPrice,
        productSavings,
        promoCode,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
        deliveryFee,
        estimatedTotal,
        notification,
        dismissNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
