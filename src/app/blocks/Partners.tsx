/* ===== Партнёры — бесконечная лента логотипов НА ВСЮ ШИРИНУ ===== */
/* Прозрачная полоса: голубая фигура идёт СПЛОШНЯКОМ за логотипами.
   Фигура та же, что в Hero (969×730 @ left:125 в холсте 1440): Hero показывает
   строки 0–462, эта лента — 462–537, УТП — 537–730. Единицы cqw (1% ширины
   контейнера) → полоса фигуры совпадает с Hero/УТП на любой ширине экрана.
   logos.png — прозрачные логотипы (СБЕР…ROOF + Dr.Reddy's), 4 копии, -50% цикл. */
export default function Partners() {
  return (
    <div style={{ containerType: "inline-size" }} className="w-full">
      <section
        aria-label="Партнёры"
        className="relative w-full overflow-hidden"
        style={{ height: "5.2cqw" }}
      >
        {/* голубая фигура за логотипами (та же, что в Hero) */}
        <img
          src="/blk/hero/blue_full2.png"
          alt=""
          aria-hidden
          draggable={false}
          style={{
            position: "absolute",
            left: "8.68cqw",
            top: "-32.1cqw",
            width: "67.3cqw",
            height: "50.7cqw",
            maxWidth: "none",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {/* лента логотипов поверх фигуры */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="marquee-track absolute left-0 top-0 h-full">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src="/partners/logos.png"
                alt={i === 0 ? "Партнёры: СБЕР, ВТБ, MANUL, Villo, ESKO BAR, ROOF, Dr.Reddy's и другие" : ""}
                aria-hidden={i !== 0}
                draggable={false}
                className="h-full w-auto max-w-none select-none"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
