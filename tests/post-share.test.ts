import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { getPostShareStaticParams, getPostTranslations } from '../lib/posts'
import { selectShareLanguage } from '../lib/share-language'

const fixtures = path.join(process.cwd(), 'tests', 'fixtures', 'posts')

test('share routes group only approved translations of the same product and slug', () => {
  const groups = getPostShareStaticParams(fixtures)
  assert.deepEqual(groups.sort((left, right) => left.product.localeCompare(right.product)), [
    { product: 'gatherly', slug: 'approved-example' },
    { product: 'zupzup', slug: 'approved-example' },
  ])
  assert.deepEqual(getPostTranslations('gatherly', 'approved-example', fixtures).map((p) => p.locale), ['ko', 'ja'])
  assert.deepEqual(getPostTranslations('zupzup', 'approved-example', fixtures).map((p) => p.locale), ['en'])
  assert.deepEqual(getPostTranslations('zupzup', 'draft-example', fixtures), [])
  assert.deepEqual(getPostTranslations('gatherly', 'missing-status', fixtures), [])
})

test('the Cleanup Helper share link follows ordered browser preferences', () => {
  const available = getPostTranslations('zupzup', 'cleanup-helper').map((p) => p.locale)
  assert.deepEqual(available, ['ko', 'en', 'ja'])
  assert.equal(selectShareLanguage(available, ['ko-KR', 'en-US']), 'ko')
  assert.equal(selectShareLanguage(available, ['en-US', 'ja-JP']), 'en')
  assert.equal(selectShareLanguage(available, ['fr-FR', 'ja-JP', 'ko-KR']), 'ja')
  assert.equal(selectShareLanguage(available, ['fr-FR']), 'en')
  assert.equal(selectShareLanguage(available, [], 'ja-JP'), 'ja')
})

test('no language signal or no suitable approved translation leaves the chooser', () => {
  const available = getPostTranslations('gatherly', 'approved-example', fixtures).map((p) => p.locale)
  assert.equal(selectShareLanguage(available, ['en-US', 'ja-JP']), 'ja')
  assert.equal(selectShareLanguage(available, ['en-US', 'fr-FR']), undefined)
  assert.equal(selectShareLanguage(['ko', 'en', 'ja'], [], ''), undefined)
})
