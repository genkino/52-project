import Link from 'next/link'

const posts = [
  {
    id: 1,
    title: '첫 번째 블로그 포스트',
    date: '2024-01-15',
    excerpt: '이것은 첫 번째 블로그 포스트입니다. Next.js와 GitHub Pages를 사용하여 만든 블로그입니다.',
    slug: 'first-post',
  },
  {
    id: 2,
    title: 'Next.js로 블로그 만들기',
    date: '2024-01-20',
    excerpt: 'Next.js를 사용하여 정적 블로그를 만드는 방법에 대해 알아봅시다.',
    slug: 'nextjs-blog',
  },
  {
    id: 3,
    title: 'GitHub Pages 배포 가이드',
    date: '2024-01-25',
    excerpt: 'GitHub Pages를 사용하여 Next.js 블로그를 배포하는 방법을 설명합니다.',
    slug: 'github-pages-deploy',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            52 Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Next.js와 GitHub Pages로 만든 블로그
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {post.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 52 Project. Built with Next.js and deployed on GitHub Pages.</p>
        </footer>
      </div>
    </div>
  )
}
