"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";



export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login/api/products/${id}`);
        const contentType =
          res.headers.get("content-type") || "";

        // 🔒 SAFETY CHECK (prevents "<!DOCTYPE html>" crash)
        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Product API error:", text);
          throw new Error("Product not found");
        }

        const data = await res.json();

        // Works for both API styles
        setProduct(data.product || data);
      } catch (err: any) {
        console.error("Product fetch error:", err);
        setError("Product not found");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="text-red-400 p-20 text-center">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-white p-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <div className="flex gap-10">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-96 object-cover rounded-xl border border-white/10"
        />

        {/* DETAILS */}
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

          <button
            onClick={() => addToCart(product)}
            className="px-6 py-3 bg-cyan-400 text-black rounded-full text-lg font-semibold hover:bg-cyan-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
