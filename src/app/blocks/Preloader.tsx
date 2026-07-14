"use client";

import { useEffect, useState } from "react";

/* Прелоадер с настоящим логотипом «I AM AGENCY» (буквы-картинки из макета):
   I → длинный пробел → искривлённая AM → AGENCY, в одну строку как в логотипе.
   Части проявляются по очереди (I, AM, AGENCY), под названием по центру бежит %.
   Доходит до 100% когда страница загрузилась, потом экран уезжает вверх. */
const PARTS = [
  { src: "/blk/kontakty/wm_i.webp", left: 0, top: 5.91, w: 2.05, h: 94.09, alt: "" },
  { src: "/blk/kontakty/wm_am.webp", left: 6.29, top: 5.91, w: 24.88, h: 94.09, alt: "" },
  { src: "/blk/kontakty/wm_agency.webp", left: 35.97, top: 0, w: 64.1, h: 100, alt: "I AM AGENCY" },
];

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [parts, setParts] = useState(0);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const start = performance.now();
    const minShow = 450;
    let p = 0;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      // надёжно ловим готовность: событие load могло пройти мимо слушателя,
      // поэтому проверяем readyState, плюс страховка по времени — не зависаем
      if (document.readyState === "complete" || elapsed > 1200) loaded = true;
      const target = loaded ? 100 : 92;
      p += (target - p) * (loaded ? 0.16 : 0.08);

      setParts(Math.min(3, Math.floor(elapsed / 170) + 1));
      setPct(Math.min(100, Math.round(p)));

      if (p >= 99 && elapsed >= minShow) {
        setParts(3);
        setPct(100);
        setHide(true);
        setTimeout(() => setGone(true), 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: hide ? "translateY(-100%)" : "none",
        transition: "transform .45s cubic-bezier(.76,0,.24,1)",
        pointerEvents: hide ? "none" : "auto",
      }}
    >
      {/* логотип: три буквы-картинки в фирменной раскладке */}
      <div
        style={{
          position: "relative",
          width: "clamp(440px, 64vw, 820px)",
          aspectRatio: "1415 / 186",
        }}
      >
        {PARTS.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            draggable={false}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.w}%`,
              height: `${p.h}%`,
              opacity: parts > i ? 1 : 0,
              transition: "opacity .4s ease",
            }}
          />
        ))}
      </div>
      {/* проценты — по центру под названием */}
      <div
        style={{
          marginTop: "clamp(16px, 2.4vw, 30px)",
          color: "#EFEFEF",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(20px, 2.6vw, 34px)",
          letterSpacing: "-.02em",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}
