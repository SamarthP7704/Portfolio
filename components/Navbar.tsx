'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Home',    href: '#home'    },
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme,         setTheme]         = useState<'dark'|'light'>('dark');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 'var(--navbar-height)',
          background:     scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom:   scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="container h-full flex items-center justify-between">
          <a href="#home" onClick={e => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', transition: 'color 0.25s ease' }} className="group-hover:text-[var(--accent)]">SP</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={e => { e.preventDefault(); handleNavClick(link.href); }} className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button onClick={toggleTheme} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:'50%', background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-secondary)', cursor:'pointer', flexShrink:0 }} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <a href="mailto:prajapsr@mail.uc.edu" className="hidden md:inline-flex items-center gap-1.5 rounded-full font-semibold hover:opacity-85" style={{ padding:'8px 18px', background:'var(--accent)', color:'#080808', fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, lineHeight:1, textDecoration:'none', letterSpacing:'0.01em' }}>
              Hire Me <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>

            <button
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-40 flex flex-col" style={{ background: 'var(--bg)', paddingTop: 'var(--navbar-height)' }}>
            <div className="container flex flex-col justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.a key={link.href} href={link.href} onClick={e => { e.preventDefault(); handleNavClick(link.href); }} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="nav-link" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  {link.label}
                </motion.a>
              ))}
              <motion.a href="mailto:prajapsr@mail.uc.edu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.07 + 0.1 }} className="mt-8 inline-flex items-center gap-2 w-fit rounded-full font-semibold" style={{ padding: '12px 24px', background: 'var(--accent)', color: '#0a0a0a', fontFamily: 'var(--font-body)', textDecoration: 'none', fontSize: '1rem' }}>
                Hire Me <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
