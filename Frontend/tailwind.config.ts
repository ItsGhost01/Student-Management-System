export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        bebas: ["Bebas Neue", "cursive"],
        lato: ["Lato", "sans-serif"],
      },

      colors: {
        primary: "#2563EB",
        secondary: "#64748B",
        tertiary: "#0EA5E9",
        neutral: "#1E293B",
        danger: "#EF4444",
        dangerBg: "#FEF2F2",
      },
    },
  },
  plugins: [],
};