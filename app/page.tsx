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

      <section style={{ padding: '40px 20px', borderTop: '1px solid #1e2a57', background: '#0b1020' }}>
        <h2>About Me</h2>
        <ul>
          {site.aboutBullets?.map((b, i: number) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section style={{ padding: '40px 20px' }}>
        <h2>Projects</h2>
        <ProjectsPanel projects={projects} />
      </section>
    </main>
  )
}
