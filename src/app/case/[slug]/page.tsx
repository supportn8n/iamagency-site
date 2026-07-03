import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuilderBlock from "../../blocks/BuilderBlock";
import { CASES, getCase } from "../cases";

/* Посадочная одного направления кейсов — /case/<slug>. Холст 1:1 из Figma
   (в модуле уже есть хлебная крошка «Главная → кейсы <направление>»). */

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
  return {
    title: c.metaTitle,
    description: c.metaDescription,
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

  return (
    <>
      <div className="header-spacer" style={{ background: "#FFFFFF" }} />
      <BuilderBlock html={c.html} h={c.height} />
    </>
  );
}
