import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProviderWrapper } from "./components/ui/CartProviderWrapper";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProviderWrapper>
      <Toaster position="top-right" />
      <Navbar />

      <main className="min-h-[80vh] animate-fadeIn">
        {children}
      </main>

      <Footer />
    </CartProviderWrapper>
  );
}
