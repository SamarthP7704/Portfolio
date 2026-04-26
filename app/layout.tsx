import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samarth Prajapati — AI Developer & Full-Stack Engineer",
  description: "Software engineer and CS student at University of Cincinnati. AI Developer Co-Op at Bendix. Building intelligent systems with React, Next.js, Python, Power Platform, and LangChain.",
  keywords: ["developer", "AI engineer", "portfolio", "next.js", "react", "full-stack", "power platform", "LangChain", "University of Cincinnati", "Bendix"],
  authors: [{ name: "Samarth Prajapati" }],
  openGraph: {
    title: "Samarth Prajapati — AI Developer & Full-Stack Engineer",
    description: "CS student at UC building intelligent automation systems and full-stack web apps.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Prajapati — Portfolio",
    description: "CS student at UC building intelligent systems with React, Python, and Power Platform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
