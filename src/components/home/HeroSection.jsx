import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

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
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <motion.div
        aria-hidden
        className="hero-gradient absolute inset-0 z-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.28),transparent_35%),radial-gradient(circle_at_50%_95%,rgba(14,165,233,0.22),transparent_40%)]" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-panel max-w-4xl rounded-3xl border border-white/20 p-8 shadow-[0_24px_64px_-36px_rgba(37,99,235,0.65)] md:p-12">
          <motion.p
            custom={0.05}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
          >
            Premium Web & App Studio
          </motion.p>
          <motion.h1
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Building Digital Experiences That Scale
          </motion.h1>
          <motion.p
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-slate-200/90 sm:text-xl"
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
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              View Services
            </Link>
          </motion.div>
        </div>
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
