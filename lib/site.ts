const configuredSiteUrl = new URL(
  process.env.BLOG_SITE_URL || 'https://blog.52proj.com',
)
const canonicalBasePath = configuredSiteUrl.pathname.replace(/\/+$/, '')

export const SITE_URL = `${configuredSiteUrl.origin}${canonicalBasePath}`
export const SITE_BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '')

function normalizedRoute(route: string): string {
  return route.startsWith('/') ? route : `/${route}`
}

export function sitePath(route: string): string {
  return `${SITE_BASE_PATH}${normalizedRoute(route)}`
}

export function siteUrl(route: string): string {
  return new URL(`${canonicalBasePath}${normalizedRoute(route)}`, configuredSiteUrl.origin).toString()
}
