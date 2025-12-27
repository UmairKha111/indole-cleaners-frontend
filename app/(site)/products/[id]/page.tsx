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
    <div className="container-safe py-16 text-white">
      <div className="flex flex-col lg:flex-row items-start gap-16">

     <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
  <img
    src={product.image}
    alt={product.name}
    className="w-full max-w-sm mx-auto object-contain"
  />
</div>



       <div className="max-w-xl space-y-6">


        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">

            {product.name}
          </h1>

          <p className="text-2xl text-cyan-400 font-bold">

            ₹{product.price}
          </p>

          <p className="text-slate-300 leading-relaxed">

            {product.description}
          </p>

          {/* ✅ CONDITIONAL BUTTON */}
          {isInCart ? (
            <button
              onClick={() => (window.location.href = "/cart")}
             className="w-full sm:w-auto px-8 py-3 rounded-full text-lg font-semibold transition shadow-lg"

            >
              Go to Cart →
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
             className="w-full sm:w-auto px-8 py-3 rounded-full text-lg font-semibold transition shadow-lg"


            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
