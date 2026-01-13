import Link from 'next/link'

const posts = [
  {
    id: 1,
    title: '첫 번째 블로그 포스트',
    date: '2024-01-15',
    excerpt: '이것은 첫 번째 블로그 포스트입니다. Next.js와 GitHub Pages를 사용하여 만든 블로그입니다.',
    slug: 'first-post',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-64rem mx-auto px-4 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold mb-2 text-[#159957] border-b border-[#e8e8e8] pb-3">
            52 Project
          </h1>
          <p className="text-lg text-[#666]">
            Next.js와 GitHub Pages로 만든 블로그
          </p>
        </header>

        <main className="bg-white rounded border border-[#e8e8e8] p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-[#e8e8e8] pb-2">
            포스트
          </h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-[#e8e8e8] pb-6 last:border-b-0 last:pb-0">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#159957] group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#666] mb-3">
                    {post.date}
                  </p>
                  <p className="text-[#333]">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-[#666] border-t border-[#e8e8e8] pt-6">
          <p>© 2024 52 Project. Built with Next.js and deployed on GitHub Pages.</p>
        </footer>
      </div>
    </div>
  )
}
