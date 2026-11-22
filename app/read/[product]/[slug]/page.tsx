import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALE_LABELS } from '@/lib/copy'
import { getPostShareStaticParams, getPostTranslations, isProduct } from '@/lib/posts'
import { sitePath, siteUrl } from '@/lib/site'
import { RedirectToTranslation } from './redirect-to-translation'

type SharePageProps = { params: Promise<{ product: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  const groups = getPostShareStaticParams()
  // Match the localized article export's fail-closed empty-build behavior.
  return groups.length ? groups : [{ product: 'gatherly' as const, slug: '_no-approved-posts' }]
}

function getShareArticle(product: string, slug: string) {
  if (!isProduct(product)) notFound()
  const translations = getPostTranslations(product, slug)
  const preview = translations.find(({ locale }) => locale === 'en') ?? translations[0]
  if (!preview) notFound()
  return { preview, translations }
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { product, slug } = await params
  const { preview } = getShareArticle(product, slug)
  const title = `${preview.title} · 52 Project Journal`
  const description = preview.excerpt
  const url = siteUrl(`/read/${product}/${slug}/`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title, description, url, siteName: '52 Project Journal' },
    twitter: { card: 'summary', title, description },
  }
}

export default async function ShareArticlePage({ params }: SharePageProps) {
  const { product, slug } = await params
  const { preview, translations } = getShareArticle(product, slug)
  const destinations = translations.map(({ locale }) => ({
    locale,
    href: sitePath(`/${locale}/${product}/${slug}/`),
  }))

  return (
    <main className="page-shell article-shell">
      <div className="article-card">
        <header className="article-heading">
          <p className="eyebrow">52 Project Journal</p>
          <h1 lang={preview.locale}>{preview.title}</h1>
          <p className="article-excerpt" lang={preview.locale}>{preview.excerpt}</p>
        </header>
        <p className="landing-intro">
          <span lang="ko">이 글을 읽을 언어를 선택해 주세요.</span><br />
          Choose a language to read this article.<br />
          <span lang="ja">この記事を読む言語を選んでください。</span>
        </p>
        <nav className="language-cards" aria-label="Article languages" data-article-languages>
          {destinations.map(({ locale, href }) => (
            <a className="language-card" href={href} hrefLang={locale} lang={locale} key={locale}>
              <span className="language-name">{LOCALE_LABELS[locale]}</span>
              <span className="language-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <RedirectToTranslation destinations={destinations} />
      </div>
    </main>
  )
}
