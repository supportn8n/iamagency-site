"use client";

import { useEffect } from "react";
import { DIRECTIONS } from "../marketing/directions";

/* Делает карточки направлений на /marketing кликабельными: заголовок и «+»
   ведут на лендинг /marketing/<slug>. Линкуем ТОЛЬКО готовые (status: "ready"),
   чтобы незаполненные не вели на 404. По мере генерации агентом новых лендингов
   они автоматически становятся кликабельными. */
/* нормализация: регистр, пробелы, дефис/тире и кирилл/лат-омоглифы —
   чтобы «СРА»=«CPA», «ІТ»=«IT», «ORM — …»=«ORM - …» совпадали. */
const FOLD: Record<string, string> = {
  с: "c", р: "p", а: "a", е: "e", о: "o", і: "i", у: "y", х: "x",
  к: "k", м: "m", т: "t", н: "n", в: "v", "—": "-", "–": "-",
};
const norm = (s: string) =>
  [...s.toLowerCase()].map((ch) => FOLD[ch] || ch).join("").replace(/\s+/g, " ").trim();

export default function DirectionLinks() {
  useEffect(() => {
    const ready = DIRECTIONS.filter((d) => d.status === "ready");
    if (!ready.length) return;

    const wrap = (el: HTMLElement | undefined, href: string) => {
      if (!el || el.dataset.dlink) return;
      el.dataset.dlink = "1";
      el.style.cursor = "pointer";
      const a = document.createElement("a");
      a.href = href;
      a.style.textDecoration = "none";
      a.style.color = "inherit";
      el.parentElement?.insertBefore(a, el);
      a.appendChild(el);
    };

    const run = () => {
      const divs = [...document.querySelectorAll("div")] as HTMLElement[];
      ready.forEach((d) => {
        const href = `/marketing/${d.slug}`;
        // заголовок карточки: div, чей нормализованный текст = названию направления
        const dn = norm(d.name);
        const title = divs.find(
          (el) => !el.dataset.dlink && norm((el.textContent || "").trim()) === dn
        );
        if (!title) return;
        const tr = title.getBoundingClientRect();
        wrap(title, href);
        // «+» на той же строке справа от заголовка → тоже кликабельный
        const plus = divs.find((el) => {
          if ((el.textContent || "").trim() !== "+" || el.dataset.dlink) return false;
          const r = el.getBoundingClientRect();
          return Math.abs(r.top - tr.top) < 60 && r.left > tr.left && r.left - tr.left < 420;
        });
        wrap(plus, href);
      });
    };

    const t1 = setTimeout(run, 300);
    const t2 = setTimeout(run, 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return null;
}
