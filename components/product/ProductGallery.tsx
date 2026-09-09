"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { imageKindLabels, imageMeta, type Colorway } from "@/content/products";

/** Touch, keyboard and button navigation share one index. No autoplay on arrival. */
export function ProductGallery({ name, colorway, priority = false }: { name: string; colorway: Colorway; priority?: boolean }) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const count = colorway.images.length;
  const current = colorway.images[index % count];

  useEffect(() => {
    if (!playing || count < 2) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % count), 2400);
    return () => window.clearInterval(timer);
  }, [playing, count]);

  useEffect(() => {
    if (!expanded) return;
    const el = dialog.current;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { el?.close(); document.body.style.overflow = previous; };
  }, [expanded]);

  if (!current) return null;
  const meta = imageMeta(current);
  function select(i: number) { setPlaying(false); setIndex((i + count) % count); }
  const disclosure = current.kind === "concept"
    ? "Proposed design. Final colour, fit and artwork may differ."
    : current.kind === "catalog" ? "" : current.kind === "photo" ? "" : "Design mockup.";
  const controls = (label: string) => (
    <div className="gallery-controls">
      <div className="view-switch" role="group" aria-label={label}>
        {colorway.images.map((img, i) => <button type="button" key={img.key} aria-pressed={index === i} onClick={() => select(i)}>{img.view}</button>)}
      </div>
      {count > 1 ? <button className="gallery-play eyebrow" type="button" aria-pressed={playing} onClick={() => setPlaying(p => !p)}>{playing ? "Pause views" : "Play views"}<span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span></button> : null}
    </div>
  );

  return (
    <div className="product-gallery">
      <div className="gallery-topline eyebrow"><span>{colorway.name}</span><span>{current.view}</span></div>
      <div className="gallery-stage" role="group" aria-label={`${name} image gallery`} onKeyDown={e => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select(index + (e.key === "ArrowRight" ? 1 : -1)); }
      }}>
        <button type="button" className="gallery-zoom" aria-label={`Enlarge ${name}, ${colorway.name}, ${current.view} view`} aria-haspopup="dialog"
          onPointerDown={e => { suppressClick.current = false; if (e.pointerType === "touch") gesture.current = { x: e.clientX, y: e.clientY }; }}
          onPointerCancel={() => { gesture.current = null; }}
          onPointerUp={e => {
            const start = gesture.current; gesture.current = null;
            if (!start) return;
            const dx = e.clientX - start.x; const dy = e.clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { suppressClick.current = true; select(index + (dx < 0 ? 1 : -1)); }
          }}
          onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } setPlaying(false); setExpanded(true); }}>
          <Image key={current.key} src={meta.src} alt={current.alt} width={meta.width} height={meta.height} priority={priority && index === 0} sizes="(min-width: 1024px) 55vw, 100vw" className={`gallery-image ${current.kind === "photo" ? "gallery-photo" : ""}`} draggable={false} />
          <span className="zoom-cue eyebrow" aria-hidden="true">↗ View detail</span>
        </button>
        {count > 1 ? <>
          <button type="button" className="gallery-arrow gallery-arrow-prev" aria-label="Previous view" onClick={() => select(index - 1)}>←</button>
          <button type="button" className="gallery-arrow gallery-arrow-next" aria-label="Next view" onClick={() => select(index + 1)}>→</button>
        </> : null}
      </div>
      {count > 1 ? controls("Product views") : null}
      {disclosure ? <p className="gallery-caption" aria-live={playing ? "off" : "polite"}><strong>{imageKindLabels[current.kind]}.</strong> {current.kind === "concept" ? disclosure : ""}</p> : null}

      <dialog ref={dialog} className="product-lightbox" aria-labelledby={`${id}-title`} onClose={() => { setExpanded(false); setPlaying(false); }} onCancel={() => { setExpanded(false); setPlaying(false); }}>
        <div className="lightbox-heading"><h2 id={`${id}-title`} className="display-narrow">{name} / {colorway.name}</h2><button type="button" className="lightbox-close eyebrow" onClick={() => { setPlaying(false); setExpanded(false); }}>Close ✕</button></div>
        {expanded ? <Image src={meta.src} alt={current.alt} width={meta.width} height={meta.height} sizes="(min-width: 1024px) 80vw, 100vw" className="lightbox-image" /> : null}
        {count > 1 ? controls("Enlarged product views") : null}
        {disclosure ? <p className="gallery-caption"><strong>{imageKindLabels[current.kind]}.</strong> {current.kind === "concept" ? disclosure : ""}</p> : null}
      </dialog>
    </div>
  );
}
