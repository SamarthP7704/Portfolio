export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: 92, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "Tailwind CSS", level: 93, icon: "🎨" },
      { name: "Vite / Svelte", level: 82, icon: "⚡" },
      { name: "UI/UX & Figma", level: 78, icon: "🖼️" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Python / Flask / Django", level: 88, icon: "🐍" },
      { name: "Node.js / FastAPI", level: 85, icon: "🟩" },
      { name: ".NET / C# / MVC", level: 78, icon: "🔵" },
      { name: "SQL Server / PostgreSQL", level: 87, icon: "🐘" },
      { name: "GraphQL / REST APIs", level: 84, icon: "📊" },
    ],
  },
  {
    name: "AI / ML",
    skills: [
      { name: "LangChain / LangGraph", level: 88, icon: "🦜" },
      { name: "RAG & Vector Search", level: 85, icon: "🔍" },
      { name: "PyTorch / Scikit-learn", level: 76, icon: "🤖" },
      { name: "HuggingFace / NLTK", level: 78, icon: "🧠" },
      { name: "OpenAI / GPT APIs", level: 90, icon: "✨" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Power Platform / PAC CLI", level: 90, icon: "⚙️" },
      { name: "Azure / AWS / Docker", level: 80, icon: "☁️" },
      { name: "UiPath RPA", level: 82, icon: "🤖" },
      { name: "Supabase / Vercel", level: 85, icon: "🚀" },
      { name: "CI/CD / GitHub Actions", level: 82, icon: "🔄" },
    ],
  },
];

export const techLogos = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", ".NET",
  "SQL Server", "PostgreSQL", "Supabase", "Azure", "AWS", "Docker",
  "LangChain", "OpenAI", "Power Apps", "UiPath", "Tailwind", "Vite",
  "Flask", "Django", "Drupal", "GraphQL", "Stripe", "Vercel",
];
