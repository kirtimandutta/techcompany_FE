import { motion } from "framer-motion";
import HexCard from "./HexCard.jsx";

const categories = [
  {
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "App Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "E-commerce Solutions",
    image:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Startup MVP Development",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Maintenance & Support",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=80",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export default function HexGrid() {
  return (
    <section id="services-grid" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Core Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Conversion-focused solutions for every stage
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 justify-items-center gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((item, index) => (
            <div
              key={item.title}
              className={index >= 3 ? "lg:-mt-8" : ""}
            >
              <HexCard title={item.title} image={item.image} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
