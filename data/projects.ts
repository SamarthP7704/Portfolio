export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string[];
  stack: string[];
  image: string;
  color: string;
  liveUrl: string;
  githubUrl: string;
  year: string;
  emoji: string;
}

export const projects: Project[] = [
  {
  id: 3,
  title: "PrepPAL — AI Nutrition Assistant",
  description: "AI-powered meal planning platform generating personalized recipes from pantry inventory with realtime nutrition tracking and smart grocery management.",
  longDescription: "Built an intelligent nutrition and pantry management platform using Claude AI to generate personalized breakfast, lunch, and dinner recipes based on pantry inventory, calorie goals, dietary preferences, and serving sizes. Features include realtime pantry tracking, macro/calorie analytics, grocery list automation, meal logging, expiry monitoring, and resilient AI workflows powered by Supabase Edge Functions and PostgreSQL.",
  category: ["AI", "WEB"],
  stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Claude AI", "Tailwind CSS", "Edge Functions"],
  image: "/images/preppal.jpg",
  color: "#C6FF00",
  liveUrl: "https://github.com/ij5204/PrepPAL",
  githubUrl: "https://github.com/ij5204/PrepPAL",
  year: "2026",
  emoji: "🥗",
},
  {
    id: 4,
    title: "Featurisation & Model Tuning",
    description: "ML pipeline for feature engineering and hyperparameter tuning — comparing preprocessing strategies and model performance across classification tasks.",
    longDescription: "End-to-end ML experimentation pipeline covering feature extraction, encoding strategies, and systematic hyperparameter optimization. Benchmarks multiple classifiers with cross-validation and visualizes performance trade-offs.",
    category: ["AI", "ML"],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    image: "/images/project6.jpg",
    color: "#00d4ff",
    liveUrl: "https://github.com/SamarthP7704/Featurisation-and-model-tunning",
    githubUrl: "https://github.com/SamarthP7704/Featurisation-and-model-tunning",
    year: "2025",
    emoji: "🧠",
  },
  {
    id: 5,
    title: "UC DoubtClear",
    description: "AI-powered Q&A platform for UC students with IAM, Supabase RLS, Langfuse tracing, and GPT-4o agents with memory & retrieval.",
    longDescription: "Secure student portal with Identity & Access Management via Supabase Row Level Security. Responsive React + Tailwind frontend with live question feeds, Langfuse prompt tracing, and a GPT-powered assistant with memory for 24/7 task updates.",
    category: ["Web", "AI"],
    stack: ["React", "Vite", "Supabase", "Tailwind CSS", "LangChain", "GPT-4o", "Langfuse"],
    image: "/images/project3.jpg",
    color: "#f59e0b",
    liveUrl: "https://github.com/SamarthP7704/uc_doubtclear",
    githubUrl: "https://github.com/SamarthP7704/uc_doubtclear",
    year: "2025",
    emoji: "🎓",
  },
  {
    id: 6,
    title: "PDFChat — SaaS AI PDF Assistant",
    description: "Full-stack RAG assistant in Next.js enabling semantic Q&A on uploaded PDFs with Clerk auth, Stripe billing, and vector search.",
    longDescription: "Deployed a production RAG assistant supporting semantic search over user-uploaded PDFs. Built on Next.js with Vercel AI SDK routing prompts across GPT-4 / Claude 3, managed vector storage via managed Postgres, and Stripe subscription billing.",
    category: ["Web", "AI"],
    stack: ["Next.js", "Vercel AI SDK", "RAG", "Clerk", "Stripe", "GPT-4", "Claude 3"],
    image: "/images/project4.jpg",
    color: "#8b5cf6",
    liveUrl: "https://github.com/SamarthP7704/RAG_pdf_studio",
    githubUrl: "https://github.com/SamarthP7704/RAG_pdf_studio",
    year: "2025",
    emoji: "📄",
  },
  {
    id: 7,
    title: "AI News Aggregator",
    description: "Full-stack web app scraping & categorizing news from multiple sources using NLP, BeautifulSoup, and NLTK/Sumy summarization.",
    longDescription: "Built a Flask + React platform that scrapes news sources in real-time, applies NLP categorization with BeautifulSoup and NLTK, runs extractive summarization via Sumy, and presents results in a clean Axios-powered React UI with category filtering.",
    category: ["AI", "Web"],
    stack: ["React", "Flask", "Python", "BeautifulSoup", "NLTK", "Sumy", "Axios"],
    image: "/images/project5.jpg",
    color: "#00ff87",
    liveUrl: "https://github.com/SamarthP7704/news-aggregator",
    githubUrl: "https://github.com/SamarthP7704/news-aggregator",
    year: "2024",
    emoji: "📰",
  },
];

export const categories = ["All", "Web", "AI"];
