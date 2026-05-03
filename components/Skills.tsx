'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, techLogos } from '@/data/skills';

/* ─────────────────────────────────────────────────
   Tech stack icon URLs from devicon CDN
───────────────────────────────────────────────── */
const TECH_ICONS: Record<string, string> = {
  'React':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'TypeScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Python':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Node.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  '.NET':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  'SQL Server':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'PostgreSQL':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Supabase':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  'Azure':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'AWS':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Docker':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'OpenAI':       'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'Tailwind':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Vite':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'Flask':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'Django':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'Drupal':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg',
  'GraphQL':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'Stripe':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg',
  'Vercel':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'LangChain':    'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
  'Power Apps':   'https://upload.wikimedia.org/wikipedia/commons/f/f3/Microsoft_Power_Apps_Logo.svg',
  'UiPath':       'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/UiPath_Logo.svg/200px-UiPath_Logo.svg.png',
};

/* Pre-load all images into an in-memory cache */
const imgCache: Record<string, HTMLImageElement> = {};
function preloadIcons() {
  Object.entries(TECH_ICONS).forEach(([name, url]) => {
    if (imgCache[name]) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    imgCache[name] = img;
  });
}

/* ─────────────────────────────────────────────────
   CERAMIC BALL RENDERER — with icon on surface
───────────────────────────────────────────────── */
const BALL_COLORS = [
  { base: '#b8b8b8', dark: '#606060', text: '#0a0a0a' },
  { base: '#8abf98', dark: '#2d5c3a', text: '#0a2010' },
  { base: '#7aaec0', dark: '#1a5a78', text: '#051e2c' },
  { base: '#c098a8', dark: '#783050', text: '#300818' },
  { base: '#a898c8', dark: '#4a2068', text: '#180a30' },
  { base: '#c0a878', dark: '#785018', text: '#281800' },
  { base: '#80b8b0', dark: '#185850', text: '#051c18' },
  { base: '#c0b890', dark: '#685820', text: '#201800' },
];

function shadeHex(hex: string, amt: number) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `rgb(${r},${g},${b})`;
}

function drawBall(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  col: typeof BALL_COLORS[0],
  label: string,
  lx: number, ly: number,
) {
  // 1. AO shadow
  const aog = ctx.createRadialGradient(x+r*0.1, y+r*0.88, 0, x+r*0.1, y+r*0.88, r*0.78);
  aog.addColorStop(0, 'rgba(0,0,0,0.28)'); aog.addColorStop(0.5, 'rgba(0,0,0,0.10)'); aog.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath(); ctx.ellipse(x+r*0.1, y+r*0.88, r*0.78, r*0.2, 0, 0, Math.PI*2); ctx.fillStyle=aog; ctx.fill();

  // Light dir from mouse
  const ddx=(lx-x)/(r*8), ddy=(ly-y)/(r*8);
  const lxx=-0.5+ddx*0.3, lyy=-0.55+ddy*0.3;
  const hx=x+lxx*r*0.45, hy=y+lyy*r*0.45;

  // 2. Base
  const bg=ctx.createRadialGradient(hx,hy,0,x,y,r);
  bg.addColorStop(0,col.base); bg.addColorStop(0.5,col.base); bg.addColorStop(0.82,col.dark); bg.addColorStop(1,shadeHex(col.dark,-30));
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.globalAlpha=0.58; ctx.fillStyle=bg; ctx.fill(); ctx.globalAlpha=1;

  // 3. Specular
  const sx=x+lxx*r*0.52, sy=y+lyy*r*0.52;
  const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,r*0.38);
  sg.addColorStop(0,'rgba(255,255,255,0.45)'); sg.addColorStop(0.15,'rgba(255,255,255,0.25)');
  sg.addColorStop(0.4,'rgba(255,255,255,0.30)'); sg.addColorStop(1,'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=sg; ctx.fill();

  // 4. Rim light
  const rx2=x-lxx*r*0.75, ry2=y-lyy*r*0.75;
  const rg=ctx.createRadialGradient(rx2,ry2,r*0.5,rx2,ry2,r);
  rg.addColorStop(0,'rgba(255,255,255,0)'); rg.addColorStop(0.7,'rgba(255,255,255,0)'); rg.addColorStop(1,'rgba(255,255,255,0.09)');
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill();

  // 5. Icon or text
  const img = imgCache[label];
  const iconSize = r * 0.72;
  if (img && img.complete && img.naturalWidth > 0) {
    // Clip to circle, draw icon centered, slightly below specular
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r * 0.85, 0, Math.PI*2); ctx.clip();
    ctx.globalAlpha = 0.92;
    ctx.drawImage(img, x - iconSize/2, y - iconSize/2, iconSize, iconSize);
    ctx.globalAlpha = 1;
    ctx.restore();
  } else {
    // Fallback text
    const fs = Math.max(10, Math.round(r * 0.28));
    ctx.font = `600 ${fs}px "DM Sans",system-ui,sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillText(label, x+0.7, y+1.1);
    ctx.fillStyle = col.text; ctx.fillText(label, x, y);
  }
}

/* ─────────────────────────────────────────────────
   BALL PIT CANVAS
───────────────────────────────────────────────── */
function BallPit() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preloadIcons();

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d')!;

    let W = (canvas.width  = container.clientWidth);
    let H = (canvas.height = container.clientHeight);
    let raf: number;

    const mouse = { x: W * 0.3, y: H * 0.4, over: false };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (W / rect.width);
      mouse.y = (e.clientY - rect.top)  * (H / rect.height);
      mouse.over = true;
    };
    const onLeave  = () => { mouse.over = false; };
    const onResize = () => { W = canvas.width = container.clientWidth; H = canvas.height = container.clientHeight; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    const ROWS = 4;
    const R    = Math.max(36, Math.min(58, H / (ROWS * 2.4)));

    type Ball = { x:number; y:number; vx:number; vy:number; driftX:number; driftY:number; r:number; label:string; col:typeof BALL_COLORS[0]; };

    const cols = Math.ceil(W / (R * 2.5));
    const balls: Ball[] = techLogos.map((label, i) => {
      const col  = i % cols;
      const row  = Math.floor(i / cols);
      const cw   = W / cols;
      const ch   = H / Math.ceil(techLogos.length / cols);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.5;
      return {
        x: cw*col + cw/2 + (Math.random()-0.5)*R,
        y: ch*row + ch/2 + (Math.random()-0.5)*R,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        driftX: Math.cos(angle)*0.35, driftY: Math.sin(angle)*0.35,
        r: R, label, col: BALL_COLORS[i % BALL_COLORS.length],
      };
    });

    let t = 0;
    function physics() {
      t += 0.002;
      for (const b of balls) {
        if (mouse.over) {
          const dx=b.x-mouse.x, dy=b.y-mouse.y, dist=Math.hypot(dx,dy), zone=b.r*4.5;
          if (dist<zone && dist>1) { const f=((zone-dist)/zone)**1.8*4; b.vx+=(dx/dist)*f; b.vy+=(dy/dist)*f; }
        }
        const angle=Math.atan2(b.driftY,b.driftX)+Math.sin(t+b.x*0.01)*0.015;
        b.driftX=Math.cos(angle)*0.35; b.driftY=Math.sin(angle)*0.35;
        b.vx+=b.driftX*0.04; b.vy+=b.driftY*0.04;
        b.vx*=0.982; b.vy*=0.982;
        const spd=Math.hypot(b.vx,b.vy);
        if (spd<0.3) { b.vx=(b.vx/(spd||1))*0.3; b.vy=(b.vy/(spd||1))*0.3; }
        if (spd>8)   { b.vx=b.vx/spd*8; b.vy=b.vy/spd*8; }
        b.x+=b.vx; b.y+=b.vy;
        const pad=b.r*0.02;
        if(b.x-b.r<pad)   {b.x=b.r+pad;   b.vx=Math.abs(b.vx)*0.75; b.driftX=Math.abs(b.driftX);}
        if(b.x+b.r>W-pad) {b.x=W-b.r-pad; b.vx=-Math.abs(b.vx)*0.75; b.driftX=-Math.abs(b.driftX);}
        if(b.y-b.r<pad)   {b.y=b.r+pad;   b.vy=Math.abs(b.vy)*0.75; b.driftY=Math.abs(b.driftY);}
        if(b.y+b.r>H-pad) {b.y=H-b.r-pad; b.vy=-Math.abs(b.vy)*0.75; b.driftY=-Math.abs(b.driftY);}
      }
      for (let i=0;i<balls.length;i++) for (let j=i+1;j<balls.length;j++) {
        const a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy),min=a.r+b.r-1;
        if(dist<min && dist>0.5) {
          const nx=dx/dist,ny=dy/dist,ov=(min-dist)*0.5;
          a.x-=nx*ov; a.y-=ny*ov; b.x+=nx*ov; b.y+=ny*ov;
          const dot=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;
          if(dot>0){a.vx-=dot*nx*0.85;a.vy-=dot*ny*0.85;b.vx+=dot*nx*0.85;b.vy+=dot*ny*0.85;}
        }
      }
    }

    function render() {
      ctx.clearRect(0,0,W,H);
      const lx=mouse.over?mouse.x:W*0.25, ly=mouse.over?mouse.y:H*0.2;
      for (const b of balls) drawBall(ctx,b.x,b.y,b.r,b.col,b.label,lx,ly);
    }

    function tick() { physics(); render(); raf=requestAnimationFrame(tick); }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove',onMove);
      canvas.removeEventListener('mouseleave',onLeave);
      window.removeEventListener('resize',onResize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width:'100%', height:480, borderRadius:16, overflow:'hidden', background:'transparent', border:'none' }}>
      <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block', cursor:'none' }} />
    </div>
  );
}

/* ── Skill bar ──────────────────────────────────── */
function SkillBar({ skill, delay }: { skill: typeof skillCategories[0]['skills'][0]; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const observed = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !observed.current) { observed.current=true; setTimeout(()=>setWidth(skill.level),delay*150); }
    },{threshold:0.5});
    if (ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[skill.level,delay]);
  return (
    <div ref={ref} style={{marginBottom:20}}>
      <div className="flex justify-between items-center" style={{marginBottom:8}}>
        <span style={{fontSize:'0.875rem',color:'var(--text-primary)',fontWeight:500,display:'flex',alignItems:'center',gap:6}}>
          <span>{skill.icon}</span>{skill.name}
        </span>
        <span style={{fontSize:'0.75rem',color:'var(--accent)',fontWeight:700}}>{skill.level}%</span>
      </div>
      <div style={{height:4,borderRadius:99,background:'var(--bg)',overflow:'hidden'}}>
        <div className="skill-bar-fill" style={{width:`${width}%`,transition:'width 1.2s cubic-bezier(0.4,0,0.2,1)'}} />
      </div>
    </div>
  );
}

const CAT_COLORS: Record<string,string> = { Frontend:'#00ff87', Backend:'#00d4ff', 'AI / ML':'#f59e0b', DevOps:'#8b5cf6' };

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend');
  const active = skillCategories.find(c=>c.name===activeTab);
  return (
    <section id="skills" className="section" style={{background:'var(--bg)'}}>
      <div className="container">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.7}} style={{marginBottom:48}}>
          <div className="section-label mb-3">03 / SKILLS & TOOLS</div>
          <h2 style={{fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:800,letterSpacing:'-0.03em',marginTop:8,lineHeight:1.1}}>
            My tech stack &<br /><span className="gradient-text">capabilities</span>
          </h2>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.1}} transition={{duration:0.8}} style={{marginBottom:72}}>
          <BallPit />
        </motion.div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}} transition={{duration:0.7,delay:0.1}}>
          <div className="flex items-center justify-between flex-wrap gap-4" style={{marginBottom:36}}>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:700,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em'}}>Proficiency by Category</h3>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {skillCategories.map(cat=>(
                <button key={cat.name} onClick={()=>setActiveTab(cat.name)} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'7px 18px',borderRadius:999,fontSize:'0.78rem',fontWeight:600,lineHeight:1,cursor:'pointer',fontFamily:'var(--font-body)',background:activeTab===cat.name?CAT_COLORS[cat.name]:'var(--bg-card)',color:activeTab===cat.name?'#0a0a0a':'var(--text-secondary)',border:`1px solid ${activeTab===cat.name?CAT_COLORS[cat.name]:'var(--border)'}`,transition:'all 0.2s ease'}}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16">
            <div>{active?.skills.slice(0,3).map((s,i)=><SkillBar key={s.name} skill={s} delay={i}/>)}</div>
            <div>{active?.skills.slice(3).map((s,i)=><SkillBar key={s.name} skill={s} delay={i+3}/>)}</div>
          </div>
          <div style={{marginTop:40,padding:'20px 24px',borderRadius:14,background:'var(--accent-dim)',border:'1px solid rgba(0,255,135,0.2)'}}>
            <div style={{fontSize:'0.85rem',color:'var(--accent)',fontWeight:600,marginBottom:6,fontFamily:'var(--font-display)'}}>Always Learning 📚</div>
            <p style={{fontSize:'0.8rem',color:'var(--text-secondary)',lineHeight:1.6}}>Currently exploring: <strong style={{color:'var(--text-primary)'}}>PyTorch, Scikit-learn, LangChain</strong> — because the best engineers never stop growing.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
