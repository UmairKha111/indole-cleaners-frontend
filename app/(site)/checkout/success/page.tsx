"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="max-w-xl w-full bg-slate-900 border border-white/10 rounded-2xl p-10 text-center shadow-xl">

        {/* ICON */}
        <CheckCircle className="mx-auto text-green-400" size={64} />

        {/* TITLE */}
        <h1 className="text-3xl font-bold mt-6">
          Order Placed Successfully!
        </h1>

        {/* MESSAGE */}
        <p className="text-slate-400 mt-4">
          Thank you for shopping with <strong>Indole Cleaners</strong>.
          Your order has been received and is being processed.
        </p>

        {/* PAYMENT INFO */}
        <div className="mt-6 bg-slate-800 rounded-xl p-4 text-left">
          <p>
            <strong>Payment Method:</strong>{" "}
            Cash on Delivery
          </p>
          <p className="mt-1">
            <strong>Payment Status:</strong>{" "}
            Pending
          </p>
        </div>

        {/* DELIVERY NOTE */}
        <p className="text-sm text-slate-400 mt-4">
          📞 You will receive a confirmation call before delivery.
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/my-orders"
            className="w-full py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition"
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="w-full py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
