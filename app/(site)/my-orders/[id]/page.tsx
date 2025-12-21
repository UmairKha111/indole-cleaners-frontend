"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}


export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`);

        const contentType = res.headers.get("content-type") || "";

        // 🔒 SAFETY CHECK (THIS WAS MISSING)
        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Single order API error:", text);
          throw new Error("Order not found");
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Order not found");
        }

        setOrder(data.order);
      } catch (err: any) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <p className="text-center text-white mt-20">
        Loading order...
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

  if (!order) {
    return (
      <p className="text-center text-white mt-20">
        Order not found
      </p>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-3">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total:</b> ₹{order.total}</p>
        <p>
          <b>Date:</b>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        {order.customer && (
          <>
            <hr className="border-white/10 my-3" />
            <p><b>Name:</b> {order.customer.name}</p>
            <p><b>Phone:</b> {order.customer.phone}</p>
            <p><b>Address:</b> {order.customer.address}</p>
          </>
        )}
      </div>
    </div>
  );
}
