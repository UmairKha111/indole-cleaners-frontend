"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const token = localStorage.getItem("adminToken");

    if (!form.category) {
      alert("Please select a category");
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    router.push("/admin/products");
  };

  return (
    <div className="p-10 text-white max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {/* NAME */}
      <input
        name="name"
        placeholder="Product Name"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        value={form.name}
        onChange={handleChange}
      />

      {/* PRICE */}
      <input
        name="price"
        type="number"
        placeholder="Price"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        value={form.price}
        onChange={handleChange}
      />

      {/* IMAGE */}
      <input
        name="image"
        placeholder="Image URL"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        value={form.image}
        onChange={handleChange}
      />

      {/* DESCRIPTION */}
      <input
        name="description"
        placeholder="Description"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        value={form.description}
        onChange={handleChange}
      />

      {/* CATEGORY DROPDOWN */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full mb-6 p-2 rounded bg-slate-800"
      >
        <option value="">Select Category</option>
        <option value="cleaning-accessories">Cleaning Accessories</option>
        <option value="liquid-floor-cleaner">Liquid Floor Cleaner</option>
        <option value="liquid-hand-wash">Liquid Hand Wash</option>
        <option value="white-phenyl">White Phenyl</option>
        <option value="waste-bin">Waste Bin</option>
        <option value="liquid-toilet-cleaner">Liquid Toilet Cleaner</option>
        <option value="room-freshener">Room Freshener</option>
        <option value="plastic-dustbin">Plastic Dustbin</option>
      </select>

      <button
        onClick={submit}
        className="bg-cyan-500 px-6 py-2 rounded text-black font-semibold"
      >
        Save Product
      </button>
    </div>
  );
}
