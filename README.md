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

## Photo collection and gallery

All local image material is consolidated in `website-photos/`:

- 39 optimized WebP images with descriptive names beginning `group-`, `riders-`, `bike-`, or `poster-`.
- `originals/`: 42 unchanged source files, including duplicate source copies and the earlier hero derivative; excluded from git and deployment.
- `index.html`: a visual index of every optimized image, with category filters and full-image links. Open `/website-photos/#groups` to inspect group photos.
- `catalog.json` and `photo-index.csv`: descriptions, source mappings, category labels, similar-photo series, file sizes, and website selection status.
- `gallery.json`: the 22 curated homepage photos, in display order.
- `pending-uploads.json`: 20 supplied Facebook JPEG attachments whose names are available but whose image bytes could not be downloaded. They have not been reviewed or included. Do not describe this as a complete import.

The 39 reviewed images comprise 29 photographs and four crew posters from the original local folder, five original project photographs, and one previously retrieved public Facebook photo. Two visually identical local copies share their optimized counterpart. No alternate view has been removed from the complete collection: 13 similar photographs remain in the photo index but are omitted from the homepage selection.

Five images are labelled group: four frames of the same large gathering (`IMG_1245`, `IMG_1247`, `IMG_1248`, `IMG_1253`) and one photograph of three riders (`victoria bikes media5`). Images of bikes alone are labelled bike, not group. Labels describe visible content, not identities inferred from faces.

The homepage gallery supports Groups, Night rides, Custom LEDs, and Daylight filters; six-photo slides; arrows, page dots, native scrolling, and a modal viewer. The footer has a ten-photo strip with pause and reduced-motion support. Without JavaScript, gallery photo links remain available.

## Crew content sources

Four posters supplied the initial crew information: Kenny (`IMG_1208`), Linda (`IMG_1209`), Toni (`IMG_1213`), and Adrianna (`IMG_1215`). The website uses its own branding rather than copying the posters' design.

The owner added Nick as an original founder and supplied interests: Nick collects, trades, and sells Pokémon cards and loves Harry Potter, sport bikes, and MotoGP; Kenny loves the Broncos, sport bikes, and MotoGP; Toni loves Taylor Swift and MotoGP; Linda loves the Texans, Monster in the white can, and taking care of Adrianna; Adrianna loves Starbucks coffee, music, naps, and true crime.

The four local posters contain biographies rather than a ride schedule. Keep the owner's near-nightly description and link to Facebook for current meetup details; do not invent fixed times or locations.

## Videos

All eight source videos from the former `photos/` folder are included in the homepage's `#videos` section and the complete media index at `/website-photos/#videos`. Originals are preserved unchanged in `website-photos/originals/`. The collection now has 50 source files (42 image sources and eight videos).

The videos are H.264 MP4 with AAC audio, a maximum long edge of 1280 pixels, 30 fps, and fast-start metadata. Original audio and full duration are retained. The eight source files total 159.1 MB; the web copies total 35.1 MB. No autoplay: native controls, inline playback, poster images, and `preload="none"` keep loading and sound under visitor control. Starting one video pauses others on the page; hiding a video with a media-index filter also pauses it.

`website-photos/videos.json` and `video-index.csv` record each original, descriptive label, duration, dimensions, poster, and web copy. Descriptions were based on frames sampled at 10%, 50%, and 85% of each clip; they are not transcripts. Video poster images are display previews, not additional source photographs.

## Newly sorted photo batch

All 264 images from `more photos to sort/` were reviewed through contact sheets of all 166 distinct preview images. They are preserved byte-for-byte under `website-photos/originals/more-photos/` with descriptive names and three-digit numbered endings. No original was deleted. The incoming folder contains a pointer to the new location.

`website-photos/more-photos-catalog.json` and `more-photos-index.csv` record every old filename, new filename, description, category, similarity series, exact SHA-256 duplicate, and matching small-preview copy. There are 37 additional byte-identical copies and 98 additional matching-preview copies (including exact duplicates); matching previews are not claimed to prove full-resolution identity. Twelve files also match source files already in the prior collection.

The new batch contains 55 group-photo files, with similar poses numbered within their sets: a night gathering beneath a park lamp, a waterfront pavilion gathering, a plaza-statue gathering, and a three-rider night photograph. Labels describe what is visible rather than identifying people.

The review page `/website-photos/more-photos.html` shows all 264 labelled entries and links from the main collection index. Its optimized display copies share matching-preview assets: 166 WebP files, capped at 1600 pixels, totaling 37.4 MB. The original folder and source archive are excluded from git and deployment. The homepage photo selection is unchanged by this labelling pass.
