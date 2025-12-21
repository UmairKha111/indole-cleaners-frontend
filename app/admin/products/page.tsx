"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const token = localStorage.getItem("adminToken");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="p-10 text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-cyan-500 px-4 py-2 rounded text-black"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-slate-800 p-4 rounded">
            <img src={p.image} className="h-40 mx-auto mb-3" />
            <h3 className="font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>

            <div className="flex justify-between mt-3">
              <Link
                href={`/admin/products/edit/${p._id}`}
                className="text-cyan-400"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
