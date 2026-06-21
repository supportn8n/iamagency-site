"use client";

import { useEffect, useRef, useState } from "react";

/* Универсальная обёртка для блоков из Builder.io (Figma→HTML).
   Нативный холст 1440×1024 масштабируется под ширину контейнера. */
export default function BuilderBlock({
  html,
  h = 1024,
  overflow = "hidden",
}: {
  html: string;
  h?: number;
  overflow?: "hidden" | "visible";
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
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `1440 / ${h}`, overflow }}>
      <div
        style={{
          width: 1440,
          height: h,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
