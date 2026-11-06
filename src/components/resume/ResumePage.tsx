import type { ReactNode } from "react";
import {
  resumeContact,
  resumeCourses,
  resumeEducation,
  resumeExperience,
  resumeObjective,
  resumeProjects,
  resumeProjectsTitle,
  resumeSkills,
  resumeSoftSkills,
  resumeSummary,
  type Bullet,
  type Entry,
  type Rich,
} from "../../content/resume";
import { profile, resumeUrl } from "../../content/site";
import { BrandMark } from "../ui/BrandMark";
import { ButtonLink } from "../ui/Button";
import "./ResumePage.css";

function RichText({ parts }: { parts: Rich[] | string }) {
  if (typeof parts === "string") return <>{parts}</>;
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          p
        ) : "b" in p ? (
          <strong key={i}>{p.b}</strong>
        ) : (
          <em key={i}>{p.i}</em>
        ),
      )}
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="cv__section" aria-labelledby={id}>
      <h2 id={id} className="cv__h2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items, dash = false }: { items: Bullet[]; dash?: boolean }) {
  return (
    <ul className={`cv__list ${dash ? "cv__list--dash" : ""}`} role="list">
      {items.map((b, i) => (
        <li key={i}>
          {b.lead && <strong>{b.lead} </strong>}
          <RichText parts={b.text} />
        </li>
      ))}
    </ul>
  );
}

/** Linha de título: nome à esquerda, local/período à direita — como no PDF. */
function Row({ left, sub, right, rightSub }: { left: ReactNode; sub?: ReactNode; right?: ReactNode; rightSub?: ReactNode }) {
  return (
    <div className="cv__row">
      <div className="cv__row-left">
        <p className="cv__row-title">{left}</p>
        {sub && <p className="cv__row-sub">{sub}</p>}
      </div>
      {(right || rightSub) && (
        <div className="cv__row-right">
          {right && <p>{right}</p>}
          {rightSub && <p>{rightSub}</p>}
        </div>
      )}
    </div>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <article className="cv__entry">
      <Row
        left={
          <>
            {entry.title}
            {entry.href && (
              <>
                {" – "}
                <a className="cv__link cv__link--plain" href={entry.href} target="_blank" rel="noopener noreferrer">
                  {entry.hrefLabel}
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              </>
            )}
          </>
        }
        sub={entry.role}
        right={entry.place ?? entry.period}
        rightSub={entry.place ? entry.period : undefined}
      />
      {entry.tech && <p className="cv__tech">{entry.tech}</p>}
      <Bullets items={entry.bullets} />
    </article>
  );
}

/** Projetos: título + tecnologias na mesma linha (itálico à direita), como no PDF. */
function ProjectBlock({ entry }: { entry: Entry }) {
  return (
    <article className="cv__entry">
      <div className="cv__row">
        <p className="cv__row-title">
          {entry.title}
          {entry.href && (
            <>
              {" – "}
              <a className="cv__link cv__link--plain" href={entry.href} target="_blank" rel="noopener noreferrer">
                {entry.hrefLabel}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
            </>
          )}
        </p>
        <p className="cv__row-right cv__tech-inline">{entry.tech}</p>
      </div>
      <Bullets items={entry.bullets} />
    </article>
  );
}

export function ResumePage() {
  const c = resumeContact;
  const edu = resumeEducation;

  return (
    <>
      <a className="skip-link" href="#curriculo">
        Pular para o currículo
      </a>

      <header className="cv-bar">
        <div className="cv-bar__inner container">
          <a className="cv-bar__brand" href="/">
            <BrandMark size={32} />
            <span>
              {profile.name}
              <span className="brand-dot" aria-hidden="true">
                .
              </span>
            </span>
          </a>
          <div className="cv-bar__actions">
            <a className="cv-bar__back" href="/">
              ← Portfólio
            </a>
            {resumeUrl && (
              <ButtonLink href={resumeUrl} icon="arrowDown" className="cv-bar__download">
                Baixar PDF
              </ButtonLink>
            )}
          </div>
        </div>
      </header>

      <main id="curriculo" className="cv-wrap">
        <article className="cv" aria-labelledby="cv-nome">
          <header className="cv__head">
            <h1 id="cv-nome" className="cv__name">
              {profile.fullName}
            </h1>
            <p className="cv__contact">
              <span>{c.location}</span>
              <a className="cv__link" href={c.phoneHref}>
                {c.phone}
              </a>
              <a className="cv__link" href={`mailto:${c.email}`}>
                {c.email}
              </a>
              <a className="cv__link" href={c.linkedin.href} target="_blank" rel="noopener noreferrer">
                {c.linkedin.label}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
              <a className="cv__link" href={c.github.href} target="_blank" rel="noopener noreferrer">
                {c.github.label}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
            </p>
          </header>

          <Section id="cv-resumo" title="Resumo Profissional">
            <p className="cv__text">
              <RichText parts={resumeSummary} />
            </p>
          </Section>

          <Section id="cv-educacao" title="Educação">
            <Row left={edu.org} sub={<em>{edu.course}</em>} right={edu.place} rightSub={edu.period} />
            <p className="cv__text cv__subjects">
              <em>Disciplinas relevantes:</em> {edu.subjects.join(", ")}.
            </p>
          </Section>

          <Section id="cv-experiencia" title="Experiência">
            {resumeExperience.map((e) => (
              <EntryBlock key={e.title} entry={e} />
            ))}
          </Section>

          <Section id="cv-projetos" title={resumeProjectsTitle}>
            {resumeProjects.map((p) => (
              <ProjectBlock key={p.title} entry={p} />
            ))}
          </Section>

          <Section id="cv-cursos" title="Cursos Extracurriculares">
            {resumeCourses.map((course) => (
              <article key={course.title} className="cv__entry">
                <Row left={course.title} right={course.period} />
                <Bullets items={course.bullets} />
              </article>
            ))}
          </Section>

          <Section id="cv-habilidades" title="Habilidades">
            <Bullets items={resumeSkills} />
          </Section>

          <Section id="cv-comportamentais" title="Competências Comportamentais">
            <ul className="cv__list cv__list--dash" role="list">
              {resumeSoftSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>

          <Section id="cv-objetivo" title="Objetivo">
            <p className="cv__text">{resumeObjective}</p>
          </Section>
        </article>
      </main>
    </>
  );
}
