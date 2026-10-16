import { useState, type CSSProperties } from "react";
import { links, profile, resumeRequestHref, resumeUrl } from "../content/site";
import { BrandMark } from "./ui/BrandMark";
import { Icon, type IconName } from "./ui/Icon";
import { Words } from "./ui/Words";
import "./Contact.css";

type ContactLink = { label: string; detail: string; href: string; icon: IconName; external?: boolean; download?: boolean };

const contactLinks: ContactLink[] = [
  { label: "LinkedIn", detail: "in/miguelluz19", href: links.linkedin, icon: "linkedin", external: true },
  { label: "GitHub", detail: "mgluz1", href: links.github, icon: "github", external: true },
  { label: "MGLabs", detail: "mglabss.netlify.app", href: links.mglabs, icon: "globe", external: true },
  resumeUrl
    ? { label: "Currículo", detail: "PDF", href: resumeUrl, icon: "file", download: true }
    : { label: "Currículo", detail: "solicitar por e-mail", href: resumeRequestHref, icon: "file" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <>
    <section id="contato" className="contact on-dark" aria-labelledby="contato-title">
      <div className="container contact__inner">
        <div className="contact__head">
          <p className="eyebrow reveal">Contato</p>
          <Words id="contato-title" className="display contact__title" parts={["Tem um projeto", { em: "ou uma vaga?" }]} />
          <p className="lead reveal" style={{ "--i": 3 } as CSSProperties}>
            Para oportunidades profissionais, projetos de sites pela MGLabs ou uma conversa sobre automação,
            o caminho mais rápido é o e-mail.
          </p>
        </div>

        <div className="contact__email reveal" style={{ "--i": 4 } as CSSProperties}>
          <a className="contact__email-link" href={`mailto:${profile.email}`}>
            <Icon name="mail" size={22} />
            <span>{profile.email}</span>
          </a>
          <button type="button" className="contact__copy" onClick={copyEmail}>
            <Icon name={copied ? "check" : "copy"} size={16} />
            <span>{copied ? "Copiado" : "Copiar"}</span>
          </button>
          <span className="visually-hidden" role="status">
            {copied ? "E-mail copiado para a área de transferência" : ""}
          </span>
        </div>

        <ul className="contact__links" role="list">
          {contactLinks.map((l, i) => (
            <li key={l.label} className="reveal" style={{ "--i": 5 + i } as CSSProperties}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(l.download ? { download: true } : {})}
              >
                {l.label === "MGLabs" ? <BrandMark size={22} className="contact__mark" /> : <Icon name={l.icon} size={20} />}
                <span className="contact__link-label">{l.label}</span>
                <span className="contact__link-detail mono">{l.detail}</span>
                <Icon name="arrowUpRight" size={16} className="contact__arrow" />
                {l.external && <span className="visually-hidden"> (abre em nova aba)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

      <footer className="footer on-dark">
        <div className="container footer__inner">
          <p className="footer__brand" suppressHydrationWarning>
            <BrandMark size={28} />
            <span>
              <strong>
                {profile.name}
                <span className="brand-dot">.</span>
              </strong>{" "}
              © {new Date().getFullYear()} · {profile.location}
            </span>
          </p>
          <a href="#topo" className="footer__top">
            Voltar ao topo
          </a>
        </div>
      </footer>
    </>
  );
}
