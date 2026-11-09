import { useRef, type CSSProperties } from "react";
import { useStageCycle } from "../../hooks/useStageCycle";
import { Stepper } from "../ui/Stepper";
import { Window } from "../ui/Window";
import "./PublicationsDemo.css";

/**
 * Ilustração do fluxo do Controller. Dados 100% fictícios: processos, advogados e status inventados.
 *
 * coletar → filtrar por advogado e tribunal → revisar
 */
type Review = "pendente" | "providencia" | "revisada";

const ROWS: { id: string; proc: string; court: string; lawyer: string; review: Review; match: boolean }[] = [
  { id: "a", proc: "0000001-00.2026.0.00.0001", court: "TJGO", lawyer: "Adv. A", review: "revisada", match: true },
  { id: "b", proc: "0000002-00.2026.0.00.0001", court: "TRT-18", lawyer: "Adv. B", review: "pendente", match: false },
  { id: "c", proc: "0000003-00.2026.0.00.0002", court: "TJGO", lawyer: "Adv. A", review: "providencia", match: true },
  { id: "d", proc: "0000004-00.2026.0.00.0001", court: "TRF-1", lawyer: "Adv. B", review: "revisada", match: false },
  { id: "e", proc: "0000005-00.2026.0.00.0003", court: "TJGO", lawyer: "Adv. A", review: "pendente", match: true },
  { id: "f", proc: "0000006-00.2026.0.00.0001", court: "TRT-18", lawyer: "Adv. A", review: "pendente", match: false },
];

const REVIEW_LABEL: Record<Review, string> = {
  pendente: "pendente",
  providencia: "providência",
  revisada: "revisada",
};

const STAGES = ["coletar", "filtrar", "revisar"] as const;
const LABELS = ["Coletar", "Filtrar", "Revisar"];
const HOLDS = [2600, 2800, 4200];

export function PublicationsDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const { stage, paused, setPaused, goTo, reduced } = useStageCycle(rootRef, HOLDS);
  const key = STAGES[stage];
  const visible = stage === 0 ? ROWS.length : ROWS.filter((r) => r.match).length;

  return (
    <figure ref={rootRef} className="pubs" aria-labelledby="pubs-caption">
      <Window
        tone="dark"
        className="pubs__window"
        title="controller · publicações (dados fictícios)"
        aside={<span className="pubs__count mono">{visible} itens</span>}
      >
        <div className="pubs__table" data-stage={key} aria-hidden="true">
          <p className="pubs__filters mono">
            <span>advogado: Adv. A</span>
            <span>tribunal: TJGO</span>
          </p>
          <div className="pubs__row pubs__row--head mono">
            <span>Processo</span>
            <span>Tribunal</span>
            <span>Advogado</span>
            <span>Revisão</span>
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.id}
              className={`pubs__row ${r.match ? "" : "is-out"}`}
              style={{ "--r": i } as CSSProperties}
            >
              <span className="mono pubs__proc">{r.proc}</span>
              <span className="mono">{r.court}</span>
              <span>{r.lawyer}</span>
              <span className="pubs__cell-urg">
                <span className="pubs__pending mono">—</span>
                <span className={`pubs__urgency pubs__urgency--${r.review} mono`}>{REVIEW_LABEL[r.review]}</span>
              </span>
            </div>
          ))}
        </div>
      </Window>

      <Stepper
        label="Etapas do fluxo"
        labels={LABELS}
        stage={stage}
        onSelect={goTo}
        paused={paused}
        onTogglePause={() => setPaused((v) => !v)}
        showPause={!reduced}
      />

      <figcaption id="pubs-caption" className="pubs__caption mono">
        Ilustração do fluxo · números de processo, advogados e status fictícios.
      </figcaption>
    </figure>
  );
}
