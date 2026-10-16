import type { ReactNode } from "react";
import "./Tag.css";

type Tone = "default" | "mint" | "dark";

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`tag tag--${tone} mono`}>{children}</span>;
}

export function TagList({ items, tone }: { items: string[]; tone?: Tone }) {
  return (
    <ul className="tag-list" role="list">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
