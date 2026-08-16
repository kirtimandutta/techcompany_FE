import { motion } from "framer-motion";
import { VideoProjectCard } from "./FeaturedShowcase.jsx";

const showcaseProjects = [
  {
    name: "Showcase I",
    src: "/videos/spacefy.mp4",
    url: "https://kirtimandutta.github.io/interiordesign/",
  },
  {
    name: "Showcase II",
    src: "/videos/sunrise-label.mp4",
    url: "https://kirtimandutta.github.io/shirttag/",
  },
  {
    name: "Showcase III",
    src: "/videos/angad.mp4",
    url: "https://kirtimandutta.github.io/frozenfoods/",
  },
  {
    name: "Showcase IV",
    src: "/videos/showcase-1.mp4",
    url: "https://kirtimandutta.github.io/k9electrical-/",
  },
  {
    name: "Showcase V",
    src: "/videos/showcase-2.mp4",
    url: "https://kirtimandutta.github.io/skincare/",
  },
  {
    name: "Showcase VI",
    src: "/videos/ortha.mp4",
    url: "https://kirtimandutta.github.io/orthopedicslippers/",
  },
];

export default function OurShowcase() {
  return (
    <section
      id="showcase"
      className="scroll-mt-24 border-b border-white/10 bg-transparent py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Our Work
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">OUR SHOWCASE</h2>
          <p className="mt-4 text-slate-400">
            Selected builds from recent client launches across industries.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseProjects.map((project, index) => (
            <VideoProjectCard key={project.src} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
