'use client'

import { Cars } from '@/types/Cars'
import FleetCard from './select-car-with-name/FleetCard'
import NavButton from './select-car-with-name/NavButton'
import {
  DESKTOP_CAROUSEL_EASING,
  MOBILE_CAROUSEL_EASING,
  getWrappedIndex,
} from './select-car-with-name/carouselUtils'
import { useFleetCarousel } from './select-car-with-name/useFleetCarousel'

type SelectCarWithNameClientProps = {
  cars: Cars[]
}

const SelectCarWithNameClient = ({ cars }: SelectCarWithNameClientProps) => {
  const featuredCars = cars.filter((car) => car.is_available).slice(0, 9)
  const fleet = featuredCars.length >= 3 ? featuredCars : cars.slice(0, 3)
  const fleetLength = Math.max(fleet.length, 1)

  const {
    activeIndex,
    dragOffset,
    isDragging,
    setActiveIndex,
    goPrev,
    goNext,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
  } = useFleetCarousel({ fleetLength })

  if (fleet.length === 0) {
    return null
  }

  const activeCar = fleet[getWrappedIndex(activeIndex, fleet.length)]
  const leftCar = fleet[getWrappedIndex(activeIndex - 1, fleet.length)]
  const rightCar = fleet[getWrappedIndex(activeIndex + 1, fleet.length)]
  const desktopCards = [leftCar, activeCar, rightCar]

  return (
    <div>
      <div
        className="hidden w-full cursor-grab items-center justify-center gap-4 touch-pan-y select-none lg:flex xl:gap-5"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        style={{
          transform: `translate3d(${dragOffset}px, 0, 0)`,
          transition: isDragging ? 'none' : `transform 760ms ${DESKTOP_CAROUSEL_EASING}`,
        }}
      >
        {desktopCards.map((car, index) => {
          const isActive = index === 1
          return (
            <FleetCard
              key={`${car.id}-${isActive ? 'active' : index}`}
              car={car}
              active={isActive}
              onActivate={() => setActiveIndex(fleet.findIndex((item) => item.id === car.id))}
            />
          )
        })}
      </div>

      <div
        className="cursor-grab touch-pan-y select-none lg:hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        style={{
          transform: `translate3d(${dragOffset * 0.35}px, 0, 0)`,
          transition: isDragging ? 'none' : `transform 680ms ${MOBILE_CAROUSEL_EASING}`,
        }}
      >
        <FleetCard car={activeCar} active mobile onActivate={() => undefined} />
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10">
        <NavButton direction="left" onClick={goPrev} />
        <div className="flex items-center gap-2">
          {fleet.map((car, index) => (
            <button
              key={car.id}
              type="button"
              aria-label={`${car.model} mashinasini tanlash`}
              aria-current={index === getWrappedIndex(activeIndex, fleet.length) ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === getWrappedIndex(activeIndex, fleet.length)
                  ? 'h-2 w-8 bg-[#edb458]'
                  : 'h-2 w-2 bg-white/20 hover:bg-white/45'
              }`}
            />
          ))}
        </div>
        <NavButton direction="right" onClick={goNext} />
      </div>
    </div>
  )
}

export default SelectCarWithNameClient
