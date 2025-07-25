/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // TODO: HACK. Need to be solved properly
    "../core/src/**/*.{js,ts,jsx,tsx}",
  ],
};
