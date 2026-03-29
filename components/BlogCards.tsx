import Image from 'next/image'

import { BlogPost, blogPosts as defaultBlogPosts } from '@/data/blogPosts'

function BlogCards({ posts = defaultBlogPosts }: { posts?: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="blog-card group w-full overflow-hidden rounded-xl border border-[#8080805f] transition-shadow duration-300 hover:shadow-xl hover:shadow-[#edb458a9]"
          style={{ background: '#1a1a1a' }}
        >
          <div className="relative h-52 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: post.bgGradient }}
            />

            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
                backgroundSize: '150px',
              }}
            />

            <div className="group absolute inset-0 flex items-center justify-center">
              <Image
                className="relative w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={post.image}
                alt={post.title}
                width={400}
                height={400}
              />
              <div className="absolute bottom-0 h-full w-full bg-linear-to-t from-[#000000cc] to-transparent" />
            </div>

            <div className="absolute bottom-3 left-3">
              <span className="blog-date-badge rounded px-3 py-1 text-xs font-semibold text-white">
                {post.date}
              </span>
            </div>

            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#edb458]">
                {post.categories[0]}
              </span>
            </div>

            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </div>

          <div className="bg-[#1a1a1a] px-5 py-4">
            <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {post.author}
              </span>
            </div>
            <h3 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#edb458]">
              {post.title}
            </h3>
            <p className="text-sm leading-6 text-white/60">{post.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default BlogCards
