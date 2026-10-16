import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import "./Button.css";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`btn btn--${variant} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {icon &&
        (variant === "primary" ? (
          <span className="btn__chip" aria-hidden="true">
            <Icon name={icon} size={15} className="btn__icon" />
          </span>
        ) : (
          <Icon name={icon} size={16} className="btn__icon" />
        ))}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
