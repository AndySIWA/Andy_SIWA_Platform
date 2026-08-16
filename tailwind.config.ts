import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0b0f19",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
        },
        cyan: {
          DEFAULT: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.4)",
        },
        purple: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.4)",
        },
        blue: {
          DEFAULT: "#3b82f6",
        },
        amber: {
          DEFAULT: "#f59e0b",
        },
        emerald: {
          DEFAULT: "#10b981",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"],
        tech: ["var(--font-rajdhani)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 240, 255, 0.35)",
        "neon-purple": "0 0 20px rgba(139, 92, 246, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
export default config;
