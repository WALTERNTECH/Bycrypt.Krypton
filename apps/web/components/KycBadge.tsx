import Link from "next/link";
import { ShieldCheckIcon, ClockIcon, AlertIcon, ShieldIcon } from "./icons";

// Sits on the white header, so every state is tuned for a light surface.
// The states that need action are filled and high-contrast; "Verified"
// is a calm confirmation rather than another competing CTA.
const STYLES: Record<string, string> = {
  approved: "border-positive/30 bg-positive/10 text-[#0E7A55] shadow-sm",
  pending: "border-[#D9A521]/30 bg-brand/10 text-[#8A6A12] shadow-sm",
  rejected:
    "border-[#C9384B] bg-gradient-to-b from-[#FF5D72] to-negative text-white shadow-btn-negative hover:from-[#FF7285] hover:to-[#F85068]",
  unverified:
    "border-[#D9A521] bg-gradient-to-b from-brand-hover to-brand text-ink shadow-btn-brand hover:from-[#FFE08A] hover:to-[#FFC020]"
};

const LABELS: Record<string, string> = {
  approved: "Verified",
  pending: "In review",
  rejected: "Resubmit",
  unverified: "Verify"
};

const ICONS: Record<string, typeof ShieldIcon> = {
  approved: ShieldCheckIcon,
  pending: ClockIcon,
  rejected: AlertIcon,
  unverified: ShieldIcon
};

export function KycBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? STYLES.unverified;
  const label = LABELS[status] ?? LABELS.unverified;
  const Icon = ICONS[status] ?? ShieldIcon;

  return (
    <Link
      href="/kyc"
      aria-label="Identity verification status"
      className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[13px] font-bold transition-all duration-150 active:translate-y-px active:shadow-none ${style}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
