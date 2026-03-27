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
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 pt-16 pb-24 text-center">
        <span className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#edb458] uppercase">
          - RENT NOW
        </span>

        <h1 className="mb-14 text-4xl font-bold text-white md:text-5xl">
          Book Auto Rental
        </h1>

        <BookingBar
          cars={bookingData.cars}
          categories={bookingData.categories}
          labels={{
            category: 'Choose Car Type',
            pickupCity: 'Pick Up Location',
            pickupDate: 'Pick Up Date',
            returnCity: 'Drop Off Location',
            returnDate: 'Return Date',
            submit: 'Search',
          }}
          className="flex w-full max-w-6xl flex-col overflow-visible rounded-2xl border border-white/10 bg-[#111111]/90 backdrop-blur-sm md:flex-row md:items-stretch"
          showSubmitButton={false}
        />
      </div>
    </section>
  )
}

export default RentNow
