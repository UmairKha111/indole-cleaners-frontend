"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function HeroSection() {
  // ✅ Parallax scroll (safe + isolated)
  useEffect(() => {
    const layers = document.querySelectorAll<HTMLElement>(".hero-parallax");

    const onScroll = () => {
      const y = window.scrollY;
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed || 1);
        layer.style.transform = `translateY(${y * speed * 0.08}px)`;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/10 min-h-[80vh]">

      {/* ===== GLOW BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="hero-parallax absolute -top-40 left-10 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl"
          data-speed="1"
        />
        <div
          className="hero-parallax absolute bottom-[-6rem] right-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
          data-speed="2"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 flex flex-col md:flex-row gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Transform Your Home
            <span className="block text-cyan-400 mt-2">
              With Premium Cleaning
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-xl">
            Indole Cleaners brings powerful, eco-friendly cleaning solutions
            designed for modern households.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href="/products"
              className="px-7 py-3 bg-cyan-400 text-black rounded-full font-semibold hover:bg-cyan-300 shadow-lg transition"
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
        </motion.div>

        {/* RIGHT PRODUCT CARD */}
        <motion.div
          className="flex-1 hero-parallax"
          data-speed="3"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-80 h-80 mx-auto bg-slate-900/70 border border-white/10 rounded-3xl shadow-2xl flex flex-col justify-center items-center">
            <p className="text-slate-300 text-sm">Best Seller Bundle</p>
            <p className="text-cyan-300 text-3xl font-bold mt-2">₹649</p>

            <img
              src="/product-images/surface-cleaner.png"
              alt="Surface Cleaner"
              className="h-56 mt-4 object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
