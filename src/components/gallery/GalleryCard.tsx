import type { CSSProperties } from "react";
import type { GalleryItem } from "../../content/gallery";
import manifest from "../../content/images.generated.json";
import { Icon } from "../ui/Icon";

type Entry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, Entry>;

/**
 * Cartão de um projeto: moldura de navegador, prévia real do site (ou capa),
 * nome, categoria e status. O link inteiro é a área clicável.
 */
export function GalleryCard({
  item,
  load,
  sizes,
  onFocus,
}: {
  item: GalleryItem;
  /** Só pede a imagem quando o canvas está perto da tela. */
  load: boolean;
  sizes: string;
  onFocus?: (el: HTMLElement) => void;
}) {
  const external = /^https?:/.test(item.href);
  const preview = item.preview ? images[item.preview.image] : undefined;

  return (
    <a
      className="gcard"
      href={item.href}
      draggable={false}
      onFocus={onFocus ? (e) => onFocus(e.currentTarget) : undefined}
      style={{ "--accent": item.accent } as CSSProperties}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="gcard__chrome" aria-hidden="true">
        <span className="gcard__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="gcard__host mono">{item.host}</span>
      </span>

      <span className="gcard__media">
        {preview && item.preview ? (
          load && (
            <img
              className="gcard__shot"
              src={`/img/${item.preview.image}-${preview.widths[0]}.webp`}
              srcSet={preview.widths.map((w) => `/img/${item.preview!.image}-${w}.webp ${w}w`).join(", ")}
              sizes={sizes}
              width={preview.width}
              height={preview.height}
              alt={item.preview.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
              ref={(el) => {
                // Imagem já em cache pode terminar antes do onLoad ser ligado.
                if (el?.complete && el.naturalWidth) el.classList.add("is-loaded");
              }}
            />
          )
        ) : (
          <span className="gcard__cover">
            <span className="gcard__tagline">{item.name}</span>
          </span>
        )}
      </span>

      <span className="gcard__meta">
        <span className="gcard__text">
          <span className="gcard__name">{item.name}</span>
          <span className="gcard__cat mono">{item.category}</span>
        </span>
        <span className="gcard__go" aria-hidden="true">
          <Icon name="arrowUpRight" size={16} />
        </span>
      </span>

      <span className="gcard__status mono">{item.status}</span>
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
