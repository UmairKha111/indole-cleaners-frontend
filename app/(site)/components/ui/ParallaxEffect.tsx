"use client";

import { useEffect } from "react";

export default function ParallaxEffect() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;

      document.querySelectorAll(".parallax-layer").forEach((layer: any) => {
        const speed = Number(layer.getAttribute("data-speed"));
        layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
