import type { CSSProperties } from "react";
import { hero, profile } from "../../content/site";
import { ButtonLink } from "../ui/Button";
import { BrandMark } from "../ui/BrandMark";
import { Icon } from "../ui/Icon";
import { Words } from "../ui/Words";
import { HeroDemo } from "./HeroDemo";
import "./Hero.css";

export function Hero() {
  return (
    <section id="topo" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="hero__meta reveal">
            <span className="hero__badge">
              <BrandMark size={22} />
              <span className="hero__name">{profile.name}</span>
            </span>
            <span className="hero__sep" aria-hidden="true" />
            <span className="mono hero__location">
              <Icon name="pin" size={13} />
              {profile.location}
            </span>
          </p>

          <Words
            as="h1"
            id="hero-title"
            className="display hero__title"
            parts={["Interfaces bem pensadas.", { em: "Processos mais simples." }]}
          />

          <p className="lead hero__lead reveal" style={{ "--i": 4 } as CSSProperties}>
            {hero.lead}
          </p>

          <div className="hero__actions reveal" style={{ "--i": 6 } as CSSProperties}>
            <ButtonLink href="#projetos" icon="arrowDown">
              Ver projetos
            </ButtonLink>
            <ButtonLink href="#contato" variant="secondary">
              Entrar em contato
            </ButtonLink>
          </div>

          <ul className="hero__facts reveal" role="list" style={{ "--i": 8 } as CSSProperties}>
            <li>
              <span className="mono">agora</span>
              Estagiário de TI · GoiásFomento
            </li>
            <li>
              <span className="mono">freelancer</span>
              Sites pela MGLabs
            </li>
            <li>
              <span className="mono">formação</span>
              Ciência da Computação · PUC Goiás
            </li>
          </ul>
        </div>

        <div className="hero__demo reveal" style={{ "--i": 3 } as CSSProperties}>
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
