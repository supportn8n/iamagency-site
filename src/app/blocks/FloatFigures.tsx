"use client";

import { useEffect } from "react";

/* Лёгкое «парение» самодостаточных 3D-фигур (плоские PNG): мягкий сдвиг + небольшой
   наклон, у каждой свои параметры. НЕ трогаем кросс-блочные фигуры (жгут, спирали,
   стекло на стыке Отзывы/Школа) — движение порвёт стыки. Уважаем reduce-motion. */
const FIGS: { match: string; dx: number; dy: number; rot: number; dur: number }[] = [
  { match: "white_fig", dx: 0, dy: 13, rot: 2.5, dur: 7000 }, // белая в Hero — мягкий «вдох»
  { match: "glass_full", dx: 9, dy: 11, rot: 3, dur: 8200 }, // стекло в Hero
  { match: "a255084892e1", dx: 11, dy: 9, rot: 3, dur: 6400 }, // фигура в Портфолио
  { match: "orange_flower", dx: 8, dy: 11, rot: 4, dur: 7600 }, // цветок в Блоге
];

export default function FloatFigures() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      document.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        const f = FIGS.find((x) => src.includes(x.match));
        if (!f || (img as HTMLElement).dataset.float) return;
        (img as HTMLElement).dataset.float = "1";
        img.style.transformOrigin = "center";
        img.style.willChange = "transform";
        img.animate(
          [
            { transform: "translate(0,0) rotate(0deg)" },
            { transform: `translate(${f.dx}px,${-f.dy}px) rotate(${f.rot}deg)` },
            { transform: `translate(${-f.dx * 0.7}px,${f.dy * 0.5}px) rotate(${-f.rot}deg)` },
            { transform: "translate(0,0) rotate(0deg)" },
          ],
          { duration: f.dur, iterations: Infinity, easing: "ease-in-out" }
        );
      });
    }, 250);
    return () => clearTimeout(t);
  }, []);
  return null;
}
