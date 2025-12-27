"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";

export default function ProductCard({ product }: any) {
  const { cart, addToCart, updateQuantity } = useCart();

  const item = cart.find((i) => i._id === product._id);
  const added = !!item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="group h-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xl border border-white/10 hover:border-cyan-400/30 transition flex flex-col"

    >
      {/* Image */}
      <Link href={`/products/${product._id}`}>
        <div className="overflow-hidden rounded-xl bg-black/20">
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.35 }}
            className="w-full h-24  object-contain cursor-pointer"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-base sm:text-lg font-semibold truncate text-white">
          {product.name}
        </h3>

        <p className="text-cyan-300 text-lg sm:text-xl font-bold">
          ₹{product.price}
        </p>

        {/* ACTION AREA */}
        <div className="pt-3 mt-auto">
          {!added ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2.5 rounded-full bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 active:scale-95 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              {/* Quantity Controller */}
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full">
                <button
                  onClick={() =>
                    updateQuantity(product._id, item.quantity - 1)
                  }
                  className="text-lg font-bold text-white hover:text-red-400 transition"
                >
                  −
                </button>

                <span className="font-semibold text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(product._id, item.quantity + 1)
                  }
                  className="text-lg font-bold text-white hover:text-green-400 transition"
                >
                  +
                </button>
              </div>

              {/* View Cart */}
              <Link
                href="/cart"
               className="w-full sm:w-auto text-center px-4 py-2 rounded-full bg-green-500 text-slate-900 font-semibold hover:bg-green-400 transition"

              >
                View
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
