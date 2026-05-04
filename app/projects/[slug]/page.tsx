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
  return (
    <main style={{ padding: '40px 20px' }}>
      <h1>{project.title}</h1>
      <p style={{ color: '#cbd5e1' }}>{project.description}</p>
      <section style={{ marginTop: 20 }}>
        <h2>Case Study</h2>
        {project.caseStudy?.problemStatement && <p style={{ color: '#cbd5e1' }}><strong>Problem:</strong> {project.caseStudy.problemStatement}</p>}
        {project.caseStudy?.solutionArchitecture && <p style={{ color: '#cbd5e1' }}><strong>Solution:</strong> {project.caseStudy.solutionArchitecture}</p>}
        {decisions.length > 0 && <p style={{ color: '#cbd5e1' }}><strong>Decisions:</strong> {decisions.join(', ')}</p>}
        {project.caseStudy?.results && <p style={{ color: '#cbd5e1' }}><strong>Results:</strong> {project.caseStudy.results}</p>}
        {!project.caseStudy && <p style={{ color: '#cbd5e1' }}>No case study details are available yet.</p>}
      </section>
      <section style={{ marginTop: 20 }}>
        <h3>Tech Stack</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {badges.map((b: string) => (
            <span key={b} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 999, background: '#1f2b54', color: '#cbd5e1' }}>{b}</span>
          ))}
        </div>
      </section>
      <section style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noreferrer" className="button">GitHub Repository</a>}
        {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="button">Live Demo</a>}
      </section>
    </main>
  )
}
