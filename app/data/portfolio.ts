import seed from '../../seed_payload.json'
import { Project, Site } from '../../types/payload'

export const site = seed.site as Site
export const projects = seed.projects as Project[]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) || null
}
