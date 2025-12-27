"use client";

import { useCart } from "@/app/(site)/[slug]/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  const updateField = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      customer: form,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      payment: {
        method: "Cash on Delivery",
        status: "Pending",
      },
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("customerPhone", form.phone);
        clearCart();
        router.push("/checkout/success");
      } else {
        alert(data.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* EMPTY CART */
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
        <Link
          href="/products"
          className="px-6 py-3 bg-cyan-400 text-black rounded-full font-semibold hover:bg-cyan-300 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
   <div className="container-safe pt-6 sm:pt-8 pb-16 text-white">


      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SHIPPING FORM */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={updateField}
              className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 focus:border-cyan-400 outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={updateField}
              className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 focus:border-cyan-400 outline-none"
            />

            <textarea
              placeholder="Full Address"
              name="address"
              value={form.address}
              onChange={updateField}
              className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 focus:border-cyan-400 outline-none h-24"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={updateField}
                className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 focus:border-cyan-400 outline-none"
              />

              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={updateField}
                className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition shadow-lg"
          >
            Place Order
          </button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="flex justify-between items-start border-b border-white/10 pb-3"
              >
                <div>
                  <p className="font-medium">
                    {item.name || "Product"}
                  </p>
                  <p className="text-sm text-slate-400">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-cyan-300 font-bold">
                  ₹{(item.price ?? 0) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xl font-semibold mt-6">
            <span>Total:</span>
            <span className="text-cyan-400">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
