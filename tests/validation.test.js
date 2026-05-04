const test = require('node:test')
const assert = require('node:assert/strict')
const {
  isValidEmail,
  isExternalUrl,
  isValidResumeFile,
  isValidSlug,
  slugify,
  validateContactPayload,
  validateProjectPayload
} = require('../app/lib/validation')

test('validates email addresses', () => {
  assert.equal(isValidEmail('person@example.com'), true)
  assert.equal(isValidEmail('person@localhost'), false)
  assert.equal(isValidEmail('not-an-email'), false)
})

test('normalizes and validates slugs', () => {
  assert.equal(slugify('My Project: API'), 'my-project-api')
  assert.equal(isValidSlug('my-project-api'), true)
  assert.equal(isValidSlug('../secret'), false)
})

test('validates contact payloads', () => {
  const invalid = validateContactPayload({ name: '', email: 'bad', message: '' })
  assert.equal(invalid.ok, false)
  assert.equal(invalid.fields.name, 'Name is required')
  assert.equal(invalid.fields.email, 'Enter a valid email address')
  assert.equal(invalid.fields.message, 'Message is required')

  const spam = validateContactPayload({ name: 'A', email: 'a@example.com', message: 'Hi', company: 'bot' })
  assert.equal(spam.ok, false)
  assert.equal(spam.fields.company, 'Submission rejected')

  const valid = validateContactPayload({ name: 'A', email: 'A@Example.com', message: 'Hello' })
  assert.equal(valid.ok, true)
  assert.deepEqual(valid.value, { name: 'A', email: 'a@example.com', message: 'Hello' })
})

test('validates project payloads', () => {
  const invalid = validateProjectPayload({ title: '', slug: '../bad' })
  assert.equal(invalid.ok, false)
  assert.equal(invalid.fields.title, 'Title is required')
  assert.equal(invalid.fields.slug, 'Slug cannot contain path characters')

  const valid = validateProjectPayload({
    title: 'Project Alpha',
    category: 'Backend',
    description: 'A project',
    badges: 'Node.js\nRedis',
    caseStudy: { decisions: ['Queues', 'Caching'] }
  })
  assert.equal(valid.ok, true)
  assert.equal(valid.value.slug, 'project-alpha')
  assert.deepEqual(valid.value.badges, ['Node.js', 'Redis'])
  assert.deepEqual(valid.value.caseStudy.decisions, ['Queues', 'Caching'])
})

test('validates resume media', () => {
  assert.equal(isValidResumeFile({ url: '/resume/file.pdf', mimeType: 'application/pdf' }), true)
  assert.equal(isValidResumeFile({ url: '/resume/file.txt', mimeType: 'text/plain' }), false)
  assert.equal(isValidResumeFile(null), false)
})

test('validates external urls', () => {
  assert.equal(isExternalUrl('https://github.com/example/repo'), true)
  assert.equal(isExternalUrl('http://example.com'), true)
  assert.equal(isExternalUrl('/projects/example'), false)
})
