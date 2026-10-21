# Build notes (not published: Jekyll skips folders starting with "_")

`assets/css/site.css` is a minified Tailwind CSS v3.4.17 build. It replaces the
`cdn.tailwindcss.com` script and was checked pixel-for-pixel against it.

Rebuild after changing classes in `index.html`, `404.html` or `assets/js/site.js`:

    npx tailwindcss@3.4.17 -c _build/tailwind.config.js -i _build/input.css -o assets/css/site.css --minify

(run from the repo root). Keep the `<link>` to site.css *after* the inline `<style>` block in
`<head>`, which matches the original cascade order.
