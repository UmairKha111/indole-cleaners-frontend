import "./globals.css";
import Navbar from "./(site)/components/layout/Navbar";
import Footer from "./(site)/components/layout/Footer";
import { CartProviderWrapper } from "./(site)/components/ui/CartProviderWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Indole Cleaners",
  description: "Cleaning Essentials E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN MUST LOAD BEFORE UI */}
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>

      <body className="bg-gray-900 text-white">
        <Toaster position="top-right" />

        <CartProviderWrapper>
          <Navbar />

          {/* Remove animate-fadeIn because CDN does NOT support it */}
          <main className="min-h-[80vh]">{children}</main>

          <Footer />
        </CartProviderWrapper>
      </body>
    </html>
  );
}
