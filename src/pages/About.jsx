import { Target, Eye } from "lucide-react";
import SEO from "../components/SEO.jsx";

const team = [
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marcus Webb",
    role: "Product Design",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Elena Vasquez",
    role: "Mobile Lead",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Okonkwo",
    role: "DevOps & Cloud",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about CodeNova Technologies — our mission, vision, and the team behind scalable websites and mobile apps."
      />
      <div className="relative pb-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">About Us</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                CodeNova Technologies is a product-minded engineering partner. We combine thoughtful
                UX, solid architecture, and pragmatic delivery so your roadmap stays predictable —
                whether you are launching a new brand site or shipping a mobile app to market.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                Our teams work in tight feedback loops with stakeholders, focusing on outcomes: user
                satisfaction, performance, and maintainability for the long term.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Team collaborating in a modern office"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">Mission</h2>
              <p className="mt-3 text-slate-400">
                Empower businesses with reliable digital products — shipped with clarity,
                transparency, and technical excellence.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">Vision</h2>
              <p className="mt-3 text-slate-400">
                A future where every team can ship world-class web and mobile experiences without
                compromising on quality or velocity.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white">Meet the team</h2>
            <p className="mt-2 text-slate-400">The people behind your builds.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition hover:border-blue-500/30"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
