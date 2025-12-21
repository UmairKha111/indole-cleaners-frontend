"use client";

import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [slug]);

  if (!product) return <div className="text-white p-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <div className="flex gap-10">

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-96 h-96 object-cover rounded-xl border border-white/10"
        />

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <p className="text-xl text-cyan-300 font-semibold mb-6">
            ₹{product.price}
          </p>

          <p className="text-slate-300 mb-8">{product.description}</p>

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
