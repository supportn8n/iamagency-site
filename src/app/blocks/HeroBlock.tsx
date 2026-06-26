"use client";

import { useEffect, useRef, useState } from "react";

/* Hero «Маркетинг» — единый холст 1440×1024, масштабируется под ширину
   контейнера (как BuilderBlock и весь остальной сайт). За счёт этого заголовок
   «МАРКЕТИНГ» всегда тянется почти на всю строку, а фигуры стоят на своих
   местах на любом экране. Правая группа (карточка «Как мы работаем») вписана
   в тот же холст со сдвигом вправо (left: 780 = 1440 − 660). */
const H = 1024;

export default function HeroBlock({
  leftHtml,
  rightHtml,
}: {
  leftHtml: string;
  rightHtml: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1440);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ aspectRatio: `1440 / ${H}`, overflow: "hidden", background: "#fff" }}
    >
      <div
        style={{
          width: 1440,
          height: H,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* левая группа — координаты как в Figma на холсте 1440 */}
        <div dangerouslySetInnerHTML={{ __html: leftHtml }} />
        {/* правая группа — сдвинута на 780px вправо (вписана в правый край холста) */}
        <div
          style={{ position: "absolute", top: 0, left: 780, width: 660, height: H }}
          dangerouslySetInnerHTML={{ __html: rightHtml }}
        />
      </div>
    </div>
  );
}
