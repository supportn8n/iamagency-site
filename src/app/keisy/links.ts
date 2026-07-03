/* Карта чипов-ниш блока «Кейсы»: подстрока названия (в нижнем регистре) → id якоря
   раздела на странице /keisy. Порядок здесь же задаёт порядок разделов на странице. */

export const CASE_SECTIONS: { key: string; id: string }[] = [
  { key: "beauty", id: "beauty" },
  { key: "fashion", id: "fashion" },
  { key: "sport", id: "sport-education" },
  { key: "experts", id: "experts" },
  { key: "real estate", id: "real-estate" },
  { key: "tourism", id: "tourism" },
  { key: "cars", id: "cars-equipment" },
  { key: "horeca", id: "horeca" },
  { key: "product", id: "product" },
  { key: "events", id: "events" },
];

/* href-карты для FloatChips */
export const linksSamePage: Record<string, string> = Object.fromEntries(
  CASE_SECTIONS.map((s) => [s.key, `#${s.id}`])
);

export const linksFromHome: Record<string, string> = Object.fromEntries(
  CASE_SECTIONS.map((s) => [s.key, `/keisy#${s.id}`])
);
