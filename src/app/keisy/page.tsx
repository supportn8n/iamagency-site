import type { Metadata } from "next";
import BuilderBlock from "../blocks/BuilderBlock";
import FloatChips from "../blocks/FloatChips";
import { portfolioHtml } from "../blocks/gen/portfolioHtml";
import { linksSamePage } from "./links";
import { beautyHtml, beautyH } from "./gen/beautyHtml";
import { fashionHtml, fashionH } from "./gen/fashionHtml";
import { sportHtml, sportH } from "./gen/sportHtml";
import { expertsHtml, expertsH } from "./gen/expertsHtml";
import { realEstateHtml, realEstateH } from "./gen/realEstateHtml";
import { tourismHtml, tourismH } from "./gen/tourismHtml";
import { carsHtml, carsH } from "./gen/carsHtml";
import { horecaHtml, horecaH } from "./gen/horecaHtml";
import { productHtml, productH } from "./gen/productHtml";
import { eventsHtml, eventsH } from "./gen/eventsHtml";

/* Страница «Кейсы» — одностраничник: сверху блок с чипами ниш (как на главной,
   с парящей анимацией; клик по чипу плавно скроллит к разделу), ниже все разделы
   кейсов подряд 1:1 из Figma (фреймы BEAUTY..Events). */

export const metadata: Metadata = {
  title: "Кейсы — портфолио SMM-агентства",
  description:
    "Кейсы I AM AGENCY в разных нишах: beauty, fashion, sport & education, эксперты, недвижимость, туризм, авто, HoReCa, товарный бизнес и события. Реальные результаты продвижения в соцсетях.",
  robots: { index: true, follow: true },
};

const SECTIONS: { id: string; html: string; h: number }[] = [
  { id: "beauty", html: beautyHtml, h: beautyH },
  { id: "fashion", html: fashionHtml, h: fashionH },
  { id: "sport-education", html: sportHtml, h: sportH },
  { id: "experts", html: expertsHtml, h: expertsH },
  { id: "real-estate", html: realEstateHtml, h: realEstateH },
  { id: "tourism", html: tourismHtml, h: tourismH },
  { id: "cars-equipment", html: carsHtml, h: carsH },
  { id: "horeca", html: horecaHtml, h: horecaH },
  { id: "product", html: productHtml, h: productH },
  { id: "events", html: eventsHtml, h: eventsH },
];

export default function KeisyPage() {
  return (
    <>
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      {/* шапка-одностраничник: блок с чипами ниш, клик = скролл к разделу */}
      <FloatChips html={portfolioHtml} links={linksSamePage} />
      {SECTIONS.map((s) => (
        <div key={s.id} id={s.id}>
          <BuilderBlock html={s.html} h={s.h} />
        </div>
      ))}
    </>
  );
}
