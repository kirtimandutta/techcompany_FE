import { lazy, Suspense } from "react";
import SEO from "../components/SEO.jsx";
import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection.jsx";
import HexGrid from "../components/home/HexGrid.jsx";
import StatsSection from "../components/home/StatsSection.jsx";
import FeaturedShowcase from "../components/home/FeaturedShowcase.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import CTASection from "../components/home/CTASection.jsx";

const SpaceshipHero = lazy(() => import("../components/home/SpaceshipHero.jsx"));

export default function Home() {
  return (
    <div className="relative isolate">
      <SEO title="Website & App Development" />
      <Suspense fallback={null}>
        <SpaceshipHero />
      </Suspense>
      <HeroSection />
      <div className="relative z-20">
        <HexGrid />
        <FeaturedShowcase />
        <StatsSection />

        <section className="relative overflow-hidden border-y border-white/10 bg-transparent py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Helping businesses scale through impactful digital products
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-slate-200">
              We partner with startups and established teams to design, build, and optimize
              high-performing websites and mobile apps that turn traffic into growth and ideas into
              sustainable products.
            </p>
          </motion.div>
        </section>

        <Testimonials />
        <CTASection />
      </div>
    </div>
  );
}
