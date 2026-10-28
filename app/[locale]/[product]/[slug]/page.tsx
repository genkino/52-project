import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DATE_LOCALES, PAGE_COPY, PRODUCT_LABELS } from '@/lib/copy'
import { getPostBySlug, getPostStaticParams, isLocale, isProduct, renderPostBody } from '@/lib/posts'
import { SITE_URL, sitePath } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  const approvedPosts = getPostStaticParams()
  if (approvedPosts.length > 0) return approvedPosts

  // Keep an empty collection fail-closed; postbuild removes this reserved route.
  return [{ locale: 'ko' as const, product: 'gatherly' as const, slug: '_no-approved-posts' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string; slug: string }>
}): Promise<Metadata> {
  const { locale, product, slug } = await params
  if (!isLocale(locale) || !isProduct(product)) return { title: 'Article' }
  const post = getPostBySlug(locale, product, slug)
  if (!post) return { title: 'Article' }

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} · ${PAGE_COPY[post.locale].brand}`,
    description: post.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; product: string; slug: string }>
}) {
  const { locale, product, slug } = await params
  if (!isLocale(locale) || !isProduct(product)) notFound()
  const post = getPostBySlug(locale, product, slug)
  if (!post) notFound()

  const copy = PAGE_COPY[post.locale]
  const publishedDate = new Date(`${post.date}T00:00:00.000Z`).toLocaleDateString(DATE_LOCALES[post.locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <main className="page-shell article-shell">
      <header className="site-header">
        <Link className="site-brand" href={`/${post.locale}/`}>
          <span className="brand-mark">52</span>
          <span>
            <strong>{copy.brand}</strong>
            <small>{copy.eyebrow}</small>
          </span>
        </Link>
        <a className="rss-link" href={sitePath(`/${post.locale}/feed.xml`)}>
          <span aria-hidden="true">◔</span> {copy.rssLabel}
        </a>
      </header>

      <article className="article-card">
        <Link className="back-link" href={`/${post.locale}/`}>← {copy.backLabel}</Link>
        <div className="article-heading">
          <span className={`post-category ${post.product}`}>
            {PRODUCT_LABELS[post.locale][post.product]}
          </span>
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <p className="article-date">
            {copy.publishedLabel} · <time dateTime={post.date}>{publishedDate}</time>
          </p>
        </div>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: renderPostBody(post.body) }}
        />
      </article>

      <footer className="site-footer">
        <div>
          <strong>{copy.brand}</strong>
          <span>{PRODUCT_LABELS[post.locale][post.product]}</span>
        </div>
        <div className="footer-links">
          <Link href={`/${post.locale}/`}>{copy.backLabel}</Link>
          <a href={sitePath(`/${post.locale}/feed.xml`)}>{copy.rssLabel} ↗</a>
        </div>
      </footer>
    </main>
  )
}
