import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
    '24/7 Roadside Assistance',
    'Free Cancellation & Return',
    'Pay at Arrival',
  ]

  const rentalConditions = [
    {
      title: '1. Contract and Annexes',
      content:
        'Every rental is completed with a signed agreement and vehicle handover checklist. We document the vehicle condition before pickup so both sides have a clear record.',
    },
    {
      title: '2. Driving License and Age',
      content:
        `The primary driver should be at least ${Math.max(21, car.year ? 25 : 21)} years old and hold a valid driving license. International guests may be asked to provide a passport or additional ID at pickup.`,
    },
    {
      title: '3. Prices',
      content:
        `Daily rental starts from $${formatPrice(car.price_per_day)}. Weekly and monthly pricing can be discussed depending on duration, season, and delivery preferences.`,
    },
    {
      title: '4. Payments',
      content:
        `The total rental fee is collected at the time of rental. Minimum rental period is ${car.min_rent_days || 1} day. Deposit amount for this vehicle is $${formatPrice(car.deposit)}.`,
    },
    {
      title: '5. Delivery',
      content:
        `Pickup city for this car is ${car.city || 'our main location'}. Delivery options can be arranged depending on schedule and destination.`,
    },
    {
      title: '6. Traffic Fines',
      content:
        'Any fines, toll charges, or parking penalties incurred during the rental period are the responsibility of the renter and may be deducted from the deposit if unpaid.',
    },
  ]

  const specs = [
    { label: 'Doors', value: String(car.doors ?? '-') },
    { label: 'Passengers', value: String(car.seats ?? '-') },
    { label: 'Transmission', value: car.transmission || '-' },
    { label: 'Engine', value: car.engine || '-' },
    { label: 'Fuel Type', value: car.fuel_type || '-' },
    { label: 'Air Condition', value: car.air_conditioning ? 'Yes' : 'No' },
  ]

  const features = [
    car.bluetooth ? 'Bluetooth' : null,
    car.gps ? 'GPS Navigation' : null,
    car.parking_sensors ? 'Parking Sensors' : null,
    car.rear_camera ? 'Rear Camera' : null,
    car.cruise_control ? 'Cruise Control' : null,
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
              <Link
                href="#rent-now"
                className="inline-flex items-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1a1917] transition-colors hover:bg-[#ddb04b]"
              >
                Rent Now
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center rounded-full border border-white/14 px-6 py-3 text-sm font-semibold text-white/88 transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                Back to Cars
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pb-16 pt-12 sm:pb-20 lg:pb-24 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <section>
              <h2 className="text-3xl font-extrabold text-white">General Information</h2>
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
                  <h3 className="text-xl font-bold text-white">Included Features</h3>
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
                <h2 className="text-3xl font-extrabold text-white">Rental Conditions</h2>
                <div className="mt-6">
                  <CarDetailAccordion items={rentalConditions} />
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-extrabold text-white">Gallery</h2>
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
                  <span className="ml-2 text-lg font-semibold text-white">/ Rent Per Day</span>
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
                <Link
                  href={`/cars?model=${encodeURIComponent(car.id)}`}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#edb458] px-5 py-4 text-lg font-semibold text-[#1a1917] transition-colors hover:bg-[#ddb04b]"
                >
                  Rent Now
                </Link>
                <p className="text-center text-sm leading-6 text-white/48">
                  Location: {car.city || 'Available on request'}
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
