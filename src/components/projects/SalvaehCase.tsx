import type { CSSProperties } from "react";
import { salvaehProject as p } from "../../content/projects";
import { ButtonLink } from "../ui/Button";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { TagList } from "../ui/Tag";
import "./SalvaehCase.css";

/** Logos das plataformas (24×24, preenchimento em currentColor). */
const platforms = [
  {
    label: "App Store",
    path: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
  },
  {
    label: "Google Play",
    path: "M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396",
  },
];

/** Cartões de exemplo da prévia — só ilustram como o app separa por tipo. */
const sample = [
  { title: "Focaccia de alecrim sem sova", source: "youtube.com", type: p.types[0] },
  { title: "Café com mesas na calçada em Pinheiros", source: "maps.google.com", type: p.types[1] },
  { title: "O Hobbit, edição ilustrada", source: "goodreads.com", type: p.types[2] },
];

/** App próprio: card claro com as cores e fontes do salvaeh (verde #01c77c, EB Garamond e Geist). */
export function SalvaehCase() {
  return (
    <article className="salvaeh reveal" aria-labelledby="salvaeh-title">
      <div className="salvaeh__copy">
        <div className="salvaeh__brand">
          <ResponsiveImage name="salvaeh-icon" alt="" sizes="52px" className="salvaeh__mark" />
          <div>
            <p className="case__segment mono">{p.segment}</p>
            <p className="salvaeh__word">
              {p.name}
              <span className="salvaeh__status mono">
                <i aria-hidden="true" />
                {p.status}
              </span>
            </p>
          </div>
        </div>

        <h3 id="salvaeh-title" className="salvaeh__title">
          Salvou? <em>Agora você acha.</em>
        </h3>

        <p className="salvaeh__text">{p.text}</p>

        <TagList items={p.stack} />

        <div className="salvaeh__actions">
          <ButtonLink href={p.url} variant="secondary" icon="arrowUpRight" external>
            {p.urlLabel}
          </ButtonLink>

          <ul className="salvaeh__platforms mono" role="list" aria-label="Apps para iPhone e Android: em breve na App Store e no Google Play">
            {platforms.map((pl) => (
              <li key={pl.label}>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
                  <path d={pl.path} />
                </svg>
                {pl.label}
                <b className="salvaeh__soon">Em breve</b>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prévia ilustrativa do app (decorativa) */}
      <div className="salvaeh__demo" aria-hidden="true">
        <div className="salvaeh__input">
          <span>Cole um link aqui</span>
          <b>Guardar</b>
        </div>

        <ul className="salvaeh__filters" role="list">
          {p.types.map((t) => (
            <li key={t.label}>
              <i style={{ background: t.color }} />
              {t.label}
            </li>
          ))}
        </ul>

        <ul className="salvaeh__cards" role="list">
          {sample.map((c, i) => (
            <li key={c.title} style={{ "--i": i } as CSSProperties}>
              <p>{c.title}</p>
              <span>
                {c.source}
                <em>
                  <i style={{ background: c.type.color }} />
                  {c.type.label}
                </em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
