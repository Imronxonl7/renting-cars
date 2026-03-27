import Container from './Container'
import CategoryCard from './select-car-with-category/CategoryCard'
import { getSupabaseRows } from '@/lib/supabase'
import { Categories } from '@/types/Categories'

const SelectCarWithCategory = async () => {
  const categories = await getSupabaseRows<Categories>('categories').catch((error) => {
    console.error('SelectCarWithCategory fetch error:', error)
    return []
  })

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="w-full overflow-hidden bg-[#1f1e1d] pt-2  pb-16 sm:pt-4 sm:pb-20 lg:pt-6 lg:pb-24">
      <Container className=''>
        <div className="mb-7 flex justify-center sm:mb-8">
          <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#edb458,transparent)]" />
        </div>

        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
            Select By Category
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-none tracking-[-0.03em]">
            <span className="text-white">Browse </span>
            <span className="text-[#edb458]">Car Categories</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default SelectCarWithCategory
