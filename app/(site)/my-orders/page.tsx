"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
}


export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const phone = localStorage.getItem("customerPhone");

        if (!phone) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/customer/${phone}`
        );

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Orders API error:", text);
          throw new Error("Unable to load orders");
        }

        const data = await res.json();

        setOrders(data.orders || []);
      } catch (err: any) {
        console.error(err);
        setError("Unable to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <p className="text-center text-white mt-20">
        Loading your orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-400 mt-20">
        {error}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-2">No Orders Found</h2>
        <Link
          href="/products"
          className="mt-4 px-6 py-3 bg-cyan-400 text-black rounded-full font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6"
          >
            <p className="font-semibold">
              Order #{order._id.slice(-6)}
            </p>

            <p className="text-slate-400 text-sm">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p className="mt-2 text-lg font-bold text-cyan-300">
              ₹{order.total}
            </p>

            <p className="mt-1">
              Status: <b>{order.status}</b>
            </p>

            <Link
              href={`/my-orders/${order._id}`}
              className="inline-block mt-3 text-cyan-400 hover:underline"
            >
              View Order →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
