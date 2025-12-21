"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface Order {
  _id: string;

  customer?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
  };

  items?: {
    productId?: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  total: number;
  status: string;

  payment?: {
    method?: string;
    status?: string;
  };

  createdAt?: string;
}



/* ================= STATUS FLOW ================= */

const STATUS_FLOW: Record<string, string[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Out for Delivery", "Cancelled"],
  "Out for Delivery": ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Out for Delivery",
  "Delivered",
];

/* ================= STATUS COLORS ================= */

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500",
  Confirmed: "bg-blue-500",
  "Out for Delivery": "bg-purple-500",
  Delivered: "bg-green-500",
  Cancelled: "bg-red-500",
};

/* ================= COMPONENT ================= */

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDER ================= */

  const fetchOrder = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      }
    } catch (err) {
      console.error("Fetch order error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (newStatus: string) => {
    const token = localStorage.getItem("adminToken");

    if (!token || !order) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${order._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.order); // instant UI update
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  /* ================= DELETE ORDER ================= */

  const deleteOrder = async () => {
    if (!order) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${order._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Order deleted successfully");
        router.replace("/admin/orders");
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <p className="text-center text-white mt-10">
        Loading order...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="text-center text-white mt-10">
        Order not found
      </p>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      {/* STATUS TIMELINE */}
      <div className="bg-gray-800 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Order Status Timeline
        </h2>

        {order.status === "Cancelled" ? (
          <span className="px-3 py-1 rounded-full text-xs bg-red-600">
            Cancelled
          </span>
        ) : (
          <div className="flex flex-wrap gap-3">
            {STATUS_STEPS.map((step, index) => (
              <span
                key={step}
                className={`px-3 py-1 rounded-full text-xs ${
                  index <= currentStepIndex
                    ? "bg-green-600"
                    : "bg-slate-700 text-gray-300"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* STATUS UPDATE */}
      <div className="mb-6 flex items-center gap-4">
        {STATUS_FLOW[order.status]?.length > 0 ? (
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                updateStatus(e.target.value);
              }
            }}
            className="bg-slate-800 border border-white/20 text-white rounded px-4 py-2"
          >
            <option value="" disabled>
              Update Status
            </option>

            {STATUS_FLOW[order.status].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-gray-400 text-sm">
            Status Locked
          </span>
        )}
      </div>

      {/* CUSTOMER INFO */}
      <div className="bg-gray-800 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Customer Info
        </h2>
        <p><strong>Name:</strong> {order.customer?.name}</p>
        <p><strong>Phone:</strong> {order.customer?.phone}</p>
        <p><strong>Address:</strong> {order.customer?.address}</p>
        <p><strong>City:</strong> {order.customer?.city}</p>
        <p><strong>Pincode:</strong> {order.customer?.pincode}</p>
      </div>

      {/* ITEMS */}
      <div className="bg-gray-800 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Items</h2>

        {order.items?.map((item, i) => (
          <div
            key={i}
            className="border-b border-gray-700 pb-3 mb-3"
          >
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Qty:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
    <div className="bg-gray-800 p-5 rounded-xl mb-6">
  <h2 className="text-xl font-semibold mb-2">Payment</h2>

  <p>
    <strong>Method:</strong>{" "}
    {order.payment?.method || "Cash on Delivery"}
  </p>

  <p>
    <strong>Status:</strong>{" "}
    {order.payment?.status || "Pending"}
  </p>

  <p className="mt-2">
    <strong>Total Amount:</strong> ₹{order.total}
  </p>
</div>


      {/* DELETE */}
      <button
        onClick={deleteOrder}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold"
      >
        Delete Order
      </button>
    </div>
  );
}
