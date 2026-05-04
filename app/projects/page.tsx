import React from 'react'
import type { Metadata } from 'next'
import { Project } from '../../types/payload'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/portfolio'

export const metadata: Metadata = {
  title: 'Projects | Ashutosh Raval',
  description: 'Case studies and project work by Ashutosh Raval.',
  openGraph: {
    title: 'Projects | Ashutosh Raval',
    description: 'Backend, cloud, microservice, and real-time systems case studies.'
  }
}

export default async function ProjectsPage() {
  return (
    <main style={{ padding: '40px 20px' }}>
      <h1>Projects</h1>
      {projects.length === 0 && (
        <div style={{ border: '1px solid #2a2f4f', borderRadius: 8, padding: 20, background: '#11152b' }}>
          <p style={{ margin: 0, color: '#cbd5e1' }}>No projects are available yet. Check the CMS configuration or add projects in Payload.</p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {projects?.map((p: Project) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  )
}
