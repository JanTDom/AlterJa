import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        alterja: {
          bg: "#F9F9FB",
          surface: "#FFFFFF",
          surfaceMuted: "#F2F4F7",
          border: "#E4E7EC",
          borderStrong: "#D0D5DD",
          primary: "#0F1728",
          secondary: "#344054",
          muted: "#667085",
          blue: "#1849A9",
          blueLight: "#2970FF",
          purple: "#6941C6",
          amber: "#B54708",
          emerald: "#027A48",
          rose: "#B42318",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Newsreader", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "atelier-sm": "0 1px 2px -1px rgba(16, 24, 40, 0.05), 0 1px 3px 0 rgba(16, 24, 40, 0.05)",
        "atelier-card": "0 2px 4px -2px rgba(16, 24, 40, 0.06), 0 6px 12px -2px rgba(16, 24, 40, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
        "atelier-float": "0 4px 6px -2px rgba(16, 24, 40, 0.05), 0 12px 28px -4px rgba(16, 24, 40, 0.08), 0 24px 48px -8px rgba(16, 24, 40, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 1)",
        "atelier-glow": "0 0 40px -10px rgba(24, 73, 169, 0.18)",
        "atelier-inset": "inset 0 2px 4px 0 rgba(16, 24, 40, 0.05)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
        widest: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
