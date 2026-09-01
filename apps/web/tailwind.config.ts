import type { Config } from "tailwindcss";

// Bycrypt design system — deep-navy trading surface, white app chrome,
// a single yellow accent.
//
// How the three brand colours divide the work, which is what keeps them
// from fighting each other:
//
//   Blue    carries everything structural — page, cards, inputs, borders.
//           Four steps of elevation, all the same hue, so panels separate
//           by lightness rather than by outline.
//   White   is the app chrome (header) and primary text. It frames the
//           blue rather than competing with it.
//   Yellow  is reserved for action. Primary buttons and the brand mark,
//           nothing else — an accent used everywhere stops reading as an
//           accent at all.
//
// Green and red survive untouched as market semantics: in trading they
// mean up and down, and restyling them to fit a palette would cost
// comprehension for decoration.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // elevation ladder — one hue, four lightnesses
        base: "#071429",
        surface: "#0C1E3A",
        "surface-2": "#12294B",
        "surface-3": "#1A3660",
        // legacy aliases so existing screens keep compiling
        panel: "#0C1E3A",
        "panel-2": "#12294B",
        // lines
        border: "#1B3355",
        "border-strong": "#2A4A7A",
        // accent — action only
        brand: "#FFC93C",
        "brand-hover": "#FFD966",
        // A yellow-tinted panel on navy turns olive, so tinted callouts
        // stay in the blue family and take their accent from the border
        // and text instead.
        "brand-dim": "#15294A",
        // market semantics
        positive: "#16C784",
        "positive-dim": "#0C2E3A",
        negative: "#F6465D",
        "negative-dim": "#2B1836",
        info: "#5AC8FA",
        "info-dim": "#0E2A44",
        // text
        "text-primary": "#FFFFFF",
        "text-secondary": "#A8BEDD",
        "text-tertiary": "#6C87B0",
        // text on a bright fill — navy rather than black, so it belongs
        // to the palette. Named ink because `base` would collide with
        // Tailwind's text-base font-size utility.
        ink: "#071429",
        // white app chrome
        header: "#FFFFFF",
        "header-2": "#F2F5FA",
        "header-3": "#E6ECF5",
        "header-border": "#DCE4F0",
        "header-text": "#0B1E3A",
        "header-muted": "#5B7194",
        "header-dark": "#0C1E3A"
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem"
      },
      boxShadow: {
        btn: "inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 2px rgba(0,0,0,0.45)",
        "btn-brand": "inset 0 1px 0 rgba(255,255,255,0.34), 0 4px 14px rgba(255,201,60,0.24)",
        "btn-positive": "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(22,199,132,0.22)",
        "btn-negative": "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(246,70,93,0.22)",
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.65)",
        lift: "0 12px 32px -12px rgba(0,0,0,0.8)"
      }
    }
  },
  plugins: []
};

export default config;
