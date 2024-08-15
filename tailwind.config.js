/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],    
  theme: {
    extend: {
      translate: {
        'full': '100%',
      },
      colors: {
        primary: "#6B50F6",
        "primary-50": "#faf5ff",
        "primary-700": "#533FBD",
        secondary: "#624ad8",
        third: "#BFB3FB",
        fourth: "#8114e6f6",
        night: {
          50: "#e4e4eb",
          100: "#bbbace",
          200: "#8f8ead",
          300: "#66658c",
          400: "#4b4777",
          500: "#323943",
          600: "#2b245b",
          700: "#241c51",
          800: "#1c1445",
          900: "#1C1F24",
        },
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
}

