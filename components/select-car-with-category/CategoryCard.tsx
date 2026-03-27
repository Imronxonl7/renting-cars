import Image from 'next/image'
import Link from 'next/link'
import { Categories } from '@/types/Categories'

type CategoryCardProps = {
  category: Categories
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const imageUrl = category.image || '/rentax.jpg'

  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-white/8 bg-[#252421] shadow-[0_14px_40px_rgba(0,0,0,0.24)] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#edb458]/35 hover:shadow-[0_22px_60px_rgba(0,0,0,0.34)]">
      <div className="relative aspect-[1.32/1] overflow-hidden">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.06)_34%,rgba(0,0,0,0.84)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(237,180,88,0.9),transparent)] opacity-80" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 pt-5">
        <span className="text-sm font-bold tracking-[0.08em] text-white">
          {category.name}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 pb-5">
        <p className="text-xs font-semibold tracking-[0.28em] text-[#edb458] uppercase">
          Explore Category
        </p>
        <Link
          href={`/cars?category=${encodeURIComponent(category.id)}`}
          aria-label={`${category.name} kategoriyasini ko'rish`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#edb458]/55 bg-black/18 text-[#edb458] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#edb458] group-hover:text-[#1f1e1d]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 13L13 3M13 3H6M13 3V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default CategoryCard
