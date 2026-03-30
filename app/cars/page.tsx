import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import { getSupabaseRows } from '@/lib/supabase'
import { Cars } from '@/types/Cars'
import { Categories } from '@/types/Categories'

type CarsPageProps = {
  searchParams: Promise<{
    category?: string | string[]
    model?: string | string[]
    page?: string | string[]
  }>
}

const CARS_PER_PAGE = 12

export const metadata: Metadata = {
  title: 'Mashinalar',
  description:
    'Hashamatli, sport, SUV va biznes klassdagi ijaraga beriladigan mashinalarni ko‘rib chiqing. O‘zingizga mos avtomobilni narx va qulayliklar bilan solishtirib tanlang.',
  keywords: [
    'ijara mashinalar',
    'hashamatli mashinalar',
    'sport mashina ijarasi',
    'suv park',
    'premium mashina bron qilish',
    'mashinalar katalogi',
  ],
  openGraph: {
    title: 'Mashinalar | Renting Cars',
    description:
      'Kunlik narxlar, category filter va turli ehtiyojlar uchun mos premium avtomobillar parkini ko‘rib chiqing.',
    url: '/cars',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mashinalar | Renting Cars',
    description:
      'Filter, narx va to‘liq ma’lumotlar bilan premium mashinalarni ko‘rib chiqing.',
  },
  alternates: {
    canonical: '/cars',
  },
}

const CarsPage = async ({ searchParams }: CarsPageProps) => {
  const resolvedSearchParams = await searchParams
  const selectedCategory = getSingleValue(resolvedSearchParams.category)
  const selectedModel = getSingleValue(resolvedSearchParams.model)
  const currentPage = Math.max(1, Number.parseInt(getSingleValue(resolvedSearchParams.page) ?? '1', 10) || 1)

  const [cars, categories] = await Promise.all([
    getSupabaseRows<Cars>('cars').catch((error) => {
      console.error('CarsPage cars fetch error:', error)
      return []
    }),
    getSupabaseRows<Categories>('categories').catch((error) => {
      console.error('CarsPage categories fetch error:', error)
      return []
    }),
  ])

  const categoryMap = new Map(categories.map((category) => [category.id, category]))

  const filteredCars = cars.filter((car) => {
    const matchesCategory = selectedCategory ? car.category_id === selectedCategory : true
    const matchesModel = selectedModel
      ? car.id === selectedModel || car.model.toLowerCase() === selectedModel.toLowerCase()
      : true

    return matchesCategory && matchesModel
  })

  const currentCategory = selectedCategory ? categoryMap.get(selectedCategory) : null
  const pageTitle = currentCategory ? currentCategory.name : 'All Cars'
  const pageDescription = currentCategory
    ? `${currentCategory.name} kategoriyasiga tegishli mashinalar ro'yxati.`
    : 'Barcha mavjud mashinalarni ko‘rib chiqing va o‘zingizga mos variantni tanlang.'
  const totalPages = Math.max(1, Math.ceil(filteredCars.length / CARS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * CARS_PER_PAGE
  const paginatedCars = filteredCars.slice(startIndex, startIndex + CARS_PER_PAGE)

  return (
    <section className="w-full overflow-hidden bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className="">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
            Mashinalarni ko‘ring
          </p>
          <h1 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-none tracking-[-0.03em]">
            <span className="text-white">{pageTitle} </span>
            <span className="text-[#edb458]">avtoparki</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/64 sm:text-base sm:leading-7">
            {pageDescription}
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12">
            <Link
              href="/cars"
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                !selectedCategory
                  ? 'border-[#edb458] bg-[#edb458] text-[#1f1e1d]'
                  : 'border-white/12 text-white/72 hover:border-[#edb458] hover:text-[#edb458]'
              }`}
            >
              Barchasi
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={buildCarsHref({ category: category.id })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'border-[#edb458] bg-[#edb458] text-[#1f1e1d]'
                    : 'border-white/12 text-white/72 hover:border-[#edb458] hover:text-[#edb458]'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {filteredCars.length === 0 ? (
          <div className="rounded-[28px] border border-white/8 bg-[#252421] px-6 py-14 text-center">
            <h2 className="text-2xl font-bold text-white">Mashina topilmadi</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              Tanlangan category bo‘yicha hozircha mashina yo‘q. Boshqa category tanlab ko‘ring.
            </p>
            <Link
              href="/cars"
              className="mt-6 inline-flex rounded-full bg-[#edb458] px-5 py-3 text-sm font-bold text-[#1f1e1d] transition-colors duration-200 hover:bg-[#ddb04b]"
            >
              Barcha mashinalar
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedCars.map((car) => (
                <article
                  key={car.id}
                  className="overflow-hidden rounded-[28px] border border-white/8 bg-[#252421] shadow-[0_18px_48px_rgba(0,0,0,0.26)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[1.42/1] overflow-hidden">
                    <Image
                      src={car.images?.[0] || '/rentax.jpg'}
                      alt={car.model}
                      fill
                      sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 31vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.28)_100%)]" />
                  </div>

                  <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                    <div>
                      <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-[#edb458] uppercase">
                        {categoryMap.get(car.category_id)?.name || 'Category'}
                      </p>
                      <h2 className="line-clamp-1 text-2xl font-extrabold text-white sm:text-[32px]">
                        {car.model}
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/68">
                        <Spec label="O‘rindiq" value={String(car.seats ?? '-')} />
                        <Spec label="Eshik" value={String(car.doors ?? '-')} />
                        <Spec label="Uzatma" value={car.transmission || '-'} />
                        <Spec label="Yoqilg‘i" value={car.fuel_type || '-'} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={`/cars/${encodeURIComponent(car.id)}`}
                        className="inline-flex items-center rounded-full bg-[#edb458] px-5 py-2.5 text-sm font-bold text-[#1f1e1d] transition-colors duration-200 hover:bg-[#ddb04b]"
                      >
                        Batafsil
                      </Link>
                      <p className="shrink-0 text-right text-[#edb458]">
                        <span className="text-[30px] font-black leading-none">
                          ${formatPrice(car.price_per_day)}
                        </span>
                        <span className="text-base font-semibold text-white/80">/kun</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
                <Link
                  href={buildCarsHref({
                    category: selectedCategory,
                    model: selectedModel,
                    page: Math.max(1, safeCurrentPage - 1),
                  })}
                  aria-disabled={safeCurrentPage === 1}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    safeCurrentPage === 1
                      ? 'pointer-events-none border-white/8 text-white/30'
                      : 'border-white/12 text-white/72 hover:border-[#edb458] hover:text-[#edb458]'
                  }`}
                >
                  Oldingi
                </Link>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1

                  return (
                    <Link
                      key={page}
                      href={buildCarsHref({
                        category: selectedCategory,
                        model: selectedModel,
                        page,
                      })}
                      className={`flex h-11 min-w-[3.1rem] items-center justify-center rounded-[999px] border px-4 text-sm font-semibold transition-colors duration-200 ${
                        safeCurrentPage === page
                          ? 'border-[#edb458] bg-[#edb458] text-[#1f1e1d]'
                          : 'border-white/12 text-white/72 hover:border-[#edb458] hover:text-[#edb458]'
                      }`}
                    >
                      {page}
                    </Link>
                  )
                })}

                <Link
                  href={buildCarsHref({
                    category: selectedCategory,
                    model: selectedModel,
                    page: Math.min(totalPages, safeCurrentPage + 1),
                  })}
                  aria-disabled={safeCurrentPage === totalPages}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    safeCurrentPage === totalPages
                      ? 'pointer-events-none border-white/8 text-white/30'
                      : 'border-white/12 text-white/72 hover:border-[#edb458] hover:text-[#edb458]'
                  }`}
                >
                  Keyingi
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  )
}

const Spec = ({ label, value }: { label: string; value: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#edb458]" />
    <span className="text-white/48">{label}</span>
    <span className="font-medium text-white/80">{value}</span>
  </span>
)

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value ?? 0)
}

const getSingleValue = (value?: string | string[]) => {
  return Array.isArray(value) ? value[0] : value
}

const buildCarsHref = ({
  category,
  model,
  page,
}: {
  category?: string | null
  model?: string | null
  page?: number
}) => {
  const params = new URLSearchParams()

  if (category) {
    params.set('category', category)
  }

  if (model) {
    params.set('model', model)
  }

  if (page && page > 1) {
    params.set('page', String(page))
  }

  const query = params.toString()

  return query ? `/cars?${query}` : '/cars'
}

export default CarsPage
