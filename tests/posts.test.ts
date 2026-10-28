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
  assert.match(koreanFeed, /https:\/\/genkino\.github\.io\/52-project\/ko\/gatherly\/approved-example\//)
  assert.doesNotMatch(koreanFeed, /Synthetic English note|Synthetic Japanese note|Synthetic draft note|Synthetic unapproved note/)
  assert.match(englishFeed, /Synthetic English note/)
  assert.match(englishFeed, /https:\/\/genkino\.github\.io\/52-project\/en\/zupzup\/approved-example\//)
  assert.doesNotMatch(englishFeed, /Synthetic approved note|Synthetic Japanese note|Synthetic draft note/)
  assert.match(japaneseFeed, /Synthetic Japanese note/)
  assert.match(japaneseFeed, /https:\/\/genkino\.github\.io\/52-project\/ja\/gatherly\/approved-example\//)
  assert.doesNotMatch(japaneseFeed, /Synthetic approved note|Synthetic English note|Synthetic unapproved note/)
})

test('RSS generation creates one feed for each supported locale', () => {
  const feeds = generateAllRSSFeeds(fixtureDirectory)

  assert.deepEqual(feeds.map(({ locale }) => locale), ['ko', 'en', 'ja'])
  assert.ok(feeds.every(({ xml }) => xml.includes('<rss')))
})

test('only the two approved Korean articles are published; the old root test post stays excluded', () => {
  const posts = getAllPosts()
  assert.deepEqual(
    posts.map(({ locale, product, slug }) => ({ locale, product, slug })),
    [
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
  assert.match(feeds[0].xml, /Gatherly로 읽을 곳을 모으기|Gatherly/)
  assert.match(feeds[0].xml, /ZupZup/)
  assert.doesNotMatch(feeds[1].xml, /<item>/)
  assert.doesNotMatch(feeds[2].xml, /<item>/)
})
