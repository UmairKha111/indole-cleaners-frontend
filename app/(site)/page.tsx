"use client";

import Link from "next/link";
import { useEffect } from "react";
import FeaturedProducts from "./components/home/FeatureProducts";


export default function Home() {
  // ✅ PARALLAX FIX
  useEffect(() => {
    const layers = document.querySelectorAll<HTMLElement>(".parallax-layer");

    const handleScroll = () => {
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
    <main className="pt-32 bg-slate-950 text-white overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 min-h-[80vh]">

        {/* Background Layer 1 */}
        <div
          className="parallax-layer absolute inset-0 -z-10"
          data-speed="1"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />

        {/* Decorative Layer 2 */}
        <div
          className="parallax-layer absolute inset-0 -z-10"
          data-speed="2"
          style={{
            background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Left Content */}
        <div className="flex-1 relative z-10 animate-fadeUp">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Transform Your Home
            <span className="text-cyan-400 block animate-fadeIn delay-1">
              With Premium Cleaning
            </span>
          </h1>

          <p className="text-slate-300 text-lg mt-4 max-w-xl animate-fadeIn delay-2">
            Indole Cleaners brings a powerful, eco-friendly cleaning experience.
          </p>

          <div className="mt-8 flex gap-4 animate-fadeIn delay-3">
            <Link
              href="/products"
              className="px-7 py-3 bg-cyan-400 text-bold  text-red-600  rounded-full hover:bg-cyan-300 shadow-lg hover:scale-105 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/about"
              className="px-7 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Product Image Layer 3 */}
        <div
          className="flex-1 flex justify-center parallax-layer relative z-10"
          data-speed="4"
        >
          <div className="w-80 h-80 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center animate-float">
            <img
              src="/product-images/surface-cleaner.png"
              alt="Surface Cleaner"
              className="h-64"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-red-600 animate-fadeUp">
          Why Choose <span className="text-blue-900">Indole Cleaners?</span>
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
  <div className="feature-card animate-scaleIn delay-1">
    <h3 className="text-xl font-semibold mb-2 text-green-500">
      Non-Toxic
    </h3>
    <p className="text-white text-sm">
      Safe for babies, pets & daily usage.
    </p>
  </div>

  <div className="feature-card animate-scaleIn delay-2">
    <h3 className="text-xl font-semibold mb-2 text-green-500">
      Eco-Friendly
    </h3>
    <p className="text-white text-sm">
      Biodegradable cleaning formula.
    </p>
  </div>

  <div className="feature-card animate-scaleIn delay-3">
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
