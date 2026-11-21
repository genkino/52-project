import React, { type ReactNode } from 'react'
import { PAGE_COPY } from '@/lib/copy'
import type { Locale } from '@/lib/posts'

const MAIN_ID = 'main-content'

export function SkipToMain({ locale }: { locale: Locale }) {
  return <a className="skip-link" href={`#${MAIN_ID}`}>{PAGE_COPY[locale].skipToContent}</a>
}

export function PageMain({ children, className }: { children: ReactNode; className?: string }) {
  return <main id={MAIN_ID} className={className} tabIndex={-1}>{children}</main>
}
