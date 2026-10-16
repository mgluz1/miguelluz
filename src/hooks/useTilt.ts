import { useEffect, type RefObject } from "react";

/**
 * Spotlight + inclinação sutil seguindo o cursor.
 * Escreve variáveis CSS (--mx, --my, --rx, --ry) no elemento; o CSS decide o efeito.
 * Só ativa com ponteiro fino e sem preferência por movimento reduzido.
 */
export function useTilt(ref: RefObject<HTMLElement | null>, enabled: boolean, maxDeg = 3) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--ry", `${((x - 0.5) * maxDeg * 2).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * maxDeg * 2).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.dataset.tilt = "on";
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      delete el.dataset.tilt;
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, enabled, maxDeg]);
}
