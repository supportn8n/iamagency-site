"use client";

import { useEffect, useRef, useState } from "react";
import { utpHtml } from "./utpHtml";

/* УТП — из экспорта Builder.io (Figma→HTML, 1:1). Нативные px 1440×1024,
   масштабируются под ширину контейнера. Фон прозрачный — сквозная вязка из Hero просвечивает. */
export default function UtpBuilder() {
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
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: "1440 / 1024" }}>
      <div
        style={{
          width: 1440,
          height: 1024,
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: utpHtml }}
      />
    </div>
  );
}
