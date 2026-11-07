import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { getPostBySlug, getPostLocaleParams, LOCALES, renderPostBody } from '../lib/posts'

const slug = 'document-scan-and-organize'
const clip = '/media/zupzup-guides/image/zupzup-document-scan-blurred-short.mp4'

test('document scan walkthrough has three approved translations with the same reviewed video', () => {
  assert.equal(getPostLocaleParams('zupzup', slug).length, 3)
  for (const locale of LOCALES) {
    const post = getPostBySlug(locale, 'zupzup', slug)
    assert.ok(post)
    assert.equal(post.date, '2026-11-07')
    const rendered = renderPostBody(post.body)
    assert.equal((rendered.match(/<video /g) ?? []).length, 1)
    assert.match(rendered, /<video controls playsinline preload="metadata"/)
    assert.ok(rendered.includes(`src="${clip}"`))
    assert.ok(rendered.includes(`<a href="${clip}">`))
    assert.match(rendered, /href="mailto:hello@52proj.com"/)
    assert.ok(rendered.includes(`https://blog.52proj.com/${locale}/zupzup/screenshot-title-summary-tags/`))
    assert.doesNotMatch(rendered, /autoplay|<iframe|docs\.google\.com|github\.com|file_0000|libfile_|\/Users\/|\/workspace\//)
    assert.match(post.body, /Apple Intelligence/)
    assert.match(post.body, /Premium/)
    assert.match(post.body, /20/)
    assert.match(post.body, /1\/3/)
  }
})

test('published scan clip is exactly the approved redacted edit', () => {
  const bytes = fs.readFileSync(path.join(process.cwd(), 'public', clip))
  assert.equal(bytes.length, 2012203)
  assert.equal(createHash('sha256').update(bytes).digest('hex'), '40513753faf1de4d3b9e4c4d0e648b0f279034a9654116b54068bf9b464a76e6')
})
