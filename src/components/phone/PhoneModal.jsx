import { PhoneInterface } from "@/components/phone/PhoneInterface";

export function PhoneModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="iOS portfolio phone"
      onClick={onClose}
    >
      <div
        className="phone-ui-shell relative flex w-[390px] h-[790px] max-w-[430px] items-center justify-center overflow-auto rounded-[3rem] bg-black shadow-2xl ring-1 ring-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        <PhoneInterface />
      </div>
    </div>
  );
}
