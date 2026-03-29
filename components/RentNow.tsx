import Image from 'next/image'
import Audi from '../public/audi.jpg'
import BookingBar from './booking/BookingBar'
import { Cars } from '@/types/Cars'
import { Categories } from '@/types/Categories'
import { getSupabaseRows } from '@/lib/supabase'

const RentNow = async () => {
  const bookingData = await Promise.all([
    getSupabaseRows<Cars>('cars'),
    getSupabaseRows<Categories>('categories'),
  ])
    .then(([cars, categories]) => ({ cars, categories }))
    .catch((error) => {
      console.error('RentNow fetch error:', error)
      return null
    })

  if (!bookingData) {
    return null
  }

  return (
    <section className="relative flex min-h-140 w-full flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={Audi}
          alt="Ijara bo‘limi foni"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 pt-16 pb-24 text-center">
        <span className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#edb458] uppercase">
          - HOZIR IJARAGA OLING
        </span>

        <h1 className="mb-14 text-4xl font-bold text-white md:text-5xl">
          Avto ijarani bron qiling
        </h1>

        <BookingBar
          cars={bookingData.cars}
          categories={bookingData.categories}
          labels={{
            category: 'Mashina turi',
            pickupCity: 'Olib ketish joyi',
            pickupDate: 'Olib ketish sanasi',
            returnCity: 'Qaytarish joyi',
            returnDate: 'Qaytarish sanasi',
            submit: 'Qidirish',
          }}
          className="flex w-full max-w-6xl flex-col overflow-visible rounded-2xl border border-white/10 bg-[#111111]/90 backdrop-blur-sm md:flex-row md:items-stretch"
          showSubmitButton={false}
        />
      </div>
    </section>
  )
}

export default RentNow
