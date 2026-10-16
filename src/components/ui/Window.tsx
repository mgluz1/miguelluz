import type { ReactNode } from "react";
import "./Window.css";

/**
 * Moldura de janela — motivo visual recorrente do portfólio.
 * Aparece na hero, nas screenshots dos projetos e nos protótipos.
 */
export function Window({
  title,
  aside,
  tone = "light",
  className = "",
  children,
}: {
  title: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark" | "navy" | "forest";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`window window--${tone} ${className}`}>
      <div className="window__bar">
        <span className="window__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="window__title mono">{title}</span>
        {aside && <span className="window__aside">{aside}</span>}
      </div>
      <div className="window__body">{children}</div>
    </div>
  );
}
