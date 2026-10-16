import { useRef } from "react";
import { useFinePointer } from "../../hooks/useMediaQuery";
import { useStageCycle } from "../../hooks/useStageCycle";
import { useTilt } from "../../hooks/useTilt";
import { Icon } from "../ui/Icon";
import { Stepper } from "../ui/Stepper";
import { Window } from "../ui/Window";
import "./HeroDemo.css";

/**
 * Demonstração da hero: uma necessidade vira um site publicado.
 * briefing → estrutura → conteúdo → publicado
 *
 * Sem JS ou com movimento reduzido, a cena mostra o estado final (publicado)
 * e o stepper completo — a mensagem continua compreensível.
 */
const STAGES = [
  { key: "briefing", label: "Briefing", title: "briefing.md", status: "rascunho", hold: 2600 },
  { key: "estrutura", label: "Estrutura", title: "wireframe — estrutura", status: "estrutura", hold: 2400 },
  { key: "conteudo", label: "Conteúdo", title: "localhost:5173", status: "em revisão", hold: 2600 },
  { key: "publicado", label: "Publicado", title: "cafeteria.exemplo", status: "no ar", hold: 4200 },
] as const;

const HOLDS = STAGES.map((s) => s.hold);
const LABELS = STAGES.map((s) => s.label);

export function HeroDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { stage, last: FINAL, paused, setPaused, goTo, reduced } = useStageCycle(rootRef, HOLDS);

  useTilt(rootRef, fine && !reduced);

  const current = STAGES[stage];

  return (
    <figure ref={rootRef} className="hero-demo" aria-labelledby="hero-demo-caption">
      <div className="hero-demo__stage">
        <Window
          className="hero-demo__window"
          title={
            <>
              {stage === FINAL && <span className="hero-demo__lock" aria-hidden="true" />}
              {current.title}
            </>
          }
          aside={
            <span className={`hero-demo__status mono ${stage === FINAL ? "is-live" : ""}`}>
              <i aria-hidden="true" />
              {current.status}
            </span>
          }
        >
          <div className="mock" data-stage={current.key} aria-hidden="true">
            <div className="mock__brief">
              <p className="mock__brief-file mono"># briefing</p>
              <dl>
                <div>
                  <dt className="mono">cliente</dt>
                  <dd>Cafeteria (fictícia)</dd>
                </div>
                <div>
                  <dt className="mono">precisa</dt>
                  <dd>Cardápio, horários e pedido pelo WhatsApp</dd>
                </div>
                <div>
                  <dt className="mono">público</dt>
                  <dd>Celular, clientes do bairro</dd>
                </div>
              </dl>
            </div>

            <div className="mock__page">
              <div className="mock__block mock__nav" data-label="nav">
                <b className="mock__logo">Cafeteria</b>
                <span className="mock__links">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="mock__block mock__hero" data-label="hero">
                <div className="mock__copy">
                  <strong>Café coado e pão de fermentação natural</strong>
                  <span className="mock__line" />
                  <span className="mock__line mock__line--short" />
                  <span className="mock__cta">Pedir no WhatsApp</span>
                </div>
                <div className="mock__photo">
                  <svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice">
                    <rect width="120" height="90" fill="currentColor" opacity=".18" />
                    <path d="M44 38h30v18a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z" fill="currentColor" opacity=".7" />
                    <path d="M74 42h5a6 6 0 0 1 0 12h-5" fill="none" stroke="currentColor" strokeWidth="3" opacity=".7" />
                    <path d="M52 30c0-4 4-4 4-8M60 30c0-4 4-4 4-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
                  </svg>
                </div>
              </div>
              <div className="mock__block mock__cards" data-label="cardápio">
                {["Espresso", "Coado", "Pão de queijo"].map((item, i) => (
                  <div key={item} className="mock__card">
                    <span className="mock__card-img" />
                    <span className="mock__card-title">{item}</span>
                    <span className="mock__card-price mono">R$ {["7", "12", "6"][i]},00</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mock__toast">
              <span className="mock__toast-icon">
                <Icon name="check" size={14} />
              </span>
              <div>
                <strong>Publicado</strong>
                <span className="mono">mobile · SEO · imagens otimizadas</span>
              </div>
            </div>
          </div>
        </Window>
        <span className="hero-demo__spot" aria-hidden="true" />
      </div>

      <Stepper
        label="Etapas da demonstração"
        labels={LABELS}
        stage={stage}
        onSelect={goTo}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        showPause={!reduced}
      />

      <figcaption id="hero-demo-caption" className="hero-demo__caption mono">
        Demonstração ilustrativa · cliente e dados fictícios — de uma necessidade a um site publicado.
      </figcaption>
    </figure>
  );
}
