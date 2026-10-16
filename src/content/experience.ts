/**
 * Experiência profissional e conhecimentos.
 * Contribuições coletivas usam verbos de participação — mantenha esse cuidado ao editar.
 */

export const mainExperience = {
  org: "GoiásFomento",
  role: "Estagiário de TI",
  team: "GELIC",
  period: "Mar 2026 — atual",
  periodISO: "2026-03",
  summary:
    "Atuo com automação, dados e IA aplicada a rotinas administrativas de licitações e contratos. Em todas as demonstrações deste portfólio, os dados são sintéticos.",
  contributions: [
    {
      tag: "docs · IA",
      text: "Geração assistida por IA de documentos, com extração de dados, preenchimento de modelos e verificação.",
    },
    {
      tag: "agente · IA",
      text: "Participação no desenvolvimento de um agente de IA para contratações diretas.",
    },
    {
      tag: "planilhas",
      text: "Planilhas automatizadas de controle de vigência contratual e alertas de prazos.",
    },
    {
      tag: "dados",
      text: "Extração, tratamento e consolidação de dados do LC Compras.",
    },
    {
      tag: "dashboards",
      text: "Dashboards gerenciais e acompanhamento de indicadores.",
    },
    {
      tag: "SEI",
      text: "Apoio técnico e operacional em processos via SEI.",
    },
    {
      tag: "processos",
      text: "Revisão e padronização de controles e procedimentos.",
    },
  ],
};

export const previousExperience = {
  org: "Vapt-Vupt GO",
  role: "Atendente",
  period: "Fev 2025 — Mar 2026",
  summary:
    "Atendimento direto ao público, onde aprendi a ouvir, explicar com clareza e enxergar onde processos operacionais travam.",
  items: [
    "Atendimento e encaminhamento de usuários",
    "Planilhas e relatórios",
    "Uso de sistemas governamentais",
    "Organização documental e apoio administrativo",
  ],
};

/** Onde a tecnologia já foi aplicada de forma demonstrável. */
export type SkillUse = "projetos" | "estagio";

export type Skill = { name: string; used?: SkillUse[] };

export const skillGroups: { title: string; file: string; skills: Skill[] }[] = [
  {
    title: "Desenvolvimento web",
    file: "web/",
    skills: [
      { name: "React", used: ["projetos"] },
      { name: "TypeScript", used: ["projetos"] },
      { name: "JavaScript" },
      { name: "HTML", used: ["projetos"] },
      { name: "CSS", used: ["projetos"] },
      { name: "Vite", used: ["projetos"] },
      { name: "Tailwind CSS", used: ["projetos"] },
      { name: "GSAP", used: ["projetos"] },
      { name: "Motion", used: ["projetos"] },
    ],
  },
  {
    title: "Automação e dados",
    file: "dados/",
    skills: [
      { name: "Python" },
      { name: "Excel", used: ["estagio"] },
      { name: "Geração de documentos com IA", used: ["estagio"] },
      { name: "Power BI (introdutório)" },
    ],
  },
  {
    title: "Fundamentos",
    file: "base/",
    skills: [
      { name: "C" },
      { name: "Java · orientação a objetos" },
      { name: "Estruturas de dados" },
      { name: "SQL básico" },
      { name: "Modelagem de banco de dados" },
    ],
  },
  {
    title: "Ferramentas",
    file: "tools/",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Netlify" },
      { name: "Vercel" },
      { name: "Ferramentas de desenvolvimento com IA" },
    ],
  },
];

export const education = [
  {
    title: "Programador de Sistemas",
    org: "SENAC GO",
    period: "Concluído em 2024",
    note: "Curso de qualificação · 200 horas.",
  },
  {
    title: "Ciência da Computação",
    org: "PUC Goiás",
    period: "2025 — 2029 (previsão)",
    note: "Bacharelado em andamento.",
  },
  {
    title: "Estagiário de TI",
    org: "GoiásFomento",
    period: "2026 — atual",
    note: "GELIC · automação e dados.",
  },
];
