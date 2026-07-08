# Хендофф: адаптация iamagency-site под планшет+мобайл (для Codex)

## Что за проект
Next.js 16, `c:\Users\gromo\OneDrive\Рабочий стол\Курс\iamagency-site`. Прод: https://iamagency-site.vercel.app (git: supportn8n/iamagency-site, ветка main).
Сайт собран из Figma 1:1 холстами (абсолютное позиционирование). Десктоп готов. Нужно добавить планшет (768) и мобайл (375) из Figma и подключить по ширине экрана.

## Архитектура (уже есть)
- `src/app/blocks/BuilderBlock.tsx` — рендерит холст, масштабирует по ширине: пропсы `w` (ширина холста: 1440 десктоп / 768 планшет / 375 мобайл), `h`, `html`, `overflow`.
- `src/app/blocks/ResponsiveBlock.tsx` — переключатель: `desktopHtml/desktopH`, `tabletHtml/tabletH` (рендерится с w=768), `mobileHtml/mobileH` (w=375, опционален). CSS-классы в globals.css: `rb-desktop` >900px, `rb-tablet` 600–900px, `rb-mobile` <600px.
- Модули блоков: `src/app/blocks/gen/<name>Html.ts` (десктоп 1440), `<name>TabletHtml.ts` (холст width:768), `<name>MobileHtml.ts` (width:375). Экспорт `xTabletHtml` + `xTabletH`.
- Образцы готовых планшетных модулей: `heroTabletHtml.ts`, `utpTabletHtml.ts`, `uslugiTabletHtml.ts`, `tarifyTabletHtml.ts`.
- Чек-лист прогресса: `RESPONSIVE-GOAL.md` (бери первый `[ ]`, отмечай `[x]` / `[~]`).

## Figma
Файл `197KqVv6GjBDHHypLH55K9`. Страницы: Desktop `#0:1`, Tablet `#354:2`, Mobile `#354:3635`.
- Данные фрейма: `curl -H "X-Figma-Token: <figd из ../.mcp.json>" "https://api.figma.com/v1/files/197KqVv6GjBDHHypLH55K9/nodes?ids=<nodeId>"` (MCP-инструмент бывает отключён — curl работает).
- Есть сохранённый дамп Tablet-страницы (node 354:2) в `~/.claude/projects/.../tool-results/mcp-figma-get_figma_data-*.txt` (форматированный, но у части карточек внутренности схлопнуты).
- Картинки: `/v1/files/<key>/images` отдаёт imageRef→URL (лимита нет); crop по `cropTransform` из данных фрейма. Образцы: `tools/hero_figures.js`, `tools/crop_images.js`. Ассеты в `public/blk/*`.

## ГЛАВНЫЕ ГРАБЛИ (не наступать)
1. **Планшетный холст строй как `width:768px` (мобайл 375)** — BuilderBlock масштабирует по своей ширине. (Был баг: хардкод 1440 → холсты 768 рендерились в левой половине. Уже починен.)
2. **При подключении импортируй высоту десктопа** (`import { xHtml, xH }`), иначе билд падает `Cannot find name 'xH'`.
3. **Карточки в дампе часто схлопнуты** (пустые GROUP). Тогда: curl конкретный nodeId (иногда приходит) ИЛИ бери контент из десктопного модуля и переверстай под ширину, пометь `[~]`.
4. **Локальный сервер:** `npx next start -p <порт>` ТОЛЬКО фоном (не в одной команде со скриншотами — умирает). Перед стартом `npx next build` и проверь, что есть `.next/BUILD_ID`.
5. **Проверяй скрином на 768 и 375, не ломая десктоп (1440).**
6. **Компонентные блоки** (Partners, FloatChips=Портфолио, MarqueeBlock=Отзывы, ContactBlock=Контакты) — планшет/мобайл-html передавай пропсом ВНУТРЬ компонента (там свой BuilderBlock).

## Деплой (после каждого блока)
`npx next build` → `npx vercel --prod --yes` (без песочницы) → `npx vercel alias set <deploy-url-без-https> iamagency-site.vercel.app` → `git add -A && git commit && git push origin main` (push-protection режет секреты — токены в код не коммить) → `pkill -f "next start"`.

## Сделано
Инфра (BuilderBlock w-fix, ResponsiveBlock 3 брейкпоинта). Планшет: Hero, УТП, Услуги, Тарифы — на всю ширину. Hero-фигуры доведены (яйцо, синяя как в Figma).

## Осталось (по RESPONSIVE-GOAL.md)
Планшет главной: Портфолио, Маркетинг, Отзывы, Школа(тизер), Блог, Контакты, Партнёры, Футер. Потом ВЕСЬ мобайл (375). Потом отдельные страницы (планшет+мобайл): /keisy, /case/[slug], /uslugi/[slug], /tarify/[slug], /shkola-smm, /marketing.

## Метод за проход
Взять первый `[ ]` → собрать `<name>TabletHtml.ts` (768) [и/или Mobile 375] из Figma → подключить (ResponsiveBlock или проп в компонент, не забыть импорт высоты) → build → сервер фоном → скрин 768/375, десктоп цел → деплой → git → отметить в RESPONSIVE-GOAL.md.
