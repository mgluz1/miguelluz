/**
 * Galeria espacial de projetos (canvas arrastável na seção "Projetos").
 *
 * Fonte única dos cartões do canvas. Para adicionar um cliente:
 *  1. (Opcional, recomendado) Salve uma captura da página inicial em images-src/,
 *     registre-a em scripts/optimize-images.mjs e rode `npm run images`.
 *  2. Acrescente um objeto ao array `galleryItems` abaixo.
 *
 * O canvas se reorganiza sozinho: a altura da seção não muda, não importa
 * quantos projetos existam. Sem `preview`, o cartão mostra uma capa com as
 * cores do projeto (nunca uma captura inventada).
 *
 * Regra do portfólio: nada de métricas, depoimentos ou resultados inventados.
 */

import { featuredProjects, mglabsProject, monitorProject, salvaehProject } from "./projects";

/** Tom do selo de status: no ar, em construção ou entregue sem link público. */
export type GalleryStatusTone = "live" | "progress" | "done";

export type GalleryItem = {
  id: string;
  name: string;
  /** Tipo de entrega · segmento — aparece sob o nome. */
  category: string;
  status: string;
  statusTone: GalleryStatusTone;
  /** Link externo (abre em nova aba) ou âncora para o estudo de caso nesta página. */
  href: string;
  /** Texto curto exibido na barra do navegador do cartão. */
  host: string;
  /** Captura real do site, registrada em scripts/optimize-images.mjs. */
  preview?: { image: string; alt: string };
  /** Capa usada quando não há captura. */
  cover: {
    /** Cor de destaque do projeto. */
    accent: string;
    /** Fundo escuro da capa. */
    ink: string;
    /** Caminho de um ícone/logo em public/ (opcional). */
    mark?: string;
    tagline: string;
  };
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
    statusTone: "live",
    href: hm2.url!,
    host: hm2.urlLabel!,
    preview: { image: "hm2-hero", alt: hm2.images[0].alt },
    cover: { accent: "#c9a13b", ink: "#0b1a2e", tagline: "Aeronaves executivas" },
  },
  {
    id: moraesluz.id,
    name: moraesluz.name,
    category: "Landing page · Advocacia",
    status: moraesluz.status,
    statusTone: "live",
    href: moraesluz.url!,
    host: moraesluz.urlLabel!,
    preview: { image: "moraesluz-hero", alt: moraesluz.images[0].alt },
    cover: { accent: "#c9a13b", ink: "#0c2a1f", tagline: "Advocacia em Goiânia" },
  },
  {
    id: "salvaeh",
    name: salvaehProject.name,
    category: "App próprio · Organização pessoal",
    status: salvaehProject.status,
    statusTone: "progress",
    href: salvaehProject.url,
    host: salvaehProject.urlLabel,
    cover: {
      accent: "#01c77c",
      ink: "#06140e",
      mark: "/img/salvaeh-icon-224.webp",
      tagline: "Salvou? Agora você acha.",
    },
  },
  {
    id: monitorProject.id,
    name: monitorProject.name,
    category: "Sistema interno · Automação jurídica",
    status: monitorProject.status,
    statusTone: "done",
    // Sistema privado do escritório: o cartão leva ao estudo de caso.
    href: `#projeto-${monitorProject.id}`,
    host: "uso interno",
    cover: { accent: "#38d385", ink: "#070d14", tagline: "Publicações do DJEN em um só painel" },
  },
  {
    id: "mglabs",
    name: mglabsProject.name,
    category: "Iniciativa própria · Freelancer",
    status: "Publicado",
    statusTone: "live",
    href: mglabsProject.url,
    host: mglabsProject.urlLabel,
    cover: {
      accent: "#38d385",
      ink: "#02241a",
      mark: "/mark-mglabs.png",
      tagline: "Desenvolvimento web sob medida",
    },
  },
];
