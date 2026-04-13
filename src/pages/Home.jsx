import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Zap,
  Shield,
  LineChart,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";

const testimonials = [
  {
    quote:
      "CodeNova shipped our product dashboard ahead of schedule. Communication was clear and the codebase is maintainable.",
    name: "Alex Rivera",
    role: "CTO, Northwind Labs",
  },
  {
    quote:
      "Our e-commerce launch was smooth — performance and SEO were priorities from day one. Highly recommend.",
    name: "Priya Sharma",
    role: "Founder, Bloom & Co.",
  },
  {
    quote:
      "They turned our mobile idea into a polished cross-platform app. Design and engineering felt like one team.",
    name: "Jordan Lee",
    role: "Product Lead, Orbit Health",
  },
];

const highlights = [
  {
    title: "Website Development",
    desc: "Fast, accessible sites and web apps tailored to your business goals.",
    Icon: Globe,
  },
  {
    title: "Mobile App Development",
    desc: "Native-quality Android, iOS, and cross-platform experiences.",
    Icon: Smartphone,
  },
];

const features = [
  { title: "Performance-first", desc: "Core Web Vitals and real-world speed.", Icon: Zap },
  { title: "Secure by design", desc: "Sensible defaults and reviewable patterns.", Icon: Shield },
  { title: "Measurable outcomes", desc: "Analytics-ready implementations.", Icon: LineChart },
];

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[length:40px_40px] bg-grid-pattern opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-slate-950" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:pt-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300">
                CodeNova Technologies
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                We Build Scalable{" "}
                <span className="text-gradient">Websites & Apps</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-400">
                From marketing sites to production mobile apps — we ship modern stacks, clear
                architecture, and interfaces your users will love.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore services
                </Link>
              </div>
            </div>
            <div className="animate-slide-up relative lg:justify-self-end">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-2xl shadow-blue-500/10">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
                  alt="Abstract technology visualization"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-purple-600/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-900/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">What we deliver</h2>
            <p className="mt-3 text-slate-400">
              Two core pillars — engineered for growth, maintainability, and speed.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {highlights.map(({ title, desc, Icon }, i) => (
              <div
                key={title}
                className="card-glow group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950 p-8 transition hover:border-blue-500/30"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {features.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-purple-500/30"
              >
                <Icon className="h-8 w-8 text-purple-400" />
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-gradient-to-b from-slate-950 to-slate-900/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Trusted by teams</h2>
            <p className="mt-3 text-slate-400">What our clients say about working with CodeNova.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
