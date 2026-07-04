import type { Metadata } from "next";
import Link from "next/link";
import BuilderBlock from "../blocks/BuilderBlock";
import FloatChips from "../blocks/FloatChips";
import { portfolioHtml } from "../blocks/gen/portfolioHtml";
import { CASES, caseScrollLinks } from "../case/cases";

/* Хаб «Кейсы» — /keisy. Одностраничник: сверху одна хлебная крошка
   «Главная → Кейсы» + блок с плашками ниш (анимация «убегания»), ниже все 10
   кейсов подряд. Клик по плашке = плавная прокрутка к секции этого кейса.
   Внутри секций собственная крошка убрана (остаётся только на /case/<slug>). */

export const metadata: Metadata = {
  title: "Кейсы — портфолио SMM-агентства",
  description:
    "Кейсы I AM AGENCY в разных нишах: beauty, fashion, sport & education, эксперты, недвижимость, туризм, авто, HoReCa, товарный бизнес и события. Результаты продвижения в соцсетях.",
  robots: { index: true, follow: true },
};

/* убрать внутреннюю хлебную крошку из холста секции (она нужна только на /case) */
const stripCrumb = (html: string) =>
  html.replace(
    /<div style="position:absolute;left:65px;top:30px;[^"]*">[\s\S]*?<\/div>/,
    ""
  );

export default function KeisyPage() {
  return (
    <>
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      {/* единственная хлебная крошка — над блоком «доказательства эффективности» */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "clamp(12px,1.5vw,24px) clamp(20px,4.5vw,65px) 0",
          display: "flex",
          gap: 13,
          alignItems: "baseline",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(13px,1.1vw,16px)",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
        }}
      >
        <Link href="/" style={{ color: "#9A9895", textDecoration: "none" }}>
          Главная
        </Link>
        <span style={{ color: "#9A9895" }}>→</span>
        <span style={{ color: "#1C1C1C" }}>Кейсы</span>
      </div>
      {/* плашки: клик = прокрутка к секции */}
      <FloatChips html={portfolioHtml} links={caseScrollLinks} mode="flee" />
      {/* все кейсы подряд, у каждого id = slug для якорной прокрутки */}
      {CASES.map((c) => (
        <div key={c.slug} id={c.slug}>
          <BuilderBlock html={stripCrumb(c.html)} h={c.height} />
        </div>
      ))}
    </>
  );
}
