import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PageMain, SkipToMain } from '../app/components/page-main'
import { LOCALES } from '../lib/posts'

const expectedLabels = {
  ko: '본문으로 건너뛰기',
  en: 'Skip to main content',
  ja: '本文へスキップ',
}

test('every localized skip link targets the same focusable main landmark', () => {
  const main = renderToStaticMarkup(createElement(PageMain, { children: 'Article' }))
  assert.equal(main, '<main id="main-content" tabindex="-1">Article</main>')
  for (const locale of LOCALES) {
    const link = renderToStaticMarkup(createElement(SkipToMain, { locale }))
    assert.equal(link, `<a class="skip-link" href="#main-content">${expectedLabels[locale]}</a>`)
  }
})
