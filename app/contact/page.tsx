import React from 'react'
import { site } from '../data/portfolio'

export default function ContactPage() {
  const contact = site.contact
  const email = contact?.email || ''
  const subject = encodeURIComponent('Portfolio inquiry')

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
      <h1>Contact</h1>
      <p style={{ color: '#cbd5e1', maxWidth: 720 }}>
        Reach out for backend, cloud, full-stack, or architecture work. This static GitHub Pages version uses direct contact links instead of a server-side form.
      </p>
      <section style={{ display: 'grid', gap: 12, maxWidth: 720, marginTop: 24 }}>
        {email && (
          <a className="button" href={`mailto:${email}?subject=${subject}`}>
            Email {email}
          </a>
        )}
        {contact?.phone && (
          <a className="button" href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
            Call {contact.phone}
          </a>
        )}
        {contact?.location && <p style={{ color: '#cbd5e1' }}>Location: {contact.location}</p>}
        {contact?.socials && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(contact.socials).map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: '#93c5fd' }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
