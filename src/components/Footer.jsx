import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const social = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:hello@codenova.tech", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-white">CodeNova Technologies</p>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              We build scalable websites and mobile apps for teams that want to move fast without
              sacrificing quality.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Connect</p>
            <div className="flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CodeNova Technologies. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/services" className="hover:text-slate-300">
              Services
            </Link>
            <Link to="/contact" className="hover:text-slate-300">
              Contact
            </Link>
            <Link to="/admin" className="text-slate-600 hover:text-slate-400">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
