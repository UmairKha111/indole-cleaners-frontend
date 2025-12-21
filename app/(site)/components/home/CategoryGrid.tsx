"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Home Surface Care",
    description: "For kitchen, bathroom & glass cleaning.",
    tag: "Daily use",
  },
  {
    name: "Floor & Fabric Care",
    description: "Floor cleaner + fabric refresher.",
    tag: "Safe & strong",
  },
  {
    name: "Dish & Hand Care",
    description: "Soft on hands, tough on grease.",
    tag: "Skin-safe",
  },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">Shop by category</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 shadow-md"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-xs text-cyan-300">{cat.tag}</p>
            <h3 className="text-lg font-semibold text-white mt-1">
              {cat.name}
            </h3>
            <p className="text-slate-300 text-sm mt-2">{cat.description}</p>
            <button className="text-cyan-300 text-sm mt-3 hover:underline">
              Explore →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
