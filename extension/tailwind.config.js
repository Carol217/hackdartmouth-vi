module.exports = {
  purge: {
    enabled: true,
    content: ["*.html"],
  },
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#F8F8FF",
          150: "#EBEBF2",
          200: "#DEDEE4",
          250: "#D1D1D6",
          300: "#C3C3C8",
          350: "#B6B6BB",
          400: "#A8A8AD",
          450: "#9B9B9F",
          500: "#8D8D91",
          550: "#808084",
          600: "#737376",
          650: "#666668",
          700: "#58585A",
          750: "#4B4B4C",
          800: "#3D3D3E",
          850: "#303030",
          900: "#222222",
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
