import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DATE_LOCALES, LOCALE_LABELS, PAGE_COPY, PRODUCT_LABELS } from '@/lib/copy'
import { isLocale, LOCALES, PRODUCTS, getPostsForLocale } from '@/lib/posts'
import { sitePath } from '@/lib/site'

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: routeLocale } = await params
  if (!isLocale(routeLocale)) notFound()

  const locale = routeLocale
  const copy = PAGE_COPY[locale]
  const posts = getPostsForLocale(locale)

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="site-brand" href={`/${locale}/`}>
          <span className="brand-mark">52</span>
          <span>
            <strong>{copy.brand}</strong>
            <small>{copy.eyebrow}</small>
          </span>
        </Link>
        <div className="header-actions">
          <nav className="language-nav" aria-label={copy.languageLabel}>
            {LOCALES.map((targetLocale) => (
              <Link
                aria-current={targetLocale === locale ? 'page' : undefined}
                href={`/${targetLocale}/`}
                key={targetLocale}
              >
                {targetLocale.toUpperCase()}
              </Link>
            ))}
          </nav>
          <a className="rss-link" href={sitePath(`/${locale}/feed.xml`)}>
            <span aria-hidden="true">◔</span> {copy.rssLabel}
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroDescription}</p>
        </div>
        <div aria-hidden="true" className="hero-stamp">
          <span>52</span>
          <small>MAKE<br />& REFINE</small>
        </div>
      </section>

      <div className="content-heading">
        <div>
          <p className="eyebrow">JOURNAL</p>
          <h2>{copy.sectionsTitle}</h2>
        </div>
        <nav className="category-nav" aria-label={copy.sectionsTitle}>
          {PRODUCTS.map((product) => (
            <a className={`category-pill ${product}`} href={`#${product}`} key={product}>
              {PRODUCT_LABELS[locale][product]}
            </a>
          ))}
        </nav>
      </div>

      <div className="product-sections">
        {PRODUCTS.map((product, index) => {
          const productPosts = posts.filter((post) => post.product === product)
          return (
            <section className="product-section" id={product} key={product}>
              <div className="product-heading">
                <div className="product-title-wrap">
                  <span className="section-index">0{index + 1}</span>
                  <h3>{PRODUCT_LABELS[locale][product]}</h3>
                </div>
                <span className="post-count">{String(productPosts.length).padStart(2, '0')}</span>
              </div>

              {productPosts.length === 0 ? (
                <p className="empty-state">{copy.emptyState}</p>
              ) : (
                <div className="post-grid">
                  {productPosts.map((post) => (
                    <article className="post-card" key={`${post.locale}-${post.product}-${post.slug}`}>
                      <Link href={`/${post.locale}/${post.product}/${post.slug}/`}>
                        <span className={`post-category ${post.product}`}>
                          {PRODUCT_LABELS[locale][post.product]}
                        </span>
                        <h4>{post.title}</h4>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-meta">
                          <time dateTime={post.date}>
                            {new Date(`${post.date}T00:00:00.000Z`).toLocaleDateString(DATE_LOCALES[locale], {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              timeZone: 'UTC',
                            })}
                          </time>
                          <span aria-hidden="true">↗</span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>

      <footer className="site-footer">
        <div>
          <strong>{copy.brand}</strong>
          <span>© 2026 52 Project</span>
        </div>
        <div className="footer-links">
          <span>{copy.languageLabel}: {LOCALE_LABELS[locale]}</span>
          <a href={sitePath(`/${locale}/feed.xml`)}>{copy.rssLabel} ↗</a>
        </div>
      </footer>
    </main>
  )
}
