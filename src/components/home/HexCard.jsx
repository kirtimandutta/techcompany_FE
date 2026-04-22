import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_TILT = { rotateX: 0, rotateY: 0 };

export default function HexCard({ title, image, index }) {
  const [tilt, setTilt] = useState(DEFAULT_TILT);
  const reduceMotion = useReducedMotion();

  const onMouseMove = (event) => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height - 0.5) * -10).toFixed(2);
    const rotateY = ((x / rect.width - 0.5) * 10).toFixed(2);

    setTilt({ rotateX: Number(rotateX), rotateY: Number(rotateY) });
  };

  const onMouseLeave = () => setTilt(DEFAULT_TILT);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={reduceMotion ? { scale: 1.02 } : { scale: 1.05 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="hex-shape group relative h-48 w-44 overflow-hidden border border-white/20 bg-slate-900 md:h-56 md:w-52"
      style={{
        transformStyle: "preserve-3d",
        transform: reduceMotion
          ? "none"
          : `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 380ms ease, box-shadow 380ms ease",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.12), 0 14px 30px -18px rgba(59,130,246,0.45), 0 0 40px -24px rgba(56,189,248,0.65)",
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-950/60 to-slate-950/95 transition group-hover:from-slate-900/20" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-center">
        <h3 className="text-sm font-semibold leading-tight text-white md:text-base">{title}</h3>
        <Link
          to="/services"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 transition group-hover:text-cyan-200"
        >
          Learn More
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}
