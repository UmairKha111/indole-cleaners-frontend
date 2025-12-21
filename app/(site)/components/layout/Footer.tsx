export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row justify-between text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Indole Cleaners. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-cyan-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-300 transition">Terms</a>
          <a href="#" className="hover:text-cyan-300 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}
