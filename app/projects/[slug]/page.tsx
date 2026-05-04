import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, projects } from '../../data/portfolio'

import { Project } from '../../../types/payload'

function fetchProject(slug: string): Project | null {
  return getProject(slug)
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = fetchProject(params.slug)
  if (!project) return { title: 'Project Not Found | Ashutosh Raval' }
  return {
    title: `${project.title} | Ashutosh Raval`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article'
    }
  }
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = fetchProject(params.slug)
  if (!project) return notFound()
  const decisions = project.caseStudy?.decisions?.filter(Boolean) || []
  const badges = project.badges ?? project.techStack ?? []
  const infra = project.infrastructure ?? []

  return (
    <main style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{project.title}</h1>
      <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: '1.6' }}>{project.description}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid #1e3a8a', paddingBottom: '8px', marginBottom: '20px' }}>Case Study</h2>
          {project.caseStudy?.problemStatement && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>The Challenge</h3>
              <p style={{ color: '#cbd5e1' }}>{project.caseStudy.problemStatement}</p>
            </div>
          )}
          {project.caseStudy?.solutionArchitecture && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>The Solution</h3>
              <p style={{ color: '#cbd5e1' }}>{project.caseStudy.solutionArchitecture}</p>
            </div>
          )}
          {project.caseStudy?.results && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>The Impact</h3>
              <p style={{ color: '#cbd5e1' }}>{project.caseStudy.results}</p>
            </div>
          )}
        </section>

        <section>
          <div style={{ background: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e2937' }}>
            <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '16px', color: '#3b82f6' }}>Architecture Insights</h2>
            {project.caseStudy?.architectureDetails ? (
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', fontStyle: 'italic' }}>{project.caseStudy.architectureDetails}</p>
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Detailed architectural documentation available upon request.</p>
            )}

            <h3 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '12px', color: '#fff' }}>Key Decisions</h3>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.95rem' }}>
              {decisions.map((d: string, i: number) => (
                <li key={i} style={{ marginBottom: '8px' }}>{d}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Technology & Infrastructure</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '16px' }}>
              {badges.map((b: string) => (
                <span key={b} style={{ fontSize: 11, fontWeight: 'bold', padding: '4px 10px', borderRadius: 4, background: '#1e2937', color: '#3b82f6', border: '1px solid #3b82f6' }}>{b}</span>
              ))}
            </div>
            {infra.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {infra.map((item: string) => (
                  <span key={item} style={{ fontSize: 11, fontWeight: 'bold', padding: '4px 10px', borderRadius: 4, background: '#1e2937', color: '#10b981', border: '1px solid #10b981' }}>{item}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <section style={{ marginTop: '60px', borderTop: '1px solid #1e2937', paddingTop: '32px', display: 'flex', gap: '16px' }}>
        {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noreferrer" style={{ padding: '12px 24px', background: '#1e40af', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>View Repository</a>}
        {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer" style={{ padding: '12px 24px', border: '1px solid #1e40af', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Live Application</a>}
      </section>
    </main>
  )
}
