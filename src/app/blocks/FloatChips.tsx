"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* «Парящие» чипы-ниши в блоке кейсов (вдохновлено seo-lebedev.ru).
   Находит таблетки-ниши (внешний div высотой 80px с чёрной таблеткой внутри)
   и запускает каждой бесконечное лёгкое «парение» — небольшой сдвиг + поворот,
   у каждой свои параметры и сдвиг старта, поэтому двигаются вразнобой.
   Координаты Figma не трогаем — только transform.
   Через links чипы становятся кликабельными: "#beauty" — плавный скролл
   на этой же странице, "/keisy#beauty" — переход на страницу кейсов. */
export default function FloatChips({
  html,
  h,
  links,
}: {
  html: string;
  h?: number;
  /* карта: подстрока названия ниши (в нижнем регистре) → href */
  links?: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        if (!reduced) {
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
        }

        // кликабельность чипов: ищем нишу по тексту внутри обёртки
        if (links) {
          const name = (chip.textContent || "").toLowerCase();
          const key = Object.keys(links).find((k) => name.includes(k));
          if (!key) return;
          const href = links[key];
          chip.style.cursor = "pointer";
          chip.addEventListener("click", () => {
            if (href.startsWith("#")) {
              document
                .getElementById(href.slice(1))
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              window.location.href = href;
            }
          });
        }
      });
    }, 150);

    return () => clearTimeout(t);
  }, [links]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
