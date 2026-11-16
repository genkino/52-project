import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { getPostBySlug, getPostLocaleParams, LOCALES, renderPostBody } from '../lib/posts'

const clip = '/media/zupzup-guides/cleanup/02-classify-review-account-redacted.mp4'

test('standalone local guide clips render as controlled inline video with accessible fallback', () => {
  const rendered = renderPostBody(`[Review "Skip" & Keep](${clip})`)
  assert.match(rendered, /<video controls playsinline preload="metadata"/)
  assert.match(rendered, /aria-label="Review &#x22;Skip&#x22; (?:&amp;|&#x26;) Keep"|aria-label="Review &quot;Skip&quot; (?:&amp;|&#x26;) Keep"/)
  assert.ok(rendered.includes(`src="${clip}"`))
  assert.ok(rendered.includes(`<a href="${clip}">`))
  assert.doesNotMatch(rendered, /autoplay|loop|onerror|onclick/)
})

test('video embedding does not enable raw HTML or untrusted sources', () => {
  const markdown = [
    '<script>alert(1)</script>',
    '<video src="https://example.com/a.mp4" autoplay onerror="alert(1)"></video>',
    '[external](https://example.com/a.mp4)',
    '[outside directory](/other/a.mp4)',
    '[traversal](/media/zupzup-guides/cleanup/../a.mp4)',
    '[encoded traversal](/media/zupzup-guides/cleanup/%2e%2e/a.mp4)',
    '[query](/media/zupzup-guides/cleanup/a.mp4?autoplay=1)',
    '[javascript](javascript:alert%281%29)',
    `Inline [clip](${clip}) stays a link.`,
    `[**formatted**](${clip})`,
  ].join('\n\n')
  const rendered = renderPostBody(markdown)
  assert.doesNotMatch(rendered, /<video|<script|onerror|javascript:/)
  assert.match(rendered, /href="https:\/\/example.com\/a.mp4"/)
  assert.match(rendered, /Inline <a /)
})

test('video descriptions cannot inject HTML attributes', () => {
  const rendered = renderPostBody(`[\" onerror=\"alert(1)](${clip})`)
  assert.match(rendered, /<video /)
  assert.doesNotMatch(rendered, /aria-label="" onerror=/)
  assert.match(rendered, /aria-label="(?:&#x22;|&quot;) onerror=(?:&#x22;|&quot;)alert\(1\)"/)
})

test('all nine new articles include the reviewed media, localized routes, and contact link', () => {
  const cases = [
    { slug: 'screenshot-cleanup', videos: 1, images: 2 },
    { slug: 'screenshot-title-summary-tags', videos: 2, images: 1 },
    { slug: 'save-web-link-and-fetch-content', videos: 3, images: 2 },
  ]
  const assets = new Set<string>()
  for (const { slug, videos, images } of cases) {
    assert.equal(getPostLocaleParams('zupzup', slug).length, 3)
    for (const locale of LOCALES) {
      const post = getPostBySlug(locale, 'zupzup', slug)
      assert.ok(post)
      assert.equal(post.date, '2026-11-07')
      const rendered = renderPostBody(post.body)
      assert.equal((rendered.match(/<video /g) ?? []).length, videos)
      assert.equal((rendered.match(/<img /g) ?? []).length, images)
      assert.match(rendered, /href="mailto:hello@52proj.com"/)
      assert.doesNotMatch(rendered, /docs\.google\.com|github\.com|file_0000|libfile_|\/Users\/|\/workspace\/|<iframe/)
      for (const match of rendered.matchAll(/(?:src|href)="(\/media\/zupzup-guides\/[^"?#]+)"/g)) {
        assert.ok(fs.statSync(path.join(process.cwd(), 'public', match[1])).size > 0)
        assets.add(match[1])
      }
      if (slug !== 'screenshot-title-summary-tags') {
        assert.ok(rendered.includes(`https://blog.52proj.com/${locale}/zupzup/zupzup-first-save/`))
      }
      if (slug === 'save-web-link-and-fetch-content') {
        assert.match(rendered, /href="https:\/\/thereader.mitpress.mit.edu\/from-linux-to-wikipedia-how-volunteers-build-the-internet\/"/)
        assert.match(rendered, /href="https:\/\/mitpress.mit.edu\/9780262054805\/peer-production\/"/)
        assert.match(rendered, /Adobe Stock/)
      }
    }
  }
  assert.equal(assets.size, 11)
})
