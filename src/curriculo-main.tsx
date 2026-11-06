import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { ResumePage } from "./components/resume/ResumePage";
import "./styles";

const root = document.getElementById("root")!;
const page = (
  <StrictMode>
    <ResumePage />
  </StrictMode>
);

// Mesmo esquema de main.tsx: no build o HTML vem pré-renderizado e só hidratamos.
if (root.hasChildNodes()) {
  hydrateRoot(root, page);
} else {
  createRoot(root).render(page);
}
