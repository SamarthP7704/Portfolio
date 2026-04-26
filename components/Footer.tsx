'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

function CRTCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!; let raf: number; let t = 0;
    function tick() {
      t += 0.05; ctx.fillStyle='#030f03'; ctx.fillRect(0,0,160,100);
      for(let y=0;y<100;y+=2){ctx.fillStyle='rgba(0,0,0,0.18)';ctx.fillRect(0,y,160,1);}
      ctx.beginPath(); ctx.strokeStyle='#00ff87'; ctx.lineWidth=1.5;
      ctx.shadowColor='#00ff87'; ctx.shadowBlur=6;
      for(let x=0;x<160;x++){
        const y=50+Math.sin((x/160)*Math.PI*5+t)*18+Math.sin((x/160)*Math.PI*11+t*1.7)*6;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.stroke(); ctx.shadowBlur=0;
      const vg=ctx.createRadialGradient(80,50,20,80,50,80);
      vg.addColorStop(0,'transparent'); vg.addColorStop(1,'rgba(0,0,0,0.5)');
      ctx.fillStyle=vg; ctx.fillRect(0,0,160,100);
      raf=requestAnimationFrame(tick);
    }
    tick(); return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} width={160} height={100} style={{width:'100%',height:'100%',display:'block',borderRadius:6}} />;
}

const socialLinks = [
  { icon: GithubIcon,   label:'GitHub',   href:'https://github.com/SamarthP7704',               color:'#f0f0f0' },
  { icon: LinkedInIcon, label:'LinkedIn',  href:'https://linkedin.com/in/samarthprajapati',      color:'#0a66c2' },
  { icon: Mail,         label:'Email',     href:'mailto:prajapsr@mail.uc.edu',                   color:'#00ff87' },
];

const navLinks = ['Home','About','Work','Skills','Contact'];

export default function Footer() {
  return (
    <footer style={{ background:'#080808', borderTop:'1px solid var(--border)', padding:'56px 0 36px' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">

          {/* Brand + socials */}
          <div style={{ maxWidth:320 }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', fontWeight:800, letterSpacing:'-0.04em', color:'var(--text-primary)' }}>SP</span>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }} />
            </div>
            <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:24 }}>
              AI Developer & Full-Stack Engineer. Building intelligent systems at the intersection of code and real-world impact.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {socialLinks.map(({ icon:Icon, label, href, color }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ y:-2, boxShadow:`0 6px 20px ${color}20` }}
                  whileTap={{ scale:0.95 }}
                  style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:40, height:40, borderRadius:10, background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-secondary)', textDecoration:'none', transition:'border-color 0.2s ease, color 0.2s ease' }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=color; el.style.color=color; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.color='var(--text-secondary)'; }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize:'0.68rem', color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:16, fontFamily:'var(--font-mono)' }}>Navigation</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {navLinks.map(label => (
                <a key={label} href={`#${label.toLowerCase()}`}
                  onClick={e => { e.preventDefault(); document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior:'smooth' }); }}
                  style={{ fontSize:'0.875rem', color:'var(--text-secondary)', textDecoration:'none', transition:'color 0.2s ease', fontFamily:'var(--font-body)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CRT + Hire Me */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:20 }}>
            <div style={{ background:'#0c0c0c', borderRadius:12, padding:'10px 12px 12px', border:'1px solid rgba(255,255,255,0.07)', position:'relative' }}>
              {[{top:5,left:5},{top:5,right:5},{bottom:5,left:5},{bottom:5,right:5}].map((pos,i)=>(
                <div key={i} style={{ position:'absolute', width:7, height:7, borderRadius:'50%', background:'#222', border:'1px solid #333', ...pos }} />
              ))}
              <div style={{ width:120, height:96, borderRadius:8, overflow:'hidden', border:'1px solid rgba(0,255,135,0.2)', boxShadow:'0 0 16px rgba(0,255,135,0.08)' }}>
                <CRTCanvas />
              </div>
            </div>
            <motion.a href="mailto:prajapsr@mail.uc.edu"
              whileHover={{ scale:1.04, boxShadow:'0 8px 24px rgba(0,255,135,0.2)' }}
              whileTap={{ scale:0.97 }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 22px', borderRadius:999, background:'var(--accent)', color:'#080808', fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight:700, textDecoration:'none', lineHeight:1 }}
            >
              Hire Me <ArrowUpRight size={14} strokeWidth={2.5} />
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop:48, paddingTop:24, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <p style={{ color:'var(--text-muted)', fontSize:'0.72rem', fontFamily:'var(--font-mono)' }}>© 2026 Samarth Prajapati. All rights reserved.</p>
          <p style={{ color:'var(--text-muted)', fontSize:'0.68rem', fontFamily:'var(--font-mono)' }}>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
