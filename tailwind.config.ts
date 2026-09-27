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
          darkest: "#07080b",
          dark: "#0d0f17",
          card: "#121520",
          cardHover: "#181d2c",
          border: "#1e2436",
          borderLight: "#2e3752",
          blue: "#1b64f2",
          cyan: "#00c6ff",
          purple: "#7928ca",
          magenta: "#a855f7",
          amber: "#d97706",
          paper: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
