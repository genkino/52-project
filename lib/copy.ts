import type { Locale, Product } from './posts'

export interface PageCopy {
  brand: string
  eyebrow: string
  tagline: string
  heroTitle: string
  heroDescription: string
  sectionsTitle: string
  languageLabel: string
  rssLabel: string
  emptyState: string
  publishedLabel: string
  backLabel: string
  readLabel: string
}

export const PAGE_COPY: Record<Locale, PageCopy> = {
  ko: {
    brand: '오이공작소',
    eyebrow: '52 PROJECT JOURNAL',
    tagline: '작은 제품을 만들고 다듬으며 배운 점을 기록합니다.',
    heroTitle: '만드는 사람의 작업 노트',
    heroDescription: 'Gatherly와 ZupZup의 제품 이야기와 그 과정에서 얻은 생각을 나눕니다.',
    sectionsTitle: '앱별 이야기',
    languageLabel: '언어',
    rssLabel: 'RSS 구독',
    emptyState: '아직 공개된 글이 없습니다. 다음 이야기를 준비하고 있습니다.',
    publishedLabel: '게시',
    backLabel: '글 목록으로 돌아가기',
    readLabel: '글 읽기',
  },
  en: {
    brand: '오이공작소',
    eyebrow: '52 PROJECT JOURNAL',
    tagline: 'Notes from making and improving small products.',
    heroTitle: 'A maker’s working notes',
    heroDescription: 'Stories about Gatherly, ZupZup, and what we learn along the way.',
    sectionsTitle: 'Browse by app',
    languageLabel: 'Language',
    rssLabel: 'Subscribe via RSS',
    emptyState: 'No articles are published yet. The next story is in the works.',
    publishedLabel: 'Published',
    backLabel: 'Back to articles',
    readLabel: 'Read article',
  },
  ja: {
    brand: '오이공작소',
    eyebrow: '52 PROJECT JOURNAL',
    tagline: '小さなプロダクトを作り、磨くなかで学んだことを記録します。',
    heroTitle: 'つくり手の作業ノート',
    heroDescription: 'Gatherly と ZupZup のプロダクトや、その過程で得た気づきを紹介します。',
    sectionsTitle: 'アプリ別の記事',
    languageLabel: '言語',
    rssLabel: 'RSS を購読',
    emptyState: '公開中の記事はまだありません。次の記事を準備しています。',
    publishedLabel: '公開日',
    backLabel: '記事一覧へ戻る',
    readLabel: '記事を読む',
  },
}

export const PRODUCT_LABELS: Record<Locale, Record<Product, string>> = {
  ko: { gatherly: 'Gatherly', zupzup: 'ZupZup' },
  en: { gatherly: 'Gatherly', zupzup: 'ZupZup' },
  ja: { gatherly: 'Gatherly', zupzup: 'ZupZup' },
}

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
}

export const DATE_LOCALES: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
}
