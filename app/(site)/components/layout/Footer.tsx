"use client";

import { useState } from "react";

function Section({ title, children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 md:py-0 md:cursor-default"
      >
        <h3 className="text-white font-semibold text-base">
          {title}
        </h3>
        <span className="md:hidden">{open ? "−" : "+"}</span>
      </button>

      <div className={`${open ? "block" : "hidden"} md:block pb-4 md:pb-0`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

          <Section title="Our Company">
            <ul className="space-y-2">
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Our Products</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li>Videos</li>
              <li>Photos</li>
              <a
  href="/Indole-Cleaners.pdf"
  download
  target="_blank"
  className="hover:text-cyan-400"
>
  Download Brochure
</a>


              <li>Reach Us</li>
            </ul>
          </Section>

          <Section title="Indole Cleaners">
            <p>
              996, IIM Road,<br />
              Allunagar Diguriya,<br />
              Lucknow – 226020,<br />
              Uttar Pradesh, India
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=996+IIM+Road+Lucknow"
              target="_blank"
              className="inline-block mt-3 text-cyan-400"
            >
              Get Directions →
            </a>
          </Section>

          <Section title="Contact">
            <p className="text-white">Daud Ahmad</p>
            <p className="text-xs mb-3">CEO</p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+918047696940"
                className="w-full text-center py-2 rounded-full bg-cyan-400 text-black"
              >
                Call Now
              </a>
              <a
                href="sms:+918047696940"
                className="w-full text-center py-2 rounded-full border border-white/20"
              >
                Send SMS
              </a>
            </div>
          </Section>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs">
          © {new Date().getFullYear()} Indole Cleaners. All rights reserved.
        </div>

      </div>
  <div className="mt-4 text-center text-[11px] text-slate-500">
  Designed & Developed by{" "}
  <a
    href="https://github.com/UmairKha111"
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-400 hover:underline font-medium"
  >
    Umair Khan
  </a>
</div>


    </footer>
  );
}
