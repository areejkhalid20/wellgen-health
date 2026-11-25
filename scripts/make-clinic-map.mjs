// Draws the clinic map on the Locations page from real county outlines (US Census, via us-atlas).
// Run again only if a clinic is added or moves:   node scripts/make-clinic-map.mjs
// Writes src/data/clinic-map.json (county shapes + pin positions), which the Locations page reads.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { geoConicConformal, geoPath, geoCentroid, geoBounds } from 'd3-geo';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const us = require('us-atlas/counties-10m.json');

// Clinic coordinates: keep in sync with src/data/site.ts
const src = fs.readFileSync('src/data/site.ts', 'utf8');
const clinics = [...src.matchAll(/slug: '([^']+)'[^\n]*?lat: ([\d.-]+), lng: ([\d.-]+)/g)].map((m) => ({ slug: m[1], lat: +m[2], lng: +m[3] }));

const W = 720, H = 480;
// Area shown: a little beyond the clinics on every side
const lngs = clinics.map((c) => c.lng), lats = clinics.map((c) => c.lat);
const west = Math.min(...lngs) - 0.32, east = Math.max(...lngs) + 0.32, south = Math.min(...lats) - 0.22, north = Math.max(...lats) + 0.2;
// (d3 wants the outline clockwise)
const view = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[west, south], [west, north], [east, north], [east, south], [west, south]]] } };
const projection = geoConicConformal().parallels([32, 34]).rotate([99, 0]).fitExtent([[0, 0], [W, H]], view);
const path = geoPath(projection);

const [vx0, vy0, vx1, vy1] = [west, south, east, north];
const counties = feature(us, us.objects.counties).features
  .filter((f) => f.id.startsWith('48'))
  .filter((f) => { const [[x0, y0], [x1, y1]] = geoBounds(f); return x1 > vx0 - 0.3 && x0 < vx1 + 0.3 && y1 > vy0 - 0.3 && y0 < vy1 + 0.3; })
  .map((f) => {
    const [cx, cy] = projection(geoCentroid(f));
    const hasClinic = clinics.some((c) => geoContainsPoint(f, c));
    return { name: f.properties.name, d: path(f), cx: Math.round(cx), cy: Math.round(cy), hasClinic };
  });

function geoContainsPoint(f, c) {
  // ray casting on projected outline is enough here
  const p = projection([c.lng, c.lat]);
  const rings = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  return rings.some((poly) => {
    const ring = poly[0].map((pt) => projection(pt));
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  });
}

const pins = Object.fromEntries(clinics.map((c) => [c.slug, projection([c.lng, c.lat]).map((n) => Math.round(n * 10) / 10)]));
fs.writeFileSync('src/data/clinic-map.json', JSON.stringify({ width: W, height: H, counties, pins }));
console.log(`Map written: ${counties.length} counties, ${clinics.length} clinics.`);
