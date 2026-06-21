"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Живой обратный отсчёт в блоке «Скидка».
   BuilderBlock рендерит статичный HTML из Figma («00 00 00 00»);
   после маунта находим 4 ячейки [layer-name="00"] (дни/часы/минуты/секунды)
   и обновляем их раз в секунду до конца текущего месяца. */
function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export default function SkidkaCountdown({ html, h }: { html: string; h?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // цель — начало следующего месяца (последняя секунда текущего); считаем на клиенте
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0).getTime();

    const tick = () => {
      const cells = root.querySelectorAll('[layer-name="00"]');
      if (cells.length < 4) return;
      const diff = Math.max(0, target - Date.now());
      const total = Math.floor(diff / 1000);
      const vals = [
        Math.floor(total / 86400),        // дни
        Math.floor((total % 86400) / 3600), // часы
        Math.floor((total % 3600) / 60),    // минуты
        total % 60,                          // секунды
      ];
      for (let i = 0; i < 4; i++) {
        const span = cells[i].querySelector("span") || cells[i];
        const txt = pad(vals[i]);
        if (span.textContent !== txt) span.textContent = txt;
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref}>
      <BuilderBlock html={html} h={h} />
    </div>
  );
}
