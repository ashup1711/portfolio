"use client";
import React from 'react'
import Link from 'next/link'

import { Project } from '../../types/payload'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project) return null
  return (
    <article style={{ border: '1px solid #2a2f4f', borderRadius: 12, padding: 16, background: '#11152b', transition: 'transform .2s', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 8px' }}>{project.title}</h3>
      <p style={{ color: '#cbd5e1', flexGrow: 1 }}>{project.description}</p>
      <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(project.badges ?? project.techStack ?? []).map((b: string) => (
          <span key={b} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: '#1f2b54', color: '#cbd5e1' }}>{b}</span>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/projects/${project.slug}`} style={{ color: '#93c5fd' }}>Read Case Study</Link>
        {project.links?.repo ? (
          <a href={project.links.repo} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#93c5fd' }}>Repo</a>
        ) : null}
        {project.links?.live ? (
          <a href={project.links.live} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#93c5fd' }}>Live</a>
        ) : null}
      </div>
    </article>
  )
}
