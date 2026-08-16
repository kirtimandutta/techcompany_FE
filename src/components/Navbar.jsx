import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LOGO_PATH, SITE_NAME } from "../constants/site.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const SHOWCASE_HASH = "#showcase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToShowcase = (e) => {
    e.preventDefault();
    setOpen(false);

    const scrollToSection = () => {
      document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname === "/") {
      window.history.replaceState(null, "", SHOWCASE_HASH);
      scrollToSection();
      return;
    }

    navigate({ pathname: "/", hash: "showcase" });
    window.setTimeout(scrollToSection, 100);
  };

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
          <a
            href={`/${SHOWCASE_HASH}`}
            onClick={goToShowcase}
            className="ml-2 inline-flex items-center rounded-lg border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-500/25 hover:text-white"
          >
            OUR SHOWCASE
          </a>
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
            <a
              href={`/${SHOWCASE_HASH}`}
              onClick={goToShowcase}
              className="mt-2 inline-flex items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-500/15 px-3 py-3 text-xs font-semibold tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-500/25"
            >
              OUR SHOWCASE
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
