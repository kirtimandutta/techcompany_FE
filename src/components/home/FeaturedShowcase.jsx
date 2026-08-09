import { motion } from "framer-motion";

const projects = [
  {
    name: "Khanij Organics",
    src: "/videos/khanij.mp4",
  },
  {
    name: "Biovik",
    src: "/videos/biovik.mp4",
  },
  {
    name: "Spacefy Interiors",
    src: "/videos/spacefy.mp4",
  },
];

export default function FeaturedShowcase() {
  return (
    <section className="border-b border-white/10 bg-slate-900/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Featured Client Showcase
          </h2>
          <p className="mt-4 text-slate-400">
            A look at recent builds brought to life for our clients.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_12px_42px_-30px_rgba(56,189,248,0.85)]"
            >
              <div className="border-b border-white/10 px-5 py-4">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {project.name}
                </h3>
              </div>
              <div className="bg-slate-950/60 p-3 sm:p-4">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full rounded-xl border border-white/10 bg-slate-950 object-cover"
                >
                  <source src={project.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
