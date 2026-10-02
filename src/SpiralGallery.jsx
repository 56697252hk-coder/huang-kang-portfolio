import React, { useEffect, useRef, useState } from 'react';

export default function SpiralGallery({ projects }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [idleOffset, setIdleOffset] = useState(0);
  const gallery = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const lastWheel = useRef(0);
  const wheelDelta = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame;
    let lastUpdate = 0;
    const start = performance.now();
    const animate = (now) => {
      if (now - lastUpdate > 50) {
        setIdleOffset(((now - start) / 3400) % projects.length);
        lastUpdate = now;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [projects.length]);

  useEffect(() => {
    const element = gallery.current;
    const handleWheel = (event) => {
      const incomingDirection = Math.sign(event.deltaY);
      const candidate = activeRef.current + incomingDirection;
      if (!incomingDirection || candidate < 0 || candidate >= projects.length) {
        wheelDelta.current = 0;
        return;
      }
      event.preventDefault();
      wheelDelta.current += event.deltaY;
      if (Math.abs(wheelDelta.current) < 38) return;
      const direction = Math.sign(wheelDelta.current);
      const next = activeRef.current + direction;
      wheelDelta.current = 0;
      if (!direction || next < 0 || next >= projects.length) return;
      const now = performance.now();
      if (now - lastWheel.current < 220) return;
      lastWheel.current = now;
      setActive(next);
    };
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [projects.length]);

  function handlePointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY };
    gallery.current?.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (gallery.current) {
      const bounds = gallery.current.getBoundingClientRect();
      gallery.current.style.setProperty('--pointer-x', `${(((event.clientX - bounds.left) / bounds.width) - .5) * 54}px`);
      gallery.current.style.setProperty('--pointer-y', `${(((event.clientY - bounds.top) / bounds.height) - .5) * 36}px`);
    }
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    const movement = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
    setDragOffset(Math.max(-.95, Math.min(.95, movement / 260)));
  }

  function handlePointerUp(event) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    const movement = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
    drag.current = null;
    setDragOffset(0);
    if (gallery.current?.hasPointerCapture(event.pointerId)) gallery.current.releasePointerCapture(event.pointerId);
    if (Math.abs(movement) < 35) return;
    suppressClick.current = true;
    setActive((current) => Math.max(0, Math.min(projects.length - 1, current + (movement < 0 ? 1 : -1))));
    window.setTimeout(() => { suppressClick.current = false; }, 100);
  }

  return <div ref={gallery} className={`spiral-gallery ${dragOffset ? 'is-dragging' : ''}`} aria-label="精选作品交互画廊" tabIndex={0}
    onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
    onPointerCancel={() => { drag.current = null; setDragOffset(0); }}
    onPointerLeave={() => { if (!drag.current && gallery.current) { gallery.current.style.setProperty('--pointer-x', '0px'); gallery.current.style.setProperty('--pointer-y', '0px'); } }}
    onKeyDown={(event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); setActive((n) => Math.min(projects.length - 1, n + 1)); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setActive((n) => Math.max(0, n - 1)); }
    }}>
    <div className="spiral-guides" aria-hidden="true"><span/><span/><span/></div>
    <div className="spiral-stage">
      {projects.map((project, index) => {
        const rawOffset = index - active + dragOffset + (drag.current ? 0 : idleOffset);
        const half = projects.length / 2;
        const offset = ((rawOffset + half) % projects.length + projects.length) % projects.length - half;
        const viewportWidth = gallery.current?.clientWidth || 1440;
        const cardWidth = viewportWidth < 700
          ? Math.min(viewportWidth * .75, 420)
          : Math.max(360, Math.min(540, viewportWidth * .28));
        const viewportHeight = gallery.current?.clientHeight || 800;
        const edgePadding = viewportWidth < 700 ? 16 : 30;
        const radiusX = Math.max(0, (viewportWidth - cardWidth) / 2 - edgePadding) * .84;
        const radiusY = viewportHeight * .36;
        const angle = offset * (Math.PI * 2 / projects.length) + Math.PI;
        const sideDepth = Math.abs(Math.cos(angle));
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        const z = (sideDepth - 1) * 1250;
        const rotate = -Math.sin(angle) * 86;
        const scale = .08 + Math.pow(sideDepth, 22) * .92;
        const cardOpacity = .025 + Math.pow(sideDepth, 3.2) * .975;
        return <button type="button" key={project.n}
          className={`spiral-card spiral-${project.n} ${Math.abs(offset) < .5 ? 'is-active' : ''}`}
          style={{ '--curve-side': Math.sin(angle), transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotate}deg) scale(${scale})`, zIndex: Math.round(sideDepth * 100), opacity: cardOpacity }}
          aria-label={`${project.title}${offset === 0 ? '，查看项目' : '，切换到此项目'}`}
          onClick={() => {
            if (suppressClick.current) return;
            if (index !== active) setActive(index);
            else document.getElementById(`work-${project.n}`)?.scrollIntoView({ behavior: 'smooth' });
          }}>
          <span className="spiral-card-top"><span>HK / {project.n}</span><span>{project.tag}</span></span>
          {project.video && sideDepth > .24 ? <span className="spiral-card-art spiral-card-video"><video src={project.video} muted playsInline preload="metadata"/><span className="spiral-view">VIEW</span></span> : <span className="spiral-card-art"><span className="spiral-shape"/><span className="spiral-shape second"/><span className="spiral-card-en">{project.heroText}</span></span>}
          <span className="spiral-card-caption"><strong>{project.title}</strong><span>VIEW PROJECT ↗</span></span>
        </button>;
      })}
    </div>
    <div className="spiral-controls"><div className="spiral-counter"><strong>0{active + 1}</strong><span>/ 0{projects.length}</span></div><div className="spiral-buttons"><button type="button" onClick={() => setActive((n) => Math.max(0, n - 1))} disabled={active === 0} aria-label="上一个项目">←</button><button type="button" onClick={() => setActive((n) => Math.min(projects.length - 1, n + 1))} disabled={active === projects.length - 1} aria-label="下一个项目">→</button></div></div>
    <span className="spiral-hint">拖动 / 滚轮 / 方向键切换作品</span>
    <span className="sr-only" aria-live="polite">当前项目：{projects[active].title}</span>
  </div>;
}
