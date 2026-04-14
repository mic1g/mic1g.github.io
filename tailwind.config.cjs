/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#112031",
        slate: "#425466",
        mist: "#f3f6f8",
        sand: "#fffaf4",
        brand: "#0f766e",
        coral: "#e76f51",
        gold: "#e9c46a"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(17, 32, 49, 0.12)"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Public Sans'", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(15,118,110,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(231,111,81,0.18), transparent 30%)"
      }
    }
  },
  plugins: []
};
