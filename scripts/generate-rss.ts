import fs from 'node:fs'
import path from 'node:path'
import { generateAllRSSFeeds } from '../lib/rss'
import { getPostStaticParams } from '../lib/posts'

const outputRoot = path.join(process.cwd(), 'out')

if (getPostStaticParams().length === 0) {
  // The reserved Next.js export placeholder is only for build-time compatibility.
  fs.rmSync(path.join(outputRoot, 'ko', 'gatherly', '_no-approved-posts'), {
    recursive: true,
    force: true,
  })
}

for (const { locale, xml } of generateAllRSSFeeds()) {
  const localeDirectory = path.join(outputRoot, locale)
  fs.mkdirSync(localeDirectory, { recursive: true })
  const outputPath = path.join(localeDirectory, 'feed.xml')
  fs.writeFileSync(outputPath, xml, 'utf8')
  console.log(`RSS feed generated: ${outputPath}`)
}
