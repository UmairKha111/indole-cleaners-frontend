// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import { CartProviderWrapper } from "./components/ui/CartProviderWrapper";
// import { Toaster } from "react-hot-toast";

// export default function SiteLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <CartProviderWrapper>
//       <Toaster position="top-right" />

//       <Navbar />

//       {/* ✅ OFFSET FIXED NAVBAR */}
//       <main className="pt-[96px] sm:pt-[96px] min-h-[80vh] animate-fadeIn">
//         {children}
//       </main>

//       <Footer />
//     </CartProviderWrapper>
//   );
// }
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";

// export default function SiteLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <Navbar />

//       {/* ✅ FIXED NAVBAR OFFSET */}
//       <main className="pt-[140px] sm:pt-[140px] min-h-[80vh] animate-fadeIn">
//   {children}
// </main>

//       <Footer />
//     </>
//   );
// }
"use client";

import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const navbar = document.getElementById("site-navbar");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`
      );
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* ✅ REAL FIX — dynamic offset */}
      <main
        className="min-h-[80vh] animate-fadeIn"
        style={{ paddingTop: "var(--navbar-height)" }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
