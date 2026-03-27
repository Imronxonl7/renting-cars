import Image from 'next/image'
import Link from 'next/link'
import { Cars } from '@/types/Cars'
import { formatPrice } from './carouselUtils'

type FleetCardProps = {
  car: Cars
  active: boolean
  mobile?: boolean
  onActivate: () => void
}

const FleetCard = ({
  car,
  active,
  mobile = false,
  onActivate,
}: FleetCardProps) => {
  const imageUrl = car.images?.[0] || '/rentax.jpg'

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border transition-[transform,opacity,filter,background-color,border-color,box-shadow] duration-820 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        active
          ? 'border-white/10 bg-[#2a2927] opacity-100 shadow-[0_30px_80px_rgba(0,0,0,0.28)] lg:scale-100'
          : 'border-white/6 bg-[#252421] opacity-40 shadow-none lg:scale-[0.92] hover:opacity-70'
      } ${
        mobile
          ? 'mx-auto w-full max-w-[22rem]'
          : 'w-full flex-1 basis-0 lg:min-h-[35rem] lg:max-w-none xl:min-h-[37rem]'
      }`}
    >
      <button
        type="button"
        onClick={onActivate}
        aria-label={`${car.model} mashinasini markazga olib kelish`}
        className="absolute inset-0 z-10 hidden lg:block"
      />

      <div className="relative aspect-[1.45/1] overflow-hidden lg:aspect-[1.34/1] xl:aspect-[1.3/1]">
        <Image
          src={imageUrl}
          alt={car.model}
          fill
          sizes="(max-width: 1023px) 92vw, (max-width: 1279px) 36vw, 420px"
          className={`object-cover transition-transform duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'scale-100' : 'scale-[1.06]'
          }`}
        />
        <div
          className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.28)_100%)] transition-opacity duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'opacity-100' : 'opacity-75'
          }`}
        />
      </div>

      <div className="flex flex-col gap-4 px-5 py-5 transition-opacity duration-760 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 sm:py-6">
        <div>
          <h3 className="line-clamp-1 text-2xl font-extrabold text-white sm:text-[32px]">
            {car.model}
          </h3>
          <div
            className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm transition-opacity duration-760 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active ? 'text-white/68 opacity-100' : 'text-white/54 opacity-80'
            }`}
          >
            <Spec label="Seats" value={String(car.seats ?? '-')} />
            <Spec label="Doors" value={String(car.doors ?? '-')} />
            <Spec label="Drive" value={car.transmission || '-'} />
            <Spec label="Fuel" value={car.fuel_type || '-'} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/cars?model=${encodeURIComponent(car.model)}`}
            className="inline-flex items-center rounded-full bg-[#edb458] px-5 py-2.5 text-sm font-bold text-[#1f1e1d] transition-colors duration-300 hover:bg-[#ddb04b]"
          >
            Details
          </Link>
          <p className="shrink-0 text-right text-[#edb458]">
            <span className="text-[30px] font-black leading-none">
              ${formatPrice(car.price_per_day)}
            </span>
            <span className="text-base font-semibold text-white/80">/day</span>
          </p>
        </div>
      </div>
    </article>
  )
}

const Spec = ({ label, value }: { label: string; value: string }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#edb458]" />
    <span className="text-white/48">{label}</span>
    <span className="font-medium text-white/80">{value}</span>
  </span>
)

export default FleetCard
