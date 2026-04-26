'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX=useMotionValue(0), rawY=useMotionValue(0);
  const rawSX=useMotionValue(50), rawSY=useMotionValue(50);
  const rotateX=useSpring(useTransform(rawY,[-0.5,0.5],[10,-10]),{stiffness:260,damping:28});
  const rotateY=useSpring(useTransform(rawX,[-0.5,0.5],[-10,10]),{stiffness:260,damping:28});
  const shimmerX=useSpring(rawSX,{stiffness:200,damping:22});
  const shimmerY=useSpring(rawSY,{stiffness:200,damping:22});

  const onMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const r=ref.current.getBoundingClientRect();
    rawX.set((e.clientX-r.left)/r.width-0.5); rawY.set((e.clientY-r.top)/r.height-0.5);
    rawSX.set(((e.clientX-r.left)/r.width)*100); rawSY.set(((e.clientY-r.top)/r.height)*100);
  },[rawX,rawY,rawSX,rawSY]);
  const onLeave=useCallback(()=>{rawX.set(0);rawY.set(0);rawSX.set(50);rawSY.set(50);},[rawX,rawY,rawSX,rawSY]);

  return (
    <motion.div initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:0.65,ease:[0.22,1,0.36,1],delay:index*0.1}} style={{perspective:1000}}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{rotateX,rotateY,transformStyle:'preserve-3d',borderRadius:16,background:'var(--bg-card)',border:'1px solid var(--border)',overflow:'hidden',cursor:'default',position:'relative',willChange:'transform'}}
        whileHover={{boxShadow:`0 24px 64px rgba(0,0,0,0.5),0 0 40px ${project.color}15`,borderColor:`${project.color}35`}}
        transition={{boxShadow:{duration:0.3},borderColor:{duration:0.3}}}
      >
        <motion.div aria-hidden style={{position:'absolute',inset:0,borderRadius:16,background:`radial-gradient(circle at ${shimmerX}% ${shimmerY}%,rgba(255,255,255,0.06) 0%,transparent 55%)`,pointerEvents:'none',zIndex:10}} />

        <div style={{height:188,background:`linear-gradient(140deg,${project.color}12 0%,rgba(255,255,255,0.01) 100%)`,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
          <motion.div className="float" style={{width:72,height:72,borderRadius:16,background:`linear-gradient(135deg,${project.color} 0%,${project.color}99 100%)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.9rem',boxShadow:`0 12px 40px ${project.color}38`,position:'relative',zIndex:2}}>
            {project.emoji}
          </motion.div>
          <div style={{position:'absolute',top:14,right:14,background:'rgba(255,255,255,0.05)',border:'1px solid var(--border)',borderRadius:6,padding:'3px 9px',fontSize:'0.65rem',color:'var(--text-muted)',fontFamily:'var(--font-mono)',fontWeight:600,lineHeight:1}}>{project.year}</div>
          <div style={{position:'absolute',top:14,left:14,display:'flex',gap:5}}>
            {project.category.map(cat=>(
              <span key={cat} style={{display:'inline-flex',alignItems:'center',background:`${project.color}18`,border:`1px solid ${project.color}30`,color:project.color,borderRadius:5,padding:'3px 8px',fontSize:'0.6rem',fontFamily:'var(--font-mono)',fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',lineHeight:1}}>{cat}</span>
            ))}
          </div>
        </div>

        <div style={{padding:22,position:'relative',zIndex:2}}>
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.05rem',fontWeight:700,color:'var(--text-primary)',letterSpacing:'-0.02em',lineHeight:1.25}}>{project.title}</h3>
            <div style={{display:'flex',gap:7,flexShrink:0}}>
              {([{href:project.githubUrl,icon:<GithubIcon size={13}/>,label:'GitHub'},{href:project.liveUrl,icon:<ExternalLink size={13}/>,label:'Live'}] as const).map(({href,icon,label})=>(
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:'50%',background:'var(--bg-surface)',border:'1px solid var(--border)',color:'var(--text-secondary)',flexShrink:0,textDecoration:'none'}} whileHover={{borderColor:project.color,color:project.color,scale:1.08}} whileTap={{scale:0.94}} transition={{duration:0.15}}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
          <p style={{fontSize:'0.845rem',color:'var(--text-secondary)',lineHeight:1.6,marginBottom:16}}>{project.description}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {project.stack.map(tech=><span key={tech} className="tech-pill">{tech}</span>)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section" style={{background:'var(--bg-surface)'}}>
      <div className="container">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.65}} className="mb-16" style={{marginBottom:"4rem"}}>
          <div className="section-label mb-4">02 / SELECTED WORK</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2">
            <h2 style={{fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.0}}>
              Projects I'm<br />proud of
            </h2>
            <motion.a href="https://github.com/SamarthP7704" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,color:'var(--text-secondary)',textDecoration:'none',fontSize:'0.8rem',fontWeight:600,flexShrink:0,fontFamily:'var(--font-mono)',letterSpacing:'0.06em'}} whileHover={{color:'var(--accent)',x:3}} transition={{duration:0.15}}>
              VIEW ALL ON GITHUB →
            </motion.a>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project,i)=><ProjectCard key={project.id} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
