import { SupportIcon } from "./icons";

export function TelegramButton({
  url,
  variant = "icon",
  label = "Chat with Bycrypt Support"
}: {
  url: string;
  variant?: "icon" | "full";
  label?: string;
}) {
  if (variant === "icon") {
    // Header variant: solid dark chip on the white bar so it reads as a
    // real button, with the label kept for anything wider than a phone.
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with Bycrypt Support on Telegram"
        aria-label="Bycrypt Support on Telegram"
        className="flex h-10 items-center gap-1.5 rounded-xl border border-header-dark bg-header-dark px-3 text-[13px] font-bold text-white shadow-sm transition-all duration-150 hover:bg-[#16305C] active:translate-y-px active:shadow-none"
      >
        <SupportIcon className="h-[18px] w-[18px]" />
        <span className="hidden sm:inline">Support</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-[#2568C4] bg-gradient-to-b from-[#4A97F2] to-[#2F80ED] px-4 py-2.5 text-sm font-bold text-white shadow-btn transition-all duration-150 hover:from-[#5FA6F5] hover:to-[#3A88F0] active:translate-y-px active:shadow-none"
    >
      <SupportIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
