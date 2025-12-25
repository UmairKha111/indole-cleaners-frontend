"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/(site)/components/product/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const url = category
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10 uppercase">
        {category ? category.replace(/-/g, " ") : "Our Products"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
