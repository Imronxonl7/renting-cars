"use client"

import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Container from '../Container'
import HeroBookingBar from './HeroBookingBar'
import HeroMiniSpec from './HeroMiniSpec'
import HeroSlideMedia from './HeroSlideMedia'
import { Cars } from '@/types/Cars'
import { Categories } from '@/types/Categories'

const SLIDE_DURATION_MS = 30000 

type HeroSliderClientProps = {
  cars: Cars[]
  categories: Categories[]
}

const HeroSliderClient = ({ cars, categories }: HeroSliderClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [textIndex, setTextIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [textVisible, setTextVisible] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const transitionTextTo = (index: number) => {
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current)
    setTextVisible(false)
    textTimeoutRef.current = setTimeout(() => {
      setTextIndex(index)
      setTextVisible(true)
    }, 220)
  }

  const goTo = (index: number) => {
    if (animating || index === currentIndex) return
    transitionTextTo(index)
    setPrevIndex(currentIndex)
    setAnimating(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (cars.length === 0) return

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cars.length
      transitionTextTo(nextIndex)
      setPrevIndex(currentIndex)
      setAnimating(true)
      setCurrentIndex(nextIndex)
    }, SLIDE_DURATION_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [cars.length, currentIndex])

  useEffect(() => {
    return () => {
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!animating) return

    const timeoutId = setTimeout(() => {
      setPrevIndex(null)
      setAnimating(false)
    }, 900)

    return () => clearTimeout(timeoutId)
  }, [animating])

  const current = cars[currentIndex]
  const prev = prevIndex !== null ? cars[prevIndex] : null
  const currentTextCar = cars[textIndex] ?? current
  const currentCategory =
    categories.find((category) => category.id === currentTextCar.category_id)?.name || 'Luxury'

  return (
    <section className="relative z-20 w-full overflow-x-hidden overflow-y-visible bg-black min-h-180 sm:min-h-190 lg:min-h-215 xl:min-h-225 2xl:min-h-245">
      <div className="absolute inset-0 overflow-visible">
        {prev && (
          <div
            key={`prev-${prevIndex}`}
            className="absolute inset-0 z-10 opacity-0 transition-opacity duration-700"
          >
            <HeroSlideMedia car={prev} />
          </div>
        )}

        <div
          key={`current-${currentIndex}`}
          className={`absolute inset-0 z-20 transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${animating ? 'opacity-0' : 'opacity-100'}`}
        >
          <HeroSlideMedia car={current} />
          <div className="absolute inset-0 z-10 bg-black/50" />
        </div>

        <div className="absolute inset-0 z-30 flex flex-col justify-start pt-22 sm:pt-24 md:pt-28 lg:pt-24 xl:pt-26 2xl:pt-30">
          <Container className="">
            <div className="max-w-xl sm:max-w-2xl xl:max-w-3xl">
              <Anim visible={textVisible} delay={0}>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#edb458] uppercase">
                  <span className="h-px w-6 bg-[#edb458]" />
                  {currentCategory}
                </p>
              </Anim>

              <Anim visible={textVisible} delay={60} variant="drop">
                <h1
                  className="mb-2 line-clamp-2 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.95] text-white"
                >
                  {currentTextCar.model}
                </h1>
              </Anim>

              <Anim visible={textVisible} delay={120} variant="rise">
                <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#edb458] sm:text-base lg:text-lg">
                  {currentTextCar.transmission && <span>{currentTextCar.transmission}</span>}
                  {currentTextCar.transmission && currentTextCar.fuel_type && (
                    <span className="text-[#edb458]/40">·</span>
                  )}
                  {currentTextCar.fuel_type && <span>{currentTextCar.fuel_type}</span>}
                  {currentTextCar.horsepower && (
                    <>
                      <span className="text-[#edb458]/40">·</span>
                      <span>{currentTextCar.horsepower} HP</span>
                    </>
                  )}
                </p>
              </Anim>

              <Anim visible={textVisible} delay={180} variant="rise">
                <p className="mb-5 max-w-md text-sm leading-6 text-white/60 line-clamp-3 sm:max-w-lg sm:text-base sm:leading-7">
                  {currentTextCar.description}
                </p>
              </Anim>

              <Anim visible={textVisible} delay={300} variant="rise-soft">
                <div className="mb-5 flex flex-wrap gap-3 lg:mb-6">
                  <Link
                    href={`/cars/${encodeURIComponent(currentTextCar.id)}#rent-now`}
                    className="flex items-center gap-2 cursor-pointer rounded-full bg-[#edb458] hover:bg-white hover:text-[#edb458] px-5 py-3 text-sm font-bold text-black transition-all duration-300 hover:brightness-110 active:scale-95 sm:px-6"
                  >
                    Ijaraga olish <ArrowIcon />
                  </Link>
                  <Link
                    href={`/cars/${encodeURIComponent(currentTextCar.id)}`}
                    className="flex items-center cursor-pointer gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#edb458] hover:text-black active:scale-95 sm:px-6"
                  >
                    Batafsil <ArrowIcon />
                  </Link>
                </div>
              </Anim>

              <Anim visible={textVisible} delay={360} variant="rise-soft">
                <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-6">
                  {currentTextCar.seats && (
                    <HeroMiniSpec icon="seat" label="O'rindiqlar" value={`${currentTextCar.seats} ta`} />
                  )}
                  {currentTextCar.fuel_type && (
                    <HeroMiniSpec icon="fuel" label="Yoqilg'i" value={currentTextCar.fuel_type} />
                  )}
                  {currentTextCar.transmission && (
                    <HeroMiniSpec icon="gear" label="Uzatma" value={currentTextCar.transmission} />
                  )}
                </div>
              </Anim>
            </div>
          </Container>
        </div>

        <ArrowBtn onClick={() => goTo((currentIndex - 1 + cars.length) % cars.length)} dir="left" />
        <ArrowBtn onClick={() => goTo((currentIndex + 1) % cars.length)} dir="right" />

        <div className="absolute bottom-38 left-0 right-0 z-30 px-4 sm:bottom-42 sm:px-5 lg:bottom-46 xl:bottom-44">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 lg:gap-4 xl:justify-between">
            <div className="hidden w-16 xl:block" />
            <div className="flex max-w-[62vw] items-center gap-1.5 overflow-hidden sm:max-w-[66vw] lg:max-w-[70vw]">
              {cars.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`${index + 1}-slaydga o'tish`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'h-1.5 w-5 bg-[#edb458]'
                      : 'h-1.5 w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <span className="shrink-0 font-mono text-xs text-white/40">
              {String(currentIndex + 1).padStart(2, '0')} / {String(cars.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <HeroBookingBar cars={cars} categories={categories} />
      </div>
    </section>
  )
}

const Anim = ({
  children,
  visible,
  delay,
  variant = 'slide-left',
}: {
  children: ReactNode
  visible: boolean
  delay: number
  variant?: 'slide-left' | 'drop' | 'rise' | 'rise-soft'
}) => (
  <div
    className={`${visible ? 'translate-x-0 translate-y-0 opacity-100 blur-0' : hiddenStateClassName(variant)} transition-[transform,opacity,filter] duration-980 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${delayClassName(delay)}`}
  >
    {children}
  </div>
)

const hiddenStateClassName = (variant: 'slide-left' | 'drop' | 'rise' | 'rise-soft') => {
  switch (variant) {
    case 'drop':
      return '-translate-y-3 opacity-0 blur-[2px]'
    case 'rise':
      return 'translate-y-3 opacity-0 blur-[2px]'
    case 'rise-soft':
      return 'translate-y-2 opacity-0 blur-[1px]'
    default:
      return '-translate-x-3 opacity-0 blur-[2px]'
  }
}

const delayClassName = (delay: number) => {
  switch (delay) {
    case 0:
      return 'delay-0'
    case 60:
      return '[transition-delay:60ms]'
    case 120:
      return '[transition-delay:120ms]'
    case 180:
      return '[transition-delay:180ms]'
    case 300:
      return '[transition-delay:300ms]'
    case 360:
      return '[transition-delay:360ms]'
    default:
      return ''
  }
}

const ArrowBtn = ({ onClick, dir }: { onClick: () => void; dir: 'left' | 'right' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={dir === 'left' ? 'Oldingi slayd' : 'Keyingi slayd'}
    className={`absolute ${dir === 'left' ? 'left-4 sm:left-5 lg:left-7' : 'right-4 sm:right-5 lg:right-7'} top-[54%] z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:border-[#edb458] hover:text-[#edb458] md:flex xl:h-12 xl:w-12`}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  </button>
)

const ArrowIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

export default HeroSliderClient
