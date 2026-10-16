import { useRef, type CSSProperties } from "react";
import { useStageCycle } from "../../hooks/useStageCycle";
import { Stepper } from "../ui/Stepper";
import { Window } from "../ui/Window";
import "./PublicationsDemo.css";

/**
 * Protótipo de interface do monitoramento de publicações.
 * Dados 100% fictícios. Os prazos são ilustrativos — o cálculo não foi validado.
 *
 * coletar → remover duplicatas → classificar urgência
 */
type Urgency = "alta" | "media" | "baixa";

const ROWS: { id: string; proc: string; kind: string; days: number; urgency: Urgency; dup?: boolean }[] = [
  { id: "a", proc: "0000001-00.2026.0.00.0001", kind: "Intimação", days: 3, urgency: "alta" },
  { id: "b", proc: "0000002-00.2026.0.00.0001", kind: "Despacho", days: 15, urgency: "baixa" },
  { id: "c", proc: "0000001-00.2026.0.00.0001", kind: "Intimação", days: 3, urgency: "alta", dup: true },
  { id: "d", proc: "0000003-00.2026.0.00.0002", kind: "Sentença", days: 8, urgency: "media" },
  { id: "e", proc: "0000004-00.2026.0.00.0001", kind: "Intimação", days: 5, urgency: "alta" },
  { id: "f", proc: "0000002-00.2026.0.00.0001", kind: "Despacho", days: 15, urgency: "baixa", dup: true },
];

const URGENCY_LABEL: Record<Urgency, string> = { alta: "urgente", media: "atenção", baixa: "normal" };

const STAGES = ["coletar", "deduplicar", "classificar"] as const;
const LABELS = ["Coletar", "Sem duplicatas", "Classificar"];
const HOLDS = [2600, 2400, 4200];

export function PublicationsDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const { stage, paused, setPaused, goTo, reduced } = useStageCycle(rootRef, HOLDS);
  const key = STAGES[stage];
  const visible = stage === 0 ? ROWS.length : ROWS.filter((r) => !r.dup).length;

  return (
    <figure ref={rootRef} className="pubs" aria-labelledby="pubs-caption">
      <Window
        tone="dark"
        className="pubs__window"
        title="publicacoes · OAB/GO 00.000 (fictícia)"
        aside={<span className="pubs__count mono">{visible} itens</span>}
      >
        <div className="pubs__table" data-stage={key} aria-hidden="true">
          <div className="pubs__row pubs__row--head mono">
            <span>Processo</span>
            <span>Tipo</span>
            <span>Prazo*</span>
            <span>Urgência</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.id}
              className={`pubs__row ${r.dup ? "is-dup" : ""}`}
              style={{ "--r": i } as CSSProperties}
            >
              <span className="mono pubs__proc">{r.proc}</span>
              <span>{r.kind}</span>
              <span className="mono">{r.days} dias</span>
              <span className="pubs__cell-urg">
                <span className="pubs__pending mono">—</span>
                <span className={`pubs__urgency pubs__urgency--${r.dup ? "dup" : r.urgency} mono`}>
                  {r.dup ? "duplicada" : URGENCY_LABEL[r.urgency]}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Window>

      <Stepper
        label="Etapas do protótipo"
        labels={LABELS}
        stage={stage}
        onSelect={goTo}
        paused={paused}
        onTogglePause={() => setPaused((v) => !v)}
        showPause={!reduced}
      />

      <figcaption id="pubs-caption" className="pubs__caption mono">
        Protótipo de interface · números de processo e OAB fictícios · *prazos ilustrativos, cálculo não validado.
      </figcaption>
    </figure>
  );
}
