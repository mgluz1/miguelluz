/**
 * Galeria espacial de sites (canvas arrastável na seção "Projetos").
 *
 * Fonte única dos cartões do canvas. Para adicionar um cliente:
 *  1. Salve uma captura da página inicial (1440×900) em images-src/galeria/,
 *     registre-a em scripts/optimize-images.mjs e rode `npm run images`.
 *  2. Acrescente um objeto ao array `galleryItems` abaixo.
 *
 * O canvas se reorganiza sozinho: a altura da seção não muda, não importa
 * quantos sites existam. Sem `preview`, o cartão mostra uma capa com a cor
 * do projeto (nunca uma captura inventada).
 *
 * Regra do portfólio: nada de métricas, depoimentos ou resultados inventados.
 */

import { featuredProjects } from "./projects";

export type GalleryItem = {
  id: string;
  name: string;
  /** Tipo de site · segmento — aparece sob o nome. */
  category: string;
  status: string;
  /** Endereço público do site (abre em nova aba). */
  href: string;
  /** Texto curto exibido na barra do navegador do cartão. */
  host: string;
  /** Captura real do site, registrada em scripts/optimize-images.mjs. */
  preview?: { image: string; alt: string };
  /** Cor de destaque do site — borda no hover e capa sem captura. */
  accent: string;
};

const project = (id: string) => {
  const p = featuredProjects.find((f) => f.id === id);
  if (!p) throw new Error(`Projeto "${id}" não encontrado em projects.ts`);
  return p;
};

const hm2 = project("hm2");
const moraesluz = project("moraesluz");

export const galleryItems: GalleryItem[] = [
  {
    id: hm2.id,
    name: hm2.name,
    category: "Site institucional · Aviação executiva",
    status: hm2.status,
    href: hm2.url!,
    host: hm2.urlLabel!,
    preview: { image: "hm2-hero", alt: hm2.images[0].alt },
    accent: "#b8892b",
  },
  {
    id: moraesluz.id,
    name: moraesluz.name,
    category: "Landing page · Advocacia",
    status: moraesluz.status,
    href: moraesluz.url!,
    host: moraesluz.urlLabel!,
    preview: { image: "moraesluz-hero", alt: moraesluz.images[0].alt },
    accent: "#1f5a43",
  },
  {
    id: "joaocastro",
    name: "João Castro Fit",
    category: "Site pessoal · Treino e corrida",
    status: "Publicado",
    href: "https://joaocastro.fit/",
    host: "joaocastro.fit",
    preview: {
      image: "joaocastro-hero",
      alt: "Página inicial do João Castro Fit em fundo preto, com o título Treino com método. Evolução com constância. e a foto do treinador em uma academia.",
    },
    accent: "#4f6bed",
  },
  {
    id: "adrianabelocorp",
    name: "Adriana Belocorp",
    category: "Landing page · Planos para cirurgia plástica",
    status: "Publicado",
    href: "https://adrianabelocorp.netlify.app/",
    host: "adrianabelocorp.netlify.app",
    preview: {
      image: "adrianabelocorp-hero",
      alt: "Página inicial da Adriana Belocorp em tons claros e vinho, com o título Planeje sua cirurgia com clareza, no seu tempo. e a foto da consultora.",
    },
    accent: "#7a2a52",
  },
  {
    id: "terapeutacassialuz",
    name: "Cássia Luz",
    category: "Site profissional · Terapia integrativa",
    status: "Publicado",
    href: "https://terapeutacassialuz.netlify.app/",
    host: "terapeutacassialuz.netlify.app",
    preview: {
      image: "terapeutacassialuz-hero",
      alt: "Página inicial da terapeuta Cássia Luz em azul petróleo, com o título Um cuidado que começa por ouvir você. e o retrato da terapeuta em um círculo.",
    },
    accent: "#2f7a64",
  },
];
