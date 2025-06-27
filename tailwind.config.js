module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          overlay1: "var(--bg-overlay-1)",
          card: "var(--bg-card)",
          cardLight: "var(--bg-card-light)",
          cardOverlay: "var(--bg-card-overlay)",
          accent: "var(--bg-accent)",
          accentLight: "var(--bg-accent-light)",
          section: "var(--bg-section)",
          sectionOverlay: "var(--bg-section-overlay)",
          highlight: "var(--bg-highlight)",
          highlightLight: "var(--bg-highlight-light)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          accent: "var(--text-accent)"
        }
      }
    }
  },
  plugins: []
};