import Image from 'next/image'
import Link from 'next/link'

import BlogCards from '@/components/BlogCards'
import Container from '@/components/Container'
import { blogPosts } from '@/data/blogPosts'
import { getSupabaseRows } from '@/lib/supabase'
import { Categories } from '@/types/Categories'

const blogTags = ['Airport', 'Car', 'Limousine', 'Rental', 'Service']

async function BlogPage() {
  const categories = await getSupabaseRows<Categories>('categories').catch(
    (error) => {
      console.error('Blog categories fetch error:', error)
      return []
    }
  )
  const [featuredPost, ...recentPosts] = blogPosts

  return (
    <div className="bg-[#181818] text-white">
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/dugatti.webp)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-[#111111]/65" />
        <Container className="relative flex min-h-105 items-center justify-center py-24">
          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#edb458]">
              Auto Stories
            </p>
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              Blog
            </h1>
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-10 md:pt-14">
        <Container className="">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-10">
              <article className="overflow-hidden rounded-[28px] border border-white/8 bg-[#242424] shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-5 px-6 py-7 md:px-8 md:py-8">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/55">
                    <span>{featuredPost.categories[0]}</span>
                    <span className="text-white/25">•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-[2.2rem]">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-white/60">
                      by {featuredPost.author}
                    </p>
                    <p className="max-w-3xl text-base leading-7 text-white/72">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-[#edb458] px-5 py-3 text-sm font-semibold text-[#1f1e1d] transition hover:bg-[#f6c46d]"
                  >
                    Read More
                  </button>
                </div>
              </article>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <h2 className="text-center text-2xl font-bold">
                    More Articles
                  </h2>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <BlogCards posts={blogPosts} />
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-[26px] bg-[#242424] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
                <h3 className="mb-5 text-2xl font-bold">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.length > 0 ? (
                    recentPosts.map((post) => (
                      <article
                        key={post.id}
                        className="flex items-center gap-4 rounded-2xl border border-white/6 bg-white/3 p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="mb-1 text-xs uppercase tracking-[0.22em] text-[#edb458]">
                            {post.categories[0]}
                          </p>
                          <h4 className="line-clamp-2 text-sm font-medium leading-5 text-white/90">
                            {post.title}
                          </h4>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-white/60">
                      Recent posts will appear here when the selected category
                      has more than one article.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-[26px] bg-[#242424] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
                <h3 className="mb-5 text-2xl font-bold">Categories</h3>
                <ul className="space-y-3 text-base text-white/72">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/cars?category=${encodeURIComponent(category.id)}`}
                        className="group flex items-center gap-3 transition hover:text-[#edb458]"
                      >
                        <span className="text-white/35 transition group-hover:text-[#edb458]">
                          ›
                        </span>
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[26px] bg-[#242424] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
                <h3 className="mb-5 text-2xl font-bold">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {blogTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.07] px-4 py-2 text-sm text-white/85 transition hover:bg-[#edb458] hover:text-[#1f1e1d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default BlogPage
