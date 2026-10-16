import type { CSSProperties, ElementType, ReactNode } from "react";

export type WordPart = string | { em: string };

/**
 * Título com revelação palavra a palavra.
 * O texto completo fica no aria-label; os spans são decorativos.
 * Use { em: "texto" } para trechos em itálico de destaque.
 */
export function Words({
  as: Tag = "h2",
  parts,
  className = "",
  id,
}: {
  as?: ElementType;
  parts: WordPart[];
  className?: string;
  id?: string;
}) {
  const label = parts.map((p) => (typeof p === "string" ? p : p.em)).join(" ");
  let w = 0;
  const nodes: ReactNode[] = [];

  parts.forEach((part, pi) => {
    const text = typeof part === "string" ? part : part.em;
    const words = text.split(" ").filter(Boolean);
    const spans = words.map((word, i) => (
      <span key={`${pi}-${i}`} className="word" style={{ "--w": w++ } as CSSProperties}>
        {word}
      </span>
    ));
    // Espaços reais entre palavras permitem quebra de linha natural
    const joined = spans.flatMap((s, i) => (i < spans.length - 1 ? [s, " "] : [s]));
    nodes.push(typeof part === "string" ? joined : <em key={`em-${pi}`}>{joined}</em>);
    if (pi < parts.length - 1) nodes.push(" ");
  });

  return (
    <Tag id={id} className={`words ${className}`} aria-label={label}>
      <span aria-hidden="true">{nodes}</span>
    </Tag>
  );
}
