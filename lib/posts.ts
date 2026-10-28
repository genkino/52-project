import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export const LOCALES = ['ko', 'en', 'ja'] as const
export const PRODUCTS = ['gatherly', 'zupzup'] as const

export type Locale = (typeof LOCALES)[number]
export type Product = (typeof PRODUCTS)[number]

export interface Post {
  locale: Locale
  product: Product
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

export interface PostStaticParam {
  locale: Locale
  product: Product
  slug: string
}

const defaultPostsDirectory = path.join(process.cwd(), 'posts')
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function isProduct(value: string): value is Product {
  return (PRODUCTS as readonly string[]).includes(value)
}

function dateString(value: unknown): string | null {
  const candidate = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : typeof value === 'string'
      ? value.trim()
      : ''

  if (!/^\d{4}-\d{2}-\d{2}$/.test(candidate)) return null
  const parsed = new Date(`${candidate}T00:00:00.000Z`)
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== candidate
    ? null
    : candidate
}

export function parsePostMarkdown(
  source: string,
  identity: PostStaticParam,
): Post | null {
  if (!slugPattern.test(identity.slug)) return null

  try {
    const { data, content } = matter(source)
    if (data.status !== 'approved') return null

    const title = typeof data.title === 'string' ? data.title.trim() : ''
    const date = dateString(data.date)
    const excerpt = typeof data.excerpt === 'string' ? data.excerpt.trim() : ''
    if (!title || !date || !excerpt) return null

    return {
      ...identity,
      title,
      date,
      excerpt,
      body: content.trim(),
    }
  } catch {
    return null
  }
}

export function getAllPosts(postsDirectory = defaultPostsDirectory): Post[] {
  const posts: Post[] = []

  for (const locale of LOCALES) {
    for (const product of PRODUCTS) {
      const productDirectory = path.join(postsDirectory, locale, product)
      if (!fs.existsSync(productDirectory)) continue

      for (const fileName of fs.readdirSync(productDirectory).sort()) {
        if (!fileName.endsWith('.md')) continue
        const slug = fileName.slice(0, -3)
        const identity = { locale, product, slug }
        const source = fs.readFileSync(path.join(productDirectory, fileName), 'utf8')
        const post = parsePostMarkdown(source, identity)
        if (post) posts.push(post)
      }
    }
  }

  return posts.sort((left, right) =>
    right.date.localeCompare(left.date) || left.title.localeCompare(right.title),
  )
}

export function getPostsForLocale(
  locale: Locale,
  postsDirectory = defaultPostsDirectory,
): Post[] {
  return getAllPosts(postsDirectory).filter((post) => post.locale === locale)
}

export function getPostBySlug(
  locale: Locale,
  product: Product,
  slug: string,
  postsDirectory = defaultPostsDirectory,
): Post | null {
  if (!slugPattern.test(slug)) return null
  const filePath = path.join(postsDirectory, locale, product, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf8')
  return parsePostMarkdown(source, { locale, product, slug })
}

export function getPostStaticParams(
  postsDirectory = defaultPostsDirectory,
): PostStaticParam[] {
  return getAllPosts(postsDirectory).map(({ locale, product, slug }) => ({
    locale,
    product,
    slug,
  }))
}

export function renderPostBody(markdown: string): string {
  return remark().use(html).processSync(markdown).toString()
}
