import { useEffect } from "react";

const SELECTOR = ".reveal, .words, .draw-group";

/**
 * Um único IntersectionObserver para toda a página.
 * Adiciona `.is-visible` aos elementos com .reveal, .words ou .draw-group
 * quando entram na viewport. O CSS em base.css cuida da transição.
 *
 * Fallbacks: sem IntersectionObserver, ou se algo falhar, tudo é revelado.
 */
export function useRevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const revealAll = () => elements.forEach((el) => el.classList.add("is-visible"));

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
