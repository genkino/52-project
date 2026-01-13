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
  'nextjs-blog': {
    title: 'Next.js로 블로그 만들기',
    date: '2024-01-20',
    content: `
      <p>Next.js를 사용하여 정적 블로그를 만드는 방법에 대해 알아봅시다.</p>
      <h2>Next.js의 장점</h2>
      <p>Next.js는 React 기반의 프레임워크로, 다음과 같은 장점이 있습니다:</p>
      <ul>
        <li>서버 사이드 렌더링(SSR)</li>
        <li>정적 사이트 생성(SSG)</li>
        <li>자동 코드 스플리팅</li>
        <li>최적화된 이미지 로딩</li>
      </ul>
      <h2>블로그에 적용하기</h2>
      <p>Next.js의 App Router를 사용하면 동적 라우팅을 쉽게 구현할 수 있습니다. 각 포스트는 파일 시스템 기반 라우팅을 통해 자동으로 생성됩니다.</p>
    `,
  },
  'github-pages-deploy': {
    title: 'GitHub Pages 배포 가이드',
    date: '2024-01-25',
    content: `
      <p>GitHub Pages를 사용하여 Next.js 블로그를 배포하는 방법을 설명합니다.</p>
      <h2>배포 단계</h2>
      <ol>
        <li>GitHub에 레포지토리 생성</li>
        <li>Next.js 프로젝트를 정적 사이트로 빌드</li>
        <li>gh-pages 패키지를 사용하여 배포</li>
        <li>GitHub Pages 설정에서 브랜치 선택</li>
      </ol>
      <h2>주의사항</h2>
      <p>GitHub Pages는 정적 사이트만 호스팅할 수 있으므로, Next.js의 <code>output: 'export'</code> 옵션을 사용해야 합니다.</p>
      <p>또한 basePath와 assetPrefix를 설정하여 올바른 경로로 리소스를 제공해야 합니다.</p>
    `,
  },
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 홈으로 돌아가기
        </Link>

        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{post.date}</p>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
