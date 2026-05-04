"use client";
import React from 'react'
import Link from 'next/link'

import { Project } from '../../types/payload'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project) return null

  const categoryBadges = project.categoryBadges ?? []
  const badges = project.badges ?? project.techStack ?? []

  return (
    <article className="project-card">
      {categoryBadges.length > 0 && (
        <div className="project-card-header">
          {categoryBadges.map(cb => (
            <span key={cb.label} className={`project-badge ${cb.variant}`}>{cb.label}</span>
          ))}
        </div>
      )}

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-tags">
        {badges.slice(0, 5).map(b => (
          <span key={b} className="tag">{b}</span>
        ))}
      </div>

      <div className="project-card-footer">
        <Link href={`/projects/${project.slug}`} className="btn-case-study">Read Case Study</Link>
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noopener" className="btn-live">Live</a>
        )}
      </div>

      <style jsx>{`
        .project-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
          background: #111118;
          transition: border-color .2s, transform .2s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          border-color: rgba(99,179,237,0.25);
          transform: translateY(-2px);
        }
        .project-card-header {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }
        .project-badge {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.02em;
        }
        .project-badge.amber {
          background: rgba(246,173,85,0.1);
          color: #fbd38d;
          border: 1px solid rgba(246,173,85,0.2);
        }
        .project-badge.green {
          background: rgba(104,211,145,0.1);
          color: #9ae6b4;
          border: 1px solid rgba(104,211,145,0.2);
        }
        .project-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .project-desc {
          font-size: 13px;
          color: #8888a0;
          line-height: 1.6;
          margin: 0 0 12px;
          flex-grow: 1;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .project-tags .tag {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace, ui-monospace;
          background: rgba(255,255,255,0.04);
          color: #e8e8f0;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 2px 8px;
        }
        .project-card-footer {
          display: flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .btn-case-study {
          font-size: 13px;
          color: #63b3ed;
          text-decoration: none;
          border: 1px solid rgba(99,179,237,0.3);
          border-radius: 6px;
          padding: 6px 14px;
          transition: background .2s;
        }
        .btn-case-study:hover {
          background: rgba(99,179,237,0.08);
        }
        .btn-live {
          font-size: 13px;
          color: #68d391;
          text-decoration: none;
          border: 1px solid rgba(104,211,145,0.3);
          border-radius: 6px;
          padding: 6px 14px;
          transition: background .2s;
        }
        .btn-live:hover {
          background: rgba(104,211,145,0.08);
        }
      `}</style>
    </article>
  )
}
