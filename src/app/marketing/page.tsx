import BuilderBlock from "../blocks/BuilderBlock";
import SkidkaCountdown from "../blocks/SkidkaCountdown";
import MarqueeBlock from "../blocks/MarqueeBlock";
import AppearBlock from "../blocks/AppearBlock";
import HoverMarkers from "../blocks/HoverMarkers";
import { napravleniyaHtml } from "../blocks/gen/napravleniyaHtml";
import { keysyHtml } from "../blocks/gen/keysyHtml";
import { processHtml, processH } from "../blocks/gen/processHtml";
import { sozdanieHtml } from "../blocks/gen/sozdanieHtml";
import { qaHtml } from "../blocks/gen/qaHtml";
import { skidkaHtml, skidkaH } from "../blocks/gen/skidkaHtml";
import { futerHtml } from "../blocks/gen/futerHtml";

/* Отдельная посадочная «Маркетинг» — открывается по кнопке «Узнать больше»
   с блока Маркетинг на главной. Здесь вся подробная инфа про направления. */
export default function MarketingPage() {
  return (
    <>
      {/* отступ под липкий хедер, чтобы он не накрывал «НАПРАВЛЕНИЯ» */}
      <div className="header-spacer" />
      <AppearBlock html={napravleniyaHtml} targets={["Класс"]} />
      <HoverMarkers html={keysyHtml} labels={["1", "2", "3", "4", "5"]} />
      <BuilderBlock html={processHtml} h={processH} />
      <MarqueeBlock html={sozdanieHtml} rowTop={11} rowHeight={174} />
      <BuilderBlock html={qaHtml} />
      <SkidkaCountdown html={skidkaHtml} h={skidkaH} />
      <BuilderBlock html={futerHtml} />
    </>
  );
}
