import type { CSSProperties } from "react";
import { monitorProject as p, type FeatureState } from "../../content/projects";
import { PublicationsDemo } from "./PublicationsDemo";
import "./MonitorCase.css";

const STATE_LABEL: Record<FeatureState, string> = {
  planejado: "Planejado",
  implementado: "Implementado",
  validado: "Validado",
};

/** Projeto em desenvolvimento — card claro, com status por funcionalidade. */
export function MonitorCase() {
  const titleId = `projeto-${p.id}`;

  return (
    <article className="monitor" aria-labelledby={titleId}>
      <div className="monitor__copy">
        <div className="case__heading reveal">
          <span className="case__index mono" aria-hidden="true">
            {p.index}
          </span>
          <div>
            <p className="case__segment mono">{p.segment}</p>
            <h3 id={titleId} className="display monitor__title">
              {p.name}
            </h3>
          </div>
        </div>

        <p className="monitor__status mono reveal" style={{ "--i": 1 } as CSSProperties}>
          <i aria-hidden="true" />
          {p.status}
        </p>

        <dl className="monitor__facts reveal" style={{ "--i": 2 } as CSSProperties}>
          <div>
            <dt className="mono">Contexto</dt>
            <dd>{p.context}</dd>
          </div>
          <div>
            <dt className="mono">Proposta</dt>
            <dd>{p.proposal}</dd>
          </div>
        </dl>

        <div className="reveal" style={{ "--i": 3 } as CSSProperties}>
          <h4 className="mono monitor__label">Funcionalidades</h4>
          <ul className="monitor__features" role="list">
            {p.features.map((f) => (
              <li key={f.label}>
                <span>{f.label}</span>
                <span className={`state state--${f.state} mono`}>{STATE_LABEL[f.state]}</span>
              </li>
            ))}
          </ul>
          <p className="monitor__legend mono">
            Legenda: <span className="state state--planejado">planejado</span>
            <span className="state state--implementado">implementado</span>
            <span className="state state--validado">validado</span>
          </p>
        </div>

        <p className="monitor__caveat reveal">{p.caveat}</p>

        <p className="monitor__stack mono reveal">
          Tecnologias: {p.stack.length ? p.stack.join(" · ") : "em definição"}
        </p>
      </div>

      <div className="monitor__demo reveal" style={{ "--i": 2 } as CSSProperties}>
        <PublicationsDemo />
      </div>
    </article>
  );
}
