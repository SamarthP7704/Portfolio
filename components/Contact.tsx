'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/SamarthP7704', color: '#f0f0f0', bg: '#1a1a1a' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/samarthprajapati/', color: '#0a66c2', bg: '#0a1929' },
  { icon: Mail, label: 'Email', href: 'mailto:prajapsr@mail.uc.edu', color: '#00ff87', bg: '#001a0d' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        'service_c1y96qk',
        'template_cojnido',
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        'WEv6xPWmnz4w-xN_0'
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div className="section-label justify-center mb-4">05 / GET IN TOUCH</div>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0 }}>
            Let's connect &<br />
            <span className="gradient-text">build together</span>
          </h2>
          <p style={{ marginTop: 16, color: 'var(--text-secondary)', maxWidth: '460px', margin: '16px auto 0', lineHeight: 1.7, fontSize: '0.95rem' }}>
            I'm actively looking for full-time new grad roles starting May 2027. Whether you're a recruiter, engineer, or just want to say hi — reach out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>Open to opportunities</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                Currently on co-op at Bendix (Spring 2026). Available for full-time new grad roles starting May 2027 — AI, full-stack, or automation-focused teams. Let's talk.
              </p>
            </div>

            <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Email', value: 'prajapsr@mail.uc.edu' },
                { label: 'Location', value: 'Cincinnati, OH · Remote-friendly' },
                { label: 'Status', value: 'Co-Op @ Bendix · Open May 2027' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-center">
                  <div style={{ width: 90, fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h4 style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
                Find me on
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {socialLinks.map(({ icon: Icon, label, href, color, bg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}25` }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      padding: '12px 20px', borderRadius: 12,
                      background: bg, border: `1px solid ${color}25`,
                      color, textDecoration: 'none',
                      fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                      lineHeight: 1, transition: 'border-color 0.25s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}60`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}25`; }}
                  >
                    <Icon /> {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} style={{ padding: 32, borderRadius: 20, background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 sm:col-span-1">
                  <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="contact-input" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="contact-input" />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Job opportunity, collaboration, just saying hi..." required className="contact-input" />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Let's connect! Tell me about the role or just say hello..." required rows={5} className="contact-input" style={{ resize: 'vertical' }} />
              </div>

              {/* Button — fixed alignment */}
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.01, boxShadow: '0 8px 32px rgba(0,255,135,0.25)' } : {}}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '15px 24px',
                  borderRadius: 12,
                  background: status === 'success' ? '#10b981' : 'var(--accent)',
                  color: '#080808',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.8 : 1,
                  lineHeight: 1,
                }}
              >
                {status === 'loading' && <Loader size={16} className="animate-spin" />}
                {status === 'success' && <CheckCircle size={16} />}
                {status === 'idle' && <Send size={16} />}
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : "Let's Connect"}
              </motion.button>

              {status === 'success' && (
                <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.78rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                  ✓ I'll get back to you shortly!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
