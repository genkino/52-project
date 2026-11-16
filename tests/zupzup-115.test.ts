import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import { getPostBySlug, LOCALES, renderPostBody } from '../lib/posts'

test('ZupZup 1.15 guides are approved in all locales, linked with refreshed media', () => {
  for (const locale of LOCALES) {
    for (const slug of ['save-web-link-and-fetch-content', 'summarize-in-another-language']) {
      const post = getPostBySlug(locale, 'zupzup', slug)
      assert.ok(post)
      assert.equal(post.date, slug === 'summarize-in-another-language' ? '2026-11-17' : '2026-11-07')
      const html = renderPostBody(post.body)
      assert.match(html, /ZupZup 1\.15/)
      if (slug === 'save-web-link-and-fetch-content') {
        assert.match(html, /save-and-fetch-v115\.mp4/)
        assert.match(html, /english-summary-suggestion-v115\.mp4/)
        assert.doesNotMatch(html, /summary-to-result-v115\.mp4|initial-english-summary/)
      } else {
        assert.match(html, /english-source-to-korean-summary-v115\.mp4/)
        assert.match(html, /english-source-preview-v115\.png/)
        assert.doesNotMatch(html, /save-and-fetch-v115\.mp4|initial-english-summary/)
      }
      assert.doesNotMatch(html, /<iframe|\/Users\/|libfile_|status: draft/)
      if (slug === 'summarize-in-another-language') {
        assert.equal((html.match(/<video /g) ?? []).length, 1)
        assert.equal((html.match(/<img /g) ?? []).length, 3)
      }
      assert.match(html, /apps.apple.com\/app\/id6758145905/)
      const companion = slug === 'summarize-in-another-language' ? 'save-web-link-and-fetch-content' : 'summarize-in-another-language'
      assert.ok(html.includes(`/${locale}/zupzup/${companion}/`))
    }
  }
})


test('older published web guide assets remain available', () => {
  for (const name of ['01-save-sheet-crop.mp4', '02-review-suggestions.mp4', '03-fetch-body-images.mp4', '03-saved-link-before-body.png', '05-fetch-menu.png']) {
    assert.ok(fs.statSync(`public/media/zupzup-guides/web/${name}`).size > 0)
  }
})
