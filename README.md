# Victoria Bikes

The After Dark website: a responsive, static homepage for custom plasma LED installs and family-friendly night rides in Victoria, Texas.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:4173`.

## Files

- `index.html`: content, navigation, FAQ, and quote form.
- `styles.css`: desktop and mobile layouts; reduced-motion support.
- `script.js`: mobile navigation and email quote preparation.
- `assets/`: optimized original photography and favicon.

No build step or package installation is required. Vercel can serve the project root as a static site. The saved WordPress preview, its asset folder, original full-size photography, and generated design concepts are excluded from deployment.

## Contact and ride details

Quote requests are prepared locally, then sent by the visitor using their own email app. There is no form backend and nothing is submitted automatically. Visitors can also copy their request, call, text, or email directly.

Night-ride buttons link to the existing Victoria Bikes Facebook page for current meetup information. No fixed event schedule is claimed.

Fonts load from Google Fonts, with system fallbacks when unavailable. All displayed photography is served locally from optimized copies of the supplied originals.

## Photo gallery and source status

The gallery currently contains six photos: the five original project photos plus the lead photo publicly exposed by `https://www.facebook.com/victoriatxbikes/photos`, retrieved October 27, 2026 (America/Chicago). That Facebook photo is saved as `assets/gallery/ready-to-roll.jpg`. The full Facebook album and poster text were not available through the retrieval tools; this is not a complete album import.

The gallery supports a native modal photo viewer, previous/next controls, left/right arrow keys, Escape to close, and links to each image without JavaScript. Image captions describe visible content; they do not claim dates or specific event names.

Ride information uses the details supplied for this project. Exact ride times and meetup locations still need the poster source files or owner confirmation. Do not infer a current recurring schedule from undated or one-off event posters. Apply the existing website styling to the verified poster information rather than copying poster artwork into the page layout.
