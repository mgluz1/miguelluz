import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";

/** Usado apenas no build para gerar o HTML estático (scripts/prerender.mjs). */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
