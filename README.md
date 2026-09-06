# My Daily Word

This is a small, offline-capable web app that shows a readable "daily word" and a decorative SVG illustration. What I added:

- index.html: responsive layout, accessible text, and registration for the service worker.
- css/style.css: simple readable styles and responsive layout.
- js/main.js: date-based daily word selection and previous/next controls.
- sw.js: improved service worker with versioned cache and offline fallback.
- manifest.json: basic PWA manifest using an SVG icon.
- assets/: an accessible SVG illustration and a simple icon.

Next steps you might want:
- Expand WORDS in js/main.js or wire to an API for more words/definitions.
- Add PNG icons for broader manifest compatibility.
- Improve visuals (fonts, images) or add localization.

To run: open index.html in a static server (or push to GitHub Pages). The app registers a service worker to cache assets so it works offline.
