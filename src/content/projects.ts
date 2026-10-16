/**
 * Projetos exibidos na seção "Projetos".
 *
 * Para adicionar um projeto com screenshots:
 *  1. Coloque as imagens originais em images-src/ e registre-as em scripts/optimize-images.mjs.
 *  2. Rode `npm run images`.
 *  3. Adicione um objeto abaixo usando os nomes registrados em `images`.
 *
 * Regra do portfólio: nada de métricas, depoimentos ou resultados inventados.
 */

import { links } from "./site";

export type ProjectImage = {
  /** Nome registrado em scripts/optimize-images.mjs */
  name: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  index: string;
  name: string;
  segment: string;
  status: string;
  url?: string;
  urlLabel?: string;
  context: string;
  role: string;
  solution: string;
  decisions: string[];
  stack: string[];
  images: ProjectImage[];
  /** Tema da moldura das screenshots, combinando com o site do cliente */
  tone: "navy" | "forest";
};

export const featuredProjects: Project[] = [
  {
    id: "hm2",
    index: "01",
    name: "HM2 Aviation",
    segment: "Aviação executiva",
    status: "Publicado",
    url: "https://hm2aviation.com.br/",
    urlLabel: "hm2aviation.com.br",
    context:
      "Empresa de compra e venda de aeronaves executivas. O público avalia cada aeronave com cuidado: fotos, ficha técnica e um contato direto pesam mais do que volume de texto.",
    role: "Design de interface e desenvolvimento front-end, como projeto freelancer pela MGLabs.",
    solution:
      "Um site com abertura cinematográfica, vitrine de aeronaves em carrossel e ficha técnica detalhada em painel lateral. A apresentação sóbria, com fotografia em destaque e movimento contido, conversa com o padrão da aviação executiva.",
    decisions: [
      "Plugin Vite que pré-renderiza uma página por aeronave, para que links compartilhados em redes sociais mostrem a pré-visualização correta.",
      "Pipeline de otimização de imagens com sharp, já que a fotografia é o principal conteúdo do site.",
      "Carrossel arrastável com inércia para navegar pelas aeronaves de forma natural no toque e no mouse.",
      "Transições Flip e animações de texto com GSAP para ligar a vitrine à ficha técnica sem cortes bruscos.",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "sharp", "Netlify"],
    images: [
      {
        name: "hm2-hero",
        alt: "Página inicial da HM2 Aviation com um jato executivo em frente a um hangar ao entardecer e o título Assessoria especializada em importação e venda de aeronaves.",
      },
      {
        name: "hm2-aeronaves",
        alt: "Seção Aeronaves da HM2 Aviation: carrossel com um cartão do King Air C90 mostrando foto, ano, velocidade, alcance e botões de contato.",
        caption: "Vitrine em carrossel arrastável",
      },
      {
        name: "hm2-ficha",
        alt: "Painel lateral com a ficha técnica do King Air F90: desempenho, motores e horas disponíveis.",
        caption: "Ficha técnica em painel lateral",
      },
    ],
    tone: "navy",
  },
  {
    id: "moraesluz",
    index: "02",
    name: "Moraes Luz Advocacia",
    segment: "Advocacia & assessoria jurídica",
    status: "Publicado",
    url: "https://moraesluzadv.com/",
    urlLabel: "moraesluzadv.com",
    context:
      "Escritório de advocacia em Goiânia que precisava de uma presença institucional clara: quem são, onde atuam e como falar com um advogado.",
    role: "Design de interface e desenvolvimento front-end, como projeto freelancer pela MGLabs.",
    solution:
      "Landing page institucional com identidade verde e dourada, conteúdo organizado em história, diferenciais e áreas de atuação, e chamadas de contato visíveis em todas as telas.",
    decisions: [
      "Componentes em TSX separados por seção, o que facilita revisar textos e reorganizar o conteúdo.",
      "Animações com Motion restritas à hero, aos cartões e ao menu mobile — movimento para orientar, não para enfeitar.",
      "Menu mobile próprio e layout pensado para leitura no celular, onde boa parte dos contatos começa.",
      "Ícones com Lucide React e tipografia via Google Fonts para manter o tom sóbrio e consistente.",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Motion", "Lucide React", "Netlify"],
    images: [
      {
        name: "moraesluz-hero",
        alt: "Hero da Moraes Luz Advocacia em verde escuro com o título Soluções Jurídicas Estratégicas e Éticas e o emblema dourado do escritório.",
      },
      {
        name: "moraesluz-historia",
        alt: "Seção Nossa História com fotografia da advogada em um plenário e texto sobre o escritório em Goiânia.",
        caption: "História do escritório",
      },
      {
        name: "moraesluz-diferenciais",
        alt: "Seção Por que escolher Moraes Luz Advocacia com três diferenciais listados e fotos do escritório.",
        caption: "Diferenciais e ambiente",
      },
    ],
    tone: "forest",
  },
];

/** Estados usados no projeto em desenvolvimento. */
export type FeatureState = "planejado" | "implementado" | "validado";

/**
 * Monitoramento de Publicações Processuais.
 * Atualize `state` de cada funcionalidade conforme o projeto avançar.
 */
export const monitorProject = {
  id: "monitor",
  index: "03",
  name: "Monitoramento de Publicações Processuais",
  segment: "Automação para advocacia",
  status: "Em desenvolvimento",
  context:
    "Escritórios acompanham publicações do PJe manualmente, conferindo cada OAB, repetições e prazos. É uma rotina demorada e sensível a esquecimentos.",
  proposal:
    "Automação que consulta publicações por OAB, remove duplicatas, organiza prazos e classifica a urgência em uma planilha ou painel.",
  caveat:
    "Projeto em construção. A demonstração ao lado é um protótipo de interface com dados fictícios; o cálculo de prazos ainda não foi validado e não deve ser tratado como produto concluído.",
  features: [
    { label: "Consulta de publicações do PJe por OAB", state: "planejado" },
    { label: "Remoção de publicações duplicadas", state: "planejado" },
    { label: "Organização de prazos", state: "planejado" },
    { label: "Classificação de urgência", state: "planejado" },
    { label: "Saída em planilha ou painel", state: "planejado" },
  ] satisfies { label: string; state: FeatureState }[],
  /** Preencha quando a stack estiver definida; vazio exibe "em definição". */
  stack: [] as string[],
};

export const mglabsProject = {
  name: "MGLabs",
  segment: "Iniciativa própria",
  url: links.mglabs,
  urlLabel: "mglabss.netlify.app",
  text:
    "Minha iniciativa de desenvolvimento freelancer. A página funciona como projeto próprio de posicionamento: apresenta os serviços, o processo de trabalho e os sites que entreguei — HM2 Aviation e Moraes Luz entre eles.",
};
