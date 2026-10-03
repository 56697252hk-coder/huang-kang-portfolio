const warmedVideos = new Map();

export function warmVideo(src) {
  if (!src || warmedVideos.has(src)) return;
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.addEventListener('error', () => warmedVideos.delete(src), { once: true });
  video.load();
  warmedVideos.set(src, video);
}
