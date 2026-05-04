const test = require('node:test')
const assert = require('node:assert/strict')
const { isExternalUrl, isValidSlug } = require('../app/lib/validation')
const { withBasePath } = require('../app/lib/siteUrl')

const seed = require('../seed_payload.json')
const projects = seed.projects || []

test('static projects have unique valid slugs', () => {
  const slugs = projects.map((project) => project.slug)
  assert.equal(slugs.length > 0, true)
  assert.equal(new Set(slugs).size, slugs.length)
  for (const slug of slugs) {
    assert.equal(isValidSlug(slug), true)
  }
})

test('static projects include case-study and repository links', () => {
  for (const project of projects) {
    assert.equal(Boolean(project.title), true)
    assert.equal(Boolean(project.description), true)
    assert.equal(Boolean(project.caseStudy), true)
    assert.equal(Boolean(project.links && project.links.repo), true)
    assert.equal(isExternalUrl(project.links.repo), true)
  }
})

test('github pages helper prefixes local asset urls', () => {
  const previous = process.env.GITHUB_PAGES
  process.env.GITHUB_PAGES = 'true'
  assert.equal(withBasePath('/resume/Ashutosh_Raval_Resume.pdf'), '/portfolio/resume/Ashutosh_Raval_Resume.pdf')
  assert.equal(withBasePath('https://github.com/example'), 'https://github.com/example')
  process.env.GITHUB_PAGES = previous
})
