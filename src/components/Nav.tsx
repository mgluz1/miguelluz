import { useEffect, useState } from "react";
import { navItems, profile, resumeRequestHref, resumeUrl } from "../content/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { BrandMark } from "./ui/BrandMark";
import { Icon } from "./ui/Icon";
import "./Nav.css";

const sectionIds = navItems.map((item) => item.id);

export function Nav() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu com Esc e ao voltar para desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mql = window.matchMedia("(min-width: 820px)");
    const onChange = () => mql.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onChange);
    };
  }, [open]);

  const resume = resumeUrl
    ? { href: resumeUrl, label: "Currículo", note: "PDF", download: true }
    : { href: resumeRequestHref, label: "Currículo", note: "por e-mail", download: false };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#topo" onClick={() => setOpen(false)}>
          <BrandMark size={34} className="nav__mark" />
          <span className="nav__name">
            {profile.name}
            <span className="brand-dot" aria-hidden="true">.</span>
          </span>
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={20} />
          <span className="visually-hidden">{open ? "Fechar menu" : "Abrir menu"}</span>
        </button>

        <nav id="nav-menu" className="nav__menu" aria-label="Principal">
          <ul role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="nav__resume"
            href={resume.href}
            {...(resume.download ? { download: true } : {})}
            onClick={() => setOpen(false)}
          >
            <Icon name="file" size={16} />
            {resume.label}
            <span className="nav__resume-note mono">{resume.note}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
