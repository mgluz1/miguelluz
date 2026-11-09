import type { CSSProperties } from "react";
import { monitorProject as p } from "../../content/projects";
import { PublicationsDemo } from "./PublicationsDemo";
import "./MonitorCase.css";

/** Controller — card claro com o contexto, o que o sistema faz e uma ilustração do fluxo. */
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
            <dt className="mono">Solução</dt>
            <dd>{p.solution}</dd>
          </div>
        </dl>

        <div className="reveal" style={{ "--i": 3 } as CSSProperties}>
          <h4 className="mono monitor__label">O que faz</h4>
          <ul className="monitor__features" role="list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <p className="monitor__note reveal">{p.goal}</p>

        <p className="monitor__stack mono reveal">Tecnologias: {p.stack.join(" · ")}</p>
      </div>

      <div className="monitor__demo reveal" style={{ "--i": 2 } as CSSProperties}>
        <PublicationsDemo />
      </div>
    </article>
  );
}
