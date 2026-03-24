import { ReactNode } from 'react'
import { Categories } from '@/types/Categories'
import { Cars } from '@/types/Cars'

type HeroBookingBarProps = {
  cars: Cars[]
  categories: Categories[]
}

const HeroBookingBar = ({ cars, categories }: HeroBookingBarProps) => {
  const cities = [...new Set(cars.map((car) => car.city).filter(Boolean))]

  return (
    <div className="absolute bottom-5 left-0 right-0 z-30 px-4 sm:bottom-6 sm:px-6 lg:bottom-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/85 backdrop-blur-md xl:flex-row xl:items-stretch">
        <BookingField label="MASHINA TURI">
          <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-white outline-none">
            <option value="" style={{ color: '#000' }}>
              Turni tanlang
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} style={{ color: '#000' }}>
                {category.name}
              </option>
            ))}
          </select>
        </BookingField>

        <BookingField label="OLIB KETISH JOYI">
          <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-white outline-none">
            <option value="" style={{ color: '#000' }}>
              Manzilni tanlang
            </option>
            {cities.map((city) => (
              <option key={city} value={city} style={{ color: '#000' }}>
                {city}
              </option>
            ))}
          </select>
        </BookingField>

        <BookingField label="OLIB KETISH SANASI">
          <input type="date" className="scheme-dark w-full cursor-pointer bg-transparent text-sm font-semibold text-white outline-none" />
        </BookingField>

        <BookingField label="QAYTARISH JOYI">
          <select className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-white outline-none">
            <option value="" style={{ color: '#000' }}>
              Manzilni tanlang
            </option>
            {cities.map((city) => (
              <option key={city} value={city} style={{ color: '#000' }}>
                {city}
              </option>
            ))}
          </select>
        </BookingField>

        <BookingField label="QAYTARISH SANASI">
          <input type="date" className="scheme-dark w-full cursor-pointer bg-transparent text-sm font-semibold text-white outline-none" />
        </BookingField>

        <div className="flex items-center border-t border-white/10 px-5 py-4 xl:shrink-0 xl:border-t-0 xl:border-l xl:border-white/10">
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-r-2xl px-5 py-4 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95 xl:min-w-40  xl:px-7 xl:py-8"
            style={{ backgroundColor: '#edb458' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Qidirish
          </button>
        </div>
      </div>
    </div>
  )
}

const BookingField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="group flex w-full cursor-pointer flex-col justify-center border-b border-white/10 px-5 py-4 transition-colors duration-200 hover:bg-white/5 sm:px-6 xl:min-w-0 xl:flex-1 xl:border-r xl:border-b-0">
    <p className="mb-1.5 text-[9px] font-semibold tracking-widest text-white/40 uppercase transition-colors duration-200 group-hover:text-[#edb458]">
      {label}
    </p>
    {children}
  </div>
)

export default HeroBookingBar
