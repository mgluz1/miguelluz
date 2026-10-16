/**
 * Gera versões WebP responsivas das imagens de origem.
 *
 * Origem:  images-src/ (arquivos grandes, fora do build)
 * Saída:   public/img/<nome>-<largura>.webp
 * Manifesto: src/content/images.generated.json (dimensões e larguras geradas)
 *
 * Para adicionar uma imagem: inclua uma entrada em SOURCES e rode `npm run images`.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "img");
const MANIFEST = path.join(ROOT, "src", "content", "images.generated.json");

const SOURCES = [
  { name: "hm2-hero", file: "project hm2/hm2ft1.png", widths: [640, 1024, 1600] },
  { name: "hm2-aeronaves", file: "project hm2/hm2ft2.png", widths: [480, 800, 1200] },
  { name: "hm2-ficha", file: "project hm2/hm2ft3.png", widths: [480, 800, 1200] },
  { name: "moraesluz-hero", file: "project moraesluz adv/Mladvft1.png", widths: [640, 1024, 1600] },
  { name: "moraesluz-historia", file: "project moraesluz adv/Mladvft2.png", widths: [480, 800, 1200] },
  { name: "moraesluz-diferenciais", file: "project moraesluz adv/Mladvft3.png", widths: [480, 800, 1200] },
  { name: "miguel-retrato", file: "miguel-retrato.webp", widths: [360, 560, 900], alpha: true },
];

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

for (const src of SOURCES) {
  const input = path.join(ROOT, "images-src", src.file);
  const meta = await sharp(input).metadata();
  const ratio = meta.height / meta.width;
  const widths = src.widths.filter((w) => w <= meta.width);

  for (const w of widths) {
    await sharp(input)
      .resize({ width: w })
      .webp({ quality: src.alpha ? 82 : 78, effort: 6 })
      .toFile(path.join(OUT_DIR, `${src.name}-${w}.webp`));
  }

  const largest = widths[widths.length - 1];
  manifest[src.name] = { width: largest, height: Math.round(largest * ratio), widths };
  console.log(`✓ ${src.name}: ${widths.join(", ")}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Manifesto salvo em ${path.relative(ROOT, MANIFEST)}`);
