/**
 * Dados pessoais, links e textos gerais.
 * Edite aqui para atualizar nome, contatos e chamadas da página.
 */

export const profile = {
  name: "Miguel Luz",
  fullName: "Miguel Fernando Luz",
  role: "Desenvolvedor front-end · Estudante de Ciência da Computação",
  location: "Goiânia, GO",
  email: "miguelmluz777@gmail.com",
};

export const links = {
  linkedin: "https://www.linkedin.com/in/miguelluz19",
  github: "https://github.com/mgluz1",
  mglabs: "https://mglabss.netlify.app/",
};

/**
 * Currículo em PDF.
 * Quando o arquivo existir, coloque-o em `public/` (ex.: public/curriculo-miguel-luz.pdf)
 * e troque `null` pelo caminho: "/curriculo-miguel-luz.pdf".
 * Enquanto for `null`, a página oferece "Solicitar currículo" por e-mail — nunca um link quebrado.
 */
export const resumeUrl: string | null = null;

export const resumeRequestHref = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Solicitação de currículo — Miguel Luz",
)}`;

export const navItems = [
  { id: "projetos", label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
] as const;

export const hero = {
  eyebrow: "Desenvolvimento front-end · Automação",
  title: "Interfaces bem pensadas. Processos mais simples.",
  lead:
    "Sou estudante de Ciência da Computação e desenvolvedor freelancer. Construo sites para negócios reais e atuo com automação, dados e IA aplicada a rotinas administrativas.",
};

export const processSteps = [
  {
    n: "01",
    title: "Entender",
    file: "briefing.md",
    text: "Converso sobre o negócio, o público e a rotina antes de abrir o editor. A necessidade vem antes da tela.",
  },
  {
    n: "02",
    title: "Estruturar",
    file: "wireframe",
    text: "Organizo conteúdo, hierarquia e fluxo. Defino o que cada seção precisa comunicar — ou que etapa manual pode sumir.",
  },
  {
    n: "03",
    title: "Construir",
    file: "src/components",
    text: "Desenvolvo componentes reutilizáveis em React e TypeScript. Quando uso IA, reviso e entendo cada trecho antes de manter.",
  },
  {
    n: "04",
    title: "Publicar e acompanhar",
    file: "deploy · netlify",
    text: "Otimizo imagens, testo em telas diferentes, publico e continuo disponível para ajustes depois que vai ao ar.",
  },
];
