"""Build the homepage album from both sorted photo catalogs; no third-party Python packages."""
import concurrent.futures
import hashlib
import html
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
def read(name):
    return json.loads((ROOT / 'website-photos' / name).read_text())
old, more = read('catalog.json'), read('more-photos-catalog.json')
existing_series = {r['existing_source']: r['series'] for r in more if r['existing_source']}
# These original photos also appear in the newer folder under numbered names.
known_series = {
 'riders-night-ride-crew-original.webp': 'riders-purple-led-parking-lot',
 'group-community-ride-original.webp': 'group-three-riders-night',
 'bike-led-cruiser-original.webp': 'bike-cyan-truck-bed',
 'bike-plaza-glow-original.webp': 'bikes-led-plaza-statues',
 'bike-pair-night-original.webp': 'bikes-orange-purple-tree',
}
rows = []
seen_sources, seen_paths, seen_hashes = set(), set(), set()
for r in old:
    item = dict(r)
    item['series'] = existing_series.get(r['source']) or known_series.get(Path(r['src']).name) or r.get('series') or r['src']
    rows.append(item)
    seen_paths.add(r['src'])
    for source in r.get('sources', [r['source']]):
        seen_sources.add(source)
        if (ROOT / source).exists():
            seen_hashes.add(hashlib.sha256((ROOT / source).read_bytes()).hexdigest())
# All matching-preview files share one optimized path. Skip copies already in either catalog.
for r in more:
    if r['optimized'] in seen_paths or r['sha256'] in seen_hashes or r['existing_source'] in seen_sources:
        continue
    seen_paths.add(r['optimized']); seen_hashes.add(r['sha256'])
    label = r['label']
    daylight = any(word in r['series'] for word in ('daylight', 'sunset', 'waterfront', 'beach', 'residential'))
    category = 'daylight' if daylight else ('rides' if label in ('riders', 'group') else 'lights')
    rows.append(dict(src=r['optimized'], thumb=r['optimized'], source=r['source'],
                     caption=r['description'], alt=r['description'], category=category,
                     label=label, series=r['series']))

def dimensions(r):
    if 'width' not in r:
        data = json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',str(ROOT/r['src'])]))['streams'][0]
        r.update(width=data['width'], height=data['height'])
    return r
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    rows = list(pool.map(dimensions, rows))
# Lead with different gatherings, then a varied selection. Alternate frames remain available.
preferred = ['more-group-night-park-lamppost-001.webp','more-group-waterfront-pavilion-001.webp','more-group-night-plaza-statues-001.webp','group-crew-together-img-1247.webp','group-community-ride-original.webp']
rows.sort(key=lambda r: preferred.index(Path(r['src']).name) if Path(r['src']).name in preferred else len(preferred))
seen_series = set()
for r in rows:
    r['similar'] = r['series'] in seen_series
    seen_series.add(r['series'])
rows.sort(key=lambda r: r['similar'])
(ROOT/'website-photos/gallery.json').write_text(json.dumps(rows, indent=2, ensure_ascii=False)+'\n')
esc = lambda value: html.escape(str(value), quote=True)
cards = []
for r in rows:
    cards.append(f'''        <a class="gallery-photo" data-group="{str(r['label']=='group').lower()}" data-similar="{str(r['similar']).lower()}" href="{esc(r['src'])}" data-category="{esc(r['category'])}" data-caption="{esc(r['caption'])}" aria-label="View photo: {esc(r['alt'])}"><img src="{esc(r['src'])}" alt="{esc(r['alt'])}" width="{r['width']}" height="{r['height']}" loading="lazy" decoding="async"><span class="gallery-photo-caption">{esc(r['caption'])} <span aria-hidden="true">↗</span></span></a>''')
p = ROOT/'index.html'; page=p.read_text()
start=page.index('\n',page.index('<div class="gallery-grid"'))+1
end=page.index('      </div>',start)
page=page[:start]+'\n'.join(cards)+'\n'+page[end:]
page=re.sub(r'(<p id="gallery-status" role="status">).*?(</p>)',rf'\g<1>{len(rows)} photos and posters in the album.\2',page)
p.write_text(page)
print(f'{len(rows)} unique web images; {len(seen_series)} varied views; {len(rows)-len(seen_series)} similar shots available.')
