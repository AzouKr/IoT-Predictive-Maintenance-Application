/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "new-gray": "#f1f1f1",
      },
    },
  },
  plugins: [require("daisyui")],
};
