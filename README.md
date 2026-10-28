# Victoria Bikes

The After Dark website: a responsive, static homepage for custom plasma LED installs and family-friendly night rides in Victoria, Texas.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:4173`.

## Files

- `index.html`: content, navigation, FAQ, and quote form.
- `styles.css`: desktop and mobile layouts; reduced-motion support.
- `script.js`: mobile navigation, email quote preparation, gallery filters, slider, footer photo strip, and photo viewer.
- `assets/`: optimized original photography and favicon.

No build step or package installation is required. Vercel can serve the project root as a static site. The saved WordPress preview, its asset folder, original full-size photography, and generated design concepts are excluded from deployment.

## Contact and ride details

Quote requests are prepared locally, then sent by the visitor using their own email app. There is no form backend and nothing is submitted automatically. Visitors can also copy their request, call, text, or email directly.

Night-ride buttons link to the existing Victoria Bikes Facebook page for current meetup information. No fixed event schedule is claimed.

Fonts load from Google Fonts, with system fallbacks when unavailable. All displayed photography is served locally from optimized copies of the supplied originals.

## Photo gallery and source status

The gallery contains 35 photos: 29 from the owner's local `photos/` folder, the five original project photos, and the lead photo publicly exposed by `https://www.facebook.com/victoriatxbikes/photos`, retrieved October 27, 2026 (America/Chicago). That lead photo is saved as `assets/gallery/ready-to-roll.jpg`. The separate Facebook uploads could not be downloaded during this update; this is not a complete Facebook album import.

The local folder contains 35 JPEGs: 29 distinct photographs, two duplicate copies (`IMG_1054 2.jpeg` and `IMG_4578 2.jpeg`), and four crew introduction posters. The duplicate pairs produce identical review thumbnails. Original files and videos remain untouched in `photos/`, which is excluded from git and deployment. Display copies are capped at 1600 pixels and thumbnails at 640 pixels. `assets/gallery/catalog.json` records the source, caption, category, and dimensions of each displayed photograph; the HTML contains the rendered photo links, with no build step required.

The gallery supports filters (all, night rides, custom LEDs, daylight), slides of six photos with arrows, page dots, native swipe scrolling, and a native modal viewer with previous/next controls, arrow keys, Escape, and focus return. The viewer navigates the active category, including photos beyond the currently visible slide. Without JavaScript, all 35 photo links are visible and open directly. Captions describe visible content; they do not claim dates or event names.

The crew section paraphrases four owner-provided VTX Ryders posters: `IMG_1208.jpeg` (Kenny, co-founder), `IMG_1209.jpeg` (Linda, Ryder crew), `IMG_1213.jpeg` (Toni, co-founder), and `IMG_1215.jpeg` (Adrianna, social media manager). Names and roles come from the poster text, not face identification. The section uses the website's existing branding, not the poster artwork.

Ride information uses the owner's supplied near-nightly description. These four posters contain biographies, not a recurring schedule. Exact ride times and meetup locations still need a source or owner confirmation; Facebook remains the destination for current details. Do not infer a current recurring schedule from undated or one-off event posters.

The footer includes a continuous ten-photo strip using existing thumbnails. It pauses on hover, keyboard focus, or its pause button. Reduced-motion users get a manually scrollable strip without animation or repeated images. Footer photo links open the full album in the viewer, independently of the main gallery filter.

Owner updates: Nick is an original founder. His interests include collecting, trading, and selling Pokémon cards, Harry Potter, sport bikes, and MotoGP. Kenny is a Broncos fan, sport bike rider, and MotoGP fan; Toni is a Taylor Swift and MotoGP fan. These details were supplied directly by the owner. Group photos from `IMG_1253.jpeg`, `IMG_1247.jpeg`, and `IMG_1248.jpeg` lead the gallery and appear together above the five crew bios.
