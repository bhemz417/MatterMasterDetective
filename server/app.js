import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon', '.png': 'image/png', '.woff2': 'font/woff2' };

export const briefing = {
  title: 'Welcome, Detective!',
  paragraphs: [
    'A strange scientist called Dr Chaos has mixed up all the matter in Science City. Solids are acting like liquids. Liquids are disappearing. Gases are escaping everywhere.',
    'Your mission is to investigate clues, complete experiments and solve mysteries to restore order.',
    'Each completed challenge earns Detective Points. Collect all 5 badges to become a:'
  ],
  rank: 'MASTER MATTER DETECTIVE'
};

export const resources = [
  {
    name: 'Yale-New Haven Teachers Institute',
    url: 'https://teachersinstitute.yale.edu',
    terms: 'https://teachersinstitute.yale.edu/terms.html',
    description: 'External educational resource. Linked for further reading; no Yale-owned materials are redistributed within this project.'
  },
  {
    name: 'PhET Interactive Simulations, University of Colorado Boulder',
    url: 'https://phet.colorado.edu',
    terms: 'https://phet.colorado.edu/en/licensing',
    description: 'External interactive science resource. Linked for exploration; no PhET simulation, screenshot, logo or code is embedded in this project.'
  }
];

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(data));
}

function sendFile(res, target) {
  const ext = path.extname(target).toLowerCase();
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
  fs.createReadStream(target).pipe(res);
}

export function createApp({ serveClient = true } = {}) {
  return http.createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return sendJson(res, 405, { error: 'Method not allowed' });
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { return sendJson(res, 400, { error: 'Invalid request URL' }); }
    if (pathname === '/api/health') return sendJson(res, 200, { status: 'ok', app: 'Matter Detective', version: '2.0.0' });
    if (pathname === '/api/briefing') return sendJson(res, 200, briefing);
    if (pathname === '/api/resources') return sendJson(res, 200, resources);
    if (pathname.startsWith('/api/')) return sendJson(res, 404, { error: 'API endpoint not found' });
    if (!serveClient) return sendJson(res, 404, { error: 'Not found' });
    const relative = pathname.replace(/^\/+/, '');
    const candidate = path.resolve(dist, relative || 'index.html');
    if (!(candidate === dist || candidate.startsWith(`${dist}${path.sep}`))) return sendJson(res, 403, { error: 'Forbidden' });
    const target = fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : path.join(dist, 'index.html');
    if (!fs.existsSync(target)) return sendJson(res, 503, { error: 'Frontend not built. Run npm run build, or use npm run dev.' });
    return sendFile(res, target);
  });
}
