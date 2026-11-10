/**
 * Layout do canvas arrastável.
 *
 * Cada site aparece uma única vez, em colunas com as ímpares deslocadas meia
 * célula para baixo e um leve desalinhamento — um campo para explorar, não uma
 * grade rígida. O número de colunas acompanha o formato da tela, então o campo
 * transborda a área visível e convida a arrastar. A câmera fica presa às bordas
 * do campo (com resistência elástica), e a altura da seção nunca muda.
 */

export type Cell = {
  /** Índice do site em galleryItems. */
  item: number;
  /** Posição do cartão no campo (px). */
  bx: number;
  by: number;
  /** Atraso da animação de entrada, do centro para fora (ms). */
  delay: number;
};

export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };

export type CanvasLayout = {
  vw: number;
  vh: number;
  cardW: number;
  cardH: number;
  cellW: number;
  cellH: number;
  cols: number;
  rows: number;
  cells: Cell[];
  /** Limites da câmera: até onde o campo pode ser arrastado. */
  bounds: Bounds;
  /** Câmera inicial, com o campo centralizado. */
  home: { x: number; y: number };
};

/** Ruído determinístico por célula, para um arranjo menos rígido. */
function jitter(c: number, r: number, salt: number) {
  const v = Math.sin(c * 127.1 + r * 311.7 + salt * 74.7) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

export function computeLayout(vw: number, vh: number, n: number): CanvasLayout {
  const compact = vw < 640;
  const cardW = compact ? 232 : 312;
  // barra do navegador (30) + prévia 16:10 + rodapé com nome e categoria (66)
  const cardH = 30 + Math.round((cardW * 10) / 16) + 66;
  const gapX = compact ? 64 : 120;
  const gapY = compact ? 56 : 88;
  const cellW = cardW + gapX;
  const cellH = cardH + gapY;
  // Margem livre entre o campo e a borda quando arrastado até o fim.
  const pad = compact ? 28 : 48;

  // Colunas que deixam o campo com proporção parecida com a da tela.
  const cols = Math.max(1, Math.min(n, Math.round(Math.sqrt((n * (vw / vh) * cellH) / cellW))));
  const rows = Math.max(1, Math.ceil(n / cols));

  const cells: Cell[] = [];
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    cells.push({
      item: i,
      bx: Math.round(c * cellW + jitter(c, r, 1) * gapX * 0.18),
      by: Math.round(r * cellH + (c % 2 ? cellH / 2 : 0) + jitter(c, r, 2) * gapY * 0.25),
      delay: Math.round(Math.hypot(c - cx, r - cy) * 80),
    });
  }

  const left = Math.min(...cells.map((c) => c.bx));
  const right = Math.max(...cells.map((c) => c.bx)) + cardW;
  const top = Math.min(...cells.map((c) => c.by));
  const bottom = Math.max(...cells.map((c) => c.by)) + cardH;

  /** Faixa da câmera num eixo; se o campo cabe na tela, ele fica centralizado. */
  const axis = (start: number, end: number, view: number) => {
    const center = (view - (start + end)) / 2;
    if (end - start + pad * 2 <= view) return { min: center, max: center, center };
    return { min: view - pad - end, max: pad - start, center };
  };
  const ax = axis(left, right, vw);
  const ay = axis(top, bottom, vh);

  return {
    vw,
    vh,
    cardW,
    cardH,
    cellW,
    cellH,
    cols,
    rows,
    cells,
    bounds: { minX: ax.min, maxX: ax.max, minY: ay.min, maxY: ay.max },
    home: { x: ax.center, y: ay.center },
  };
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Câmera dentro dos limites. */
export function clampCamera(layout: CanvasLayout, x: number, y: number) {
  const b = layout.bounds;
  return { x: clamp(x, b.minX, b.maxX), y: clamp(y, b.minY, b.maxY) };
}

/** Câmera que centraliza a célula `i` na tela (respeitando os limites). */
export function cameraFor(layout: CanvasLayout, i: number) {
  const cell = layout.cells[i];
  return clampCamera(layout, layout.vw / 2 - layout.cardW / 2 - cell.bx, layout.vh / 2 - layout.cardH / 2 - cell.by);
}
