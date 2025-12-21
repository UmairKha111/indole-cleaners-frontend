
"use client";

import Link from "next/link";
import { CATEGORIES } from "@/app/config/categories";

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-blue-900">
        Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14">
        {CATEGORIES.map((cat, index) => (
          <Link
            key={cat.key}
            href={`/products?category=${cat.key}`}
            className={`product-card animate-scaleIn delay-${index + 1}`}
          >
            <img
              src={cat.image}
              className="product-img"
              alt={cat.title}
            />
            <h3 className="product-name">{cat.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
