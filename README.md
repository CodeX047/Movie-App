# Movie Search App

A small, client-side Movie Search app that queries the OMDb API and displays movie details. It uses plain HTML, CSS and JavaScript and is optimized for a modern, responsive UI.

## See Live Demo
[Movie Search App](https://movie-search-app-codex047.netlify.app/)

## Features

- Search movies by title (OMDb API)
- Responsive, mobile-first UI with modern typography and color palette
- Poster, title, rating, year, genre and plot
- Lightweight: no build step or external frameworks
- Basic accessibility improvements (ARIA live regions, focus states)

## Project structure

- `index.html` — app markup and semantic sections
- `style.css` — modern responsive styles (variables, card/grid layout)
- `script.js` — logic for fetching and rendering movie data
- `config.js` — local configuration (API key and URL)
- `placeholder.jpg` _(optional)_ — used when a movie poster is missing

## Quick start

1. Clone or copy the project folder.
2. Create or update `config.js` in the project root with your OMDb API key.

Example `config.js` (do not commit your real key to public repos):

```javascript
// config.js
const config = {
  API_KEY: "your_omdb_api_key",
  API_URL: "https://www.omdbapi.com/",
};
```

3. Start a simple static server from the project root and open the site in a browser.

Using Python (macOS / zsh):

```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000

You can also open `index.html` directly in the browser for quick testing, but some browsers block fetches from file:// so a local server is recommended.

## How it works

- User enters a movie title and clicks "Get Info" (or presses Enter).
- `script.js` requests movie data from the OMDb endpoint specified in `config.js`.
- On success, the UI updates the poster, title, rating, year, genre, and description.
- If the poster is missing, a placeholder image is used.
- Loading and error states are shown with accessible `aria-live`/`role` hints.

## Accessibility

- Search input has `aria-label`.
- Results container and error messages use `aria-live` so assistive tech is informed of updates.
- Buttons have clear focus styles.

## Troubleshooting

- If nothing appears after searching, ensure `config.js` contains a valid OMDb API key.
- If fetch fails due to CORS or network, use the browser console to inspect the failing request.
- Add `placeholder.jpg` in the project root if you want a local fallback poster.
