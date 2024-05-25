import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "night", "winter"],
  },
};
