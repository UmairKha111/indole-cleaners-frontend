"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/(site)/[slug]/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
{/* Logo */}
<Link href="/" className="flex items-center gap-3">
  {/* Round Logo */}
  <div className="relative h-16 w-16  overflow-hidden   bg-transparent">
    <Image
      src="/logo.png"
      alt="Indole Cleaners Store Logo"
      fill
      className="object-contain p-1"
      priority
    />
  </div>

  {/* Brand Text */}
  <span className="text-xl font-bold tracking-wide">
    <span className="text-red-600">INDOLE</span>{" "}
    <span className="text-blue-900">HYGIENE INDIA</span>
  </span>
</Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          ☰
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 p-4 space-y-2">
        <Link href="/" className="nav-hover">Home</Link>
        <Link href="/products" className="nav-hover">Products</Link>
        <Link href="/about" className="nav-hover">About</Link>
        <Link href="/contact" className="nav-hover">Contact</Link>


          <Link href="/cart" className="mobile-link flex items-center gap-2">
            🛒 Cart
            {itemCount > 0 && (
              <span className="ml-auto bg-cyan-400 text-black rounded-full text-xs px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
