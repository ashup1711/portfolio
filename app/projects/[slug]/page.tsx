import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
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

const roleIcons: Record<string, string> = {
  'Super Admin': '\u{1F6E1}\uFE0F',
  'Admin': '\u{1F464}',
  'Inspector': '\u{1F50D}',
  'Contractor': '\u{1F527}',
  'Client': '\u{1F3E2}',
  'Customer': '\u{1F9D1}',
  'Partner': '\u{1F91D}',
  'Partner Associate': '\u{1F465}'
}

function parseImpactValue(raw: string): { main: string; suffix?: string } {
  if (!raw) return { main: raw }
  const match = raw.match(/^([^\d]*)([\d]+)([^\d]*)$/)
  if (match && match[2]) {
    return { main: match[1] + match[2], suffix: match[3] || undefined }
  }
  return { main: raw }
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = fetchProject(params.slug)
  if (!project) return notFound()

  const decisions = project.caseStudy?.decisions?.filter(Boolean) || []
  const badges = project.badges ?? project.techStack ?? []
  const infra = project.infrastructure ?? []
  const categoryBadges = project.categoryBadges ?? []
  const techGroups = project.techGroups
  const impactMetrics = project.impactMetrics ?? []
  const metrics = project.metrics ?? []

  const heroTags = [
    ...badges.slice(0, 3).map(b => ({ label: b, variant: 'default' as const })),
    ...categoryBadges
  ]

  return (
    <>
      <section className="project-hero">
        <Link href="/projects/" className="back-link">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
          Back to Projects
        </Link>

        <p className="hero-label">Case Study</p>
        <h1 className="hero-title">{project.title}</h1>
        <p className="hero-subtitle">{project.description}</p>

        {heroTags.length > 0 && (
          <div className="tag-row">
            {heroTags.map(tag => (
              <span key={tag.label} className={`tag${tag.variant !== 'default' ? ` ${tag.variant}` : ''}`}>
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className="meta-row">
          {project.domain && (
            <div className="meta-item">
              <span className="meta-label">Domain</span>
              <span className="meta-value">{project.domain}</span>
            </div>
          )}
          {project.roleCount && (
            <div className="meta-item">
              <span className="meta-label">Roles</span>
              <span className="meta-value">{project.roleCount}</span>
            </div>
          )}
          {project.links?.live && (
            <div className="meta-item">
              <span className="meta-label">Live</span>
              <a href={project.links.live} target="_blank" rel="noopener" className="live-link">
                <span className="live-dot"></span>
                {project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </div>
          )}
        </div>
      </section>

      <div className="divider"></div>

      <div className="project-content">
        {project.caseStudy?.problemStatement && (
          <div className="section">
            <p className="section-label">01 / The Challenge</p>
            <h2>Fragmented workflows across project stakeholders</h2>
            <p>{project.caseStudy.problemStatement}</p>
          </div>
        )}

        {project.caseStudy?.systemRoles && project.caseStudy.systemRoles.length > 0 && (
          <div className="section">
            <p className="section-label">02 / System Roles</p>
            <h2>{project.caseStudy.systemRoles.length} distinct roles, one unified platform</h2>
            <div className="roles-grid">
              {project.caseStudy.systemRoles.map(role => (
                <div key={role.name} className="role-card">
                  <div className="role-icon">{roleIcons[role.name] || '\u{1F4CB}'}</div>
                  <div className="role-name">{role.name}</div>
                  <div className="role-desc">{role.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.caseStudy?.coreWorkflow && project.caseStudy.coreWorkflow.length > 0 && (
          <div className="section">
            <p className="section-label">03 / Core Workflow</p>
            <h2>From project creation to delivery</h2>
            <div className="workflow">
              {project.caseStudy.coreWorkflow.map(step => (
                <div key={step.step} className="wf-step">
                  <div className="wf-num">{String(step.step).padStart(2, '0')}</div>
                  <div className="wf-content">
                    <div className="wf-title">{step.title}</div>
                    <div className="wf-desc">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="section">
            <p className="section-label">02 / Key Contributions</p>
            <h2>What I built and delivered</h2>
            <div className="workflow">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="wf-step">
                  <div className="wf-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="wf-content">
                    <div className="wf-desc">{feature}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.caseStudy?.systemFeatures && project.caseStudy.systemFeatures.length > 0 && (
          <div className="section">
            <p className="section-label">03 / System Features</p>
            <h2>Core capabilities of the platform</h2>
            <div className="modules-grid">
              {project.caseStudy.systemFeatures.map(feature => (
                <div key={feature.title} className="module-card">
                  <div className="module-title">{feature.title}</div>
                  <div className="module-desc">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.caseStudy?.featureModules && project.caseStudy.featureModules.length > 0 && (
          <div className="section">
            <p className="section-label">04 / Feature Modules</p>
            <h2>Key capabilities across the platform</h2>
            <div className="modules-grid">
              {project.caseStudy.featureModules.map(mod => (
                <div key={mod.title} className="module-card">
                  <div className="module-title">{mod.title}</div>
                  <div className="module-desc">{mod.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(project.caseStudy?.architectureDetails || decisions.length > 0) && (
          <div className="section">
            <p className="section-label">{project.keyFeatures && project.keyFeatures.length > 0 ? (project.caseStudy?.systemFeatures && project.caseStudy.systemFeatures.length > 0 ? '04 / Architecture Insights' : '03 / Architecture Insights') : '05 / Architecture Insights'}</p>
            <h2>Design decisions that drive reliability</h2>
            <div className="arch-card">
              {project.caseStudy?.architectureDetails && (
                <p>{project.caseStudy.architectureDetails}</p>
              )}
              {decisions.length > 0 && (
                <div className="decisions">
                  {decisions.map((d: string, i: number) => {
                    const boldMatch = d.match(/^([^—–-]+)[—–-]\s*(.+)$/)
                    return (
                      <div key={i} className="decision">
                        <div className="decision-dot"></div>
                        <div className="decision-text">
                          {boldMatch ? (
                            <><strong>{boldMatch[1].trim()}</strong> {boldMatch[2]}</>
                          ) : d}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {project.caseStudy?.performance && project.caseStudy.performance.length > 0 && (
          <div className="section">
            <p className="section-label">05 / Performance & Scalability</p>
            <h2>Built for high concurrency and low latency</h2>
            <div className="arch-card">
              <div className="decisions">
                {project.caseStudy.performance.map((item, i) => (
                  <div key={i} className="decision">
                    <div className="decision-dot"></div>
                    <div className="decision-text">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {project.caseStudy?.security && project.caseStudy.security.length > 0 && (
          <div className="section">
            <p className="section-label">06 / Security</p>
            <h2>Privacy and data protection measures</h2>
            <div className="arch-card">
              <div className="decisions">
                {project.caseStudy.security.map((item, i) => (
                  <div key={i} className="decision">
                    <div className="decision-dot"></div>
                    <div className="decision-text">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(impactMetrics.length > 0 || metrics.length > 0) && (
          <div className="section">
            <p className="section-label">{project.caseStudy?.security && project.caseStudy.security.length > 0 ? '07 / Impact' : (project.caseStudy?.performance && project.caseStudy.performance.length > 0 ? '06 / Impact' : '06 / Impact')}</p>
            <h2>Measurable outcomes delivered</h2>
            <div className="impact-grid">
              {impactMetrics.length > 0
                ? impactMetrics.map((m, i) => {
                    const { main, suffix } = parseImpactValue(m.value)
                    return (
                      <div key={i} className="impact-card">
                        <div className="impact-value">
                          {main}{suffix && <span>{suffix}</span>}
                        </div>
                        <div className="impact-label">{m.label}</div>
                      </div>
                    )
                  })
                : metrics.map((m, i) => (
                    <div key={i} className="impact-card">
                      <div className="impact-value" style={{ fontSize: '1.25rem' }}>{m}</div>
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {(techGroups || badges.length > 0 || infra.length > 0) && (
          <div className="section">
            <p className="section-label">08 / Technology & Infrastructure</p>
            <h2>Stack</h2>
            {techGroups ? (
              <div className="stack-grid">
                {Object.entries(techGroups).map(([group, tags]) => (
                  <div key={group} className="stack-group">
                    <div className="stack-group-label">{group}</div>
                    <div className="stack-tags">
                      {tags.map(t => (
                        <span key={t} className="stack-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1.5rem' }}>
                {badges.map(b => (
                  <span key={b} className="stack-tag">{b}</span>
                ))}
                {infra.map(item => (
                  <span key={item} className="stack-tag" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.2)' }}>{item}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="project-footer">
        &copy; 2025 Ashutosh Raval
      </footer>
    </>
  )
}
