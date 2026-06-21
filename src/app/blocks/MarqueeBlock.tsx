"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Бесконечная лента поверх статичного Builder.io-HTML.
   Находит карточки ряда по сигнатуре (top/height), переносит их в «трек»,
   клонирует на ширину периода и крутит через Web Animations API.
   Абсолютные координаты Figma сохраняются; уезжающие клоны клипает overflow холста. */
export default function MarqueeBlock({
  html,
  h,
  rowTop,
  rowHeight,
  speed = 45,
}: {
  html: string;
  h?: number;
  rowTop: number;
  rowHeight: number;
  speed?: number; // px/сек
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      // карточки ряда лежат во вложенной обёртке — ищем по сигнатуре глубоко,
      // контейнером трека берём их общего родителя
      const match = (c: HTMLElement) => {
        const s = c.getAttribute("style") || "";
        return s.includes(`top:${rowTop}px`) && s.includes(`height:${rowHeight}px`);
      };
      const cards = ([...root.querySelectorAll("div")] as HTMLElement[]).filter(match);
      if (cards.length < 2) return;
      const canvas = cards[0].parentElement;
      if (!canvas) return;

      let maxRight = 0;
      let minLeft = Infinity;
      for (const c of cards) {
        const left = parseFloat(c.style.left || "0");
        const w = parseFloat(c.style.width || "0");
        maxRight = Math.max(maxRight, left + w);
        minLeft = Math.min(minLeft, left);
      }
      const gap = 32;
      const period = maxRight - minLeft + gap;

      const track = document.createElement("div");
      track.style.cssText = "position:absolute;left:0;top:0;width:0;height:0";
      canvas.appendChild(track);
      for (const c of cards) track.appendChild(c); // переносим оригиналы
      for (const c of cards) {
        const clone = c.cloneNode(true) as HTMLElement;
        clone.style.left = parseFloat(c.style.left || "0") + period + "px";
        track.appendChild(clone);
      }

      const anim = track.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${period}px)` }],
        { duration: (period / speed) * 1000, iterations: Infinity, easing: "linear" }
      );

      track.addEventListener("mouseenter", () => anim.pause());
      track.addEventListener("mouseleave", () => anim.play());
    }, 120);

    return () => clearTimeout(t);
  }, [rowTop, rowHeight, speed]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
