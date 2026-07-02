import { brendbukHtml } from "./gen/brendbukHtml";

/* Реестр страниц услуг /uslugi/<slug>. Каждая страница — 1:1 холст из Figma
   (фреймы «Услуги 1..4»), рендерится через BuilderBlock. По мере переноса
   макетов сюда добавляются остальные: vedenie-sotssetey, marketing-i-prodvizhenie,
   kontent-syomki. */

export type Usluga = {
  slug: string;
  name: string; // как на карточке блока УСЛУГИ на главной
  html: string; // готовый холст 1440×height
  height: number; // высота фрейма в Figma
  metaTitle: string;
  metaDescription: string;
};

export const USLUGI: Usluga[] = [
  {
    slug: "brendbuk-i-smm-strategiya",
    name: "Брендбук и SMM-стратегия",
    html: brendbukHtml,
    height: 7944,
    metaTitle: "Брендбук и SMM-стратегия — разработка под ключ",
    metaDescription:
      "SMM-стратегия развития, концептуальная стратегия бренда, айдентика и брендбук под ключ. Анализ ниши и конкурентов, позиционирование, контент-план. От 150 000 ₽.",
  },
];

export const getUsluga = (slug: string) => USLUGI.find((u) => u.slug === slug);
