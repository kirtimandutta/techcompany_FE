import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Inbox } from "lucide-react";
import { api } from "../lib/api.js";
import SEO from "../components/SEO.jsx";

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/admin/contacts");
      setItems(data.items || []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Failed to load.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <SEO title="Admin — Messages" description="Submitted contact messages (development view)." />
      <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
            <button
              type="button"
              onClick={load}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
          <h1 className="mt-8 text-3xl font-bold text-white">Contact messages</h1>
          <p className="mt-2 text-slate-400">
            Simple admin view for submitted forms. Secure this route in production (auth, IP allowlist,
            or private network).
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {loading && !items.length ? (
            <p className="mt-10 text-slate-500">Loading…</p>
          ) : !items.length ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-16 text-slate-500">
              <Inbox className="h-12 w-12 opacity-50" />
              <p className="mt-4">No messages yet.</p>
            </div>
          ) : (
            <ul className="mt-8 space-y-4">
              {items.map((m) => (
                <li
                  key={m._id}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-blue-500/20"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-white">{m.name}</p>
                    <time className="text-xs text-slate-500" dateTime={m.createdAt}>
                      {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-blue-300">{m.email}</p>
                  <p className="text-sm text-slate-400">{m.phone}</p>
                  <p className="mt-4 whitespace-pre-wrap text-slate-300">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
