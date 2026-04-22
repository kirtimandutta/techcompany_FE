import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LOGO_PATH, SITE_NAME } from "../constants/site.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <img src={LOGO_PATH} alt={`${SITE_NAME} logo`} className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-lg text-white">{SITE_NAME}</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-slate-950/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive ? "bg-white/10 text-white" : "text-slate-300"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
