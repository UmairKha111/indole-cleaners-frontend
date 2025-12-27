"use client";

import { useCart } from "@/app/(site)/[slug]/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-3">Your Cart is Empty</h2>
        <p className="text-slate-400 mb-6">
          Add items to start shopping.
        </p>

        <Link
          href="/products"
          className="px-6 py-3 bg-cyan-400 text-black rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-safe pt-6 pb-16 text-white">

      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-6">
        {cart.map((item) => {
          const safeName = item.name || "Unnamed Product";
          const safePrice = item.price ?? 0;
          const safeImage = item.image || "/placeholder.png";

          return (
          <div
  key={item._id}
  className="bg-slate-900 rounded-2xl border border-white/10 p-4 space-y-4"
>
  {/* TOP ROW: IMAGE + INFO */}
  <div className="flex items-center gap-4">
    <img
      src={item.image || '/placeholder.png'}
      alt={item.name || 'Product'}
      className="w-20 h-20 object-contain rounded-lg bg-black/20"
    />

    <div className="flex-1">
      <h3 className="text-base font-semibold text-white leading-tight">
        {item.name || 'Unnamed Product'}
      </h3>
      <p className="text-cyan-300 font-bold text-sm mt-1">
        ₹{item.price ?? 0}
      </p>
    </div>
  </div>

  {/* BOTTOM ROW: QUANTITY + REMOVE */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full">
      <button
        onClick={() =>
          item.quantity > 1 &&
          updateQuantity(item._id, item.quantity - 1)
        }
        className="text-lg font-bold hover:text-red-400 transition"
      >
        −
      </button>

      <span className="font-semibold text-sm">
        {item.quantity}
      </span>

      <button
        onClick={() =>
          updateQuantity(item._id, item.quantity + 1)
        }
        className="text-lg font-bold hover:text-green-400 transition"
      >
        +
      </button>
    </div>

    <button
      onClick={() => removeFromCart(item._id)}
      className="text-red-400 text-sm font-medium hover:text-red-300 transition"
    >
      Remove
    </button>
  </div>
</div>

          );
        })}
      </div>

      {/* CART SUMMARY */}
      <div className="mt-10 bg-slate-800 rounded-2xl p-6 border border-white/10 shadow-lg">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span className="text-cyan-400">
            ₹{total}
          </span>
        </div>

        <Link
          href="/checkout"
          className="block w-full mt-4 text-center py-3 bg-cyan-400 text-black rounded-full font-bold hover:bg-cyan-300 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
