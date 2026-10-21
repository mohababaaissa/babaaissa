import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a6f6",
          500: "#0c87eb",
          600: "#0269c7",
          700: "#0354a1",
          800: "#074885",
          900: "#0c3d6e",
          950: "#072445", // Deep Navy Blue
        },
        navy: {
          800: "#0f233a",
          900: "#0a192f",
          950: "#06101e",
        },
        green: {
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        accent: {
          DEFAULT: "#10b981",
          hover: "#059669",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
