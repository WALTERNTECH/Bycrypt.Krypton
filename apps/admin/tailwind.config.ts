import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#071429",
        surface: "#0C1E3A",
        "surface-2": "#12294B",
        "surface-3": "#1A3660",
        // legacy aliases so existing admin screens keep compiling
        panel: "#0C1E3A",
        "panel-2": "#12294B",
        border: "#1B3355",
        "border-strong": "#2A4A7A",
        brand: "#FFC93C",
        "brand-hover": "#FFD966",
        positive: "#16C784",
        negative: "#F6465D",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A8BEDD",
        "text-tertiary": "#6C87B0",
        // text on a bright fill — deliberately NOT named "base", which
        // collides with Tailwind's text-base font-size utility
        ink: "#071429"
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        btn: "inset 0 1px 0 rgba(255,255,255,0.16), 0 1px 2px rgba(0,0,0,0.4)",
        "btn-brand": "inset 0 1px 0 rgba(255,255,255,0.28), 0 4px 14px rgba(240,185,11,0.22)",
        card: "0 1px 2px rgba(0,0,0,0.35), 0 8px 24px -12px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};

export default config;
