/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#2E7D32",
          hover: "#43A047",
        },
        secondary: {
          DEFAULT: "#2E7D32",
          light: "#388E3C",
          dark: "#1B5E20",
        },
        accent: {
          DEFAULT: "#C0E218",
          light: "#D4E157",
          dark: "#AFB42B",
        },
        background: {
          DEFAULT: "#F1F8E9",
          card: "#FFFFFF",
          dark: "#E8F5E9",
        },
        text: {
          primary: "#212121",
          secondary: "#757575",
          light: "#FAFAFA",
        },
        error: "#D32F2F",
        warning: "#FFA000",
        success: "#388E3C",
        info: "#1976D2",
        bold: "#1B5E20",
        // Warna untuk kategori makanan
        spicy: "#FF5252",
        sweet: "#FF4081",
        savory: "#8D6E63",
        healthy: "#66BB6A",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        button: "0 2px 4px rgba(76, 175, 80, 0.2)",
        hover: "0 6px 12px rgba(46, 125, 50, 0.15)",
      },
      borderRadius: {
        card: "0.75rem",
        button: "0.5rem",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Open Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
