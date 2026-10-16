import type { CSSProperties } from "react";
import { mainExperience as main, previousExperience as prev } from "../../content/experience";
import { SectionHeader } from "../ui/SectionHeader";
import { Tag } from "../ui/Tag";
import { ContractsDemo } from "./ContractsDemo";
import "./Experience.css";

export function Experience() {
  return (
    <section id="experiencia" className="section experience" aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHeader
          id="experiencia-title"
          eyebrow="Experiência"
          title={["Automação e dados", { em: "dentro de rotinas reais." }]}
          lead="Do atendimento ao público ao estágio de TI: o mesmo interesse em entender onde um processo trava e torná-lo mais simples."
        />

        <div className="experience__grid">
          <article className="job job--main reveal" aria-labelledby="job-main">
            <header className="job__header">
              <div>
                <h3 id="job-main" className="display job__org">
                  {main.org}
                </h3>
                <p className="job__role">
                  {main.role} <span className="job__team mono">{main.team}</span>
                </p>
              </div>
              <p className="job__period mono">
                <span className="job__live" aria-hidden="true" />
                <time dateTime={main.periodISO}>{main.period}</time>
              </p>
            </header>

            <p className="job__summary">{main.summary}</p>

            <h4 className="mono job__label">Contribuições</h4>
            <ul className="job__contribs" role="list">
              {main.contributions.map((c, i) => (
                <li key={c.text} className="reveal" style={{ "--i": i } as CSSProperties}>
                  <Tag tone="mint">{c.tag}</Tag>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="experience__side">
            <div className="reveal" style={{ "--i": 2 } as CSSProperties}>
              <ContractsDemo />
            </div>

            <article className="job job--compact reveal" style={{ "--i": 3 } as CSSProperties} aria-labelledby="job-prev">
              <header className="job__header">
                <div>
                  <h3 id="job-prev" className="display job__org job__org--sm">
                    {prev.org}
                  </h3>
                  <p className="job__role">{prev.role}</p>
                </div>
                <p className="job__period mono">{prev.period}</p>
              </header>
              <p className="job__summary">{prev.summary}</p>
              <ul className="job__list" role="list">
                {prev.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
