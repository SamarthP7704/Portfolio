'use client';

const traits = [
  'React · Next.js',
  'Power Platform',
  'LangChain · RAG',
  'Python · FastAPI',
  'SQL Server',
  'UiPath RPA',
  'TypeScript',
  'Azure · AWS',
  '.NET · C#',
  'Supabase',
  'Docker',
  'OpenAI APIs',
  'Office Scripts',
  'PAC CLI',
  'Tailwind CSS',
  'Vercel',
];

export default function Marquee() {
  const items = [...traits, ...traits]; // duplicate for seamless loop

  return (
    <div
      className="overflow-hidden py-5"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(0,255,135,0.02)',
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: i % 3 === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '0 28px',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.5rem' }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
