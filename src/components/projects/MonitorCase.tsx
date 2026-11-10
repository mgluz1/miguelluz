import type { CSSProperties } from "react";
import { monitorProject as p } from "../../content/projects";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { Window } from "../ui/Window";
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

      {/* Capturas reais do sistema; dados do escritório já borrados nas imagens. */}
      <figure className="monitor__shots reveal" style={{ "--i": 2 } as CSSProperties}>
        <Window className="monitor__win monitor__win--main" title="controller · painel de publicações">
          <ResponsiveImage
            name="controller-painel"
            alt="Painel do Controller com a tabela de publicações do DJEN: filtros por tribunal, status e período, colunas de processo, disponibilização e status de revisão, e paginação. Nomes e números de processo estão borrados."
            sizes="(min-width: 960px) 560px, 92vw"
          />
        </Window>
        <Window className="monitor__win monitor__win--login" title="controller · acesso">
          <ResponsiveImage
            name="controller-login"
            alt="Tela de acesso do Controller em verde e dourado, com o campo de usuário, o de senha e o botão Entrar."
            sizes="(min-width: 960px) 340px, 60vw"
          />
        </Window>
        <figcaption className="monitor__caption mono">
          Capturas reais do sistema · dados do escritório borrados
        </figcaption>
      </figure>
    </article>
  );
}
