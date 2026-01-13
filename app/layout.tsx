import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '52 Project',
  description: 'A beautiful blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="alternate" type="application/rss+xml" title="52 Project RSS Feed" href="/52-project/feed.xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
