/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#6161f5",
      black: "#1d1d1f",
      fullBlack: "#000",
      lightBlack: "#2f2f30",
      white: "#ffffff",
      greyText: "#545454",
      borderGrey: "rgba(84, 84, 84, 0.7)",
      googleColor: "#4285F4",
      lightGrey: "#777777",
      errorRed: "#FF9A98",
      orange: "#EF663C",
      sketch: {
        primary: "#6161f5",
        orange: "#EF663C",
        skyBlue: "#0066ff",
        pink: "#ffc300",
        yellow: "#16db65",
        green: "#bb2649",
      },
    },
    fontFamily: {
      dsp: ["var(--font-neue-montreal)"],
      blog: ["var(--font-writer)"],
      eiko: ["var(--font-eiko)"],
      editorial: ["var(--font-editorial-new)"],
      denton: ["var(--font-denton)"],
    },
    borderWidth: {
      DEFAULT: "0.5px",
    },
  },
};
