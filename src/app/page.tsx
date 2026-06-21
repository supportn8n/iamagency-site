import Partners from "./blocks/Partners";
import BuilderBlock from "./blocks/BuilderBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";
import ContactBlock from "./blocks/ContactBlock";
import { heroHtml } from "./blocks/gen/heroHtml";
import { utpHtml } from "./blocks/gen/utpHtml";
import { uslugiHtml } from "./blocks/gen/uslugiHtml";
import { tarifyHtml } from "./blocks/gen/tarifyHtml";
import { portfolioHtml } from "./blocks/gen/portfolioHtml";
import { marketingHtml } from "./blocks/gen/marketingHtml";
import { otzyvyHtml } from "./blocks/gen/otzyvyHtml";
import { shkolaHtml } from "./blocks/gen/shkolaHtml";
import { blogHtml } from "./blocks/gen/blogHtml";
import { kontaktyHtml } from "./blocks/gen/kontaktyHtml";
import { futerHtml } from "./blocks/gen/futerHtml";

/* Главная 1:1 из экспортов Builder.io. Между Hero и УТП — лента Партнёров.
   Блок «Маркетинг» — тизер: по кнопке «Узнать больше» ведёт на /marketing
   (там Направления, Кейсы, Создание, Q&A, Процесс, Скидка). */
export default function Home() {
  return (
    <>
      <BuilderBlock html={heroHtml} />
      <Partners />
      <BuilderBlock html={utpHtml} />
      <BuilderBlock html={uslugiHtml} />
      <BuilderBlock html={tarifyHtml} />
      <BuilderBlock html={portfolioHtml} />
      {/* подтягиваем вверх на 2px — закрываем зазор между половинками спирали на стыке блоков */}
      <div style={{ marginTop: "-2px" }}>
        <BuilderBlock html={marketingHtml} />
      </div>
      <MarqueeBlock html={otzyvyHtml} rowTop={275} rowHeight={475} speed={32} />
      <BuilderBlock html={shkolaHtml} />
      <BuilderBlock html={blogHtml} />
      <ContactBlock html={kontaktyHtml} />
      <BuilderBlock html={futerHtml} />
    </>
  );
}
