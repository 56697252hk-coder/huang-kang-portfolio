import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const distRoot = resolve(root, 'dist');
const videoRoot = resolve(root, 'media-videos');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4',
};

function safeFile(base, pathname) {
  const file = resolve(base, pathname.replace(/^\/+/, ''));
  return file === base || file.startsWith(base + sep) ? file : null;
}

function sendFile(req, res, file) {
  if (!file || !existsSync(file) || !statSync(file).isFile()) return false;
  const size = statSync(file).size;
  const range = req.headers.range;
  res.setHeader('Content-Type', types[extname(file).toLowerCase()] || 'application/octet-stream');
  res.setHeader('Accept-Ranges', 'bytes');
  if (file.includes(`${sep}assets${sep}`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  else if (extname(file).toLowerCase() === '.mp4') res.setHeader('Cache-Control', 'public, max-age=3600');
  else res.setHeader('Cache-Control', 'public, max-age=300');
  if (range) {
    const [startText, endText] = range.replace('bytes=', '').split('-');
    const start = Number(startText);
    const end = endText ? Math.min(Number(endText), size - 1) : size - 1;
    if (!Number.isFinite(start) || start > end) { res.writeHead(416); res.end(); return true; }
    res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    if (req.method === 'HEAD') res.end(); else createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Length': size });
    if (req.method === 'HEAD') res.end(); else createReadStream(file).pipe(res);
  }
  return true;
}

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  if (pathname.startsWith('/videos/')) {
    if (sendFile(req, res, safeFile(videoRoot, pathname.slice('/videos/'.length)))) return;
  } else {
    const requested = pathname === '/' ? 'index.html' : pathname;
    if (sendFile(req, res, safeFile(distRoot, requested))) return;
    if (sendFile(req, res, resolve(distRoot, 'index.html'))) return;
  }
  res.writeHead(404); res.end('Not found');
}).listen(port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}/`);
});
