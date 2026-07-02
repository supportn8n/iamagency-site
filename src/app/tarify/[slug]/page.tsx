import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
import { TARIFY, getTarif } from "../tarify";

/* Страница тарифа — тёмный холст 1:1 из Figma (фреймы «Движение» и «ПРОРЫВ»),
   масштабируется BuilderBlock'ом как остальные блоки сайта. */

export function generateStaticParams() {
  return TARIFY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTarif(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: true, follow: true },
  };
}

export default async function TarifPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTarif(slug);
  if (!t) notFound();

  return (
    <>
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <BuilderBlock html={t.html} h={t.height} />
    </>
  );
}
