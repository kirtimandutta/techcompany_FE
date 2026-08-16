import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Tothyo.IT helped us launch our SaaS dashboard with clean architecture and measurable growth outcomes.",
    name: "Faisal Rahman",
    role: "Founder, ScaleBridge",
  },
  {
    quote:
      "Their team combined UI clarity and engineering speed. Our web app now converts better across all devices.",
    name: "Nadia Karim",
    role: "Head of Product, LoopTech",
  },
  {
    quote:
      "From discovery to deployment, everything felt structured and premium. Support after launch has been excellent.",
    name: "Arman Hossain",
    role: "CEO, NovaCommerce",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-transparent py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Trusted by fast-moving teams</h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl border border-white/10 bg-slate-900/55 p-6 transition-shadow hover:shadow-[0_22px_44px_-30px_rgba(56,189,248,0.8)]"
            >
              <Quote className="h-7 w-7 text-cyan-300/80" aria-hidden />
              <p className="mt-4 text-slate-200">{item.quote}</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
