import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iamagency.su"),
  title: {
    default: "I am Agency — SMM-агентство полного цикла",
    template: "%s — I am Agency",
  },
  description:
    "SMM-агентство I am Agency: ведение соцсетей, таргет, контент и продакшн под ключ. 7 лет в нише, 450+ довольных клиентов.",
  openGraph: {
    title: "I am Agency — SMM-агентство полного цикла",
    description:
      "Ведение соцсетей, таргет, контент и продакшн под ключ. 7 лет в нише, 450+ довольных клиентов.",
    url: "https://iamagency.su",
    siteName: "I am Agency",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
