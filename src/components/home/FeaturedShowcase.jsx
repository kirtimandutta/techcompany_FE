import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";

export function VideoProjectCard({ project, index = 0 }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { amount: 0.45, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.5;

    if (inView) {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay can be blocked until muted playback is allowed.
        });
      }
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.08, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_12px_42px_-30px_rgba(56,189,248,0.85)]"
    >
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-white">{project.name}</h3>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              Visit
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-sm text-slate-400 transition hover:text-white"
          >
            {project.url.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
      </div>
      <div className="bg-slate-950 p-3 sm:p-4">
        <video
          ref={videoRef}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-xl border border-white/10 bg-slate-950 object-cover"
        >
          <source src={project.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.article>
  );
}

const featuredProjects = [
  {
    name: "Khanij Organics",
    src: "/videos/khanij.mp4",
    url: "https://www.khanijorganics.com",
  },
  {
    name: "Biovik",
    src: "/videos/biovik.mp4",
  },
];

export default function FeaturedShowcase() {
  return (
    <section className="border-b border-white/10 bg-transparent py-16 sm:py-20">
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
          {featuredProjects.map((project, index) => (
            <VideoProjectCard key={project.src} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
