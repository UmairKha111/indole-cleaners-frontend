"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */
interface Product {
  _id: string;          // ✅ ONLY ID
  slug: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  updateQuantity: (_id: string, quantity: number) => void;
  isInCart: (_id: string) => boolean; // ✅ NEW
  
}

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ================= LOAD CART ================= */
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  /* ================= SAVE CART ================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= ADD TO CART ================= */
const addToCart = (product: Product) => {
  setCart((prev) => {
    const exists = prev.find((i) => i._id === product._id);

    if (exists) {
      return prev.map((i) =>
        i._id === product._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

  /* ================= REMOVE ITEM ================= */
const removeFromCart = (_id: string) => {
  setCart((prev) => prev.filter((i) => i._id !== _id));
};


  /* ================= UPDATE QUANTITY ================= */
const updateQuantity = (_id: string, quantity: number) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item._id === _id ? { ...item, quantity } : item
      )
      .filter((item) => item.quantity > 0)
  );
};


  /* ================= CLEAR CART ================= */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  /* ================= CHECK IF IN CART ================= */
  const isInCart = (_id: string) => {
    return cart.some((item) => item._id === _id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        isInCart, // ✅ EXPOSED
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
