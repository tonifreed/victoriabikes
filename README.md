# Victoria Bikes

The After Dark website: a responsive, static homepage for custom plasma LED installs and family-friendly night rides in Victoria, Texas.

## Local preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory, then open `http://127.0.0.1:4173`.

## Files

- `index.html`: content, navigation, FAQ, and contact links.
- `styles.css`: desktop and mobile layouts; reduced-motion support.
- `script.js`: mobile navigation, gallery filters, slider, footer photo strip, and photo viewer.
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
- `gallery.json`: the combined homepage album: 196 images, with 76 varied views shown by default and 120 similar shots available through a checkbox.
- `pending-uploads.json`: 20 supplied Facebook JPEG attachments whose names are available but whose image bytes could not be downloaded. They have not been reviewed or included. Do not describe this as a complete import.

The 39 reviewed images comprise 29 photographs and four crew posters from the original local folder, five original project photographs, and one previously retrieved public Facebook photo. Two visually identical local copies share their optimized counterpart. Alternate views are available in the homepage gallery with “Include similar shots.”

Five images are labelled group: four frames of the same large gathering (`IMG_1245`, `IMG_1247`, `IMG_1248`, `IMG_1253`) and one photograph of three riders (`victoria bikes media5`). Images of bikes alone are labelled bike, not group. Labels describe visible content, not identities inferred from faces.

The homepage gallery supports Groups, Night rides, Bikes, Daylight, and Posters filters; six-photo slides; arrows, page dots, native scrolling, and a modal viewer. The footer has a ten-photo strip with pause and reduced-motion support. Without JavaScript, gallery photo links remain available.

## Crew content sources

Four posters supplied the initial crew information: Kenny (`IMG_1208`), Linda (`IMG_1209`), Toni (`IMG_1213`), and Adrianna (`IMG_1215`). The website uses its own branding rather than copying the posters' design.

The owner identified Nick as part of the original founder group and supplied interests: Nick collects, trades, and sells Pokémon cards and loves Harry Potter, sport bikes, and MotoGP; Kenny loves the Broncos, sport bikes, and MotoGP; Toni loves Taylor Swift and MotoGP; Linda loves the Texans, Monster in the white can, and taking care of Adrianna; Adrianna loves Starbucks coffee, music, naps, and true crime.

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

The crew section has six cards in this order: Kenny, Toni, Meemaw & Finn, Nick, Adrianna, Linda. Desktop uses two rows of three; smaller screens use two columns or one. Kenny, Toni, Meemaw, and Nick are titled Co-founder. Adrianna and Linda are titled Core Crew. Their roles are: Kenny—Bike whisperer; Toni—Website & software wizard; Meemaw—Pace setter; Nick—Wizard on Wheels; Adrianna—Chief Hype Officer; Linda—Gears & Cheers. Finn is Meemaw’s basket co-pilot. The founder bios do not name each other. The owner supplied Meemaw’s love of her daughters, grandkids, bingo, and scratch-off lotto breaks; she rides a trike with blinkers, and her dog Finn rides in the back basket. Bios use a lighter tone while retaining those supplied details.

The homepage leads with riding and community, with a group photo, Join a Ride actions, and clear messaging that custom lights are optional. The owner dates the first rides to late July 2025, when riding helped the founders through a hard season; the first anniversary celebration was in August. Optional custom lighting information sits in the last, collapsed FAQ item, with email and Facebook message links instead of a quote form.

Run `python3 scripts/build-gallery.py` to regenerate the static homepage cards and `gallery.json` from both photo catalogs. This requires ffprobe to read dimensions for newer images. The generator skips matching optimized paths, exact source hashes, and source matches across collections. Series labels keep similar poses and angles out of the default view; visitors can include them. All cards remain accessible without JavaScript. Pagination shows a compact set of page buttons.
