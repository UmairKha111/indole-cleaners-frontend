"use client";

import { useCart } from "@/app/(site)/[slug]/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
    <div className="max-w-5xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
  <div
    key={item._id}
    className="flex items-center justify-between bg-slate-900 p-5 rounded-2xl"
  >
    {/* Quantity */}
    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
      -
    </button>

    <span>{item.quantity}</span>

    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
      +
    </button>

    <button onClick={() => removeFromCart(item._id)}>
      Remove
    </button>
  </div>
))}

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
