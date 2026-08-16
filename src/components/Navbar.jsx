import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LOGO_PATH, SITE_NAME } from "../constants/site.js";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/showcase", label: "OUR SHOWCASE", accent: true },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function desktopClass({ isActive, accent }) {
  if (accent) {
    return `inline-flex items-center rounded-lg border px-4 py-2 text-xs font-semibold tracking-[0.14em] transition ${
      isActive
        ? "border-cyan-300/70 bg-cyan-500/10 text-white"
        : "border-cyan-400/40 bg-transparent text-cyan-100 hover:bg-cyan-500/10 hover:text-white"
    }`;
  }

  return `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
  }`;
}

function mobileClass({ isActive, accent }) {
  if (accent) {
    return `inline-flex items-center justify-center rounded-lg border px-3 py-3 text-xs font-semibold tracking-[0.14em] transition ${
      isActive
        ? "border-cyan-300/70 bg-cyan-500/10 text-white"
        : "border-cyan-400/40 bg-transparent text-cyan-100 hover:bg-cyan-500/10"
    }`;
  }

  return `rounded-lg px-3 py-3 text-sm font-medium ${
    isActive ? "bg-white/10 text-white" : "text-slate-300"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <img
            src={LOGO_PATH}
            alt={`${SITE_NAME} logo`}
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-lg text-white">{SITE_NAME}</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, end, accent }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => desktopClass({ isActive, accent })}
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
            {links.map(({ to, label, end, accent }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => mobileClass({ isActive, accent })}
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
