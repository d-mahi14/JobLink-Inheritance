import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        linkedin: {
          primary: "#0A66C2",
          secondary: "#666666",
          accent: "#004182",
          neutral: "#000000",
          "base-100": "#ffffff",
          "base-200": "#F3F2EF",
          "base-300": "#e0e0e0",
          "base-content": "#000000",
          info: "#0A66C2",
          success: "#057642",
          warning: "#F5C400",
          error: "#cc1016",
        },
      },
    ],
  },
};
