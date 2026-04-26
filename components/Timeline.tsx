'use client';

import { motion } from 'framer-motion';

const timelineItems = [
  {
    type: 'co-op',
    title: 'AI Developer Co-Op',
    company: 'Bendix LLC · Avon, OH',
    period: 'Jan 2026 – Present',
    description: 'Built an end-to-end Utility Bill Automation System processing electric, gas & water bills across facilities. Integrated UiPath RPA, AI-based document extraction (Power Automate), SQL Server backend with duplicate detection, Power Apps dashboards, and Office Scripts Excel reporting for Cority compliance.',
    tags: ['Power Apps', 'Power Automate', 'UiPath', 'SQL Server', 'Office Scripts', 'SharePoint', 'React', 'PAC CLI'],
    color: '#00ff87',
    side: 'right',
  },
  {
    type: 'education',
    title: 'B.S. Computer Science',
    company: 'University of Cincinnati',
    period: 'Aug 2022 – May 2027',
    description: "Senior CS student on co-op rotation cycle. Relevant coursework: Data Structures, Algorithms, ML, Distributed Systems, Software Engineering, Database Systems.",
    tags: ['Python', 'Java', 'C++', 'ML', 'Data Structures', 'Systems'],
    color: '#f59e0b',
    side: 'left',
  },
  {
    type: 'co-op',
    title: 'Web Developer Co-Op',
    company: 'Cummins Inc. · Columbus, OH',
    period: 'Jan 2024 – Jul 2024 · Jan 2025 – Apr 2025',
    description: 'Led enhancement of Opigno LMS reducing user-reported issues 30%. Integrated bpmn.io for visual diagrams, built 50+ Tailwind CSS + Material UI components, launched internal training portal, managed Azure DevOps CI/CD pipelines with Agile ceremonies.',
    tags: ['Drupal', 'Tailwind CSS', 'Material UI', 'Azure DevOps', 'bpmn.io', 'Agile'],
    color: '#00d4ff',
    side: 'right',
  },
  {
    type: 'part-time',
    title: 'Teaching Assistant',
    company: 'University of Cincinnati',
    period: 'Aug 2023 – Present',
    description: 'Provide academic support to 500+ students through one-on-one sessions. Guided 60+ teams in ethical principles and algorithmic thinking. Host weekly tutoring sessions covering Python, MATLAB, and LabVIEW.',
    tags: ['Python', 'MATLAB', 'LabVIEW', 'Algorithms', 'Teaching'],
    color: '#8b5cf6',
    side: 'left',
  },
  {
    type: 'intern',
    title: 'Software / Web Intern',
    company: 'TOPS Technologies',
    period: 'May 2023 – Jul 2023',
    description: 'Built a recipe app with Django (auth, data storage, payment via Razorpay) in 3 months. Automated web label printing reducing operation time 60%. Optimized 25+ Tableau dashboards by migrating to cloud-based data sources.',
    tags: ['Django', 'Python', 'Razorpay', 'Tableau', 'Automation'],
    color: '#f59e0b',
    side: 'right',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            — Experience
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '8px', lineHeight: 1.1 }}>
            My journey so far
          </h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="timeline-line" />

          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: item.side === 'right' ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex ${item.side === 'right' ? 'justify-end' : 'justify-start'} mb-12`}
            >
              {/* Card */}
              <div
                style={{
                  width: '44%',
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                }}
                className="card-glow timeline-card"
              >
                {/* Type badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    background: `${item.color}22`,
                    border: `1px solid ${item.color}44`,
                    color: item.color,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '12px',
                  }}
                >
                  {item.type}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {item.period}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: item.color, fontWeight: 600, marginBottom: '10px', fontFamily: 'var(--font-body)' }}>
                  {item.company}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Center dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '28px',
                  transform: 'translateX(-50%)',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: item.color,
                  border: '3px solid var(--bg-surface)',
                  zIndex: 2,
                  boxShadow: `0 0 12px ${item.color}88`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden relative pl-10">
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
            }}
          />
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ position: 'relative', marginBottom: '24px' }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -30,
                  top: 24,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: item.color,
                  border: '2px solid var(--bg-surface)',
                  boxShadow: `0 0 8px ${item.color}88`,
                }}
              />
              <div
                className="timeline-card"
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '0.72rem', color: item.color, fontWeight: 600, marginBottom: '4px' }}>
                  {item.type.toUpperCase()} · {item.period}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                <div style={{ fontSize: '0.8rem', color: item.color, marginBottom: '8px' }}>{item.company}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
