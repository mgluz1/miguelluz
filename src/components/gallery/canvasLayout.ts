/**
 * Layout do canvas infinito.
 *
 * Os cartões ficam em uma "telha" (tile) retangular de colunas × linhas, com as
 * colunas ímpares deslocadas meia célula para baixo. A telha se repete em todas
 * as direções: cada célula é desenhada na posição `mod(base + câmera, telha)`.
 * Assim o número de elementos no DOM depende só do tamanho da tela, nunca de
 * quanto o visitante arrasta — e a altura da seção nunca cresce.
 */

export type Cell = {
  /** Índice do projeto em galleryItems. */
  item: number;
  /** Posição base dentro da telha (px). */
  bx: number;
  by: number;
  /** Primeira ocorrência do projeto: é a única focável e lida por leitores de tela. */
  primary: boolean;
  /** Atraso da animação de entrada, do centro para fora (ms). */
  delay: number;
};

export type CanvasLayout = {
  vw: number;
  vh: number;
  cardW: number;
  cardH: number;
  cellW: number;
  cellH: number;
  cols: number;
  rows: number;
  /** Tamanho da telha que se repete. */
  W: number;
  H: number;
  cells: Cell[];
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/**
 * Passo entre linhas: a linha r começa no projeto r·step. Escolhido para que
 * vizinhos (lado a lado e na diagonal) sejam projetos diferentes.
 */
function rowStep(n: number) {
  if (n < 3) return 1;
  for (let s = 2; s < n - 1; s++) {
    if (gcd(s, n) === 1 && (1 + s) % n !== 0 && (s - 1) % n !== 0) return s;
  }
  for (let s = 2; s < n; s++) if (gcd(s, n) === 1) return s;
  return 1;
}

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
  const gapX = compact ? 44 : 80;
  const gapY = compact ? 44 : 64;
  const cellW = cardW + gapX;
  const cellH = cardH + gapY;

  const step = rowStep(n);
  // A telha precisa cobrir a tela inteira mais uma célula de folga em cada eixo.
  let cols = Math.max(2, Math.ceil(vw / cellW) + 1);
  let rows = Math.max(2, Math.ceil(vh / cellH) + 2);

  // Número par de colunas mantém o deslocamento alternado contínuo na emenda;
  // e evitamos repetir o mesmo projeto lado a lado na emenda da telha.
  while (cols % 2 !== 0 || (n > 1 && (cols - 1) % n === 0)) cols++;
  while (n > 2 && ((rows - 1) * step) % n === 0) rows++;
  while (cols * rows < n) rows++;

  const cells: Cell[] = [];
  const seen = new Set<number>();
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const item = n ? (c + r * step) % n : 0;
      const primary = !seen.has(item);
      seen.add(item);
      cells.push({
        item,
        bx: Math.round(c * cellW + jitter(c, r, 1) * gapX * 0.22),
        by: Math.round(r * cellH + (c % 2 ? cellH / 2 : 0) + jitter(c, r, 2) * gapY * 0.3),
        primary,
        delay: Math.round(Math.hypot(c - cx, r - cy) * 70),
      });
    }
  }

  return { vw, vh, cardW, cardH, cellW, cellH, cols, rows, W: cols * cellW, H: rows * cellH, cells };
}

/** Módulo sempre positivo. */
export const mod = (a: number, m: number) => ((a % m) + m) % m;

/** Menor deslocamento equivalente dentro de uma telha que se repete. */
export const wrapDelta = (d: number, m: number) => mod(d + m / 2, m) - m / 2;

/** Câmera que centraliza a célula `i` na tela. */
export function cameraFor(layout: CanvasLayout, i: number) {
  const cell = layout.cells[i];
  return {
    x: layout.vw / 2 - layout.cardW / 2 + layout.cellW - cell.bx,
    y: layout.vh / 2 - layout.cardH / 2 + layout.cellH - cell.by,
  };
}

/** Posição de tela da célula para a câmera atual. */
export function cellPosition(layout: CanvasLayout, cell: Cell, camX: number, camY: number) {
  return {
    x: mod(cell.bx + camX, layout.W) - layout.cellW,
    y: mod(cell.by + camY, layout.H) - layout.cellH,
  };
}
