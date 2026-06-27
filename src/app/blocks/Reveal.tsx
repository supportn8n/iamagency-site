"use client";

import { useEffect, useRef, useState } from "react";

/* Плавное появление секции: blur + opacity → 0 в чёткое/видимое,
   когда секция входит в экран на 30% (IntersectionObserver threshold 0.3).
   Срабатывает один раз. */
export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        filter: shown ? "blur(0px)" : "blur(14px)",
        transition: "opacity .8s ease, filter .8s ease",
        willChange: "opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
