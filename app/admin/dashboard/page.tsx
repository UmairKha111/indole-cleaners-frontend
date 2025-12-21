"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pending: number;
  confirmed: number;
  outForDelivery: number;
  delivered: number;
  cancelled: number;
  todaysOrders: number;
}

interface Order {
  _id: string;
  customer?: {
    name?: string;
    phone?: string;
  };
  total: number;
  status: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔴 Auto logout if session expired
        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
          return;
        }

        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
          setRecentOrders(data.recentOrders || []);
        } else {
          console.error("Stats API error:", data);
        }
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Could not load stats.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 text-white">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard label="Total Orders" value={stats.totalOrders} />
        <DashboardCard
          label="Today’s Orders"
          value={stats.todaysOrders}
          color="text-emerald-400"
        />
        <DashboardCard
          label="Revenue"
          value={`₹${stats.totalRevenue}`}
          color="text-cyan-400"
        />
      </div>

      {/* STATUS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatusCard label="Pending" value={stats.pending} />
        <StatusCard label="Confirmed" value={stats.confirmed} />
        <StatusCard label="Out for Delivery" value={stats.outForDelivery} />
        <StatusCard label="Delivered" value={stats.delivered} />
        <StatusCard label="Cancelled" value={stats.cancelled} />
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-slate-900 rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-cyan-400 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400">No recent orders.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left py-2">Order</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b border-white/5">
                  <td className="py-2">{order._id.slice(-8)}</td>
                  <td className="py-2">
                    {order.customer?.name || "Unknown"}
                  </td>
                  <td className="py-2">₹{order.total}</td>
                  <td className="py-2">{order.status}</td>
                  <td className="py-2 text-right">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="text-cyan-400 hover:underline text-xs"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function DashboardCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${color || "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function StatusCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
