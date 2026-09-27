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
          bg: "#F8F9FB",
          surface: "#FFFFFF",
          surfaceMuted: "#F1F5F9",
          border: "#E2E8F0",
          borderStrong: "#CBD5E1",
          primary: "#0F172A",
          secondary: "#334155",
          muted: "#64748B",
          blue: "#1E40AF",
          blueLight: "#3B82F6",
          purple: "#6B21A8",
          amber: "#B45309",
          emerald: "#047857",
          rose: "#BE123C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        float: "0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        glow: "0 0 25px -5px rgba(30, 64, 175, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
