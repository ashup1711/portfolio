"use client";
import React, { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'

import { Project } from '../../types/payload'

export default function ProjectsPanel({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set((projects ?? []).map(p => p.category)))], [projects])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return (projects ?? []).filter(p => {
      const matchCat = category === 'All' || p.category === category
      const q = query.toLowerCase().trim()
      const matchQuery = !q || (p.title?.toLowerCase() ?? '').includes(q) || (p.description?.toLowerCase() ?? '').includes(q)
      return matchCat && matchQuery
    })
  }, [projects, category, query])

  return (
    <section style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          aria-label="Search projects"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #2a2f4f', background: '#0b1220', color: '#fff' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #2a2f4f', background: '#0b1220', color: '#fff' }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ border: '1px solid #2a2f4f', borderRadius: 8, padding: 20, background: '#11152b' }}>
          <p style={{ marginTop: 0, color: '#cbd5e1' }}>
            {projects.length === 0 ? 'No projects are available yet.' : 'No projects match the current search or category.'}
          </p>
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <a href="/projects" style={{ color: '#93c5fd' }}>View All Projects</a>
      </div>
    </section>
  )
}
