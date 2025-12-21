"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded transition ${
      pathname === path
        ? "bg-cyan-600 text-white"
        : "bg-slate-700 hover:bg-slate-600 text-white"
    }`;

  return (
    <div className="w-64 bg-slate-800 p-6 border-r border-white/10 min-h-screen">
      <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          Dashboard
        </Link>

        <Link href="/admin/orders" className={linkClass("/admin/orders")}>
          Orders
        </Link>

        <Link href="/admin/products" className={linkClass("/admin/products")}>
          Products
        </Link>

        <Link href="/admin/users" className={linkClass("/admin/users")}>
          Users
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
