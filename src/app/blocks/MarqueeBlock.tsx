"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Бесконечная лента поверх статичного Builder.io-HTML.
   Находит карточки ряда по сигнатуре (top/height), переносит их в «трек»,
   клонирует на ширину периода и крутит через Web Animations API.
   Если заданы clipLeft/clipWidth — лента подрезается ровно по этой области
   (по панели), чтобы карточки не вылезали за край и аккуратно исчезали. */
export default function MarqueeBlock({
  html,
  h,
  rowTop,
  rowHeight,
  speed = 45,
  clipLeft,
  clipWidth,
  clipRadius = 24,
  clip = false,
}: {
  html: string;
  h?: number;
  rowTop: number;
  rowHeight: number;
  speed?: number; // px/сек
  clipLeft?: number;
  clipWidth?: number;
  clipRadius?: number;
  clip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
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

      const shouldClip = clip && clipLeft != null && clipWidth != null;
      const offX = shouldClip ? clipLeft! : 0;
      const offY = shouldClip ? rowTop : 0;

      // контейнер-обрезка по панели (если задан) — иначе трек прямо на холсте
      let host: HTMLElement = canvas;
      if (shouldClip) {
        const box = document.createElement("div");
        box.style.cssText =
          `position:absolute;left:${clipLeft}px;top:${rowTop}px;width:${clipWidth}px;` +
          `height:${rowHeight}px;overflow:hidden;border-radius:${clipRadius}px`;
        canvas.appendChild(box);
        host = box;
      }

      const track = document.createElement("div");
      track.style.cssText = "position:absolute;left:0;top:0;width:0;height:0";
      host.appendChild(track);
      for (const c of cards) {
        // координаты делаем относительными к контейнеру-обрезке
        c.style.left = parseFloat(c.style.left || "0") - offX + "px";
        c.style.top = parseFloat(c.style.top || "0") - offY + "px";
        track.appendChild(c);
      }
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
  }, [rowTop, rowHeight, speed, clipLeft, clipWidth, clipRadius]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
