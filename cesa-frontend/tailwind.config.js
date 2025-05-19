/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ajuste conforme sua estrutura
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // se quiser adicionar o laranja também:
        laranja: "#FFA500",
      },
    },
  },
  plugins: [],
};
