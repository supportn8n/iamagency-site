import { beautyHtml, beautyH } from "../keisy/gen/beautyHtml";
import { fashionHtml, fashionH } from "../keisy/gen/fashionHtml";
import { sportHtml, sportH } from "../keisy/gen/sportHtml";
import { expertsHtml, expertsH } from "../keisy/gen/expertsHtml";
import { realEstateHtml, realEstateH } from "../keisy/gen/realEstateHtml";
import { tourismHtml, tourismH } from "../keisy/gen/tourismHtml";
import { carsHtml, carsH } from "../keisy/gen/carsHtml";
import { horecaHtml, horecaH } from "../keisy/gen/horecaHtml";
import { productHtml, productH } from "../keisy/gen/productHtml";
import { eventsHtml, eventsH } from "../keisy/gen/eventsHtml";

/* Единый реестр направлений кейсов. Каждое направление = отдельная посадочная
   /case/<slug> (шаблон в [slug]/page.tsx), холст 1:1 из Figma. Хаб /keisy —
   блок с плашками ниш; клик по плашке ведёт на /case/<slug> этого направления.
   chipKey — подстрока названия плашки (нижний регистр) для сопоставления в FloatChips. */

export type CaseDir = {
  slug: string;
  name: string; // как на плашке ниши
  chipKey: string; // подстрока текста плашки в нижнем регистре
  html: string;
  height: number;
  metaTitle: string;
  metaDescription: string;
  // SEO-наполнение под нишу (опционально; заполняется по мере роллаута):
  h1?: string;
  intro?: string[]; // абзацы вводного текста
  faq?: { q: string; a: string }[];
};

export const CASES: CaseDir[] = [
  {
    slug: "beauty",
    name: "BEAUTY",
    chipKey: "beauty",
    html: beautyHtml,
    height: beautyH,
    metaTitle: "Кейсы beauty — SMM для салонов и бьюти-брендов | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише beauty: продвижение салонов красоты, косметики и бьюти-брендов в соцсетях. Реальные результаты: рост подписчиков, охватов и заявок.",
  },
  {
    slug: "fashion",
    name: "FASHION",
    chipKey: "fashion",
    html: fashionHtml,
    height: fashionH,
    metaTitle: "Кейсы fashion — SMM для брендов одежды | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише fashion: продвижение брендов одежды и аксессуаров в соцсетях. Визуал, контент и реклама, которые приводят покупателей.",
  },
  {
    slug: "sport",
    name: "SPORT & EDUCATION",
    chipKey: "sport",
    html: sportHtml,
    height: sportH,
    metaTitle: "Кейсы SMM в спорте и образовании — фитнес, школы, онлайн-курсы",
    metaDescription:
      "Кейсы I AM AGENCY в нишах спорта и образования: продвижение фитнес-клубов, спортивных школ, тренеров и онлайн-курсов в соцсетях. Стратегия, контент и реклама под заявки и записи.",
    h1: "SMM-кейсы в нишах спорта и образования",
    intro: [
      "Мы продвигаем в соцсетях фитнес-клубы, студии, спортивные школы, тренеров и онлайн-курсы. Задача в этой нише почти всегда одна: превратить подписчиков в записи на тренировки и заявки на обучение, а не просто набрать охваты.",
      "Под каждый проект собираем стратегию, ведём аккаунты и запускаем рекламу так, чтобы контент показывал результат учеников и клиентов, снимал возражения и вёл к целевому действию. Ниже — реальные кейсы: что было на старте, что сделали и к чему это привело.",
    ],
    faq: [
      {
        q: "Сколько стоит продвижение фитнес-клуба или спортивной школы в соцсетях?",
        a: "Стоимость зависит от объёма: только ведение, ведение с рекламой или комплекс со съёмками. Тарифы и что входит в каждый — на странице тарифов, а точную смету считаем под ваш проект после короткого брифа.",
      },
      {
        q: "Через сколько будут первые заявки и записи?",
        a: "Первые заявки с рекламы обычно идут в первые недели после запуска, органический рост подписчиков и охватов — накопительный эффект нескольких месяцев системной работы. Мы не обещаем «взрыв за неделю», а выстраиваем поток заявок.",
      },
      {
        q: "Вы работаете с онлайн-курсами и инфопродуктами?",
        a: "Да. Для онлайн-школ и экспертов в образовании упаковываем аккаунт, выстраиваем контент-воронку и продвижение под запись на курс, вебинар или консультацию.",
      },
      {
        q: "Снимаете контент сами или нужен свой оператор?",
        a: "Съёмку можем взять на себя: от мобильного контента на вашей локации до продакшна под ключ. Это отдельная услуга, её можно добавить к ведению.",
      },
    ],
  },
  {
    slug: "experts",
    name: "EXPERTS",
    chipKey: "experts",
    html: expertsHtml,
    height: expertsH,
    metaTitle: "Кейсы experts — личный бренд экспертов | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY по личному бренду экспертов: упаковка, контент и продвижение в соцсетях, которые превращают экспертность в заявки.",
  },
  {
    slug: "real-estate",
    name: "REAL ESTATE",
    chipKey: "real estate",
    html: realEstateHtml,
    height: realEstateH,
    metaTitle: "Кейсы недвижимость — SMM для real estate | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише недвижимости: продвижение застройщиков, агентств и объектов в соцсетях. Контент и реклама под заявки на покупку и аренду.",
  },
  {
    slug: "tourism",
    name: "TOURISM",
    chipKey: "tourism",
    html: tourismHtml,
    height: tourismH,
    metaTitle: "Кейсы туризм — SMM для tourism | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише туризма: продвижение отелей, туров и travel-брендов в соцсетях. Визуал и контент, которые продают путешествия.",
  },
  {
    slug: "cars",
    name: "CARS & EQUIPMENT",
    chipKey: "cars",
    html: carsHtml,
    height: carsH,
    metaTitle: "Кейсы авто и техника — SMM для cars & equipment | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нишах авто и техники: продвижение автобизнеса, дилеров и производителей оборудования в соцсетях.",
  },
  {
    slug: "horeca",
    name: "HORECA",
    chipKey: "horeca",
    html: horecaHtml,
    height: horecaH,
    metaTitle: "Кейсы HoReCa — SMM для кафе и ресторанов | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише HoReCa: продвижение кафе, ресторанов и баров в соцсетях. Контент и реклама, которые приводят гостей.",
  },
  {
    slug: "product",
    name: "PRODUCT",
    chipKey: "product",
    html: productHtml,
    height: productH,
    metaTitle: "Кейсы product — SMM для товарного бизнеса | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в товарном бизнесе: продвижение товаров и интернет-магазинов в соцсетях. Визуал, контент и реклама под продажи.",
  },
  {
    slug: "events",
    name: "EVENTS",
    chipKey: "events",
    html: eventsHtml,
    height: eventsH,
    metaTitle: "Кейсы events — SMM для событий и мероприятий | I AM AGENCY",
    metaDescription:
      "Кейсы I AM AGENCY в нише событий: продвижение мероприятий, фестивалей и event-агентств в соцсетях. Контент и реклама под регистрации и продажи билетов.",
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

/* карта для FloatChips на ГЛАВНОЙ: подстрока плашки → отдельная страница направления */
export const caseLinks: Record<string, string> = Object.fromEntries(
  CASES.map((c) => [c.chipKey, `/case/${c.slug}`])
);

/* карта для FloatChips на ХАБЕ /keisy: подстрока плашки → прокрутка к секции на той же странице */
export const caseScrollLinks: Record<string, string> = Object.fromEntries(
  CASES.map((c) => [c.chipKey, `#${c.slug}`])
);
