import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import './styles/globals.css'
import { projects } from './data/portfolio'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
}

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #1e2a57', background: '#0b1020' }}>
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>Ashutosh Raval</Link>
        <Link href="/projects" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Projects</Link>
        <details>
          <summary style={{ color: '#cbd5e1', cursor: 'pointer' }}>Past Projects</summary>
          <div style={{ position: 'absolute', marginTop: 8, display: 'grid', gap: 8, minWidth: 260, padding: 12, background: '#11152b', border: '1px solid #2a2f4f', borderRadius: 8, zIndex: 10 }}>
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                {project.title}
              </Link>
            ))}
          </div>
        </details>
        <a href="https://drive.google.com/uc?export=download&id=1E7TDI-G897_zsH1-PKVzAm1_guaqwjv4" style={{ color: '#cbd5e1', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Resume</a>
        <Link href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Contact</Link>
      </nav>
    </header>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
