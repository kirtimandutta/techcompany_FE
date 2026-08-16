import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { openDefaultWhatsAppChat } from "../../lib/whatsapp.js";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative z-20 flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-transparent">
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <motion.p
            custom={0.05}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-white/20 bg-slate-950/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 backdrop-blur-sm"
          >
            Premium Web & App Studio
          </motion.p>
          <motion.h1
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.85)] sm:text-5xl lg:text-6xl"
          >
            Building
            <br />
            <span className="text-cyan-300">DIGITAL EXPERIENCES</span>
            <br />
            That <span className="text-cyan-300">SCALE</span>
          </motion.h1>
          <motion.p
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-slate-100 drop-shadow-[0_2px_16px_rgba(2,6,23,0.9)] sm:text-xl"
          >
            Websites. Apps. Growth.
          </motion.p>
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={openDefaultWhatsAppChat}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openDefaultWhatsAppChat}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-500/30"
            >
              Chat on WhatsApp
            </button>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-slate-950/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-950/55"
            >
              View Services
            </Link>
          </motion.div>
      </div>

      <motion.a
        href="#services-grid"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-slate-200/80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="mt-1 h-6 w-6" />
      </motion.a>
    </section>
  );
}
