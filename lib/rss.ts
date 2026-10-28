import RSS from 'rss'
import { PAGE_COPY } from './copy'
import { LOCALES, getAllPosts, type Locale } from './posts'
import { siteUrl } from './site'

export function generateRSSFeed(
  locale: Locale,
  postsDirectory?: string,
): string {
  const localePosts = getAllPosts(postsDirectory).filter((post) => post.locale === locale)
  const localeName = locale === 'ko' ? '한국어' : locale === 'ja' ? '日本語' : 'English'
  const feedUrl = siteUrl(`/${locale}/feed.xml`)
  const pageUrl = siteUrl(`/${locale}/`)

  const feed = new RSS({
    title: `${PAGE_COPY[locale].brand} · ${localeName}`,
    description: PAGE_COPY[locale].tagline,
    site_url: pageUrl,
    feed_url: feedUrl,
    language: locale,
    pubDate: localePosts[0]?.date,
  })

  for (const post of localePosts) {
    const url = siteUrl(`/${post.locale}/${post.product}/${post.slug}/`)
    feed.item({
      title: post.title,
      description: post.excerpt,
      url,
      guid: url,
      date: new Date(`${post.date}T00:00:00.000Z`),
      categories: [post.product],
    })
  }

  return feed.xml({ indent: true })
}

export function generateAllRSSFeeds(postsDirectory?: string): Array<{ locale: Locale; xml: string }> {
  return LOCALES.map((locale) => ({
    locale,
    xml: generateRSSFeed(locale, postsDirectory),
  }))
}
