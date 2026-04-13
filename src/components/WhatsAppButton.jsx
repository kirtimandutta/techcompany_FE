import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/919287501722?text=Hello%2C%20I%20am%20interested%20in%20your%20services";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/35 transition duration-200 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 md:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
