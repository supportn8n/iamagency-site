"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* «Парящие» чипы-ниши в блоке кейсов (вдохновлено seo-lebedev.ru).
   Находит таблетки-ниши (внешний div высотой 80px с чёрной таблеткой внутри)
   и запускает каждой бесконечное лёгкое «парение» — небольшой сдвиг + поворот,
   у каждой свои параметры и сдвиг старта, поэтому двигаются вразнобой.
   Координаты Figma не трогаем — только transform. Пауза, когда блок вне экрана. */
export default function FloatChips({ html, h }: { html: string; h?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setTimeout(() => {
      // таблетки-ниши находятся стабильно (border-radius:99px, height:80px, без детей),
      // анимируем их родителя-обёртку (там текст ниши + кнопка «+»)
      const pills = ([...root.querySelectorAll("div")] as HTMLElement[]).filter((d) => {
        const s = d.getAttribute("style") || "";
        return (
          s.includes("border-radius:99px") &&
          s.includes("height:80px") &&
          d.children.length === 0
        );
      });
      const chips = pills
        .map((p) => p.parentElement)
        .filter((el): el is HTMLElement => !!el);
      if (!chips.length) return;

      chips.forEach((chip, i) => {
        const dx = 5 + (i % 3) * 2; // 5..9px
        const dy = 6 + (i % 4) * 2; // 6..12px
        const rot = 1 + (i % 3) * 0.5; // 1..2deg
        const dur = 4500 + (i % 5) * 900; // 4.5..8.1с
        chip.style.willChange = "transform";
        const a = chip.animate(
          [
            { transform: "translate(0,0) rotate(0deg)" },
            { transform: `translate(${dx}px,${-dy}px) rotate(${rot}deg)` },
            { transform: `translate(${-dx}px,${-dy * 0.45}px) rotate(${-rot}deg)` },
            { transform: "translate(0,0) rotate(0deg)" },
          ],
          { duration: dur, iterations: Infinity, easing: "ease-in-out" }
        );
        a.currentTime = i * 700; // десинхрон старта
      });
    }, 150);

    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
