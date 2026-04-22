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
      className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/35 transition duration-200 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/50 sm:h-14 sm:w-14"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366]/80 animate-[ping_1.8s_ease-in-out_infinite]" />
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-100 shadow-xl md:block">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
