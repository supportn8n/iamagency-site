// Otzyvy tablet version from Figma frame 366:6552 (Tablet, 768x660).
export const otzyvyTabletH = 660;

const card = (
  x: number,
  title: string,
  subtitle: string,
  text: string,
  accent: string,
  avatar: string,
  textTop: number,
  textH: number,
  titleW: number,
  subtitleW = 190.17
) => `
<div style="width:308.25px;height:288.41px;position:absolute;left:${x}px;top:201px">
  <div style="width:308.25px;height:288.41px;border-radius:20.155px;background:rgba(255,255,255,.27);box-shadow:0 -2.182px 2.182px 1.637px rgba(255,255,255,.39) inset;position:absolute;left:0;top:0"></div>
  <div style="width:282.61px;height:54.56px;border-radius:27.279px;background:linear-gradient(90deg, ${accent} 27.88%, #FFF 100%);position:absolute;left:13.64px;top:13.09px"></div>
  <img style="width:49.21px;height:48.61px;border-radius:27.279px;position:absolute;left:243.03px;top:16.41px;object-fit:cover" src="${avatar}" alt="" />
  <div layer-name="${title}" style="color:#FFF;font-family:Inter;font-size:20.757px;font-weight:500;line-height:86%;letter-spacing:-1.038px;position:absolute;left:31.64px;top:19.64px;width:${titleW}px;height:18px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:500;font-size:20.757px;color:#FFF">${title}</span></div>
  <div layer-name="${subtitle}" style="width:${subtitleW}px;color:#FFF;font-family:Inter;font-size:8.849px;font-weight:400;line-height:86%;letter-spacing:-0.442px;position:absolute;left:31.64px;top:43.14px;height:16px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:8.849px;color:#FFF">${subtitle}</span></div>
  <div layer-name="${text}" style="width:286.77px;color:#FFF;font-family:Inter;font-size:13.367px;font-weight:400;line-height:86%;letter-spacing:-0.668px;position:absolute;left:13.36px;top:${textTop}px;height:${textH}px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:13.367px;color:#FFF">${text}</span></div>
</div>`;

export const otzyvyTabletHtml = `<div style="position:absolute;left:0;top:0;width:768px;height:660px;background:#1C1C1C;overflow:visible">
<img layer-name="55 2" style="width:1215.4px;height:756.36px;position:absolute;left:-423px;top:201px;object-fit:contain" src="/blk/otzyvy/glass_tablet.webp" alt="" />
<a href="/#kontakty" style="display:flex;width:198.17px;height:34.72px;justify-content:center;align-items:center;border-radius:51.288px;border:1.331px solid #FFF;background:#FFF;position:absolute;left:530px;top:586px;text-decoration:none">
  <span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:21px;line-height:86%;letter-spacing:-1.038px;color:#1C1C1C;white-space:nowrap">Начать работу</span>
</a>
<div layer-name="Отзывы" style="color:#FFF;font-family:Coolvetica;font-size:55.402px;font-weight:400;line-height:86%;text-transform:uppercase;position:absolute;left:40px;top:90px;width:202px;height:48px;white-space:nowrap"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:55px;color:#FFF">Отзывы</span></div>
${card(
  233.04,
  "Юлия",
  "Fancy decor, оформление мероприятий под ключ",
  "Мы работаем с командой SMM-специалистов уже третий месяц и очень довольны результатом. За это время заметно выросли охваты и увеличилось число подписчиков,контент-план составляется на месяц вперёд именно так, как мы и хотели. Это очень удобно и помогает лучше планировать работу.<br/>Отдельно хочется отметить, что с командой очень легко и приятно общаться всегда на связи, быстро реагируют и учитывают все пожелания.<br/>Спасибо вам за отличную работу! Обязательно будем продолжать сотрудничество дальше.",
  "#FFAD19",
  "/blk/otzyvy/avatar-yulia-tablet.webp",
  82.38,
  187,
  55,
  103.66
)}
${card(
  -123,
  "Максим",
  "BELOUSOV STUDIO архитектурное бюро",
  "Работаем уже продолжительное время, и хочу оставить объективный отзыв.<br/>Если вам нужны настоящие профессионалы для работы с соцсетями, то вы по адресу. Мне создали уникальный продукт, который выделяется среди конкурентов. До сих пор не верится, что это было возможно! Честно говоря, долго подбираю слова, но так и не могу полностью выразить свои эмоции. Команда I AM&nbsp; — это настоящий бриллиант, который мне удалось найти здесь",
  "#90BEE9",
  "/blk/otzyvy/avatar-maxim-tablet.webp",
  91.74,
  143,
  77,
  103.66
)}
${card(
  589.08,
  "Елена и Георгий",
  "Travel Times&nbsp; Семейный бренд путешествий по всему миру",
  "SMM-команда, с которой легко работать и приятно видеть результат<br/>Мы перепробовали несколько подходов к ведению соцсетей: были и фрилансеры, и внутренние сотрудники, и агентства. С текущей SMM-командой нашли то, что искали — системность, профессионализм и человеческое отношение. Больше всего ценим прозрачность и скорость Всегда понятно, что делается, зачем и какой от этого ожидать эффект.Правки в течение пары часов, посты — без опозданий, отчётность — вовремя.",
  "#8992E4",
  "/blk/otzyvy/avatar-elena-georgiy-tablet.webp",
  91.74,
  154,
  153
)}
${card(
  945.12,
  "Антон",
  "Connected show&nbsp; организация концертов по всему миру",
  "С агентством работаем каждый сезон проведения концертов на о. Бали Крутой продакшен и исполнение, специалисты из команды обеспечивали платный трафик и солд аут на все мероприятия",
  "#F55D1C",
  "/blk/otzyvy/avatar-anton-tablet.webp",
  128.81,
  66,
  58
)}
${card(
  1291.43,
  "Наталья",
  "Altay village директор по развитию проекта",
  "Работаем с командой больше 3 лет, очень довольны сотрудничеством! Ребята разработали стратегию&nbsp;для нас и полностью закрывают все услуги онлайн маркетинга",
  "#90BEE9",
  "/blk/otzyvy/avatar-natalia-tablet.webp",
  128.81,
  66,
  79
)}
${card(
  1637.75,
  "Анастасия",
  "Личный экспертный блог",
  "Хочу поблагодарить вашу команду за работу Когда вы приступили к нашему проекту, стало намного понятнее, куда двигаться с точки зрения контента. Вы предложили очень хорошие варианты и глубоко погрузились в наш проект, хотя он достаточно нестандартный и всё постоянно меняется При этом вы лояльно относитесь к правкам и изменениям. Чувствуется профессионализм и то, что вы давно на рынке Спасибо вам большое!",
  "#FFAD19",
  "/blk/otzyvy/avatar-anastasia-tablet.webp",
  94.17,
  154,
  101
)}
</div>`;
