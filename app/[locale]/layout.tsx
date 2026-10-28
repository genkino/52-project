import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { PAGE_COPY } from '@/lib/copy'
import { isLocale, LOCALES } from '@/lib/posts'
import { SITE_URL, sitePath } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return { title: '52 Project Journal' }
  const copy = PAGE_COPY[locale]

  return {
    metadataBase: new URL(SITE_URL),
    title: `${copy.brand} · 52 Project Journal`,
    description: copy.tagline,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href={sitePath('/favicon.svg')} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${PAGE_COPY[locale].brand} RSS`}
          href={sitePath(`/${locale}/feed.xml`)}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
