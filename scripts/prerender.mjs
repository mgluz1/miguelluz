/**
 * Pré-renderiza as páginas: injeta o HTML do React em dist/index.html (portfólio)
 * e dist/curriculo/index.html (currículo).
 * Assim o conteúdo aparece mesmo sem JavaScript e é indexável;
 * no navegador, main.tsx / curriculo-main.tsx apenas hidratam esse HTML.
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_DIR = path.join(ROOT, "dist-ssr");

const { render, renderResume } = await import(pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href);

const pages = [
  { file: path.join(DIST, "index.html"), html: render() },
  { file: path.join(DIST, "curriculo", "index.html"), html: renderResume() },
];

for (const { file, html } of pages) {
  const template = await readFile(file, "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error(`Marcador #root não encontrado em ${file}.`);
  await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`✓ Pré-renderizado ${path.relative(ROOT, file)}: ${(html.length / 1024).toFixed(1)} KB de HTML`);
}

await rm(SSR_DIR, { recursive: true, force: true });
