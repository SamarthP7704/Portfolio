'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const AvatarScene = dynamic(() => import('./AvatarScene'), { ssr: false });

const roles = ['Full-Stack Developer', 'AI Engineer', 'Problem Solver', 'Builder'];

/* ── 3-D Particle field ─────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const mouse = { x: W/2, y: H/2 };
    let raf: number;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);
    type P = { x:number; y:number; z:number; vz:number; r:number; alpha:number };
    const pts: P[] = Array.from({ length:90 }, () => ({
      x: (Math.random()-0.5)*W*2.5, y:(Math.random()-0.5)*H*2.5,
      z: Math.random()*1200+100, vz:-(Math.random()*0.5+0.1),
      r: Math.random()*1.4+0.3, alpha:Math.random()*0.45+0.1,
    }));
    const FOV = 500;
    function project(p: P) {
      const px=(mouse.x/W-0.5)*0.03, py=(mouse.y/H-0.5)*0.03;
      const scale=FOV/(FOV+p.z);
      return { sx:W/2+(p.x-px*p.z)*scale, sy:H/2+(p.y-py*p.z)*scale, scale };
    }
    function tick() {
      ctx.clearRect(0,0,W,H);
      for (const p of pts) {
        p.z+=p.vz;
        if(p.z<1){p.z=1200;p.x=(Math.random()-0.5)*W*2.5;p.y=(Math.random()-0.5)*H*2.5;}
        const {sx,sy,scale}=project(p);
        if(sx<-10||sx>W+10||sy<-10||sy>H+10) continue;
        const radius=Math.max(p.r*scale*2,0.3);
        const opacity=p.alpha*Math.min(scale*1.5,1);
        const g=scale>0.6?135:210;
        ctx.beginPath(); ctx.arc(sx,sy,radius,0,Math.PI*2);
        ctx.fillStyle=`rgba(${scale>0.6?0:170},${g},${scale>0.6?87:190},${opacity})`; ctx.fill();
      }
      const projected=pts.map(project);
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
        const a=projected[i],b=projected[j];
        const dx=a.sx-b.sx,dy=a.sy-b.sy,d=Math.sqrt(dx*dx+dy*dy);
        if(d>75) continue;
        ctx.beginPath(); ctx.moveTo(a.sx,a.sy); ctx.lineTo(b.sx,b.sy);
        ctx.strokeStyle=`rgba(0,255,135,${(1-d/75)*0.08*(a.scale+b.scale)/2})`; ctx.lineWidth=0.5; ctx.stroke();
      }
      raf=requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',onResize); window.removeEventListener('mousemove',onMouse); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0 }} />;
}

function MouseBlobs() {
  const rawX=useMotionValue(0.5), rawY=useMotionValue(0.5);
  const blobX=useSpring(useTransform(rawX,v=>v*100),{stiffness:35,damping:16});
  const blobY=useSpring(useTransform(rawY,v=>v*100),{stiffness:35,damping:16});
  const b2X=useSpring(useTransform(rawX,v=>80-v*60),{stiffness:18,damping:20});
  const b2Y=useSpring(useTransform(rawY,v=>70-v*40),{stiffness:18,damping:20});
  useEffect(() => {
    const h=(e:MouseEvent)=>{rawX.set(e.clientX/window.innerWidth);rawY.set(e.clientY/window.innerHeight);};
    window.addEventListener('mousemove',h); return()=>window.removeEventListener('mousemove',h);
  },[rawX,rawY]);
  return (
    <>
      <motion.div aria-hidden style={{ position:'absolute',width:650,height:650,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,255,135,0.065) 0%,transparent 65%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0,left:blobX,top:blobY,x:'-50%',y:'-50%' }} />
      <motion.div aria-hidden style={{ position:'absolute',width:450,height:450,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,255,0.045) 0%,transparent 65%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0,left:b2X,top:b2Y,x:'-50%',y:'-50%' }} />
    </>
  );
}

export default function Hero() {
  const [role, setRole] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const r=roles[role]; let t:NodeJS.Timeout;
    if(!deleting&&text===r){t=setTimeout(()=>setDeleting(true),2200);}
    else if(deleting&&text===''){setDeleting(false);setRole(p=>(p+1)%roles.length);}
    else{t=setTimeout(()=>setText(deleting?r.slice(0,text.length-1):r.slice(0,text.length+1)),deleting?48:85);}
    return()=>clearTimeout(t);
  },[text,deleting,role]);

  // Track theme for avatar model swap
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  const stagger={hidden:{},visible:{transition:{staggerChildren:0.08,delayChildren:0.1}}};
  const up={hidden:{opacity:0,y:28},visible:{opacity:1,y:0,transition:{duration:0.65,ease:[0.22,1,0.36,1] as [number,number,number,number]}}};

  const techItems = [
    {text:'AI · Automation',   active:true},
    {text:'ML · Data Science', active:false},
    {text:'Full-Stack Web',    active:false},
    {text:'Power Platform',   active:false},
    {text:'LangChain · RAG',  active:false},
    {text:'React · Next.js',  active:false},
    {text:'Python · FastAPI', active:false},
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{paddingTop:'var(--navbar-height)'}}>
      <ParticleField />
      <MouseBlobs />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`,backgroundSize:'72px 72px',zIndex:0 }} />

      <div className="container relative py-12" style={{zIndex:1}}>

        {/* ── Top row: tech pills LEFT | name CENTER | avatar RIGHT ── */}
        <div className="flex items-start justify-between gap-6">



          {/* CENTER — name + content */}
          <motion.div
            variants={stagger} initial="hidden" animate="visible"
            className="flex-1 flex flex-col items-start text-left lg:ml-8"
            style={{maxWidth:680}}
          >
            <motion.div variants={up} className="section-label mb-5" style={{color:'var(--accent)'}}>
              01 / INTRO
            </motion.div>

            <motion.div variants={up} className="mb-5">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full" style={{background:'rgba(0,255,135,0.07)',border:'1px solid rgba(0,255,135,0.18)',color:'var(--accent)',fontFamily:'var(--font-mono)',fontSize:'0.68rem',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',lineHeight:1}}>
                <span style={{position:'relative',display:'inline-block',width:7,height:7,flexShrink:0}}>
                  <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'var(--accent)',opacity:0.3,animation:'ping 2s cubic-bezier(0,0,0.2,1) infinite'}} />
                  <span style={{position:'absolute',inset:1,borderRadius:'50%',background:'var(--accent)'}} />
                </span>
                Available · May 2027
              </span>
            </motion.div>

            <motion.div variants={up} style={{width:'100%'}}>
              <h1 style={{fontSize:'clamp(3rem,8vw,6.5rem)',fontWeight:800,lineHeight:0.9,letterSpacing:'-0.05em',color:'var(--text-primary)',marginBottom:'0.15em',cursor:'default'}}>
                Samarth<br />
                <span className="prajapati-text">Prajapati</span>
              </h1>
            </motion.div>

            <motion.div variants={up} className="flex items-center gap-3" style={{fontSize:'clamp(1.1rem,2.5vw,1.6rem)',height:'2.2rem',marginTop:'0.7rem',marginBottom:'1rem',overflow:'hidden'}}>
              <span className="gradient-text" style={{fontFamily:'var(--font-display)',fontWeight:700,letterSpacing:'-0.02em'}}>{text}</span>
              <span className="cursor-blink" style={{display:'inline-block',width:3,height:'1em',background:'var(--accent)',borderRadius:2,verticalAlign:'middle',flexShrink:0}} />
            </motion.div>

            <motion.p variants={up} style={{fontSize:'clamp(0.85rem,1.5vw,0.95rem)',color:'var(--text-secondary)',maxWidth:'480px',lineHeight:1.75,fontWeight:400,marginBottom:'1.8rem'}}>
              CS student at University of Cincinnati. Building intelligent systems at the intersection of AI, full-stack web, and automation.
            </motion.p>

            <motion.div variants={up} className="flex flex-wrap items-center gap-4" style={{marginBottom:'0.5rem'}}>
              <motion.button onClick={scrollToWork} className="magnetic-btn btn-primary" style={{background:'var(--accent)',color:'#080808',fontFamily:'var(--font-body)'}} whileHover={{scale:1.04,boxShadow:'0 8px 32px rgba(0,255,135,0.22)'}} whileTap={{scale:0.96}}>
                View Work <ArrowDown size={15} strokeWidth={2.5} />
              </motion.button>
              <motion.a href="/Samarth_Resume_prajapsr.pdf" download className="magnetic-btn btn-secondary" style={{fontFamily:'var(--font-body)'}} whileHover={{scale:1.04}} whileTap={{scale:0.96}}>
                Resume <Download size={15} strokeWidth={2.5} />
              </motion.a>
            </motion.div>

            <motion.div variants={up} className="flex flex-wrap gap-6" style={{marginTop:'2rem'}}>
              {[{v:'2+',l:'Years Exp.'},{v:'5',l:'Co-Ops'},{v:'10+',l:'Projects'},{v:'4',l:'Companies'}].map(s=>(
                <div key={s.l}>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'1.5rem',fontWeight:800,color:'var(--accent)',letterSpacing:'-0.03em',lineHeight:1}}>{s.v}</div>
                  <div style={{fontSize:'0.65rem',color:'var(--text-muted)',fontWeight:500,letterSpacing:'0.07em',textTransform:'uppercase',marginTop:4,fontFamily:'var(--font-mono)'}}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D avatar */}
          <motion.div
            initial={{opacity:0,x:30}} animate={{opacity:1,x:0}}
            transition={{duration:1,delay:0.6,ease:[0.22,1,0.36,1]}}
            className="hidden lg:block flex-shrink-0"
            style={{width:480,height:720,position:'relative',right:'-4rem',marginTop:'-6rem'}}
          >
            {/* Glow ring behind avatar */}
            <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,255,135,0.08) 0%,transparent 70%)',filter:'blur(20px)',pointerEvents:'none'}} />
            <AvatarScene isDark={isDark} />
          </motion.div>

        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}} className="scroll-indicator flex flex-col items-center gap-2" style={{color:'var(--text-muted)',fontSize:'0.6rem',letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:'var(--font-mono)'}}>
        <span>Scroll</span><ArrowDown size={12} />
      </motion.div>

      <style>{`@keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}`}</style>
    </section>
  );
}
