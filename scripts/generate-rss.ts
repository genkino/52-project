import fs from 'fs'
import path from 'path'
import { generateRSSFeed } from '../lib/rss'

async function main() {
  const rss = await generateRSSFeed()
  const outputPath = path.join(process.cwd(), 'out', 'feed.xml')
  
  // out 폴더가 없으면 생성
  const outDir = path.join(process.cwd(), 'out')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, rss, 'utf-8')
  console.log('RSS feed generated at:', outputPath)
}

main().catch(console.error)
