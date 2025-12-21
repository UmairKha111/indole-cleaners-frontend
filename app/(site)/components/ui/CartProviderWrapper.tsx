"use client";

import { CartProvider } from "@/app/(site)/[slug]/context/CartContext";
import type { ReactNode } from "react";

export function CartProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
