// Hero «Маркетинг» — точное соответствие Figma-фрейму 78:96 (1440×1024).
// Все координаты, размеры, шрифты, межбуквенные интервалы и выравнивание взяты
// напрямую из макета через Figma API. Шрифт Inter везде с letter-spacing -5%
// (-0.05em); Coolvetica — без интервала. Картинки фигур — экспорт узлов Figma.

export const marketingHeroLeftHtml = `
  <!-- хлебные крошки -->
  <div style="left: 65px; top: 31px; position: absolute; color: #9A9895; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em; white-space: nowrap">Главная</div>
  <div style="left: 180px; top: 30px; position: absolute; color: #9A9895; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em">→</div>
  <div style="left: 213px; top: 31px; position: absolute; color: #1C1C1C; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em; white-space: nowrap">Маркетинг</div>

  <!-- заголовок -->
  <div style="width: 1343px; left: 65px; top: 129px; position: absolute; color: #1C1C1C; font-size: 256.03px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 220.18px; white-space: nowrap; z-index: 0">Маркетинг</div>

  <!-- жгут (3D-фигура) сверху, поверх текста -->
  <img style="width: 1006px; height: 1006px; left: 585px; top: -785px; position: absolute; z-index: 1" src="/marketing-hero/pink-swirl.webp" alt="" />

  <!-- абзац: Inter -5%, justify, ширина 581 → 2 строки + 4 строки как в Figma -->
  <div style="width: 595px; left: 65px; top: 406px; position: absolute; color: #1C1C1C; font-family: Inter; font-size: 25.27px; line-height: 21.73px; letter-spacing: -0.05em; text-align: justify"><span style="font-weight: 500">Мы помогаем как крупному, так и малому бизнесу решать задачи в Performance и Media маркетинге<br/><br/></span><span style="font-weight: 400">Детально погружаемся в бизнес и предлагаем стратегию и инструменты, которые работают именно в вашей нише. Создаем посадочные страницы, которые продают</span></div>

  <!-- мраморный цветок -->
  <img style="width: 532px; height: 532px; left: 191px; top: 512px; position: absolute" src="/marketing-hero/marble-flower.webp" alt="" />

  <!-- статистика: 3 бокса (цифры Coolvetica без интервала, подписи Inter -5%) -->
  <div style="width: 187px; height: 114px; left: 59px; top: 841px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 15px"></div>
  <div style="left: 122px; top: 853px; position: absolute; color: white; font-size: 59.31px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 51.01px">6+</div>
  <div style="left: 88px; top: 916px; position: absolute; color: white; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em; white-space: nowrap">ЛЕТ ОПЫТА</div>

  <div style="width: 187px; height: 114px; left: 259px; top: 841px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 15px"></div>
  <div style="left: 294px; top: 853px; position: absolute; color: white; font-size: 59.31px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 51.01px">400+</div>
  <div style="left: 297px; top: 916px; position: absolute; color: white; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em; white-space: nowrap">ОТЗЫВОВ</div>

  <div style="width: 187px; height: 114px; left: 459px; top: 841px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 15px"></div>
  <div style="left: 494px; top: 853px; position: absolute; color: white; font-size: 59.31px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 51.01px">200+</div>
  <div style="left: 492px; top: 916px; position: absolute; color: white; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; letter-spacing: -0.05em; white-space: nowrap">ПРОЕКТОВ</div>

  <!-- карточка «Как мы работаем» -->
  <div style="width: 571px; height: 300px; left: 804px; top: 492px; position: absolute; background: #F0F0F0; box-shadow: 0px 3.49px 3.49px rgba(0,0,0,0.25) inset; border-radius: 32px"></div>
  <div style="width: 554px; height: 80px; left: 812px; top: 500px; position: absolute; background: #1C1C1C; border-radius: 24px"></div>
  <div style="left: 882px; top: 514px; position: absolute; color: white; font-size: 51.65px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 51.65px; white-space: nowrap">КАК МЫ РАБОТАЕМ</div>
  <div style="width: 535px; left: 822px; top: 619px; position: absolute; color: #1C1C1C; font-size: 22.08px; font-family: Inter; font-weight: 400; line-height: 18.99px; letter-spacing: -0.05em; text-align: justify">Для каждого нового клиента собираем отдельную команду экспертов. На старте погружаемся в бизнес, а после — постоянно анализируем данные, чтобы ничего не упустить</div>
  <div style="width: 554px; height: 48px; left: 812px; top: 734px; position: absolute; background: white; box-shadow: 0px 3.49px 3.49px rgba(0,0,0,0.25); border-radius: 24px"></div>
  <div style="left: 1018px; top: 750px; position: absolute; color: #9A9895; font-size: 19.42px; font-family: Inter; font-weight: 400; line-height: 16.70px; letter-spacing: -0.05em; white-space: nowrap">оставить заявку</div>

  <!-- кнопка Консультация -->
  <div style="width: 259px; height: 52px; left: 1116px; top: 903px; position: absolute; background: linear-gradient(90deg, #F55D1C 0%, #1C1C1C 74%); border-radius: 77px; outline: 2px #F55D1C solid; outline-offset: -2px; display: flex; justify-content: center; align-items: center">
    <div style="text-align: center; color: white; font-size: 31.27px; font-family: Inter; font-weight: 400; line-height: 26.89px; letter-spacing: -0.05em">Консультация</div>
  </div>
`;

// Правая группа больше не используется — вся вёрстка в натуральных координатах слева.
export const marketingHeroRightHtml = ``;
