import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  slug: string
  content?: string
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const dateValue = data.date
      const dateString = dateValue instanceof Date 
        ? dateValue.toISOString().split('T')[0]
        : typeof dateValue === 'string' 
        ? dateValue 
        : ''

      return {
        slug,
        title: data.title || '',
        date: dateString,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        id: slug,
      }
    })
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })

  return allPostsData
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = remark().use(html).processSync(content)
    const contentHtml = processedContent.toString()

    const dateValue = data.date
    const dateString = dateValue instanceof Date 
      ? dateValue.toISOString().split('T')[0]
      : typeof dateValue === 'string' 
      ? dateValue 
      : ''

    return {
      slug,
      title: data.title || '',
      date: dateString,
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content: contentHtml,
      id: slug,
    }
  } catch (error) {
    return null
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
