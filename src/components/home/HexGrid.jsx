import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import HexCard from "./HexCard.jsx";

const categories = [
  {
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "App Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "E-commerce Solutions",
    image:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Startup MVP Development",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Maintenance & Support",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=60",
  },
];

// Converge every card to one belly-origin above the grid center, then project outward.
const bellySpawn = [
  { x: 120, y: -48, rotate: -8 },
  { x: 0, y: -28, rotate: 0 },
  { x: -120, y: -48, rotate: 8 },
  { x: 120, y: -130, rotate: -6 },
  { x: 0, y: -145, rotate: 0 },
  { x: -120, y: -130, rotate: 6 },
];

const smoothEase = [0.22, 1, 0.36, 1];
const retractEase = [0.4, 0, 0.2, 1];

export default function HexGrid() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.35, margin: "0px 0px -10% 0px" });

  return (
    <section
      id="services-grid"
      ref={sectionRef}
      className="relative overflow-hidden pb-20 pt-6 sm:pb-24 sm:pt-8"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 8 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Core Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Conversion-focused solutions for every stage
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-6 max-w-xl sm:mt-8 sm:max-w-2xl">
          {/* Projector under the spaceship belly — outer wrapper keeps centering stable */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-28 w-full -translate-x-1/2 -translate-y-[75%]">
            <motion.div
              className="relative h-full w-full"
              animate={
                isInView
                  ? { opacity: 1, scaleY: 1 }
                  : { opacity: 0.15, scaleY: 0.35 }
              }
              transition={{ duration: 0.7, ease: smoothEase }}
              style={{ transformOrigin: "top center" }}
            >
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_24px_8px_rgba(103,232,249,0.85)]" />
              <div className="holo-belly-beam absolute left-1/2 top-1 h-44 w-[min(520px,92%)] -translate-x-1/2" />
              <div className="absolute left-1/2 top-0 h-28 w-52 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-2xl" />
            </motion.div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[40rem] flex-wrap justify-center gap-x-3 gap-y-3 sm:max-w-[44rem] sm:gap-x-4 sm:gap-y-4">
            {categories.map((item, index) => {
              const spawn = bellySpawn[index] || { x: 0, y: -120, rotate: 0 };
              const hiddenState = reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    x: spawn.x,
                    y: spawn.y,
                    scale: 0.2,
                    rotate: spawn.rotate,
                    filter: "blur(6px) brightness(1.35)",
                  };
              const shownState = reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px) brightness(1)",
                  };

              return (
                <motion.div
                  key={item.title}
                  initial={hiddenState}
                  animate={isInView ? shownState : hiddenState}
                  transition={
                    reduceMotion
                      ? { duration: 0.25 }
                      : isInView
                        ? {
                            duration: 1.25,
                            delay: 0.08 + index * 0.1,
                            ease: smoothEase,
                          }
                        : {
                            duration: 0.85,
                            delay: (5 - index) * 0.07,
                            ease: retractEase,
                          }
                  }
                  className={`relative ${index >= 3 ? "sm:-mt-2" : ""}`}
                  style={{ transformOrigin: "center top", willChange: "transform, opacity, filter" }}
                >
                  <HexCard title={item.title} image={item.image} index={index} hologram />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
