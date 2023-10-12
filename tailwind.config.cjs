/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'primary': 'rgba(0, 0, 0, 0.08) 0px 2px 4px 0px, rgba(0, 0, 0, 0.08) 0px 0px 2px 1px',
        'secondary': 'rgba(0, 0, 0, 0.16) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 2px 1px'
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}
