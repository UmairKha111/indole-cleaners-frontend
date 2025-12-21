"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";

export default function ProductCard({ product }: any) {
  const { cart, addToCart, updateQuantity, isInCart } = useCart();

  const item = cart.find((i) => i._id === product._id);
  const added = !!item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10"
    >
      {/* Image */}
      <Link href={`/products/${product._id}`}>
        <motion.img
          src={product.image}
          alt={product.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="w-full h-56 object-cover rounded-xl cursor-pointer"
        />
      </Link>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold truncate">
          {product.name}
        </h3>

        <p className="text-cyan-300 text-xl font-bold mt-1">
          ₹{product.price}
        </p>

        {/* ACTION AREA */}
        <div className="mt-4">
          {!added ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between gap-3">
              {/* Quantity Controller */}
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full">
                <button
                  onClick={() =>
                    updateQuantity(product._id, item.quantity - 1)
                  }
                  className="text-xl font-bold text-white hover:text-red-400"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(product._id, item.quantity + 1)
                  }
                  className="text-xl font-bold text-white hover:text-green-400"
                >
                  +
                </button>
              </div>

              {/* View Cart */}
              <Link
                href="/cart"
                className="px-4 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition"
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
