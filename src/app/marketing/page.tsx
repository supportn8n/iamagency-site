import BuilderBlock from "../blocks/BuilderBlock";
import HeroBlock from "../blocks/HeroBlock";
import SkidkaCountdown from "../blocks/SkidkaCountdown";
import MarqueeBlock from "../blocks/MarqueeBlock";
import AppearBlock from "../blocks/AppearBlock";
import HoverMarkers from "../blocks/HoverMarkers";
import DirectionLinks from "../blocks/DirectionLinks";
import { marketingHeroLeftHtml, marketingHeroRightHtml } from "../blocks/gen/marketingHeroHtml";
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
      {/* отступ под липкий хедер */}
      <div className="header-spacer" />
      {/* Hero «Маркетинг» — резиновый, на всю ширину, вписан в первый экран */}
      <HeroBlock leftHtml={marketingHeroLeftHtml} rightHtml={marketingHeroRightHtml} />
      <AppearBlock html={napravleniyaHtml} targets={["Класс"]} />
      {/* делает «+»/заголовки готовых направлений ссылками на их лендинги */}
      <DirectionLinks />
      <HoverMarkers html={keysyHtml} labels={["1", "2", "3", "4", "5"]} />
      <BuilderBlock html={processHtml} h={processH} />
      <MarqueeBlock html={sozdanieHtml} rowTop={11} rowHeight={174} />
      <BuilderBlock html={qaHtml} />
      <SkidkaCountdown html={skidkaHtml} h={skidkaH} />
      <BuilderBlock html={futerHtml} />
    </>
  );
}
