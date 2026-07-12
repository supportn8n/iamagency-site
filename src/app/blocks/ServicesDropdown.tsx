"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICE_CATALOG } from "../uslugi/serviceCatalog";
import styles from "./ServicesDropdown.module.css";

type Position = { left: number; top: number; width: number };

const isServicesTrigger = (target: EventTarget | null) => {
  const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a") : null;
  if (!anchor) return null;
  const label = anchor.textContent?.trim().toLocaleLowerCase("ru-RU");
  if (label !== "услуги") return null;
  const rect = anchor.getBoundingClientRect();
  return rect.top >= -2 && rect.bottom <= 150 ? anchor : null;
};

export default function ServicesDropdown() {
  const [position, setPosition] = useState<Position | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setPosition(null), 180);
  };

  useEffect(() => {
    const openFor = (anchor: HTMLAnchorElement) => {
      cancelClose();
      anchor.setAttribute("href", "/#uslugi");
      const rect = anchor.getBoundingClientRect();
      const width = Math.min(650, window.innerWidth - 32);
      const left = Math.max(16, Math.min(window.innerWidth - width - 16, rect.left - 28));
      setPosition({ left, top: rect.bottom + 12, width });
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const anchor = isServicesTrigger(event.target);
      if (anchor) openFor(anchor);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (isServicesTrigger(event.target)) closeSoon();
    };
    const onFocusIn = (event: FocusEvent) => {
      const anchor = isServicesTrigger(event.target);
      if (anchor) openFor(anchor);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPosition(null);
    };
    const close = () => setPosition(null);

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      cancelClose();
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, []);

  if (!position) return null;

  return (
    <nav
      className={styles.menu}
      aria-label="Направления услуг"
      style={position}
      onPointerEnter={cancelClose}
      onPointerLeave={closeSoon}
    >
      <p className={styles.label}>Направления</p>
      <div className={styles.list}>
        {SERVICE_CATALOG.map((service) => (
          <Link key={service.id} href={service.href} onClick={() => setPosition(null)}>
            <span className={styles.number}>{service.number}</span>
            <span>{service.title}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
