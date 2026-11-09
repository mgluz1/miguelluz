import { featuredProjects, mglabsProject } from "../../content/projects";
import { ButtonLink } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import { TagList } from "../ui/Tag";
import { MonitorCase } from "./MonitorCase";
import { ProjectCase } from "./ProjectCase";
import { SalvaehCase } from "./SalvaehCase";
import "./Projects.css";

export function Projects() {
  return (
    <section id="projetos" className="section projects" aria-labelledby="projetos-title">
      <div className="container">
        <SectionHeader
          id="projetos-title"
          eyebrow="Projetos"
          title={["Sites para negócios reais,", { em: "do briefing ao ar." }]}
          lead="Dois sites publicados para clientes, um sistema de automação, um app próprio e a iniciativa pela qual desenvolvo. Para cada um: o contexto, o que fiz e as decisões técnicas que importaram."
        />

        {featuredProjects.map((project) => (
          <ProjectCase key={project.id} project={project} />
        ))}

        <MonitorCase />

        <SalvaehCase />

        <aside className="mglabs reveal" aria-labelledby="mglabs-title">
          <img className="mglabs__mark" src="/mark-mglabs.png" width={56} height={56} alt="" />
          <div className="mglabs__copy">
            <p className="case__segment mono">{mglabsProject.segment}</p>
            <h3 id="mglabs-title" className="display mglabs__title">
              {mglabsProject.name}
            </h3>
            <p>{mglabsProject.text}</p>
            <TagList items={["posicionamento", "serviços", "demonstração de interfaces"]} tone="mint" />
          </div>
          <ButtonLink href={mglabsProject.url} variant="secondary" icon="arrowUpRight" external>
            {mglabsProject.urlLabel}
          </ButtonLink>
        </aside>
      </div>
    </section>
  );
}
