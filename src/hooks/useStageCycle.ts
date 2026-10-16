import { useEffect, useRef, useState, type RefObject } from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useMediaQuery";

/**
 * Controla uma demonstração em etapas (motivo "mudança de estado").
 *
 * - Renderiza inicialmente a ÚLTIMA etapa: é o que aparece sem JS,
 *   na pré-renderização e com movimento reduzido.
 * - Ao entrar na tela pela primeira vez, volta para a etapa 0 e avança sozinha.
 * - Pausa quando o usuário pede, quando sai da tela ou com movimento reduzido.
 */
export function useStageCycle(ref: RefObject<Element | null>, holds: readonly number[]) {
  const last = holds.length - 1;
  const reduced = useReducedMotion();
  const inView = useInView(ref);
  const [stage, setStage] = useState(last);
  const [paused, setPaused] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || !inView || started.current) return;
    started.current = true;
    setStage(0);
  }, [inView, reduced]);

  useEffect(() => {
    if (reduced || paused || !inView || !started.current) return;
    const id = window.setTimeout(() => setStage((s) => (s + 1) % holds.length), holds[stage]);
    return () => window.clearTimeout(id);
  }, [stage, paused, inView, reduced, holds]);

  /** Escolha manual: vai para a etapa e pausa o ciclo. */
  const goTo = (i: number) => {
    started.current = true;
    setPaused(true);
    setStage(i);
  };

  return { stage, last, paused, setPaused, goTo, reduced };
}
