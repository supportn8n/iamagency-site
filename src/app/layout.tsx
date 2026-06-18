import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iamagency.su"),
  title: {
    default: "I'm Agency — SMM-агентство полного цикла",
    template: "%s — I'm Agency",
  },
  description:
    "SMM-агентство I'm Agency: ведение соцсетей, таргетированная реклама, контент и продакшн под ключ. 7 лет на рынке, 450+ проектов.",
  openGraph: {
    title: "I'm Agency — SMM-агентство полного цикла",
    description:
      "Ведение соцсетей, таргет, контент и продакшн под ключ. 7 лет на рынке, 450+ проектов.",
    url: "https://iamagency.su",
    siteName: "I'm Agency",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-white">
        {children}
      </body>
    </html>
  );
}
