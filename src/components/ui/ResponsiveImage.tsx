import manifest from "../../content/images.generated.json";

type Entry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, Entry>;

/**
 * Imagem WebP responsiva gerada por `npm run images`.
 * width/height reservam o espaço e evitam saltos de layout.
 */
export function ResponsiveImage({
  name,
  alt,
  sizes,
  priority = false,
  className,
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const img = images[name];
  if (!img) throw new Error(`Imagem "${name}" não encontrada. Rode "npm run images".`);
  const src = (w: number) => `/img/${name}-${w}.webp`;

  return (
    <img
      className={className}
      src={src(img.widths[Math.min(1, img.widths.length - 1)])}
      srcSet={img.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
