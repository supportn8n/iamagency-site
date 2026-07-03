import type { Metadata } from "next";
import Link from "next/link";
import FloatChips from "../blocks/FloatChips";
import { portfolioHtml } from "../blocks/gen/portfolioHtml";
import { caseLinks } from "../case/cases";

/* Хаб «Кейсы» — /keisy. Сверху одна хлебная крошка «Главная → Кейсы»,
   ниже блок с плашками ниш (как на главной, но с анимацией «убегания» от
   курсора). Клик по плашке ведёт на посадочную направления /case/<slug>. */

export const metadata: Metadata = {
  title: "Кейсы — портфолио SMM-агентства",
  description:
    "Кейсы I AM AGENCY в разных нишах: beauty, fashion, sport & education, эксперты, недвижимость, туризм, авто, HoReCa, товарный бизнес и события. Выберите нишу и смотрите результаты продвижения в соцсетях.",
  robots: { index: true, follow: true },
};

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
          gap: 10,
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
      <FloatChips html={portfolioHtml} links={caseLinks} mode="flee" />
    </>
  );
}
