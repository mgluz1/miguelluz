import { useEffect, useState } from "react";

/**
 * Lê uma media query no cliente. No servidor (pré-renderização) retorna `initial`,
 * evitando diferenças de hidratação.
 */
export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)", true);

/** Mouse/trackpad com hover real — desativa efeitos de cursor em telas de toque. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
