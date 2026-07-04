import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
import { futerHtml, futerH } from "../../blocks/gen/futerHtml";
import { CASES, getCase } from "../cases";

/* Посадочная одного направления кейсов — /case/<slug>. Сверху холст 1:1 из Figma
   (с хлебной крошкой), ниже — SEO-блок (H1 + текст + FAQ + перелинковка) и футер.
   Разметка BreadcrumbList + FAQPage отдаётся в JSON-LD. */

const SITE = "https://iamagency.su";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const url = `${SITE}/case/${c.slug}`;
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/case/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      siteName: "I am Agency",
      locale: "ru_RU",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const h1 = c.h1 || `Кейсы SMM: ${c.name}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Кейсы", item: `${SITE}/keisy` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${SITE}/case/${c.slug}` },
      ],
    },
  ];
  if (c.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      <BuilderBlock html={c.html} h={c.height} />

      {/* SEO-блок: заголовок, текст, FAQ, перелинковка */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(32px,5vw,72px) clamp(20px,5vw,40px)",
          fontFamily: "Inter, sans-serif",
          color: "#1C1C1C",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display), Inter, sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(28px,5vw,56px)",
            lineHeight: 1.0,
            letterSpacing: "-.01em",
            margin: "0 0 24px",
          }}
        >
          {h1}
        </h1>

        {c.intro?.map((p, i) => (
          <p key={i} style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, margin: "0 0 16px", color: "#3a3a3a" }}>
            {p}
          </p>
        ))}

        {c.faq?.length ? (
          <>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, margin: "40px 0 20px" }}>
              Частые вопросы
            </h2>
            <div>
              {c.faq.map((f, i) => (
                <details
                  key={i}
                  style={{ borderTop: "1px solid #e5e3e0", padding: "16px 0" }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      listStyle: "none",
                      fontSize: "clamp(17px,1.6vw,21px)",
                      fontWeight: 600,
                    }}
                  >
                    {f.q}
                  </summary>
                  <p style={{ margin: "12px 0 0", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "#3a3a3a" }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </>
        ) : null}

        {/* перелинковка */}
        <nav style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "12px 24px", fontSize: 16 }}>
          <Link href="/keisy" style={{ color: "#F55D1C", fontWeight: 600 }}>← Все кейсы</Link>
          <Link href="/#uslugi" style={{ color: "#1C1C1C" }}>Услуги</Link>
          <Link href="/marketing" style={{ color: "#1C1C1C" }}>Маркетинг</Link>
          <Link href="/#kontakty" style={{ color: "#1C1C1C" }}>Оставить заявку</Link>
        </nav>
      </section>

      <BuilderBlock html={futerHtml} h={futerH} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
