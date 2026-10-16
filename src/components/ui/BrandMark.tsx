/**
 * Ícone da marca MGLabs (</> no quadrado arredondado).
 * Decorativo por padrão — o texto ao lado já nomeia a marca.
 */
export function BrandMark({ size = 32, className = "", alt = "" }: { size?: number; className?: string; alt?: string }) {
  return (
    <img
      className={`brand-mark ${className}`}
      src="/mark-mglabs.png"
      width={size}
      height={size}
      alt={alt}
      decoding="async"
    />
  );
}
