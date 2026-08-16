import SEO from "../components/SEO.jsx";
import { SITE_NAME } from "../constants/site.js";
import OurShowcase from "../components/home/OurShowcase.jsx";

export default function Showcase() {
  return (
    <>
      <SEO
        title="Our Showcase"
        description={`Browse selected client builds from ${SITE_NAME} — websites and digital products launched across industries.`}
      />
      <div className="relative isolate overflow-hidden pb-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-48 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative z-10">
          <OurShowcase />
        </div>
      </div>
    </>
  );
}
