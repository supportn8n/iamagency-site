"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Интерактив меток золотой горы (Кейсы).
   Метки = элементы layer-name "1".."5" (цифры внутри кружков).
   Hover на кружок-родитель → увеличение + золотое свечение + pointer.
   Координаты Figma не трогаем — только transform/filter/z-index. */
export default function HoverMarkers({
  html,
  h,
  labels,
}: {
  html: string;
  h?: number;
  labels: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      const digits = ([...root.querySelectorAll("[layer-name]")] as HTMLElement[]).filter(
        (e) => labels.includes(e.getAttribute("layer-name") || "")
      );
      if (!digits.length) return;

      // цель ховера — кружок-родитель (он крупнее цифры); если родители совпадают
      // (общий контейнер) — берём сами цифры
      let targets = digits.map((d) => d.parentElement).filter(Boolean) as HTMLElement[];
      const uniq = [...new Set(targets)];
      if (uniq.length < digits.length) targets = digits;
      else targets = uniq;

      for (const el of targets) {
        const base = el.style.transform || "";
        el.style.transition =
          "transform .25s cubic-bezier(.34,1.56,.64,1), filter .25s ease";
        el.style.transformOrigin = "center";
        el.style.cursor = "pointer";
        el.addEventListener("mouseenter", () => {
          el.style.transform = (base ? base + " " : "") + "scale(1.4)";
          el.style.filter = "drop-shadow(0 0 10px rgba(255,184,0,.95)) brightness(1.08)";
          el.style.zIndex = "50";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = base;
          el.style.filter = "";
          el.style.zIndex = "";
        });
      }
    }, 120);

    return () => clearTimeout(t);
  }, [labels]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
