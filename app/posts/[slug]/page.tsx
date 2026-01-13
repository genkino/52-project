import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'

export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.content) {
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
