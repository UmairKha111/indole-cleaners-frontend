"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ================= TYPES ================= */

interface Order {
  _id: string;
  customer?: {
    name?: string;
  };
  status?: string;
  total?: number;
}

/* ================= CONSTANTS ================= */



const STATUS_FLOW: Record<string, string[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Out for Delivery", "Cancelled"],
  "Out for Delivery": ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500",
  Confirmed: "bg-blue-500",
  "Out for Delivery": "bg-purple-500",
  Delivered: "bg-green-500",
  Cancelled: "bg-red-500",
};

/* ================= COMPONENT ================= */

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Orders fetch error:", text);
        throw new Error("Failed to load orders");
      }

      const data = await res.json();

      if (!data.success || !Array.isArray(data.orders)) {
        throw new Error("Invalid orders response");
      }

      // ✅ Normalize data
      const normalized = data.orders.map((o: Order) => ({
        ...o,
        status: o.status || "Pending",
        total: o.total ?? 0,
      }));

      setOrders(normalized);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id: string, status: string) => {
    if (!status) return; // ✅ block empty updates

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    try {
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}/status`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  }
);


      if (!res.ok) {
        const text = await res.text();
        console.error("Update error:", text);
        throw new Error("Failed to update status");
      }

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Update failed");
    }
  };

  /* ================= DELETE ORDER ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order?")) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete error:", text);
        throw new Error("Delete failed");
      }

      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <p className="p-10 text-gray-400">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-400">{error}</p>;
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-semibold mb-6">All Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-400">No orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const status = order.status || "Pending";

          return (
            <div
              key={order._id}
              className="bg-slate-800 p-5 rounded-lg border border-white/10"
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customer?.name || "—"}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${
                    statusColors[status]
                  }`}
                >
                  {status}
                </span>

                {STATUS_FLOW[status]?.length > 0 ? (
                  <select
                    className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-sm"
                    defaultValue=""
                    onChange={(e) =>
                      e.target.value &&
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Update Status
                    </option>
                    {STATUS_FLOW[status].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-xs text-gray-400">Locked</span>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  href={`/admin/orders/${order._id}`}
                  className="text-cyan-400 text-sm hover:underline"
                >
                  View Details →
                </Link>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
