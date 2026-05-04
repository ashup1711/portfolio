import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Ashutosh Raval',
  description: 'Contact Ashutosh Raval about backend, cloud, and full-stack engineering work.',
  openGraph: {
    title: 'Contact | Ashutosh Raval',
    description: 'Contact Ashutosh Raval about engineering work.'
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
