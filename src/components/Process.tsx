import type { CSSProperties } from "react";
import { processSteps } from "../content/site";
import { SectionHeader } from "./ui/SectionHeader";
import "./Process.css";

/**
 * Processo de trabalho: as mesmas etapas da demonstração da hero,
 * ligadas por uma linha SVG que se desenha ao entrar na tela.
 */
export function Process() {
  return (
    <section id="processo" className="section process" aria-labelledby="processo-title">
      <div className="container">
        <SectionHeader
          id="processo-title"
          eyebrow="Processo"
          title={["Como transformo uma necessidade", { em: "em algo que funciona." }]}
          lead="Sites e automações seguem o mesmo raciocínio: entender a rotina, organizar o que importa, construir com cuidado e acompanhar depois de entregar."
        />

        <div className="process__track draw-group">
          {/* Linha de conexão — horizontal no desktop, vertical no celular */}
          <svg className="process__line process__line--h" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path className="draw" d="M0 1H100" pathLength={1} />
          </svg>
          <svg className="process__line process__line--v" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="draw" d="M1 0V100" pathLength={1} />
          </svg>

          <ol className="process__steps" role="list">
          {processSteps.map((step, i) => (
            <li key={step.n} className="process__step reveal" style={{ "--i": i + 1 } as CSSProperties}>
              <span className="process__node" aria-hidden="true">
                <span />
              </span>
              <div className="process__card">
                <div className="process__card-bar">
                  <span className="mono process__n">{step.n}</span>
                  <span className="mono process__file">{step.file}</span>
                </div>
                <h3 className="display process__title">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
