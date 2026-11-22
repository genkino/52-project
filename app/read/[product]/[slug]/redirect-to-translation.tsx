'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/posts'
import { selectShareLanguage } from '@/lib/share-language'

export function RedirectToTranslation({
  destinations,
}: {
  destinations: ReadonlyArray<{ locale: Locale; href: string }>
}) {
  useEffect(() => {
    // If a reader reached a language link before hydration, keep their choice.
    if (document.activeElement?.closest('[data-article-languages]')) return

    const locale = selectShareLanguage(
      destinations.map((destination) => destination.locale),
      navigator.languages,
      navigator.language,
    )
    const destination = destinations.find((item) => item.locale === locale)
    // Do not leave the auto-redirecting page between the article and Back.
    if (destination) window.location.replace(destination.href)
  }, [destinations])

  return null
}
