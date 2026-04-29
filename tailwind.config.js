/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cream: "#F5F0E6",
        coffee: "#3D2C1D",
        rose: "#C45C6A",
        "pink-soft": "#E8A0B0",
        "pink-deep": "#D4607A",
        polaroid: "#FAFAF5",
        envelope: "#E8D5C0",
        "envelope-dark": "#C9A87C",
        "gray-no": "#9E9E9E",
        "gray-dark": "#6B6B6B",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        handwritten: ["Caveat", "cursive"],
        ui: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        polaroid: "0 12px 32px rgba(0,0,0,0.15)",
        "glow-soft": "0 0 20px rgba(228,160,176,0.4)",
        "glow-strong": "0 0 40px rgba(228,160,176,0.6)",
        "glow-golden": "0 0 60px rgba(228,160,176,0.8), 0 0 120px rgba(228,160,176,0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(1.35)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(-3px)" },
          "50%": { transform: "translateX(3px)" },
        },
        "sparkle-float": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "50%": { opacity: "1", transform: "translateY(-20px) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(0.5)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(228, 160, 176, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(228, 160, 176, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "heartbeat": "heartbeat 1.2s infinite ease-in-out",
        "gentle-bounce": "gentle-bounce 1s infinite ease-in-out",
        "shake": "shake 0.1s infinite linear",
        "sparkle-float": "sparkle-float 1.5s infinite ease-in-out",
        "glow-pulse": "glow-pulse 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}