import Link from "next/link";

const nav = [
  { label: "Главная", href: "#" },
  { label: "Услуги", href: "#services" },
  { label: "Маркетинг", href: "#marketing" },
  { label: "Кейсы", href: "#cases" },
  { label: "Блог", href: "#blog" },
];

const stats = [
  { value: "450+", label: "проектов в работе" },
  { value: "18", label: "специалистов в команде" },
  { value: "7 лет", label: "на рынке SMM" },
  { value: "+30%", label: "средний рост охватов" },
];

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
            I&apos;M&nbsp;AGENCY
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Обсудить проект
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
          <div className="flex flex-col justify-center">
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              SMM-агентство полного цикла
            </span>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              SMM-
              <br />
              АГЕНТСТВО
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted">
              Ведём соцсети, запускаем таргет и снимаем контент под ключ.
              Превращаем подписчиков в клиентов, а охваты — в продажи.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-accent px-7 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Оставить заявку
              </a>
              <a
                href="#cases"
                className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
              >
                Смотреть кейсы
              </a>
            </div>
          </div>

          {/* Visual placeholder — сюда встанет 3D-рендер из Figma */}
          <div className="relative flex items-center justify-center">
            <div className="aspect-square w-full max-w-sm rounded-3xl bg-gradient-to-br from-accent/30 via-accent/5 to-transparent ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-ink-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-2 px-2 py-12 ${
                i === 2 ? "text-accent" : ""
              }`}
            >
              <span className="font-display text-4xl font-extrabold md:text-5xl">
                {s.value}
              </span>
              <span className="text-sm text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Следующие секции соберём по дизайну */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-muted">
          Дальше по дизайну: Услуги · Портфолио · Маркетинг · Отзывы · Блог · Контакты
        </p>
      </section>

      <footer className="mt-auto border-t border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-muted">
          © 2026 I&apos;m Agency · iamagency.su
        </div>
      </footer>
    </>
  );
}
