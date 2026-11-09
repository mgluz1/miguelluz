/**
 * Currículo — segue a estrutura e o texto do PDF (public/curriculo-miguel-luz.pdf).
 * Ao atualizar o PDF, atualize também este arquivo para a página /curriculo/ não divergir.
 */
import { links, profile } from "./site";

/** Trecho de texto; `b` = negrito, `i` = itálico (como no PDF). */
export type Rich = string | { b: string } | { i: string };

export const resumeContact = {
  location: "Goiânia – GO",
  phone: "(62) 98133-0312",
  phoneHref: "tel:+5562981330312",
  email: profile.email,
  linkedin: { label: "linkedin.com/in/miguelluz19", href: links.linkedin },
  github: { label: "github.com/mgluz1", href: links.github },
};

export const resumeSummary: Rich[] = [
  "Estudante de ",
  { b: "Ciência da Computação" },
  " na PUC Goiás, com experiência em automação de processos administrativos, análise de dados e aplicação de IA generativa. ",
  { b: "desenvolvimento full stack" },
  ". Desenvolve landing pages em ",
  { b: "React e TypeScript" },
  " para clientes reais como freelancer e utiliza ",
  { b: "IA generativa" },
  " (agentes, engenharia de prompt e automação de documentos) no dia a dia do estágio. Possui sólida base em lógica de programação, estruturas de dados, linguagem C, Python e Java. Focado em evolução técnica contínua e resolução eficiente de problemas.",
];

export type Bullet = { lead?: string; text: Rich[] | string };

export type Entry = {
  title: string;
  place?: string;
  role?: string;
  period?: string;
  tech?: string;
  href?: string;
  hrefLabel?: string;
  bullets: Bullet[];
};

export const resumeEducation = {
  org: "Pontifícia Universidade Católica de Goiás – (PUC Goiás)",
  place: "Goiânia, GO",
  course: "Bacharelado em Ciência da Computação – 2º ano",
  period: "Início 2025/1 – Previsão de conclusão 2029/1",
  subjects: [
    "Estruturas de Dados",
    "Programação Orientada a Objetos (Java)",
    "Projeto de Banco de Dados",
    "Arquitetura de Computadores",
    "Álgebra Linear Computacional",
  ],
};

export const resumeExperience: Entry[] = [
  {
    title: "GoiásFomento",
    place: "Goiânia, GO",
    role: "Estagiário de TI (GELIC)",
    period: "Mar/2026 – Atual",
    bullets: [
      {
        lead: "Automação de documentos com IA:",
        text: "Geração assistida por IA de termos de adesão, contratos de credenciamento e erratas de editais, com fluxo de extração de dados, preenchimento de modelo e verificação; participação no desenvolvimento de um agente de IA para contratações diretas.",
      },
      {
        lead: "Revisão normativa:",
        text: "Revisão do checklist da fase preparatória de contratações, identificando e corrigindo 7 inconsistências normativas e alinhando o documento ao RILCC e à Lei nº 13.303/2016.",
      },
      {
        lead: "Desenvolvimento e automação de controles:",
        text: "Criação e manutenção de planilhas automatizadas para o controle de vigência de contratos, implementando mecanismos de alerta para prazos críticos e eventos contratuais.",
      },
      {
        lead: "Análise e visualização de dados:",
        text: "Extração, tratamento e consolidação de dados de sistemas de compras e licitações (LC Compras), estruturando dashboards gerenciais para o acompanhamento de indicadores de desempenho (KPIs).",
      },
      {
        lead: "Suporte e conformidade:",
        text: "Apoio operacional e técnico na gestão de processos licitatórios via SEI, padronizando fluxos, cronogramas e procedimentos internos da gerência.",
      },
    ],
  },
  {
    title: "Vapt-Vupt GO",
    place: "Goiânia, GO",
    role: "Atendente - Tempo Integral",
    period: "Fev/2025 – Mar/2026",
    bullets: [
      { text: "Triagem e encaminhamento de usuários para exames médicos periciais (CNH)." },
      { text: ["Elaboração de planilhas e relatórios de atendimento utilizando ", { b: "Excel e Word" }, "."] },
      { text: "Utilização de sistemas de atendimento governamentais (SIGAC)." },
      { text: "Organização de documentos, geração de notas fiscais e apoio administrativo." },
      { text: "Reconhecimento por excelência no atendimento ao cliente e eficiência operacional." },
    ],
  },
];

export const resumeProjectsTitle = "Projetos – Desenvolvimento Web Freelancer";

export const resumeProjects: Entry[] = [
  {
    title: "Salvaeh – Plataforma SaaS de Organização Pessoal",
    tech: "Next.js, TypeScript, Supabase",
    bullets: [
      {
        text: "Desenvolvimento de aplicação web para salvar, organizar e recuperar links, notas e conteúdos, com autenticação, PostgreSQL e políticas de acesso por usuário (RLS).",
      },
      {
        text: "Integração com Google Gemini para recursos de organização assistida por IA; testes, versionamento com Git/GitHub e deploy na Vercel.",
      },
    ],
  },
  {
    title: "HM2 Aviation",
    href: "https://hm2aviation.com.br/",
    hrefLabel: "hm2aviation.com.br",
    tech: "React 19, TypeScript, Vite, Tailwind CSS, GSAP",
    bullets: [
      { text: "Site para empresa de compra e venda de aeronaves executivas, com deploy na Netlify." },
      {
        text: "Pipeline próprio de otimização de imagens (sharp) e plugin Vite que pré-renderiza uma página por aeronave para pré-visualização de links em redes sociais.",
      },
      {
        text: "Animações e interações com GSAP (carrossel arrastável com inércia, transições Flip e animação de texto).",
      },
    ],
  },
  {
    title: "Moraes Luz Advocacia & Assessoria Jurídica",
    href: "https://moraesluzadv.com/",
    hrefLabel: "moraesluzadv.com",
    tech: "React 19, TypeScript, Vite, Tailwind CSS 4",
    bullets: [
      {
        text: "Landing page institucional para escritório de advocacia, com componentes em React e TypeScript (.tsx) e hospedagem na Netlify.",
      },
      {
        text: "Animações com Motion no Hero, nos cards e no menu mobile; ícones com Lucide React e tipografia via Google Fonts.",
      },
    ],
  },
  {
    title: "Controller – Monitoramento de Publicações Judiciais (DJEN/CNJ)",
    tech: "Node.js, SQLite, APIs",
    bullets: [
      {
        text: "Sistema personalizado para a Moraes Luz Advocacia que coleta publicações pela API do DJEN/CNJ e as reúne em um painel, com armazenamento histórico, deduplicação, busca, filtros por advogado e tribunal, registro de providências e acompanhamento do status de revisão.",
      },
    ],
  },
];

export const resumeCourses: Entry[] = [
  {
    title: "Programador de Sistemas – SENAC GO",
    period: "2025 (200h)",
    bullets: [{ text: "Fundamentos de programação e desenvolvimento web." }, { text: "HTML, JavaScript e lógica de programação." }],
  },
  {
    title: "Lógica de Programação e Linguagem C – Udemy",
    period: "2025 (20h)",
    bullets: [{ text: "Algoritmos, estruturas básicas e sintaxe da linguagem C." }],
  },
  {
    title: "Pacote Office – Udemy",
    period: "2025 (20h)",
    bullets: [{ text: "Excel, Word, PowerPoint e introdução ao Power BI." }],
  },
];

export const resumeSkills: Bullet[] = [
  { lead: "Linguagens:", text: "TypeScript, JavaScript, Python, C, Java (POO), SQL, HTML e CSS." },
  { lead: "Desenvolvimento web:", text: "React, Next.js, Vite, Tailwind CSS, Node.js, APIs REST, GSAP e Motion." },
  { lead: "Banco de dados:", text: "PostgreSQL, Supabase, SQLite, modelagem relacional e RLS." },
  { lead: "Ferramentas e infraestrutura:", text: "Git, GitHub, GitHub Actions, Docker, Vercel, Netlify e LaTeX." },
  {
    lead: "IA e análise:",
    text: "Google Gemini, engenharia de prompts, agentes de IA, automação de documentos, Excel e Power BI (introdutório).",
  },
];

export const resumeSoftSkills = [
  "Organização e atenção a detalhes",
  "Comunicação clara",
  "Responsabilidade e comprometimento",
  "Facilidade de aprendizado",
  "Resolução de problemas e melhoria de processos",
];

export const resumeObjective =
  "Atuar na área de Tecnologia da Informação, com foco em desenvolvimento de software, automação de processos ou análise de dados, aplicando conhecimentos técnicos para otimizar rotinas e gerar valor para a organização.";
