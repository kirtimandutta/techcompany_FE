import {
  LayoutTemplate,
  ShoppingCart,
  Boxes,
  Smartphone,
  Apple,
  Layers,
  MessageCircle,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import { openDefaultWhatsAppChat } from "../lib/whatsapp.js";

const web = [
  {
    title: "Business websites",
    desc: "Brand-forward marketing sites with CMS-friendly structure and great SEO.",
    Icon: LayoutTemplate,
  },
  {
    title: "E-commerce websites",
    desc: "Checkout flows, catalog UX, and integrations that scale with your catalog.",
    Icon: ShoppingCart,
  },
  {
    title: "Custom web apps",
    desc: "Dashboards, portals, and internal tools with role-based access and APIs.",
    Icon: Boxes,
  },
];

const mobile = [
  {
    title: "Android apps",
    desc: "Material Design polish with performance tuned for diverse devices.",
    Icon: Smartphone,
  },
  {
    title: "iOS apps",
    desc: "SwiftUI-ready patterns and App Store–ready release workflows.",
    Icon: Apple,
  },
  {
    title: "Cross-platform apps",
    desc: "One codebase for faster iteration without sacrificing native feel.",
    Icon: Layers,
  },
];

function ServiceCard({ title, desc, Icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-300 transition group-hover:scale-105">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Website development and mobile app development services — business sites, e-commerce, custom web apps, Android, iOS, and cross-platform."
      />
      <div className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Services</h1>
            <p className="mt-4 text-lg text-slate-400">
              End-to-end delivery across web and mobile — from discovery to launch and beyond.
            </p>
            <button
              type="button"
              onClick={openDefaultWhatsAppChat}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </button>
          </div>

          <div className="mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Website Development
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {web.map((item) => (
                <ServiceCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              App Development
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {mobile.map((item) => (
                <ServiceCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
