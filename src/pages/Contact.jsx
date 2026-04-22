import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "../components/SEO.jsx";
import { SITE_NAME } from "../constants/site.js";
import { openWhatsAppWithMessage } from "../lib/whatsapp.js";

const initial = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSuccess(null);
    setError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const message = `Hello, my name is ${form.name}. Email: ${form.email}. Phone: ${form.phone}. Message: ${form.message}`;
      setSuccess("Redirecting you to WhatsApp...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      const opened = openWhatsAppWithMessage(message);
      if (!opened) {
        throw new Error("Could not open WhatsApp. Please allow popups and try again.");
      }
      setForm(initial);
    } catch (err) {
      const msg = err.message || "Could not open WhatsApp. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${SITE_NAME} for a quote on website or mobile app development.`}
      />
      <div className="relative pb-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Let&apos;s build something great with {SITE_NAME}
              </h1>
              <p className="mt-4 text-lg text-slate-400">
                Tell us about your project — we&apos;ll respond within one business day.
              </p>
              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern workspace"
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-blue-500/0 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={onChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={onChange}
                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {success && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>{success}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    "Submit on WhatsApp"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
