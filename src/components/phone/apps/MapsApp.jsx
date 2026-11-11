import { ChevronLeft, ExternalLink, MapPinned } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

export function MapsApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    locationName = t.profile.location,
    embedUrl =
      "https://www.openstreetmap.org/export/embed.html?bbox=139.50%2C35.39%2C139.75%2C35.58&layer=mapnik&marker=35.4437%2C139.6380",
    externalUrl =
      "https://www.openstreetmap.org/?mlat=35.4437&mlon=139.6380#map=12/35.4437/139.6380",
    handleClose = () => {
      onStartClose == null || onStartClose();
      setTimeout(onClose, 300);
    };
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-[#f2f2f7] text-[#1c1c1e]"
      style={{
        animation: "mapAppIn 300ms ease-out",
      }}
    >
      <style>{`
        @keyframes mapAppIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <header
        className="flex items-center justify-between border-b border-black/10 bg-white/90 px-4 pb-3 pt-12 backdrop-blur-xl"
        style={{
          borderRadius: "3rem 3rem 0 0",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-1 text-[#007aff]"
          aria-label={t.common.back}
        >
          <ChevronLeft size={24} />
          <span className="text-[17px]">{t.common.back}</span>
        </button>
        <h1 className="text-[17px] font-semibold">{t.apps.map}</h1>
        <div className="w-16" />
      </header>
      <main className="flex-1 overflow-y-auto pb-8">
        <div className="relative h-[310px] overflow-hidden bg-[#dce9e4]">
          <iframe
            title={`Map showing ${locationName}`}
            src={embedUrl}
            className="h-full w-full border-0"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#007aff] text-white">
              <MapPinned size={21} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-[#8e8e93]">
                {t.map.current}
              </p>
              <p className="truncate text-[15px] font-semibold">{locationName}</p>
            </div>
          </div>
        </div>
        <section className="mx-4 mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-black/5 px-4 py-4">
            <MapPinned className="text-[#007aff]" size={24} />
            <div>
              <p className="text-xs text-[#8e8e93]">{t.map.portfolio}</p>
              <p className="text-[16px] font-medium">{locationName}</p>
            </div>
          </div>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-4 text-[15px] text-[#007aff]"
          >
            <span>{t.map.open}</span>
            <ExternalLink size={17} />
          </a>
        </section>
      </main>
    </div>
  );
}
