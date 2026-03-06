import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f7f7",
          100: "#e6ecec",
          200: "#cfd8d8",
          300: "#aebcbc",
          400: "#7b8f8f",
          500: "#556b6b",
          600: "#3f5353",
          700: "#2d3c3c",
          800: "#1d2626",
          900: "#101616",
          950: "#070b0b",
        },
        neon: {
          50: "#ecfff4",
          100: "#d7ffe9",
          200: "#b0ffd4",
          300: "#75ffb5",
          400: "#2bff88",
          500: "#00f06f",
          600: "#00c659",
          700: "#009b46",
          800: "#007a38",
          900: "#036431",
          950: "#00381a",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,240,111,0.25), 0 12px 60px rgba(0,240,111,0.12)",
        soft: "0 12px 40px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "grid": "radial-gradient(circle at 1px 1px, rgba(0,240,111,0.22) 1px, transparent 0)",
        "noise": "url('/noise.png')",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-40%)" },
          "100%": { transform: "translateX(140%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
