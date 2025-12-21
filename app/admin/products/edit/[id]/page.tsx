"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setForm(d.product));
  }, [id]);

  const update = async () => {
    const token = localStorage.getItem("adminToken");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    router.push("/admin/products");
  };

  return (
    <div className="p-10 text-white max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {/* TEXT INPUTS */}
      {["name", "price", "image", "description"].map((f) => (
        <input
          key={f}
          placeholder={f.toUpperCase()}
          value={form[f] || ""}
          className="w-full mb-4 p-2 rounded bg-slate-800"
          onChange={(e) =>
            setForm({ ...form, [f]: e.target.value })
          }
        />
      ))}

      {/* CATEGORY SELECT */}
      <select
        value={form.category || ""}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
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

      {/* UPDATE BUTTON */}
      <button
        onClick={update}
        className="bg-cyan-500 px-6 py-2 rounded text-black font-semibold hover:bg-cyan-400"
      >
        Update Product
      </button>
    </div>
  );
}
