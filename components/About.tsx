'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from "framer-motion";
import Marquee from './Marquee';

interface CounterProps {
  target: number;
  suffix: string;
  duration?: number;
}

function Counter({ target, suffix, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

export default function About() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section" style={{ background: 'var(--bg)' }}>
      {/* Stats Bar */}
      <div
        className="mb-20"
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
            {[
              { target: 2, suffix: '+', label: 'Years Experience' },
              { target: 10, suffix: '+', label: 'Projects Shipped' },
              { target: 5, suffix: '', label: 'Co-Ops Completed' },
              { target: 4, suffix: '', label: 'Companies' },
            ].map((stat, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Section header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            — About Me
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '8px', lineHeight: 1.1 }}>
            Building at the intersection<br />
            <span className="gradient-text">of AI & engineering</span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Avatar / Visual */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto" style={{ maxWidth: 400 }}>
              <div
                className="about-profile-card"
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '32px',
                }}
              >
                {/* Ambient glow — static, not animated */}
                <div style={{ position: 'absolute', width: 260, height: 260, background: 'radial-gradient(circle at 40% 40%, rgba(0,255,135,0.08) 0%, rgba(0,212,255,0.04) 50%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                {/* Image Avatar */}
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    marginBottom: '16px',
                    overflow: 'hidden',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border)'
                  }}
                >
                  <img
                    src={isDark ? "/sam_black_hoodie.png" : "/sam_pink_hoodie.png"}
                    alt="Samarth Prajapati"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.45) translateY(12%)' }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>
                  Samarth Prajapati
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'center' }}>
                  CS @ University of Cincinnati
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', textAlign: 'center' }}>
                  Expected Graduation: May 2027
                </div>

                {/* Info pills */}
                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {['AI Dev Co-Op @ Bendix', 'Cincinnati, OH', 'Spring & Summer 2026'].map(tag => (
                    <span key={tag} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 14px',
                      borderRadius: '99px',
                      background: 'rgba(0,255,135,0.1)',
                      border: '1px solid rgba(0,255,135,0.25)',
                      color: 'var(--accent)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Floating badge */}
                <div
                  className="float"
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    background: 'var(--accent)',
                    color: '#0a0a0a',
                    borderRadius: '10px',
                    padding: '6px 10px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Open to Work ✨
                </div>

                {/* Background glow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,255,135,0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <div>
            {[
              {
                title: "Who I am",
                body: "I'm a senior Computer Science student at the University of Cincinnati with 2+ years of experience as a full-stack developer. I've completed co-ops at Bendix, Cummins, and TOPS Technologies — shipping production software across AI, automation, and enterprise web.",
                delay: 1,
              },
              {
                title: "What I do",
                body: "I specialize in building intelligent systems: AI-powered automation (Power Platform, UiPath), full-stack web apps (React, Next.js, Python/Flask, .NET), and ML integrations (LangChain, RAG, GPT APIs). I'm equally comfortable designing the backend schema and the pixel-perfect frontend.",
                delay: 2,
              },
              {
                title: "What drives me",
                body: "I'm drawn to problems where software can eliminate real human toil. At Bendix, I built systems that replaced hours of manual bill processing with automated AI pipelines. I love building at the bleeding edge — and then making it reliable enough for production.",
                delay: 3,
              },
            ].map(({ title, body, delay }) => (
              <motion.div
                key={title}
                custom={delay}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  marginBottom: '28px',
                  paddingLeft: '20px',
                  borderLeft: '2px solid var(--accent)',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 400 }}>
                  {body}
                </p>
              </motion.div>
            ))}

            {/* Education callout */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '1.8rem' }}>🎓</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  University of Cincinnati
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  B.S. Computer Science · Aug 2022 – May 2027
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ marginTop: '80px' }}>
        <Marquee />
      </div>
    </section>
  );
}
