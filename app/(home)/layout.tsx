import type { Metadata } from 'next'
import '../globals.css'
import { sitePath } from '@/lib/site'

export const metadata: Metadata = {
  title: '오이공작소 · 52 Project Journal',
  description: 'Gatherly와 ZupZup을 만들고 다듬으며 배운 점을 기록합니다.',
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head><link rel="icon" type="image/svg+xml" href={sitePath('/favicon.svg')} /></head>
      <body>{children}</body>
    </html>
  )
}
