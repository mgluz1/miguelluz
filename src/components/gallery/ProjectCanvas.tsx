import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type UIEvent as ReactUIEvent,
} from "react";
import { galleryItems } from "../../content/gallery";
import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery";
import { useInView } from "../../hooks/useInView";
import { Icon } from "../ui/Icon";
import { cameraFor, cellPosition, computeLayout, wrapDelta, type CanvasLayout } from "./canvasLayout";
import { GalleryCard } from "./GalleryCard";
import "./ProjectCanvas.css";

/** Fração da velocidade que sobra após 1 s de inércia (quanto menor, mais curto o deslize). */
const FRICTION_PER_SECOND = 0.006;
/** Movimento mínimo (px) para um toque virar arraste — abaixo disso é clique. */
const DRAG_THRESHOLD = 6;
/** Deriva lenta quando ninguém interage (px/ms). */
const DRIFT = { x: -0.012, y: -0.005 };
const IDLE_BEFORE_DRIFT = 2600;
const DOT_GRID = 28;

type Sample = { x: number; y: number; t: number };

const pad = (v: number) => {
  const n = Math.round(v / 10);
  return `${n < 0 ? "−" : "+"}${String(Math.abs(n)).padStart(4, "0")}`;
};

/**
 * Galeria espacial: um plano infinito com os sites publicados pela MGLabs que o visitante
 * arrasta em qualquer direção (mouse, toque, trackpad ou teclado).
 *
 * Sem JavaScript (ou na pré-renderização) a mesma lista aparece como grade
 * simples — o conteúdo nunca depende da interação.
 */
export function ProjectCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [listMode, setListMode] = useState(false);
  const [layout, setLayout] = useState<CanvasLayout | null>(null);
  const [armed, setArmed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [explored, setExplored] = useState(false);

  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const inView = useInView(rootRef, "300px");

  const layoutRef = useRef<CanvasLayout | null>(null);
  const cam = useRef({
    x: 0,
    y: 0,
    origin: { x: 0, y: 0 },
    vx: 0,
    vy: 0,
    target: null as null | { x: number; y: number },
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    dragging: false,
    moved: false,
    hovering: false,
    focusWithin: false,
    lastInteract: 0,
    dirty: true,
    samples: [] as Sample[],
  });

  const showCanvas = mounted && !listMode && layout !== null;

  useEffect(() => setMounted(true), []);

  // Carrega as prévias só quando o canvas se aproxima da tela (e mantém depois).
  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

  // Mede a área visível e recalcula o layout quando ela muda.
  useEffect(() => {
    if (!mounted || listMode) return;
    const el = frameRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const prev = layoutRef.current;
      if (prev && Math.abs(prev.vw - width) < 1 && Math.abs(prev.vh - height) < 1) return;
      const next = computeLayout(width, height, galleryItems.length);
      const c = cam.current;
      const origin = cameraFor(next, 0);
      if (!prev) {
        c.x = origin.x;
        c.y = origin.y;
      } else {
        // Mantém o ponto central ao redimensionar.
        c.x += (width - prev.vw) / 2;
        c.y += (height - prev.vh) / 2;
      }
      c.origin = origin;
      c.target = null;
      c.dirty = true;
      layoutRef.current = next;
      setLayout(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted, listMode]);

  /** Aplica a câmera: posição de cada cartão, grade de pontos e coordenadas. */
  const paint = useCallback(() => {
    const L = layoutRef.current;
    const c = cam.current;
    const vp = viewportRef.current;
    if (!L || !vp) return;
    L.cells.forEach((cell, i) => {
      const el = cellRefs.current[i];
      if (!el) return;
      const p = cellPosition(L, cell, c.x, c.y);
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    });
    vp.style.backgroundPosition = `${c.x % DOT_GRID}px ${c.y % DOT_GRID}px`;
    if (coordRef.current) {
      coordRef.current.textContent = `x ${pad(c.origin.x - c.x)} · y ${pad(c.origin.y - c.y)}`;
    }
  }, []);

  // Pinta assim que o layout novo chega ao DOM.
  useEffect(() => {
    if (showCanvas) paint();
  }, [showCanvas, layout, paint]);

  // Laço de animação: inércia, transições suaves e deriva. Só roda com o canvas visível.
  useEffect(() => {
    if (!showCanvas || !inView) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const c = cam.current;

      if (!c.dragging) {
        if (c.target) {
          const k = 1 - Math.exp(-dt / 130);
          const dx = c.target.x - c.x;
          const dy = c.target.y - c.y;
          if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
            c.x = c.target.x;
            c.y = c.target.y;
            c.target = null;
          } else {
            c.x += dx * k;
            c.y += dy * k;
          }
          c.dirty = true;
        } else if (Math.abs(c.vx) > 0.004 || Math.abs(c.vy) > 0.004) {
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          const f = Math.pow(FRICTION_PER_SECOND, dt / 1000);
          c.vx *= f;
          c.vy *= f;
          c.dirty = true;
        } else if (!reduced && !paused && !c.hovering && !c.focusWithin && now - c.lastInteract > IDLE_BEFORE_DRIFT) {
          c.x += DRIFT.x * dt;
          c.y += DRIFT.y * dt;
          c.dirty = true;
        }
      }

      if (c.dirty) {
        paint();
        c.dirty = false;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showCanvas, inView, reduced, paused, paint]);

  /** Leva a câmera até uma posição, pelo caminho mais curto na telha infinita. */
  const panTo = useCallback(
    (x: number, y: number) => {
      const L = layoutRef.current;
      const c = cam.current;
      if (!L) return;
      const tx = c.x + wrapDelta(x - c.x, L.W);
      const ty = c.y + wrapDelta(y - c.y, L.H);
      c.vx = c.vy = 0;
      c.lastInteract = performance.now();
      if (reduced) {
        c.x = tx;
        c.y = ty;
        c.target = null;
      } else {
        c.target = { x: tx, y: ty };
      }
      c.dirty = true;
    },
    [reduced],
  );

  const recenter = useCallback(() => {
    const L = layoutRef.current;
    if (!L) return;
    const o = cameraFor(L, 0);
    panTo(o.x, o.y);
  }, [panTo]);

  // Trackpad: o gesto horizontal (ou Shift + roda) move o canvas;
  // o vertical continua rolando a página — o canvas nunca prende a rolagem.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!showCanvas || !vp) return;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontal && !e.shiftKey) return;
      e.preventDefault();
      const c = cam.current;
      c.x -= horizontal ? e.deltaX : e.deltaY;
      if (horizontal) c.y -= e.deltaY;
      c.target = null;
      c.vx = c.vy = 0;
      c.lastInteract = performance.now();
      c.dirty = true;
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [showCanvas]);

  /* ---------- Ponteiro (mouse, caneta e toque) ---------- */

  const setCursor = (label: string, state: string) => {
    const el = cursorRef.current;
    if (!el || el.dataset.state === state) return;
    el.dataset.state = state;
    el.textContent = label;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as Element).closest("[data-hud]")) return;
    const c = cam.current;
    c.pointerId = e.pointerId;
    c.startX = c.lastX = e.clientX;
    c.startY = c.lastY = e.clientY;
    c.moved = false;
    c.target = null;
    c.vx = c.vy = 0;
    c.samples = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
    c.lastInteract = performance.now();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const c = cam.current;

    if (finePointer && cursorRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      cursorRef.current.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
      if (c.dragging) setCursor("Arrastando", "drag");
      else if ((e.target as Element).closest(".gcard")) setCursor("Visitar site", "open");
      else setCursor("Arraste", "idle");
    }

    if (e.pointerId !== c.pointerId) return;
    if (!c.dragging) {
      if (Math.hypot(e.clientX - c.startX, e.clientY - c.startY) < DRAG_THRESHOLD) return;
      c.dragging = true;
      c.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      rootRef.current?.classList.add("is-dragging");
      if (!explored) setExplored(true);
    }

    c.x += e.clientX - c.lastX;
    c.y += e.clientY - c.lastY;
    c.lastX = e.clientX;
    c.lastY = e.clientY;
    c.samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
    while (c.samples.length > 2 && e.timeStamp - c.samples[0].t > 100) c.samples.shift();
    c.lastInteract = performance.now();
    c.dirty = true;
    // Durante o arraste, pinta já neste evento: sem esperar o próximo quadro.
    paint();
    c.dirty = false;
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const c = cam.current;
    if (e.pointerId !== c.pointerId) return;
    c.pointerId = -1;
    if (c.dragging) {
      const first = c.samples[0];
      const last = c.samples[c.samples.length - 1];
      const dt = last.t - first.t;
      const stale = e.timeStamp - last.t > 70; // parou antes de soltar: sem inércia
      if (!reduced && dt > 0 && !stale) {
        const clamp = (v: number) => Math.max(-4, Math.min(4, v));
        c.vx = clamp((last.x - first.x) / dt);
        c.vy = clamp((last.y - first.y) / dt);
      }
      c.dragging = false;
      rootRef.current?.classList.remove("is-dragging");
      if (finePointer) setCursor("Arraste", "idle");
    }
    c.lastInteract = performance.now();
  };

  /** Um arraste não pode terminar abrindo o projeto sob o ponteiro. */
  const onClickCapture = (e: ReactMouseEvent) => {
    if (cam.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      cam.current.moved = false;
    }
  };

  /* ---------- Teclado ---------- */

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const L = layoutRef.current;
    if (!L) return;
    const c = cam.current;
    const base = c.target ?? { x: c.x, y: c.y };
    const step = e.shiftKey ? L.cellW * 2 : L.cellW * 0.75;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    if (e.key === "Home") {
      e.preventDefault();
      recenter();
    } else if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      panTo(base.x + dx, base.y + dy);
      if (!explored) setExplored(true);
    }
  };

  /** Ao navegar com Tab, o cartão focado desliza até o centro. */
  const onCardFocus = (cellIndex: number, el: HTMLElement) => {
    cam.current.focusWithin = true;
    if (!el.matches(":focus-visible")) return;
    const L = layoutRef.current;
    if (!L) return;
    const t = cameraFor(L, cellIndex);
    panTo(t.x, t.y);
  };

  // Rolagem nativa nunca deve deslocar o plano (o foco pode tentar).
  const resetScroll = (e: ReactUIEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft = 0;
    e.currentTarget.scrollTop = 0;
  };

  const count = String(galleryItems.length).padStart(2, "0");

  return (
    <div
      ref={rootRef}
      className={`gallery${showCanvas ? " is-canvas" : " is-list"}${armed ? " is-armed" : ""}${explored ? " is-explored" : ""}`}
      style={
        layout ? ({ "--card-w": `${layout.cardW}px`, "--card-h": `${layout.cardH}px` } as CSSProperties) : undefined
      }
    >
      <h3 id="galeria-title" className="visually-hidden">
        Galeria de sites
      </h3>
      <p id="galeria-help" className="visually-hidden">
        Plano arrastável com {galleryItems.length} sites. Arraste com o mouse ou o dedo, use as setas do teclado para
        mover e Home para voltar ao início. Tab percorre os sites. Também há um botão para ver tudo como lista.
      </p>

      <div ref={frameRef} className="gallery__frame">
        {showCanvas ? (
          <div
            ref={viewportRef}
            className="gallery__viewport"
            role="region"
            aria-roledescription="galeria arrastável"
            aria-labelledby="galeria-title"
            aria-describedby="galeria-help"
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onPointerEnter={() => (cam.current.hovering = true)}
            onPointerLeave={() => (cam.current.hovering = false)}
            onClickCapture={onClickCapture}
            onKeyDown={onKeyDown}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) cam.current.focusWithin = false;
            }}
            onScroll={resetScroll}
          >
            <div className="gallery__plane">
              {layout.cells.map((cell, i) => (
                <div
                  key={`${layout.cols}x${layout.rows}-${i}`}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  className="gallery__cell"
                  inert={!cell.primary}
                  style={{ "--d": `${cell.delay}ms` } as CSSProperties}
                >
                  <div className="gallery__enter">
                    <GalleryCard
                      item={galleryItems[cell.item]}
                      load={armed}
                      sizes={`${layout.cardW}px`}
                      onFocus={(el) => onCardFocus(i, el)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {finePointer && (
              <div ref={cursorRef} className="gallery__cursor mono" aria-hidden="true" data-state="idle">
                Arraste
              </div>
            )}

            <p className="gallery__hint mono" aria-hidden="true">
              <Icon name="drag" size={16} />
              Arraste para explorar
            </p>

            <div className="gallery__hud" data-hud>
              <p className="gallery__meta mono" aria-hidden="true">
                <span className="gallery__count">{count} sites</span>
                <span ref={coordRef} className="gallery__coords">
                  x +0000 · y +0000
                </span>
              </p>
              <div className="gallery__actions">
                {!reduced && (
                  <button
                    type="button"
                    className="gallery__btn"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    aria-label={paused ? "Retomar movimento automático" : "Pausar movimento automático"}
                    title={paused ? "Retomar movimento" : "Pausar movimento"}
                  >
                    <Icon name={paused ? "play" : "pause"} size={16} />
                  </button>
                )}
                <button type="button" className="gallery__btn" onClick={recenter} title="Voltar ao início">
                  <Icon name="target" size={16} />
                  <span className="visually-hidden">Voltar ao início do canvas</span>
                </button>
                <button
                  type="button"
                  className="gallery__btn gallery__btn--text mono"
                  onClick={() => setListMode(true)}
                >
                  <Icon name="grid" size={16} />
                  Ver lista
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="gallery__viewport gallery__viewport--list">
            <ul className="gallery__list" role="list" aria-labelledby="galeria-title">
              {galleryItems.map((item) => (
                <li key={item.id}>
                  <GalleryCard item={item} load sizes="(max-width: 640px) 80vw, 312px" />
                </li>
              ))}
            </ul>
          </div>
        )}
        {mounted && listMode && (
          <div className="gallery__hud gallery__hud--list" data-hud>
            <button
              type="button"
              className="gallery__btn gallery__btn--text mono"
              onClick={() => {
                layoutRef.current = null;
                setLayout(null);
                setListMode(false);
              }}
            >
              <Icon name="drag" size={16} />
              Ver canvas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
