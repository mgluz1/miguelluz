/**
 * Pré-renderiza a página: injeta o HTML do React em dist/index.html.
 * Assim o conteúdo aparece mesmo sem JavaScript e é indexável;
 * no navegador, main.tsx apenas hidrata esse HTML.
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_DIR = path.join(ROOT, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(SSR_DIR, "entry-server.js")).href);
const html = render();

const indexPath = path.join(DIST, "index.html");
const template = await readFile(indexPath, "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("Marcador #root não encontrado.");

await writeFile(indexPath, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
await rm(SSR_DIR, { recursive: true, force: true });
console.log(`✓ Pré-renderizado: ${(html.length / 1024).toFixed(1)} KB de HTML`);
