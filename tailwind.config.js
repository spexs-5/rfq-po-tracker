export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tabs: {
          bg: "#1F2130",
          text: "#FFFFFF",
        },
        widget: {
          border: "#242424",
          bg: "#4C4C4C",
          text: "#FFFFFF",
        },
        progress: {
          green: "#199B42",
          yellow: "#F7C11D",
          orange: "#F58717",
          red: "#F53F1B",
          empty: "#363636",
        },
        button: {
          edit: "#007AFF",
          cancel: "#D948DC",
          delete: "#FF3B30",
        },
      },
    },
  },
  plugins: [],
}