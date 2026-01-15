import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // ← IMPORTANT if you use src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
