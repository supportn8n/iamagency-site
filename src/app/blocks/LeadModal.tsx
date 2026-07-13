"use client";

import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./lead-modal.module.css";

const normalizeText = (value: string | null | undefined) =>
  (value || "")
    .replace(/[↘→↓]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("ru-RU");

const isLeadLabel = (value: string | null | undefined) => {
  const text = normalizeText(value);
  return [
    /^оставить заявку(?: на обучение)?$/,
    /^получить (?:бесплатную )?консультацию$/,
    /^записаться(?: на (?:бесплатную )?консультацию| на обучение)?$/,
    /^начать работу$/,
    /^обсудить (?:мой )?проект$/,
    /^получить скидку$/,
    /^заказать (?:услугу|консультацию|продвижение)$/,
  ].some((pattern) => pattern.test(text));
};

function resolveLeadTrigger(start: HTMLElement | null) {
  let current = start;
  let trigger: HTMLElement | null = null;

  while (current && current !== document.body) {
    if (isLeadLabel(current.textContent)) trigger = current;
    else if (trigger) break;
    current = current.parentElement;
  }

  return trigger;
}

function resolveExactTextTrigger(start: HTMLElement, expected: string) {
  let current: HTMLElement | null = start;
  let trigger: HTMLElement = start;

  while (current?.parentElement && normalizeText(current.parentElement.textContent) === expected) {
    trigger = current.parentElement;
    current = current.parentElement;
  }

  return trigger;
}

export default function LeadModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [source, setSource] = useState("Оставить заявку");
  const modalRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openModal = (label: string) => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSource(label);
    setSent(false);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    requestAnimationFrame(() => previousFocusRef.current?.focus());
  };

  useEffect(() => {
    let decorateTimer: ReturnType<typeof setTimeout> | undefined;

    const decorate = () => {
      const triggers = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>("a,button,div,span").forEach((element) => {
        if (isLeadLabel(element.textContent)) {
          const trigger = resolveLeadTrigger(element);
          if (trigger) triggers.add(trigger);
        }

        if (pathname === "/marketing" && normalizeText(element.textContent) === "консультация") {
          resolveExactTextTrigger(element, "консультация").classList.add("marketingConsultationHidden");
        }
      });

      triggers.forEach((trigger) => {
        trigger.dataset.leadTrigger = "true";
        trigger.style.cursor = "pointer";
        if (!(trigger instanceof HTMLAnchorElement) && !(trigger instanceof HTMLButtonElement)) {
          trigger.setAttribute("role", "button");
          trigger.setAttribute("tabindex", "0");
        }
        if (!trigger.getAttribute("aria-label")) {
          trigger.setAttribute("aria-label", `${trigger.textContent?.trim()}. Открыть форму заявки`);
        }
      });
    };

    const queueDecorate = () => {
      if (decorateTimer) clearTimeout(decorateTimer);
      decorateTimer = setTimeout(decorate, 80);
    };

    const activate = (target: EventTarget | null, event: MouseEvent | globalThis.KeyboardEvent) => {
      const element = target instanceof HTMLElement ? target : target instanceof Node ? target.parentElement : null;
      const trigger = resolveLeadTrigger(element);
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      openModal(trigger.textContent?.trim() || "Оставить заявку");
    };

    const onClick = (event: MouseEvent) => activate(event.target, event);
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") activate(event.target, event);
    };

    decorate();
    const observer = new MutationObserver(queueDecorate);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      if (decorateTimer) clearTimeout(decorateTimer);
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => nameRef.current?.focus(), 40);

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = [...modalRef.current.querySelectorAll<HTMLElement>("a[href],button,input")].filter(
        (element) => !element.hasAttribute("disabled") && element.offsetParent !== null,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  const stopControlPropagation = (event: ReactKeyboardEvent<HTMLElement>) => event.stopPropagation();

  return (
    <>
      {pathname === "/marketing" ? (
        <button className={styles.floatingButton} type="button" onClick={() => openModal("Оставить заявку")}>
          Оставить заявку
        </button>
      ) : null}

      {open ? (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && closeModal()}
        >
          <section
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            onKeyDown={stopControlPropagation}
          >
            <button className={styles.close} type="button" onClick={closeModal} aria-label="Закрыть форму">
              ×
            </button>

            {sent ? (
              <div className={styles.thanks} aria-live="polite">
                <p>I AM AGENCY</p>
                <h2 id="lead-form-title">Спасибо!</h2>
                <span>Мы свяжемся с вами в течение 15 минут</span>
                <button type="button" onClick={closeModal}>Закрыть</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className={styles.brand}>I AM AGENCY</p>
                <p className={styles.source}>{source}</p>
                <h2 id="lead-form-title">Свяжитесь<br />с нами</h2>
                <label>Имя<input ref={nameRef} name="name" autoComplete="name" required /></label>
                <label>Телефон<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Сайт / соцсети проекта<input name="project" autoComplete="url" /></label>
                <label>Бюджет<input name="budget" inputMode="numeric" /></label>
                <label className={styles.consent}>
                  <input name="consent" type="checkbox" required />
                  <span>
                    Я согласен с <a href="/privacy-consent" target="_blank">обработкой персональных данных</a>
                  </span>
                </label>
                <button className={styles.submit} type="submit">Отправить</button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
