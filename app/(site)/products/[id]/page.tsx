"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cart } = useCart(); // ✅ include cart
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    }

    fetchProduct();
  }, [id]);

  // ✅ DEFINE isInCart HERE (BEFORE return)
  const isInCart = cart.some(
    (item) => item._id === product?._id
  );

  if (!product) {
    return <div className="text-white p-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <div className="flex gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-96 object-cover rounded-xl border border-white/10"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-xl text-cyan-300 font-semibold mb-6">
            ₹{product.price}
          </p>

          <p className="text-slate-300 mb-8">
            {product.description}
          </p>

          {/* ✅ CONDITIONAL BUTTON */}
          {isInCart ? (
            <button
              onClick={() => (window.location.href = "/cart")}
              className="px-6 py-3 bg-green-500 text-black rounded-full text-lg font-semibold hover:bg-green-400"
            >
              Go to Cart →
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-cyan-400 text-black rounded-full text-lg font-semibold hover:bg-cyan-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
