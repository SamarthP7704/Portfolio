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
  title: "TradeIO — AI Trading Journal",
  description: "Behavior-focused trading journal that tracks execution, psychology, and performance to show exactly where traders make and lose money.",
  longDescription: "TradeIO is a full-stack trading journal built to go beyond simple logging. It combines execution grading, psychology tracking (stress, focus, emotions), and AI-powered analysis to identify behavioral patterns impacting profitability. Features include an interactive P&L heatmap with daily drill-down, a behavioral financial audit (Mistake Leak, Stress Tax, Focus Premium), strategy-based playbooks, and an AI coach that analyzes both trade data and chart screenshots. The system is designed as a behavioral audit tool that helps traders understand and improve decision-making, not just track results.",
  category: ["Web", "AI"],
  stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk", "Cloudflare R2", "Claude API"],
  image: "/images/tradeio.jpg",
  color: "#22c55e",
  liveUrl: "https://tradeio-trading-journal.vercel.app/",
  githubUrl: "https://github.com/SamarthP7704/trading-journal",
  year: "2026",
  emoji: "📈",
}
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
