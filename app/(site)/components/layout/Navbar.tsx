"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);

  const { cart } = useCart();
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  // ✅ CHECK IF USER HAS ORDERS (VIA PHONE)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const phone = localStorage.getItem("customerPhone");
      setHasOrders(!!phone);
    }
  }, []);

  return (
    <header
      id="site-navbar"
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

        {/* LOGO + BRAND */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 sm:h-16 sm:w-16 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Indole Cleaners Store Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="leading-tight">
            <span className="block text-sm sm:text-xl font-bold tracking-wide">
              <span className="text-red-600">INDOLE</span>{" "}
              <span className="text-blue-900">HYGIENE</span>
            </span>
            <span className="sm:block text-xs text-slate-400">
              INDIA
            </span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/products" className="nav-link">Products</Link>

          {hasOrders && (
            <Link href="/my-orders" className="nav-link">
              My Orders
            </Link>
          )}

          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>

          <Link href="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center h-9 w-9 rounded-full border border-white/20"
          >
            <span className="text-lg">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-[10px] font-bold rounded-full px-1.5">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center h-9 w-9 rounded-full border border-white/20 text-white text-xl hover:bg-white/10 transition"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 py-6 space-y-3">
          <Link onClick={() => setOpen(false)} href="/" className="block rounded-lg px-4 py-3 hover:bg-white/10">
            Home
          </Link>

          <Link onClick={() => setOpen(false)} href="/products" className="block rounded-lg px-4 py-3 hover:bg-white/10">
            Products
          </Link>

          {hasOrders && (
            <Link
              href="/my-orders"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 hover:bg-white/10"
            >
              My Orders
            </Link>
          )}

          <Link onClick={() => setOpen(false)} href="/about" className="block rounded-lg px-4 py-3 hover:bg-white/10">
            About
          </Link>

          <Link onClick={() => setOpen(false)} href="/contact" className="block rounded-lg px-4 py-3 hover:bg-white/10">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
