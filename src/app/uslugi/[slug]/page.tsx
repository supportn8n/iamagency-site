import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
import { USLUGI, getUsluga } from "../uslugi";

/* Страница услуги — тёмный холст 1:1 из Figma (фреймы «Услуги 1..4»),
   масштабируется BuilderBlock'ом как остальные блоки сайта. */

export function generateStaticParams() {
  return USLUGI.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = getUsluga(slug);
  if (!u) return {};
  return {
    title: u.metaTitle,
    description: u.metaDescription,
    robots: { index: true, follow: true },
  };
}

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = getUsluga(slug);
  if (!u) notFound();

  return (
    <>
      <div className="header-spacer" style={{ background: "#1C1C1C" }} />
      <BuilderBlock html={u.html} h={u.height} />
    </>
  );
}
