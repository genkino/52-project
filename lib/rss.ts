import { getAllPosts } from './posts'

export async function generateRSSFeed(): Promise<string> {
  const posts = getAllPosts()
  const siteUrl = 'https://genkino.github.io/52-project'

  const rssItems = posts.map((post) => {
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}/</link>
      <guid>${siteUrl}/posts/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>52 Project</title>
    <link>${siteUrl}</link>
    <description>52's project blog</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`

  return rss
}
