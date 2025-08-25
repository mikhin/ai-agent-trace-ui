/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    // Include the workspace package to scan for Tailwind classes
    "../ai-agent-trace-ui-core/src/**/*.{js,ts,jsx,tsx}",
    // Also scan node_modules in case the package is built
    "./node_modules/ai-agent-trace-ui-core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
