"use client";

import { useEffect, useRef } from "react";
import BuilderBlock from "./BuilderBlock";

/* Блок «Свяжитесь с нами» (переработан по Figma to Code).
   Статичный HTML рисует заголовок, фигуру, подписи полей, линии, кнопки и модалку (#kf-modal, скрыта).
   Здесь кладём настоящие input'ы на линии полей, по «Отправить» (#kf-submit) показываем «Спасибо!»,
   по «Закрыть» (#kf-close) возвращаем форму и чистим. */
const FIELDS = [
  { name: "Имя", line: 389, ph: "Ваше имя" },
  { name: "Телефон", line: 514, ph: "+7 ___ ___ __ __" },
  { name: "Сайт", line: 639, ph: "Сайт / соцсети проекта" },
  { name: "Бюджет", line: 764, ph: "Бюджет" },
];

export default function ContactBlock({ html, h }: { html: string; h?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const t = setTimeout(() => {
      const submit = root.querySelector("#kf-submit") as HTMLElement | null;
      const modal = root.querySelector("#kf-modal") as HTMLElement | null;
      const close = root.querySelector("#kf-close") as HTMLElement | null;
      if (!submit || !modal || !close) return;
      const canvas = submit.parentElement as HTMLElement | null;
      if (!canvas) return;

      const inputs: HTMLInputElement[] = [];
      for (const f of FIELDS) {
        const inp = document.createElement("input");
        inp.type = "text";
        inp.placeholder = f.ph;
        inp.setAttribute("aria-label", f.name);
        inp.style.cssText = [
          "position:absolute",
          "left:815px",
          `top:${f.line - 44}px`,
          "width:560px",
          "height:44px",
          "background:transparent",
          "border:none",
          "outline:none",
          "font-family:Inter,sans-serif",
          "font-size:26.9px",
          "color:#1C1C1C",
          "padding:0",
        ].join(";");
        canvas.appendChild(inp);
        inputs.push(inp);
      }

      const showForm = () => {
        modal.style.display = "none";
        inputs.forEach((i) => (i.style.display = ""));
        submit.style.display = "flex";
      };
      const showThanks = () => {
        inputs.forEach((i) => (i.style.display = "none"));
        submit.style.display = "none";
        modal.style.display = "";
      };
      showForm();

      submit.addEventListener("click", () => {
        const name = inputs[0].value.trim();
        const phone = inputs[1].value.trim();
        if (!name || !phone) {
          const bad = !name ? 0 : 1;
          inputs[bad].focus();
          return;
        }
        showThanks();
      });
      close.addEventListener("click", () => {
        inputs.forEach((i) => (i.value = ""));
        showForm();
      });
    }, 140);

    return () => clearTimeout(t);
  }, []);

  return (
    /* z-30 + relative — голубая фигура вылезает вниз и лежит ПОВЕРХ чёрного футера */
    <div ref={ref} className="relative" style={{ zIndex: 30 }}>
      <BuilderBlock html={html} h={h} overflow="visible" />
    </div>
  );
}
