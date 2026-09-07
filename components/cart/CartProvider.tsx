"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { cartCount, cartReducer, cartSubtotal, emptyCart, type CartAction, type CartState } from "@/lib/cart";

interface CartContextValue {
  state: CartState;
  count: number;
  subtotal: number;
  dispatch: (action: CartAction) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Set after an add so the drawer can announce it. */
  lastAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Cart lives in React state for the life of the tab. No localStorage — by
 * brief. Phase 2 can persist server-side against a Stripe session instead.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, rawDispatch] = useReducer(cartReducer, emptyCart);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const dispatch = useCallback((action: CartAction) => {
    rawDispatch(action);
    if (action.type === "add") {
      setLastAdded(action.line.name);
      setOpen(true);
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      count: cartCount(state),
      subtotal: cartSubtotal(state),
      dispatch,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      lastAdded,
    }),
    [state, dispatch, isOpen, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
