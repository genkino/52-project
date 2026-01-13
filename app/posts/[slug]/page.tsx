import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts: Record<string, { title: string; date: string; content: string }> = {
  'first-post': {
    title: '첫 번째 블로그 포스트',
    date: '2024-01-15',
    content: `
      <p>안녕하세요! 이것은 첫 번째 블로그 포스트입니다.</p>
      <p>Next.js와 GitHub Pages를 사용하여 만든 블로그입니다. 이 블로그는 정적 사이트 생성(SSG)을 사용하여 빠르고 효율적으로 작동합니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>Next.js 14 App Router</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>GitHub Pages 배포</li>
      </ul>
      <p>앞으로 더 많은 포스트를 작성할 예정입니다!</p>
    `,
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-64rem mx-auto px-4 py-8 md:py-12">
        <Link
          href="/"
          className="inline-block mb-6 text-[#159957] hover:text-[#0d7a3d] hover:underline"
        >
          ← 홈으로 돌아가기
        </Link>

        <article className="bg-white rounded border border-[#e8e8e8] p-6 md:p-8">
          <header className="mb-6 border-b border-[#e8e8e8] pb-4">
            <h1 className="text-4xl font-semibold mb-2 text-[#159957]">
              {post.title}
            </h1>
            <p className="text-sm text-[#666]">{post.date}</p>
          </header>

          <div
            className="prose prose-lg max-w-none text-[#333]"
            style={{
              '--tw-prose-headings': '#333',
              '--tw-prose-links': '#159957',
              '--tw-prose-bold': '#333',
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
