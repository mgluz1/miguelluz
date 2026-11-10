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
  { name: "joaocastro-hero", file: "galeria/joaocastro.png", widths: [640, 1024] },
  { name: "adrianabelocorp-hero", file: "galeria/adrianabelocorp.png", widths: [640, 1024] },
  { name: "terapeutacassialuz-hero", file: "galeria/terapeutacassialuz.png", widths: [640, 1024] },
  { name: "miguel-retrato", file: "miguel-retrato.webp", widths: [360, 560, 900], alpha: true },
  { name: "salvaeh-icon", file: "salvaeh-icon.png", widths: [112, 224], alpha: true },
  {
    name: "arqueiro",
    file: "arqueiro.png",
    widths: [360, 540, 720],
    alpha: true,
    quality: 60, // a textura pontilhada pesa muito em qualidade alta
    // fundo branco vira transparência; recorte ao redor da figura
    knockout: { left: 400, top: 55, width: 730, height: 970 },
  },
];

/** Converte o branco em transparência (cor → alfa), preservando o verde da tinta. */
async function knockoutWhite(input, crop) {
  const { data, info } = await sharp(input).extract(crop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const a = 1 - Math.min(data[i], data[i + 1], data[i + 2]) / 255;
    if (a < 0.02) {
      data[i + 3] = 0;
      continue;
    }
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.round((data[i + c] - 255 * (1 - a)) / a));
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info });
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

for (const src of SOURCES) {
  const file = path.join(ROOT, "images-src", src.file);
  const input = src.knockout ? await (await knockoutWhite(file, src.knockout)).png().toBuffer() : file;
  const meta = await sharp(input).metadata();
  const ratio = meta.height / meta.width;
  const widths = src.widths.filter((w) => w <= meta.width);

  for (const w of widths) {
    await sharp(input)
      .resize({ width: w })
      .webp({ quality: src.quality ?? (src.alpha ? 82 : 78), alphaQuality: src.quality ?? 100, effort: 6 })
      .toFile(path.join(OUT_DIR, `${src.name}-${w}.webp`));
  }

  const largest = widths[widths.length - 1];
  manifest[src.name] = { width: largest, height: Math.round(largest * ratio), widths };
  console.log(`✓ ${src.name}: ${widths.join(", ")}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Manifesto salvo em ${path.relative(ROOT, MANIFEST)}`);
