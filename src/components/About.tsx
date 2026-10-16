import { useRef, type CSSProperties } from "react";
import { education } from "../content/experience";
import { useFinePointer, useReducedMotion } from "../hooks/useMediaQuery";
import { useTilt } from "../hooks/useTilt";
import { ResponsiveImage } from "./ui/ResponsiveImage";
import { SectionHeader } from "./ui/SectionHeader";
import "./About.css";

export function About() {
  const frameRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  // Inclinação e spotlight só com mouse; em telas de toque a foto fica parada
  useTilt(frameRef, fine && !reduced, 5);

  return (
    <section id="sobre" className="section about" aria-labelledby="sobre-title">
      <div className="container about__grid">
        <figure className="about__photo reveal">
          <div ref={frameRef} className="about__photo-frame">
            <span className="about__photo-spot" aria-hidden="true" />
            <ResponsiveImage
              name="miguel-retrato"
              alt="Retrato de Miguel Luz, de terno azul-marinho e gravata azul, ajustando o punho da camisa."
              sizes="(min-width: 960px) 420px, (min-width: 600px) 60vw, 90vw"
            />
          </div>
          <figcaption className="mono about__photo-caption">
            Miguel Luz · {"Goiânia, GO"}
          </figcaption>
        </figure>

        <div className="about__copy">
          <SectionHeader
            id="sobre-title"
            eyebrow="Sobre"
            title={["Aprendendo na prática,", { em: "com base sólida." }]}
          />

          <div className="about__bio reveal" style={{ "--i": 2 } as CSSProperties}>
            <p>
              Comecei Ciência da Computação na PUC Goiás em 2025, depois de concluir o curso Programador de Sistemas
              no SENAC GO. Em paralelo, atuei por mais de um ano no atendimento ao cliente, onde aprendi a ouvir,
              acolher e resolver demandas com paciência, e a trabalhar em equipe para que nenhum atendimento ficasse
              sem resposta.
            </p>
            <p>
              Hoje desenvolvo sites para clientes pela MGLabs e, no estágio de TI na GoiásFomento, trabalho com
              automação, dados e IA aplicada a rotinas administrativas. Gosto de interfaces que se explicam sozinhas
              e de processos que não dependem da memória de alguém.
            </p>
            <p>
              Uso IA no dia a dia de desenvolvimento, sempre acompanhada de estudo e revisão: só mantenho o código que
              entendo e consigo explicar.
            </p>
          </div>
        </div>

        <div className="about__edu reveal" style={{ "--i": 3 } as CSSProperties}>
          <h3 className="mono about__label">Formação</h3>
          <ol className="timeline" role="list">
            {education.map((e) => (
              <li key={e.title} className="timeline__item">
                <span className="timeline__node" aria-hidden="true" />
                <div>
                  <p className="timeline__period mono">{e.period}</p>
                  <p className="timeline__title">
                    {e.title} <span>· {e.org}</span>
                  </p>
                  <p className="timeline__note">{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
