"use client";
import React from 'react'

export const HeroSection: React.FC<{ title: string; subtitle?: string; ctas?: { label: string; href: string }[] }>=({ title, subtitle, ctas })=>{
  return (
    <section style={{ padding: '60px 20px', background: '#0b1020', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>{subtitle}</p>}
      <div style={{ marginTop: 16 }}>
        {ctas?.map((cta) => (
          <a key={cta.label} href={cta.href} style={{ marginRight: 12, padding: '10px 16px', background: '#1e3a8a', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>{cta.label}</a>
        ))}
      </div>
    </section>
  )
}
