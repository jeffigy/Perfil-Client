import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {},
  },
  darkMode: ["class", '[data-theme="night"]'],
  daisyui: {
    themes: ["winter", "night"],
  },
};
