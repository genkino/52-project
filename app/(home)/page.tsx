import Link from 'next/link'
import { LOCALE_LABELS } from '@/lib/copy'
import { LOCALES } from '@/lib/posts'
import { sitePath } from '@/lib/site'
import { PageMain, SkipToMain } from '../components/page-main'

const welcome: Record<(typeof LOCALES)[number], string> = {
  ko: '작은 제품을 만들고 다듬으며 배운 점을 기록합니다.',
  en: 'Notes from making and improving small products.',
  ja: '小さなプロダクトを作り、磨くなかで学んだことを記録します。',
}

export default function LanguageLandingPage() {
  return (
    <div className="landing-shell">
      <SkipToMain locale="ko" />
      <header className="landing-topline">
        <span className="brand-mark">52</span>
        <span>52 PROJECT JOURNAL</span>
      </header>

      <PageMain className="landing-card">
        <p className="eyebrow">GATHERLY · ZUPZUP · MAKING</p>
        <h1>오이공작소</h1>
        <p className="landing-intro">읽을 언어를 선택해 주세요.</p>
        <div className="language-cards">
          {LOCALES.map((locale) => (
            <Link className="language-card" href={`/${locale}/`} key={locale} lang={locale} hrefLang={locale}>
              <span className="language-name">{LOCALE_LABELS[locale]}</span>
              <span className="language-description">{welcome[locale]}</span>
              <span className="language-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </PageMain>

      <footer className="landing-footer">
        <span>© 2026 52 Project</span>
        <nav aria-label="RSS feeds" className="landing-rss-links">
          {LOCALES.map((locale) => (
            <a href={sitePath(`/${locale}/feed.xml`)} key={locale}>
              RSS · {locale.toUpperCase()}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  )
}
