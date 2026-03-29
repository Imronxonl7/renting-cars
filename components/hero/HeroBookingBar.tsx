import BookingBar from '@/components/booking/BookingBar'
import { Categories } from '@/types/Categories'
import { Cars } from '@/types/Cars'

type HeroBookingBarProps = {
  cars: Cars[]
  categories: Categories[]
}

const HeroBookingBar = ({ cars, categories }: HeroBookingBarProps) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-50 hidden px-4 sm:bottom-5 sm:px-6 md:block lg:bottom-6">
      <BookingBar
        cars={cars}
        categories={categories}
        labels={{
          category: 'Mashina turi',
          pickupCity: 'Olib ketish joyi',
          pickupDate: 'Olib ketish sanasi',
          returnCity: 'Qaytarish joyi',
          returnDate: 'Qaytarish sanasi',
          submit: 'Qidirish',
        }}
        className="mx-auto flex max-w-6xl flex-col overflow-visible rounded-2xl border border-white/10 bg-zinc-900/85 backdrop-blur-md md:flex-row md:items-stretch"
        submitClassName="md:rounded-r-[14px] md:rounded-l-none"
      />
    </div>
  )
}

export default HeroBookingBar
