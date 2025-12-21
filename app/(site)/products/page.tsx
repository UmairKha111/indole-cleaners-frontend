// "use client";

// import { useEffect, useState } from "react";
// import ProductCard from "@/app/(site)/components/product/ProductCard";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         const data = await res.json();

//         // ✅ FIX (MOST IMPORTANT LINE)
//         if (data.success && Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           setProducts([]);
//         }
//       } catch (err) {
//         console.log("Error loading products", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-white text-center py-20">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 text-white">
//       <h1 className="text-4xl font-bold mb-10">Our Products</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {products.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import ProductCard from "@/app/(site)/components/product/ProductCard";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         const data = await res.json();

//         if (data.success && Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           setProducts([]);
//         }
//       } catch (err) {
//         console.error("Error loading products", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-white">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 text-white">
//       <h1 className="text-4xl font-bold mb-10">Our Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {products.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/(site)/components/product/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW (READ CATEGORY FROM URL)
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        // ✅ ONLY CHANGE: API URL
        const url = category
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]); // ✅ reload when category changes

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-10 uppercase">
  {category
    ? category.replace(/-/g, " ")
    : "Our Products"}
</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
