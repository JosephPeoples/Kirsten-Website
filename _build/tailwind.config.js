// Tailwind v3.4.17 — same version the site previously loaded from cdn.tailwindcss.com.
// No custom theme: the CDN build used Tailwind's default config, so this reproduces it exactly.
module.exports = {
  content: ['./index.html', './404.html', './assets/js/**/*.js'],
  theme: { extend: {} },
  plugins: [],
};
