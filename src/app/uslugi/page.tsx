import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_CATALOG } from "./serviceCatalog";
import styles from "./uslugi-page.module.css";

export const metadata: Metadata = {
  title: "Услуги SMM-агентства",
  description:
    "Услуги I am Agency: брендбук и SMM-стратегия, ведение соцсетей, маркетинг и продвижение, создание сайтов, контент и съёмки.",
};

export default function UslugiPage() {
  return (
    <main className={styles.page}>
      <div className="header-spacer" />

      <section className={styles.directory} aria-labelledby="services-title">
        <img
          className={styles.directoryFigure}
          src="/blk/uslugi/twisted_fingers.png"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.inner}>
          <p className={styles.eyebrow}>I AM AGENCY</p>
          <h1 id="services-title">Услуги</h1>
          <nav className={styles.directoryList} aria-label="Перечень услуг">
            {SERVICE_CATALOG.map((service) => (
              <a className={styles.directoryLink} href={`#${service.id}`} key={service.id}>
                <span>{service.number}</span>
                <strong>{service.title}</strong>
                <span className={styles.directoryArrow} aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.services} aria-label="Описание услуг">
        {SERVICE_CATALOG.map((service) => (
          <article className={styles.service} id={service.id} key={service.id}>
            <div className={styles.inner}>
              <div className={styles.serviceNumber}>{service.number}</div>
              <div className={styles.serviceBody}>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <div className={styles.actions}>
                  <Link className={styles.moreLink} href={service.href}>
                    {service.linkLabel}<span aria-hidden="true"> ↗</span>
                  </Link>
                  <Link className={styles.contactLink} href="/#kontakty">
                    Обсудить задачу
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.finalCta}>
        <div className={styles.inner}>
          <p>Подберём только те инструменты, которые нужны вашему бизнесу.</p>
          <Link href="/#kontakty">Получить бесплатную консультацию</Link>
        </div>
      </section>
    </main>
  );
}
