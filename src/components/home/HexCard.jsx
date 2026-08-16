import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_TILT = { rotateX: 0, rotateY: 0 };

export default function HexCard({ title, image, index, hologram = false }) {
  const [tilt, setTilt] = useState(DEFAULT_TILT);
  const reduceMotion = useReducedMotion();

  const onMouseMove = (event) => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height - 0.5) * -6).toFixed(2);
    const rotateY = ((x / rect.width - 0.5) * 6).toFixed(2);

    setTilt({ rotateX: Number(rotateX), rotateY: Number(rotateY) });
  };

  const onMouseLeave = () => setTilt(DEFAULT_TILT);

  return (
    <motion.article
      whileHover={reduceMotion ? { scale: 1.015 } : { scale: 1.035 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`hex-shape group relative h-36 w-32 overflow-hidden border sm:h-40 sm:w-36 md:h-44 md:w-40 ${
        hologram
          ? "holo-card border-cyan-300/40 bg-slate-900"
          : "border-white/20 bg-slate-900"
      }`}
      style={{
        transformStyle: "preserve-3d",
        transform: reduceMotion
          ? "none"
          : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 520ms ease",
        boxShadow: hologram
          ? "0 0 0 1px rgba(103,232,249,0.35), 0 0 28px rgba(34,211,238,0.35), 0 14px 30px -18px rgba(59,130,246,0.45)"
          : "0 0 0 1px rgba(255,255,255,0.12), 0 14px 30px -18px rgba(59,130,246,0.45), 0 0 40px -24px rgba(56,189,248,0.65)",
        animationDelay: hologram ? `${index * 0.18}s` : undefined,
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        width={160}
        height={176}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-slate-950/70 transition duration-500 group-hover:bg-slate-950/60" />
      {hologram ? (
        <>
          <div className="holo-scan pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden />
          <div className="holo-flicker pointer-events-none absolute inset-0 bg-cyan-300/10 mix-blend-overlay" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.16) 48%, transparent 52%, transparent 100%)",
              backgroundSize: "100% 220%",
              animation: reduceMotion ? "none" : "holoSweep 5.5s ease-in-out infinite",
              animationDelay: `${index * 0.22}s`,
            }}
            aria-hidden
          />
        </>
      ) : null}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        <h3 className="text-xs font-semibold leading-tight text-white sm:text-sm">{title}</h3>
        <Link
          to="/services"
          className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 transition group-hover:text-cyan-200 sm:text-xs"
        >
          Learn More
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.article>
  );
}
