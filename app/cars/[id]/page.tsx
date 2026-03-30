import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CarBookingAction from '@/components/booking/CarBookingAction'
import Container from '@/components/Container'
import { getSupabaseRows } from '@/lib/supabase'
import type { Cars } from '@/types/Cars'
import type { Categories } from '@/types/Categories'
import CarDetailAccordion from './CarDetailAccordion'

type CarDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async ({ params }: CarDetailPageProps): Promise<Metadata> => {
  const { id } = await params
  const cars = await getSupabaseRows<Cars>('cars').catch(() => [])
  const car = cars.find((item) => item.id === id)

  if (!car) {
    return {
      title: 'Mashina Topilmadi',
    }
  }

  return {
    title: `${car.model} | Mashina`,
    description: car.description || `${car.model} uchun premium avto ijara sahifasi.`,
    openGraph: {
      title: `${car.model} | Renting Cars`,
      description:
        car.description || `${car.model} uchun premium avto ijara sahifasi.`,
      url: `/cars/${id}`,
      type: 'website',
      images: car.images?.[0] ? [car.images[0]] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.model} | Renting Cars`,
      description:
        car.description || `${car.model} uchun premium avto ijara sahifasi.`,
      images: car.images?.[0] ? [car.images[0]] : undefined,
    },
    alternates: {
      canonical: `/cars/${id}`,
    },
  }
}

const CarDetailPage = async ({ params }: CarDetailPageProps) => {
  const { id } = await params

  const [cars, categories] = await Promise.all([
    getSupabaseRows<Cars>('cars').catch((error) => {
      console.error('CarDetailPage cars fetch error:', error)
      return []
    }),
    getSupabaseRows<Categories>('categories').catch((error) => {
      console.error('CarDetailPage categories fetch error:', error)
      return []
    }),
  ])

  const car = cars.find((item) => item.id === id)

  if (!car) {
    notFound()
  }

  const categoryName = categories.find((category) => category.id === car.category_id)?.name || 'Luxury Cars'
  const heroImage = car.images?.[0] || '/rentax.jpg'
  const galleryImages = car.images?.length ? car.images : ['/rentax.jpg']

  const generalInfo = [
    '24/7 yo‘l yordami',
    'Bekor qilish va qaytarish imkoniyati',
    'Kelganda to‘lash mumkin',
  ]

  const rentalConditions = [
    {
      title: '1. Shartnoma va ilovalar',
      content:
        'Har bir ijara imzolangan shartnoma va mashinani topshirish dalolatnomasi bilan rasmiylashtiriladi. Olib ketishdan oldin avtomobil holati qayd qilinadi.',
    },
    {
      title: '2. Haydovchilik guvohnomasi va yosh',
      content:
        `Asosiy haydovchi kamida ${Math.max(21, car.year ? 25 : 21)} yoshda bo‘lishi va amaldagi haydovchilik guvohnomasiga ega bo‘lishi kerak. Zarur holatda qo‘shimcha hujjat so‘ralishi mumkin.`,
    },
    {
      title: '3. Narxlar',
      content:
        `Kunlik ijara narxi $${formatPrice(car.price_per_day)} dan boshlanadi. Haftalik va oylik narxlar muddat hamda xizmat turiga qarab kelishiladi.`,
    },
    {
      title: '4. To‘lov',
      content:
        `Ijara to‘lovi ijara vaqtida qabul qilinadi. Minimal ijara muddati ${car.min_rent_days || 1} kun. Ushbu avtomobil uchun depozit miqdori $${formatPrice(car.deposit)}.`,
    },
    {
      title: '5. Yetkazib berish',
      content:
        `Ushbu avtomobilni olib ketish shahri ${car.city || 'asosiy lokatsiyamiz'} hisoblanadi. Yetkazib berish xizmati jadval va manzilga qarab kelishiladi.`,
    },
    {
      title: '6. Jarimalar',
      content:
        'Ijara davomida yuzaga kelgan jarima, pullik yo‘l yoki parkovka to‘lovlari ijarachining zimmasida bo‘ladi va zarurat bo‘lsa depozitdan ushlab qolinadi.',
    },
  ]

  const specs = [
    { label: 'Eshiklar', value: String(car.doors ?? '-') },
    { label: 'Yo‘lovchilar', value: String(car.seats ?? '-') },
    { label: 'Uzatma', value: car.transmission || '-' },
    { label: 'Dvigatel', value: car.engine || '-' },
    { label: 'Yoqilg‘i turi', value: car.fuel_type || '-' },
    { label: 'Konditsioner', value: car.air_conditioning ? 'Bor' : 'Yo‘q' },
  ]

  const features = [
    car.bluetooth ? 'Bluetooth' : null,
    car.gps ? 'GPS navigatsiya' : null,
    car.parking_sensors ? 'Park sensorlari' : null,
    car.rear_camera ? 'Orqa kamera' : null,
    car.cruise_control ? 'Kruiz nazorati' : null,
  ].filter((feature): feature is string => Boolean(feature))

  return (
    <section className="bg-[#1a1917] text-white">
      <div className="relative min-h-[72svh] overflow-hidden">
        <Image
          src={heroImage}
          alt={car.model}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.52)_32%,rgba(26,25,23,0.95)_100%)]" />

        <Container className="relative flex min-h-[72svh] items-end pb-14 pt-32 sm:pb-16 lg:pt-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
              {categoryName}
            </p>
            <h1 className="text-[clamp(2.8rem,7vw,5.6rem)] font-black leading-none tracking-[-0.04em]">
              {car.model}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {car.description ||
                'Enjoy a premium car rental experience with top-tier comfort, impressive performance, and flexible rental conditions for city rides, business trips, or special occasions.'}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <CarBookingAction
                carId={car.id}
                carModel={car.model}
                pricePerDay={car.price_per_day}
                variant="hero"
              />
              <Link
                href="/cars"
                className="inline-flex items-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/88 transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                Mashinalarga qaytish
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pb-16 pt-12 sm:pb-20 lg:pb-24 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <section>
              <h2 className="text-3xl font-extrabold text-white">Umumiy ma’lumot</h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                Enjoy a premium car rental experience with top-notch services and flexible conditions.
              </p>

              <div className="mt-7 space-y-3">
                {generalInfo.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/82">
                    <span className="text-[#edb458]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {features.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-white">Mavjud qulayliklar</h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/8 bg-[#232220] px-4 py-2 text-sm text-white/72"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12">
                <h2 className="text-3xl font-extrabold text-white">Ijara shartlari</h2>
                <div className="mt-6">
                  <CarDetailAccordion items={rentalConditions} />
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-extrabold text-white">Galereya</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {galleryImages.slice(0, 6).map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative aspect-[1.28/1] overflow-hidden rounded-3xl border border-white/8 bg-[#232220]"
                    >
                      <Image
                        src={image}
                        alt={`${car.model} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 639px) 92vw, (max-width: 1279px) 46vw, 30vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside id="rent-now" className="lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-white/6 bg-[#232220] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-7">
              <div className="text-center">
                <p className="text-[2rem] font-black leading-none text-[#edb458]">
                  ${formatPrice(car.price_per_day)}
                  <span className="ml-2 text-lg font-semibold text-white">/ kunlik ijara</span>
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/62">{spec.label}</span>
                    <span className="text-right font-medium text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <CarBookingAction
                  carId={car.id}
                  carModel={car.model}
                  pricePerDay={car.price_per_day}
                />
                <p className="text-center text-sm leading-6 text-white/48">
                  Manzil: {car.city || 'So‘rov asosida'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value ?? 0)

export default CarDetailPage
