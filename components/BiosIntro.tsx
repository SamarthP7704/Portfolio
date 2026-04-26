'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: 'SP PORTFOLIO BIOS v2.7.0', type: 'white', delay: 0 },
  { text: 'Copyright (C) 2026 Samarth Prajapati. All Rights Reserved.', type: 'dim', delay: 120 },
  { text: '', type: 'dim', delay: 200 },
  { text: 'CPU: University of Cincinnati CS — Senior Year', type: 'green', delay: 320 },
  { text: 'RAM: 2+ Years Experience Installed', type: 'green', delay: 480 },
  { text: 'STORAGE: 10+ Projects Built', type: 'green', delay: 640 },
  { text: '', type: 'dim', delay: 720 },
  { text: 'Scanning co-ops............... 4 found', type: 'dim', delay: 860 },
  { text: 'Loading tech stack............. React, Next.js, Python, LangChain', type: 'dim', delay: 1060 },
  { text: 'Initializing AI modules....... OK', type: 'dim', delay: 1260 },
  { text: 'Mounting Power Platform....... OK', type: 'dim', delay: 1400 },
  { text: '', type: 'dim', delay: 1500 },
  { text: 'STATUS: Available for new grad roles — May 2027', type: 'white', delay: 1640 },
  { text: '', type: 'dim', delay: 1740 },
  { text: 'Press any key to continue...', type: 'green', delay: 1900, cursor: true },
];

export default function BiosIntro({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Check if already seen this session
    if (sessionStorage.getItem('bios-seen')) { onDone(); return; }

    const timers: NodeJS.Timeout[] = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, LINES[i].delay));
    });

    const doneTimer = setTimeout(() => setDone(true), 2200);
    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const dismiss = () => {
    if (!done && visibleLines.length < 5) return; // wait for some lines
    setExiting(true);
    sessionStorage.setItem('bios-seen', '1');
    setTimeout(onDone, 600);
  };

  useEffect(() => {
    if (!done) return;
    const handler = () => dismiss();
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => { window.removeEventListener('keydown', handler); window.removeEventListener('click', handler); };
  }, [done]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="bios-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          onClick={dismiss}
          style={{ cursor: done ? 'pointer' : 'default' }}
        >
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40, borderBottom: '1px solid #1a1a1a', paddingBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00ff87', letterSpacing: '0.1em' }}>SP-BIOS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#444', letterSpacing: '0.1em' }}>
              {new Date().toLocaleDateString('en-US', { month:'2-digit', day:'2-digit', year:'numeric' })}
            </span>
          </div>

          <div className="bios-text">
            {LINES.map((line, i) => (
              <div key={i} style={{ opacity: visibleLines.includes(i) ? 1 : 0, transition: 'opacity 0.15s ease', minHeight: line.text === '' ? '0.9rem' : 'auto' }}>
                {line.type === 'white' && <span className="white">{line.text}</span>}
                {line.type === 'dim' && <span className="dim">{line.text}</span>}
                {line.type === 'green' && <span>{line.text}{line.cursor && done && <span className="cursor" />}</span>}
              </div>
            ))}
          </div>

          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ position: 'absolute', bottom: 40, right: 48, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#333', letterSpacing: '0.1em' }}
            >
              CLICK OR PRESS ANY KEY TO CONTINUE
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
