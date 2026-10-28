import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { generateAllRSSFeeds, generateRSSFeed } from '../lib/rss'
import { LOCALES, PRODUCTS, getAllPosts, getPostBySlug, getPostStaticParams } from '../lib/posts'

const fixtureDirectory = path.join(process.cwd(), 'tests', 'fixtures', 'posts')

test('only explicitly approved, complete posts enter public routes', () => {
  const posts = getAllPosts(fixtureDirectory)

  assert.deepEqual(LOCALES, ['ko', 'en', 'ja'])
  assert.deepEqual(PRODUCTS, ['gatherly', 'zupzup'])
  assert.deepEqual(
    getPostStaticParams(fixtureDirectory).sort((left, right) => left.locale.localeCompare(right.locale)),
    [
      { locale: 'en', product: 'zupzup', slug: 'approved-example' },
      { locale: 'ja', product: 'gatherly', slug: 'approved-example' },
      { locale: 'ko', product: 'gatherly', slug: 'approved-example' },
    ],
  )
  assert.equal(posts.length, 3)
  assert.deepEqual(
    Object.fromEntries(posts.map(({ locale, product }) => [locale, product])),
    { en: 'zupzup', ja: 'gatherly', ko: 'gatherly' },
  )
  assert.equal(
    getPostBySlug('en', 'zupzup', 'draft-example', fixtureDirectory),
    null,
  )
  assert.equal(
    getPostBySlug('ja', 'gatherly', 'missing-status', fixtureDirectory),
    null,
  )
})

test('language feeds include only approved posts in their language', () => {
  const koreanFeed = generateRSSFeed('ko', fixtureDirectory)
  const englishFeed = generateRSSFeed('en', fixtureDirectory)
  const japaneseFeed = generateRSSFeed('ja', fixtureDirectory)

  assert.match(koreanFeed, /Synthetic approved note/)
  assert.match(koreanFeed, /https:\/\/blog\.52proj\.com\/ko\/gatherly\/approved-example\//)
  assert.doesNotMatch(koreanFeed, /Synthetic English note|Synthetic Japanese note|Synthetic draft note|Synthetic unapproved note/)
  assert.match(englishFeed, /Synthetic English note/)
  assert.match(englishFeed, /https:\/\/blog\.52proj\.com\/en\/zupzup\/approved-example\//)
  assert.doesNotMatch(englishFeed, /Synthetic approved note|Synthetic Japanese note|Synthetic draft note/)
  assert.match(japaneseFeed, /Synthetic Japanese note/)
  assert.match(japaneseFeed, /https:\/\/blog\.52proj\.com\/ja\/gatherly\/approved-example\//)
  assert.doesNotMatch(japaneseFeed, /Synthetic approved note|Synthetic English note|Synthetic unapproved note/)
})

test('RSS generation creates one feed for each supported locale', () => {
  const feeds = generateAllRSSFeeds(fixtureDirectory)

  assert.deepEqual(feeds.map(({ locale }) => locale), ['ko', 'en', 'ja'])
  assert.ok(feeds.every(({ xml }) => xml.includes('<rss')))
})

test('all six approved localized articles are published; the old root test post stays excluded', () => {
  const posts = getAllPosts()
  assert.equal(posts.length, 6)
  assert.deepEqual(
    posts
      .map(({ locale, product, slug }) => ({ locale, product, slug }))
      .sort((left, right) => left.locale.localeCompare(right.locale) || left.product.localeCompare(right.product)),
    [
      { locale: 'en', product: 'gatherly', slug: 'gatherly-first-read' },
      { locale: 'en', product: 'zupzup', slug: 'zupzup-first-save' },
      { locale: 'ja', product: 'gatherly', slug: 'gatherly-first-read' },
      { locale: 'ja', product: 'zupzup', slug: 'zupzup-first-save' },
      { locale: 'ko', product: 'gatherly', slug: 'gatherly-first-read' },
      { locale: 'ko', product: 'zupzup', slug: 'zupzup-first-save' },
    ],
  )
  assert.equal(posts.some(({ slug }) => slug === 'first-post'), false)
  assert.equal(
    getPostStaticParams().some(({ slug }) => slug === 'first-post'),
    false,
  )

  const feeds = generateAllRSSFeeds()
  assert.deepEqual(feeds.map(({ locale }) => locale), ['ko', 'en', 'ja'])
  assert.ok(feeds.every(({ xml }) => !xml.includes('first-post')))
  assert.deepEqual(feeds.map(({ xml }) => (xml.match(/<item>/g) ?? []).length), [2, 2, 2])
  assert.match(feeds[0].xml, /Gatherly/)
  assert.match(feeds[0].xml, /ZupZup/)
  assert.match(feeds[1].xml, /Read new blog posts in one place with Gatherly/)
  assert.match(feeds[1].xml, /Save things with ZupZup and find them again/)
  assert.match(feeds[2].xml, /Gatherlyでブログの新着記事をまとめて読む/)
  assert.match(feeds[2].xml, /ZupZupで保存した資料をあとから見つける/)
})
