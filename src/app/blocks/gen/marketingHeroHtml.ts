// Hero «Маркетинг» — резиновый, две группы (лево/право), вписан в первый экран.
// Жгут (pink-swirl) стоит НАД буквами «ТИН» заголовка (как в Figma), верх уходит
// под меню. Мраморный цветок и статы — крупные. Фигуры из Hero.svg (с прозрачностью).

export const marketingHeroLeftHtml = `
  <div style="left: 65px; top: 12px; position: absolute; color: #9A9895; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; white-space: nowrap">Главная</div>
  <div style="left: 180px; top: 11px; position: absolute; color: #9A9895; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px">→</div>
  <div style="left: 213px; top: 12px; position: absolute; color: #1C1C1C; font-size: 23.42px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 20.14px; white-space: nowrap">Маркетинг</div>
  <div style="width: 1343px; left: 65px; top: 129px; position: absolute; color: #1C1C1C; font-size: 256.03px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 220.18px; white-space: nowrap">Маркетинг</div>
  <img style="width: 600px; height: 600px; left: 780px; top: -380px; position: absolute" src="/marketing-hero/pink-swirl.png" alt="" />
  <div style="width: 700px; left: 65px; top: 470px; position: absolute; text-align: justify"><span style="color: #1C1C1C; font-size: 30px; font-family: Inter; font-weight: 500; line-height: 26px">Мы помогаем как крупному, так и малому бизнесу решать задачи в Performance и Media маркетинге<br/><br/></span><span style="color: #1C1C1C; font-size: 30px; font-family: Inter; font-weight: 400; line-height: 26px">Детально погружаемся в бизнес и предлагаем стратегию и инструменты, которые работают именно в вашей нише. Создаем посадочные страницы, которые продают</span></div>
  <img style="width: 540px; height: 540px; left: 430px; top: 600px; position: absolute; transform: rotate(30deg); transform-origin: top left" src="/marketing-hero/marble-flower.png" alt="" />
  <div style="width: 290px; height: 175px; left: 65px; top: 795px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 22px"></div>
  <div style="left: 160px; top: 805px; position: absolute; color: white; font-size: 92px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 79px">6+</div>
  <div style="left: 105px; top: 905px; position: absolute; color: white; font-size: 34px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 29px; white-space: nowrap">ЛЕТ ОПЫТА</div>
  <div style="width: 290px; height: 175px; left: 375px; top: 795px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 22px"></div>
  <div style="left: 410px; top: 805px; position: absolute; color: white; font-size: 92px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 79px">400+</div>
  <div style="left: 415px; top: 905px; position: absolute; color: white; font-size: 34px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 29px; white-space: nowrap">ОТЗЫВОВ</div>
  <div style="width: 290px; height: 175px; left: 685px; top: 795px; position: absolute; background: #1C1C1C; box-shadow: 0px 1.99px 1.99px rgba(0,0,0,0.25) inset; border-radius: 22px"></div>
  <div style="left: 722px; top: 805px; position: absolute; color: white; font-size: 92px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 79px">200+</div>
  <div style="left: 725px; top: 905px; position: absolute; color: white; font-size: 34px; font-family: Inter; font-weight: 500; text-transform: uppercase; line-height: 29px; white-space: nowrap">ПРОЕКТОВ</div>
`;

// Правая группа (ширина холста 660): карточка «Как мы работаем» + «Консультация».
export const marketingHeroRightHtml = `
  <div style="width: 571px; height: 300px; left: 24px; top: 540px; position: absolute; background: #F0F0F0; box-shadow: 0px 3.49px 3.49px rgba(0,0,0,0.25) inset; border-radius: 32.28px"></div>
  <div style="width: 554px; height: 80px; left: 32px; top: 548px; position: absolute; background: #1C1C1C; border-radius: 23.83px"></div>
  <div style="left: 102px; top: 562px; position: absolute; color: white; font-size: 51.65px; font-family: Coolvetica; font-weight: 400; text-transform: uppercase; line-height: 51.65px; white-space: nowrap">КАК МЫ РАБОТАЕМ</div>
  <div style="width: 535px; left: 42px; top: 667px; position: absolute; text-align: justify; color: #1C1C1C; font-size: 22.08px; font-family: Inter; font-weight: 400; line-height: 18.99px">Для каждого нового клиента собираем отдельную команду экспертов. На старте погружаемся в бизнес, а после — постоянно анализируем данные, чтобы ничего не упустить</div>
  <div style="width: 554px; height: 48px; left: 32px; top: 782px; position: absolute; background: white; box-shadow: 0px 3.49px 3.49px rgba(0,0,0,0.25); border-radius: 23.83px"></div>
  <div style="left: 238px; top: 797.74px; position: absolute; color: #9A9895; font-size: 19.42px; font-family: Inter; font-weight: 400; line-height: 16.70px; white-space: nowrap">оставить заявку</div>
  <div style="width: 259px; height: 52.28px; left: 336px; top: 903px; position: absolute; background: linear-gradient(90deg, #F55D1C 0%, #1C1C1C 74%); border-radius: 77.23px; outline: 2px #F55D1C solid; outline-offset: -2px; display: flex; justify-content: center; align-items: center">
    <div style="text-align: center; color: white; font-size: 31.27px; font-family: Inter; font-weight: 400; line-height: 26.89px">Консультация</div>
  </div>
`;
