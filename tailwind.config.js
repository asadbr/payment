/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    container: {
      center: true,
      margin: "15px",
      screens: {
        sm: "708px",
        md: "800px",
        lg: "1016px",
        xl: "1160px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(260deg, #e2c299 5.64%, #c5a67c 94.29%)",
      },
    },
  },
  plugins: [],
};
