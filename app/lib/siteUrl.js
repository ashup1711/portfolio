const GITHUB_BASE_PATH = '/portfolio'

function isGitHubPages() {
  return process.env.GITHUB_PAGES === 'true'
}

function basePath() {
  return isGitHubPages() ? GITHUB_BASE_PATH : ''
}

function withBasePath(path) {
  if (!path) return basePath() || '/'
  if (/^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${basePath()}${normalized}` || '/'
}

module.exports = {
  GITHUB_BASE_PATH,
  basePath,
  isGitHubPages,
  withBasePath
}
