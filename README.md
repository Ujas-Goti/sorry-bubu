# sorry-bubu 💗

A one-page, bubu & dudu themed apology + love letter website with heavy scroll-driven animations, built for mobile.

## Live site

**https://ujas-goti.github.io/sorry-bubu/**

## Run it locally

It's a static site — no build step. Either:

- Double-click `index.html`, or
- Serve it locally:

```powershell
python -m http.server 8000
```

then open http://localhost:8000 on your phone (same Wi-Fi: use your PC's local IP).

## Stack

- Plain HTML/CSS/JS
- [GSAP 3 + ScrollTrigger](https://gsap.com/) via CDN for scroll animations

## Structure

- `index.html` — all sections of the story
- `styles.css` — bubu/dudu pastel theme
- `script.js` — scroll animations, pinned scenes, envelope reveal, heart burst
- `assets/photos/` — your photos
