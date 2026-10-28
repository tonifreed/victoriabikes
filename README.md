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
