const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 2000
const ADMIN_COOKIE = 'portfolio_admin_session'

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function slugify(input) {
  return normalizeString(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

function isValidEmail(email) {
  const normalized = normalizeString(email)
  return normalized.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
}

function validateContactPayload(body) {
  const fields = {}
  const name = normalizeString(body && body.name)
  const email = normalizeString(body && body.email).toLowerCase()
  const message = normalizeString(body && body.message)
  const company = normalizeString(body && body.company)

  if (company) fields.company = 'Submission rejected'
  if (!name) fields.name = 'Name is required'
  if (name.length > MAX_NAME_LENGTH) fields.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer`
  if (!email) fields.email = 'Email is required'
  if (email && !isValidEmail(email)) fields.email = 'Enter a valid email address'
  if (!message) fields.message = 'Message is required'
  if (message.length > MAX_MESSAGE_LENGTH) fields.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`

  return {
    ok: Object.keys(fields).length === 0,
    fields,
    value: { name, email, message }
  }
}

function toStringArray(value) {
  if (Array.isArray(value)) return value.map(normalizeString).filter(Boolean)
  if (typeof value === 'string') {
    return value.split('\n').map(normalizeString).filter(Boolean)
  }
  return []
}

function validateProjectPayload(body, options) {
  const fields = {}
  const isUpdate = Boolean(options && options.update)
  const title = normalizeString(body && body.title)
  const fallbackSlug = title ? slugify(title) : ''
  const rawSlug = normalizeString(body && body.slug)
  const slug = rawSlug ? slugify(rawSlug) : fallbackSlug

  if (!isUpdate || title) {
    if (!title) fields.title = 'Title is required'
    if (title.length > 255) fields.title = 'Title must be 255 characters or fewer'
  }

  if (!slug) fields.slug = 'Slug is required'
  if (rawSlug && /[./\\]/.test(rawSlug)) fields.slug = 'Slug cannot contain path characters'
  if (slug && !isValidSlug(slug)) fields.slug = 'Slug may contain lowercase letters, numbers, and hyphens only'

  const description = normalizeString(body && body.description)
  if (description.length > 1000) fields.description = 'Description must be 1000 characters or fewer'

  const category = normalizeString(body && body.category) || 'General'
  const links = body && typeof body.links === 'object' && body.links ? body.links : {}
  const repo = normalizeString(links.repo)
  const live = normalizeString(links.live)

  const value = {
    slug,
    title,
    category,
    description,
    keyFeatures: toStringArray(body && body.keyFeatures),
    techStack: toStringArray(body && body.techStack),
    metrics: toStringArray(body && body.metrics),
    impact: normalizeString(body && body.impact),
    caseStudy: {
      problemStatement: normalizeString(body && body.caseStudy && body.caseStudy.problemStatement),
      solutionArchitecture: normalizeString(body && body.caseStudy && body.caseStudy.solutionArchitecture),
      decisions: toStringArray(body && body.caseStudy && body.caseStudy.decisions),
      results: normalizeString(body && body.caseStudy && body.caseStudy.results)
    },
    links: {
      ...(repo ? { repo } : {}),
      ...(live ? { live } : {})
    },
    badges: toStringArray(body && body.badges),
    coverImage: normalizeString(body && body.coverImage),
    images: toStringArray(body && body.images)
  }

  return {
    ok: Object.keys(fields).length === 0,
    fields,
    value
  }
}

function isValidResumeFile(file) {
  if (!file || typeof file !== 'object') return false
  const url = normalizeString(file.url)
  const mimeType = normalizeString(file.mimeType)
  return Boolean(url) && (!mimeType || mimeType === 'application/pdf')
}

function isExternalUrl(value) {
  return /^https?:\/\/[^\s]+$/.test(normalizeString(value))
}

module.exports = {
  ADMIN_COOKIE,
  MAX_MESSAGE_LENGTH,
  isValidEmail,
  isExternalUrl,
  isValidResumeFile,
  isValidSlug,
  slugify,
  validateContactPayload,
  validateProjectPayload
}
