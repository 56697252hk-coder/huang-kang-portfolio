const warmedVideos = new Map();

export function warmVideo(src, preload = 'metadata') {
  if (!src) return;
  const existing = warmedVideos.get(src);
  if (existing) {
    if (preload === 'auto' && existing.preload !== 'auto') {
      existing.preload = 'auto';
      existing.load();
    }
    return;
  }
  const video = document.createElement('video');
  video.preload = preload;
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.addEventListener('error', () => warmedVideos.delete(src), { once: true });
  video.load();
  warmedVideos.set(src, video);
}
