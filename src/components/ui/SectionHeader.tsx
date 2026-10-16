import type { CSSProperties, ReactNode } from "react";
import { Words, type WordPart } from "./Words";
import "./SectionHeader.css";

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  aside,
}: {
  /** id do título — use em aria-labelledby da seção */
  id: string;
  eyebrow: string;
  title: WordPart[];
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="section-header">
      <div className="section-header__main">
        <p className="eyebrow reveal">{eyebrow}</p>
        <Words id={id} parts={title} className="display h2" />
        {lead && (
          <p className="lead reveal" style={{ "--i": 3 } as CSSProperties}>
            {lead}
          </p>
        )}
      </div>
      {aside && <div className="section-header__aside reveal">{aside}</div>}
    </header>
  );
}
