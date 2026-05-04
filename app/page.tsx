import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import ProjectsPanel from './components/ProjectsPanel'
import { isValidResumeFile } from './lib/validation'
import { projects, site } from './data/portfolio'
import { withBasePath } from './lib/siteUrl'

export const metadata: Metadata = {
  title: 'Ashutosh Raval | Full-Stack Backend Developer',
  description: 'Portfolio of Ashutosh Raval, focused on scalable backend systems, microservices, and cloud-native applications.',
  openGraph: {
    title: 'Ashutosh Raval | Full-Stack Backend Developer',
    description: 'Scalable systems, real-time platforms, and cloud-native backend work.',
    type: 'website'
  }
}

export default async function Home() {
  const resumeFile = site.resume?.file
  const resumeUrl = isValidResumeFile(resumeFile) ? withBasePath(resumeFile?.url || '') : ''
  return (
    <main>
      <section style={{ padding: '72px 20px', background: 'linear-gradient(135deg, #0b1020 0%, #0b1220 60%)', color: '#fff' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: 8 }}>{site.hero?.headline}</h1>
        <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: 900 }}>{site.hero?.subheading}</p>
        <div style={{ marginTop: 20 }}>
          {site.hero?.ctas?.map((cta, idx: number) => (
            <Link key={idx} href={cta.href} style={{ marginRight: 12, padding: '12px 18px', background: '#1e3a8a', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
              {cta.label}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 16, maxWidth: 900 }}>{site.hero?.summary}</p>
        {resumeUrl && (
          <div style={{ marginTop: 12 }}>
            <a href={resumeUrl} style={{ padding: '12px 18px', background: '#374151', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
              Download Resume
            </a>
          </div>
        )}
      </section>

      <section style={{ padding: '60px 20px', borderTop: '1px solid #1e2a57', background: '#0b1020' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: '#fff' }}>About My Professional Journey</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {site.aboutBullets?.map((b, i: number) => (
                <li key={i} style={{ marginBottom: '16px', color: '#cbd5e1', display: 'flex', alignItems: 'start' }}>
                  <span style={{ color: '#10b981', marginRight: '12px', fontSize: '1.2rem' }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <h3 style={{ marginTop: 0, color: '#fff' }}>Core Technical Expertise</h3>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '4px' }}>Backend Ecosystem</strong>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Node.js, Express, MongoDB, Redis, GraphQL, Socket.IO, PostgreSQL</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#10b981', display: 'block', marginBottom: '4px' }}>Architecture & Design</strong>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>Microservices, Event-Driven Architecture, Distributed Systems, Clean Architecture, CQRS</p>
            </div>
            <div>
              <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '4px' }}>Infrastructure & DevOps</strong>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>AWS (ECS, S3, RDS), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions), Monitoring (Prometheus/Grafana)</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Featured Projects</h2>
        <ProjectsPanel projects={projects} />
      </section>
    </main>
  )
}
