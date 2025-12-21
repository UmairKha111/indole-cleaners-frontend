// lib/products.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  tag?: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "cleaner-001",
    name: "Indole Multi-Surface Cleaner",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    tag: "Best Seller",
    image: "/product-images/surface-cleaner.png",
  },
  {
    id: "floor-002",
    name: "Indole Floor Disinfectant (1L)",
    price: 349,
    rating: 4.6,
    tag: "Trending",
    image: "/product-images/floor-cleaner.png",
  },
  {
    id: "fabric-003",
    name: "Fabric Freshener Spray",
    price: 199,
    rating: 4.7,
    tag: "New Arrival",
    image: "/product-images/fabric-freshener.png",
  },
];

// Safely typed helper function
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

