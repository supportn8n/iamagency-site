/* Страница «Школа SMM», секция «Школа» — из Figma IAM WEB,
   фрейм «Школа» #12446:471. Тёмный фон #1C1C1C.
   Это аккордеон из 4 пунктов (01-04): пункт 01 РАСКРЫТ (показан текст),
   пункты 02-04 свёрнуты (только номер + заголовок).
   Тексты дословно из макета. Единственная растровая картинка —
   декоративный фон «55 3» (imageRef 569dc...), скачать нельзя →
   серая заглушка #E5E3E0 (манифест: shkola.images.json).
   Служебные дубли-слои и векторные SVG-панели из макета опущены
   (см. отчёт разработчику). */

const DARK = "#1C1C1C";
const GRAY = "#9A9895";
const WHITE = "#FFFFFF";
const PH = "#E5E3E0";

/* Inter → letter-spacing -0.05em; Coolvetica → без трекинга */
const numSt = `font-family:Inter,sans-serif;font-weight:400;font-size:55.75px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:${GRAY};margin:0;white-space:nowrap;`;
const titleSt = `font-family:Inter,sans-serif;font-weight:400;font-size:55.75px;line-height:86%;letter-spacing:-0.05em;text-transform:uppercase;color:${WHITE};margin:0;`;
const bodySt = `font-family:Inter,sans-serif;font-weight:400;font-size:26px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;color:${GRAY};margin:0;white-space:pre-line;`;
const moreSt = `font-family:Inter,sans-serif;font-weight:400;font-size:26px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;color:${WHITE};text-decoration:underline;margin:0;white-space:nowrap;`;

const cardBox = (top: number, h: number) =>
  `position:absolute;left:65px;top:${top}px;width:1311px;height:${h}px;background:${DARK};border:2px solid ${GRAY};border-radius:42px;box-shadow:inset 0 4px 4px rgba(0,0,0,0.25);box-sizing:border-box;`;

/* свёрнутый пункт аккордеона: рамка + номер + заголовок */
const collapsedRow = (top: number, num: string, title: string) => `
  <div style="${cardBox(top, 85)}"></div>
  <p style="position:absolute;left:93px;top:${top + 20}px;${numSt}">${num}</p>
  <p style="position:absolute;left:186px;top:${top + 20}px;width:1038px;${titleSt}">${title}</p>`;

export const shkolaHtml = `
<div style="position:relative;width:1440px;height:1024px;background:${DARK};overflow:hidden;">

  <!-- декоративный фон «55 3» (растровая картинка, недоступна) -->
  <img src="/blk/shkola/shkola-01.webp" alt="" style="position:absolute;left:-749px;top:-880px;width:2275.38px;height:1416px;background:${PH};object-fit:cover;" />

  <!-- заголовок секции -->
  <p style="position:absolute;left:623px;top:69px;width:753px;font-family:Coolvetica,sans-serif;font-weight:400;font-size:55.75px;line-height:100%;text-transform:uppercase;color:${GRAY};margin:0;">обучение профессии с нуля</p>
  <!-- надпись «школа SMM» -->
  <p style="position:absolute;left:1205px;top:144px;width:178px;font-family:Inter,sans-serif;font-weight:400;font-size:34px;line-height:86%;letter-spacing:-0.05em;text-transform:lowercase;text-align:justify;color:${WHITE};margin:0;">школа SMM</p>

  <!-- пункт 01 (раскрыт) -->
  <div style="${cardBox(387, 257)}"></div>
  <p style="position:absolute;left:93px;top:407px;${numSt}">01</p>
  <p style="position:absolute;left:186px;top:407px;width:1038px;${titleSt}">почему наш курс лучший на рынке</p>
  <p style="position:absolute;left:93px;top:505px;width:886px;${bodySt}">Обучаем SMM уже 7 лет. Через школу прошли больше 350 человек — сегодня они ведут крупные бренды, работают на удалёнке из любой точки мира, а многие являются действующими менеджерами <span style="text-transform:uppercase">I AM</span></p>
  <p style="position:absolute;left:1194px;top:580px;width:159px;${moreSt}">Подробнее →</p>

  <!-- пункты 02-04 (свёрнуты) -->
  ${collapsedRow(644, "02", "Истории учеников")}
  ${collapsedRow(729, "03", "Кому подойдет")}
  ${collapsedRow(814, "04", "Программа")}

  <!-- CTA -->
  <a href="/#kontakty" style="position:absolute;left:789px;top:902px;width:586px;height:65px;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,#8992E4 0%,#F55D1C 100%);border-radius:96px;box-sizing:border-box;font-family:Inter,sans-serif;font-weight:400;font-size:38.88px;line-height:86%;letter-spacing:-0.05em;text-align:center;color:${WHITE};text-decoration:none;white-space:nowrap;">Оставить заявку на обучение</a>

</div>`;

export const shkolaH = 1024;
