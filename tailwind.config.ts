import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#080B14",
          surface: "#0D1117",
          card: "#111827",
          border: "#1F2937",
          cyan: "#00D4FF",
          "cyan-dim": "#0EA5E9",
          text: "#F9FAFB",
          muted: "#6B7280",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444"
        }
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(0, 212, 255, 0.25)",
        card: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      },
      backgroundImage: {
        "grid-faint": "radial-gradient(circle at 1px 1px, rgba(14,165,233,0.16) 1px, transparent 0)",
        "mesh-hero": "radial-gradient(circle at 12% 10%, rgba(0,212,255,0.18), transparent 28%), radial-gradient(circle at 88% 78%, rgba(14,165,233,0.16), transparent 26%), linear-gradient(180deg, #080B14 0%, #0A1222 55%, #080B14 100%)"
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        dash: "dashMove 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "rise-fade": "riseFade 0.55s ease-out forwards"
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(0,212,255,0.6)" }
        },
        dashMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100px 100px" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        riseFade: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;

