import type { Locale } from './posts'

export function selectShareLanguage(
  available: readonly Locale[],
  languages?: readonly string[],
  language?: string,
): Locale | undefined {
  const primary = (tag: string) => tag.trim().toLowerCase().split('-')[0]
  const preferences = (languages ?? []).map(primary).filter(Boolean)
  if (!preferences.length && language?.trim()) preferences.push(primary(language))
  if (!preferences.length) return undefined

  for (const preference of preferences) {
    const match = available.find((locale) => locale === preference)
    if (match) return match
  }

  return available.includes('en') ? 'en' : undefined
}
