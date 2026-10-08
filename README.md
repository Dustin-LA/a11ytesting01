# a11ytesting01

A simple, dependency-free Todo application built with plain HTML, CSS, and JavaScript.

## Features

- Add, complete, and delete tasks
- Filter by All / Active / Completed
- "Items left" counter and one-click clear of completed tasks
- Tasks persist across reloads via `localStorage`
- Keyboard-friendly and screen-reader-friendly (labels, `aria-*`, visible focus styles)

## Usage

No build step or dependencies required. Open `index.html` in any modern browser:

```bash
# from the repository root
open index.html        # macOS
# or just double-click index.html in your file explorer
```

Or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File         | Purpose                                      |
| ------------ | -------------------------------------------- |
| `index.html` | Markup and page structure                    |
| `styles.css` | Styling                                      |
| `app.js`     | Todo logic and `localStorage` persistence    |
