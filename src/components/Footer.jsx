import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { LOGO_PATH, SITE_NAME } from "../constants/site.js";
import { openDefaultWhatsAppChat } from "../lib/whatsapp.js";

const social = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:tothyo.inweb@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={LOGO_PATH} alt={`${SITE_NAME} logo`} className="h-10 w-10 rounded-lg object-cover" />
              <p className="text-lg font-semibold text-white">{SITE_NAME}</p>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Premium website and mobile app development partner for growing businesses.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Services</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Web Development</li>
              <li>App Development</li>
              <li>UI/UX Design</li>
              <li>E-commerce Solutions</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Company</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
              <Link to="/about" className="transition hover:text-white">
                About Us
              </Link>
              <Link to="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Contact</p>
            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <p>tothyo.inweb@gmail.com</p>
              <p>DCB Road, Tarajan, Jorhat, Assam 785001</p>
            </div>
            <button
              type="button"
              onClick={openDefaultWhatsAppChat}
              className="mt-4 inline-flex items-center rounded-lg border border-emerald-300/50 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
            >
              Chat on WhatsApp
            </button>
            <div className="mt-4 flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
