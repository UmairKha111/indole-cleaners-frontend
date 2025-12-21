"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("adminToken", data.token);

      alert("Login successful!");

      router.push("/admin/dashboard"); // redirect after success
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-900 text-white">
      <div className="p-8 bg-slate-800 rounded-xl w-96 space-y-5">
        <h2 className="text-2xl font-bold">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded bg-slate-700"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-700"
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-cyan-400 text-black py-3 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
