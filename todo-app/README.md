# Todo App

A small, self-contained TODO application built with plain HTML, CSS, and vanilla
JavaScript. No build step and no dependencies.

## Features

- Add a todo
- Mark a todo complete or incomplete
- Delete a todo
- Todos persist across page reloads via `localStorage`

## Running it

Just open `index.html` in any modern web browser:

- Double-click `index.html`, or
- From this folder, run a simple static server if you prefer, e.g.
  `python3 -m http.server` and visit the printed URL.

## Accessibility notes

- Semantic HTML (`main`, `section`, `h1`/`h2`, `ul`/`li`, `form`).
- The text input has an associated `<label>` and a descriptive hint.
- Each todo uses a real checkbox tied to its label; delete buttons have
  descriptive `aria-label`s.
- A `role="status"` live region announces adds, completions, and deletions.

## Files

- `index.html` — markup and structure
- `style.css` — styling
- `app.js` — application logic and `localStorage` persistence
