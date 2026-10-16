import type { CSSProperties } from "react";
import type { Project } from "../../content/projects";
import { BrandMark } from "../ui/BrandMark";
import { ButtonLink } from "../ui/Button";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { TagList } from "../ui/Tag";
import { Window } from "../ui/Window";
import "./ProjectCase.css";

/** Estudo de caso de um projeto publicado: screenshots em janelas + contexto e decisões. */
export function ProjectCase({ project }: { project: Project }) {
  const [main, ...details] = project.images;
  const titleId = `projeto-${project.id}`;

  return (
    <article className="case" aria-labelledby={titleId}>
      <header className="case__header">
        <div className="case__heading reveal">
          <span className="case__index mono" aria-hidden="true">
            {project.index}
          </span>
          <div>
            <p className="case__segment mono">{project.segment}</p>
            <h3 id={titleId} className="display case__title">
              {project.name}
            </h3>
          </div>
        </div>
        <div className="case__meta reveal" style={{ "--i": 1 } as CSSProperties}>
          <span className="case__by mono">
            <BrandMark size={18} />
            via MGLabs
          </span>
          <span className="case__status mono">
            <i aria-hidden="true" />
            {project.status}
          </span>
          {project.url && (
            <ButtonLink href={project.url} variant="secondary" icon="arrowUpRight" external>
              Visitar {project.urlLabel}
            </ButtonLink>
          )}
        </div>
      </header>

      <div className={`case__media case__media--${project.tone}`}>
        <Window className="case__main reveal" tone={project.tone} title={project.urlLabel ?? project.name}>
          <ResponsiveImage name={main.name} alt={main.alt} sizes="(min-width: 1200px) 760px, (min-width: 960px) 64vw, 100vw" />
        </Window>
        <div className="case__details">
          {details.map((img, i) => (
            <figure key={img.name} className="case__shot reveal" style={{ "--i": i + 1 } as CSSProperties}>
              <Window tone={project.tone} title={img.caption ?? ""}>
                <ResponsiveImage name={img.name} alt={img.alt} sizes="(min-width: 960px) 360px, 100vw" />
              </Window>
              {img.caption && <figcaption className="visually-hidden">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>

      <div className="case__body">
        <dl className="case__facts reveal">
          <div>
            <dt className="mono">Contexto</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt className="mono">Meu papel</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="mono">Solução</dt>
            <dd>{project.solution}</dd>
          </div>
        </dl>

        <div className="case__tech reveal" style={{ "--i": 1 } as CSSProperties}>
          <h4 className="mono case__label">Decisões técnicas</h4>
          <ol className="case__decisions" role="list">
            {project.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
          <h4 className="mono case__label">Tecnologias</h4>
          <TagList items={project.stack} />
        </div>
      </div>
    </article>
  );
}
