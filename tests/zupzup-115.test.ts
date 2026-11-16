import assert from 'node:assert/strict'
import test from 'node:test'
import { getPostBySlug, LOCALES, renderPostBody } from '../lib/posts'

test('ZupZup 1.15 guides are approved in all locales, linked and text-only', () => {
  for (const locale of LOCALES) {
    for (const slug of ['save-web-link-and-fetch-content', 'summarize-in-another-language']) {
      const post = getPostBySlug(locale, 'zupzup', slug)
      assert.ok(post)
      assert.equal(post.date, slug === 'summarize-in-another-language' ? '2026-11-17' : '2026-11-07')
      const html = renderPostBody(post.body)
      assert.match(html, /ZupZup 1\.15/)
      assert.doesNotMatch(html, /<video|<img|<iframe|\/Users\/|libfile_|status: draft/)
      assert.match(html, /apps.apple.com\/app\/id6758145905/)
      const companion = slug === 'summarize-in-another-language' ? 'save-web-link-and-fetch-content' : 'summarize-in-another-language'
      assert.ok(html.includes(`/${locale}/zupzup/${companion}/`))
    }
  }
})
