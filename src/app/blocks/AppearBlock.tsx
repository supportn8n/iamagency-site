"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Появление элементов поверх статичного Builder.io-HTML.
   При въезде блока во вьюпорт (IntersectionObserver) перечисленные
   по layer-name элементы всплывают: opacity 0→1 + scale 0.8→1 с лёгким bounce, stagger.
   Абсолютные координаты Figma не трогаем — анимируем только opacity/transform. */
export default function AppearBlock({
  html,
  h,
  targets,
}: {
  html: string;
  h?: number;
  targets: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      const isEmoji = (s: string) => /\p{Extended_Pictographic}/u.test(s);
      const all = [...root.querySelectorAll("[layer-name]")] as HTMLElement[];
      const els = all.filter((e) => {
        const n = e.getAttribute("layer-name") || "";
        return targets.includes(n) || isEmoji(n); // имена из targets + любые эмодзи (мем)
      });
      if (!els.length) return;

      for (const e of els) {
        e.style.opacity = "0";
        e.style.transform = (e.style.transform ? e.style.transform + " " : "") + "scale(0.8)";
        e.style.transition =
          "opacity .55s ease, transform .55s cubic-bezier(.34,1.56,.64,1)";
        e.style.willChange = "opacity, transform";
      }

      let fired = false;
      const reveal = () => {
        if (fired) return;
        fired = true;
        els.forEach((e, i) => {
          setTimeout(() => {
            e.style.opacity = "1";
            e.style.transform = e.style.transform.replace(/\s*scale\(0\.8\)/, "");
          }, i * 130);
        });
      };

      const io = new IntersectionObserver(
        (ents) => {
          for (const ent of ents) {
            if (ent.isIntersecting) {
              reveal();
              io.disconnect();
            }
          }
        },
        { threshold: 0.25 }
      );
      io.observe(root);
    }, 120);

    return () => clearTimeout(t);
  }, [targets]);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
