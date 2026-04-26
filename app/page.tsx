'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';

const BiosIntro = dynamic(() => import('@/components/BiosIntro'), { ssr: false });

export default function Home() {
  const [biosShown, setBiosDone] = useState(false);

  return (
    <>
      {!biosShown && <BiosIntro onDone={() => setBiosDone(true)} />}
      <CustomCursor />
      <Navbar />
      <main style={{ opacity: biosShown ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      {/* Minimal footer — no separate component needed */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>© 2026 Samarth Prajapati</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>Built with Next.js · Deployed on Vercel</p>
        </div>
      </footer>
    </>
  );
}
