import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
        opacity: "opacity",
      },
    },
  },
  darkMode: ["class", '[data-theme="night"]'],
  daisyui: {
    themes: ["winter", "night"],
  },
};
