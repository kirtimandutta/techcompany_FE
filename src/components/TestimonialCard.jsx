import { Quote } from "lucide-react";

export default function TestimonialCard({ quote, name, role }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition hover:border-blue-500/25 hover:shadow-lg hover:shadow-blue-500/5">
      <Quote className="h-8 w-8 text-blue-500/60" aria-hidden />
      <p className="mt-4 flex-1 text-slate-300">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </article>
  );
}
