"use client";

import Link from "next/link";
import { useEffect } from "react";
import FeaturedProducts from "./components/home/FeatureProducts";

export default function Home() {
  // ✅ PARALLAX (DESKTOP ONLY)
  useEffect(() => {
    const layers = document.querySelectorAll<HTMLElement>(".parallax-layer");

    const handleScroll = () => {
      if (window.innerWidth < 768) return; // ❌ no parallax on mobile

      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed || 1);
        layer.style.transform = `translateY(${scrollY * speed * 0.08}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* BASE BACKGROUND */}
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40" />

      

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Transform Your Home
                <span className="block text-cyan-400 mt-2">
                  With Premium Cleaning
                </span>
              </h1>

              <p className="text-slate-300 text-lg mt-6 max-w-xl mx-auto md:mx-0">
                Indole Cleaners brings a powerful, eco-friendly cleaning experience.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-cyan-400 text-slate-900 font-semibold rounded-full hover:bg-cyan-300 transition"
                >
                  Shop Now
                </Link>

                <Link
                  href="/about"
                  className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE — DESKTOP ONLY */}
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-72 lg:w-80 lg:h-80 bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center animate-float">
                <img
                  src="/product-images/surface-cleaner.png"
                  alt="Surface Cleaner"
                  className="h-56 lg:h-64 object-contain opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-red-600">
          Why Choose <span className="text-blue-900">Indole Cleaners?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2 text-green-500">
              Non-Toxic
            </h3>
            <p className="text-white text-sm">
              Safe for babies, pets & daily usage.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2 text-green-500">
              Eco-Friendly
            </h3>
            <p className="text-white text-sm">
              Biodegradable cleaning formula.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2 text-green-500">
              Powerful Cleaning
            </h3>
            <p className="text-white text-sm">
              Removes grease, stains & germs.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <FeaturedProducts />
    </main>
  );
}
