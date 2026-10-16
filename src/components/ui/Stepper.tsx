import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import "./Stepper.css";

/**
 * Etapas ligadas por uma linha que se preenche — usado nas demonstrações.
 * Cada etapa é um botão: clicar leva à etapa e pausa o ciclo.
 */
export function Stepper({
  labels,
  stage,
  onSelect,
  paused,
  onTogglePause,
  showPause,
  label,
}: {
  labels: readonly string[];
  stage: number;
  onSelect: (i: number) => void;
  paused: boolean;
  onTogglePause: () => void;
  showPause: boolean;
  /** Nome acessível do grupo de etapas */
  label: string;
}) {
  const progress = labels.length > 1 ? stage / (labels.length - 1) : 1;

  return (
    <div className="stepper-wrap">
      <ol
        className="stepper"
        role="list"
        aria-label={label}
        style={{ "--progress": progress, "--count": labels.length } as CSSProperties}
      >
        {labels.map((text, i) => (
          <li key={text} className={i <= stage ? "is-done" : ""}>
            <button type="button" aria-current={i === stage ? "step" : undefined} onClick={() => onSelect(i)}>
              <span className="stepper__dot" aria-hidden="true" />
              <span className="stepper__label mono">{text}</span>
            </button>
          </li>
        ))}
      </ol>
      {showPause && (
        <button type="button" className="stepper__pause" aria-pressed={paused} onClick={onTogglePause}>
          <Icon name={paused ? "play" : "pause"} size={14} />
          <span className="visually-hidden">{paused ? "Retomar demonstração" : "Pausar demonstração"}</span>
        </button>
      )}
    </div>
  );
}
