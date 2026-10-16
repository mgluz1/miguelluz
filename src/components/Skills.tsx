import type { CSSProperties } from "react";
import { skillGroups } from "../content/experience";
import { SectionHeader } from "./ui/SectionHeader";
import "./Skills.css";

/** Conhecimentos agrupados por aplicação — sem barras de porcentagem. */
export function Skills() {
  return (
    <section id="conhecimentos" className="section skills" aria-labelledby="conhecimentos-title">
      <div className="container">
        <SectionHeader
          id="conhecimentos-title"
          eyebrow="Conhecimentos"
          title={["O que uso,", { em: "e onde já usei."}]}
          lead="Agrupado por aplicação. As marcações mostram o que já foi aplicado em projetos entregues ou no estágio; o restante vem da graduação e de estudo próprio."
          aside={
            <ul className="skills__legend mono" role="list">
              <li>
                <span className="skills__mark skills__mark--projetos" aria-hidden="true" />
                usado em projetos
              </li>
              <li>
                <span className="skills__mark skills__mark--estagio" aria-hidden="true" />
                usado no estágio
              </li>
            </ul>
          }
        />

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <article key={group.title} className="skills__card reveal" style={{ "--i": gi } as CSSProperties}>
              <p className="mono skills__file">{group.file}</p>
              <h3 className="skills__title">{group.title}</h3>
              <ul className="skills__list" role="list">
                {group.skills.map((s) => (
                  <li key={s.name} className="skills__item">
                    {s.name}
                    {s.used?.map((u) => (
                      <span key={u} className={`skills__mark skills__mark--${u}`}>
                        <span className="visually-hidden">{u === "projetos" ? " — usado em projetos" : " — usado no estágio"}</span>
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
