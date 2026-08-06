import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F2A43", deep: "#0A1E31", soft: "#1B3A5A" },
        teal: { DEFAULT: "#2A9D8F", soft: "#E6F4F2" },
        amber: { DEFAULT: "#E9C46A", soft: "#FBF3DF" },
        coral: { DEFAULT: "#E76F51", soft: "#FCEAE4" },
        paper: "#FAF9F6",
      },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
export default config;
