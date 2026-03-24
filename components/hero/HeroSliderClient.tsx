"use client"

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
  const [animating, setAnimating] = useState(false)
  const [textVisible, setTextVisible] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const restartTextAnimation = () => {
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current)
    setTextVisible(false)
    textTimeoutRef.current = setTimeout(() => setTextVisible(true), 120)
  }

  const goTo = (index: number) => {
    if (animating || index === currentIndex) return
    restartTextAnimation()
    setPrevIndex(currentIndex)
    setAnimating(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (cars.length === 0) return

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cars.length
      restartTextAnimation()
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
    }, 700)

    return () => clearTimeout(timeoutId)
  }, [animating])

  const current = cars[currentIndex]
  const prev = prevIndex !== null ? cars[prevIndex] : null

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-220 sm:min-h-235 lg:min-h-245 xl:min-h-screen">
      <div className="absolute inset-0">
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
          className={`absolute inset-0 z-20 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        >
          <HeroSlideMedia car={current} />
          <div className="absolute inset-0 z-10 bg-black/50" />
        </div>

        <div className="absolute inset-0 z-30 flex flex-col justify-start pt-32 sm:pt-36 lg:pt-40 xl:pt-44">
          <Container className="">
            <div className="max-w-2xl xl:max-w-3xl">
              <Anim visible={textVisible} delay={0}>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#edb458] uppercase">
                  <span className="h-px w-6 bg-[#edb458]" />
                  PREMIUM
                </p>
              </Anim>

              <Anim visible={textVisible} delay={60}>
                <h1
                  className="mb-2 text-white line-clamp-1 font-black leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
                >
                  {current.model}
                </h1>
              </Anim>

              <Anim visible={textVisible} delay={120}>
                <p className="mb-4 flex flex-wrap items-center gap-x-3 text-lg font-medium text-[#edb458]">
                  {current.transmission && <span>{current.transmission}</span>}
                  {current.transmission && current.fuel_type && (
                    <span className="text-[#edb458]/40">·</span>
                  )}
                  {current.fuel_type && <span>{current.fuel_type}</span>}
                  {current.horsepower && (
                    <>
                      <span className="text-[#edb458]/40">·</span>
                      <span>{current.horsepower} HP</span>
                    </>
                  )}
                </p>
              </Anim>

              <Anim visible={textVisible} delay={180}>
                <p className="mb-5 max-w-lg text-sm leading-relaxed text-white/60 line-clamp-3 sm:text-base sm:leading-8">
                  {current.description}
                </p>
              </Anim>

              <Anim visible={textVisible} delay={300}>
                <div className="mb-6 flex flex-wrap gap-3">
                  <button
                    className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: '#edb458' }}
                  >
                    Ijaraga olish <ArrowIcon />
                  </button>
                  <button className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:border-[#edb458] hover:text-[#edb458] active:scale-95">
                    Batafsil <ArrowIcon />
                  </button>
                </div>
              </Anim>

              <Anim visible={textVisible} delay={360}>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {current.seats && (
                    <HeroMiniSpec icon="seat" label="O'rindiqlar" value={`${current.seats} ta`} />
                  )}
                  {current.fuel_type && (
                    <HeroMiniSpec icon="fuel" label="Yoqilg'i" value={current.fuel_type} />
                  )}
                  {current.transmission && (
                    <HeroMiniSpec icon="gear" label="Uzatma" value={current.transmission} />
                  )}
                </div>
              </Anim>
            </div>
          </Container>
        </div>

        <ArrowBtn onClick={() => goTo((currentIndex - 1 + cars.length) % cars.length)} dir="left" />
        <ArrowBtn onClick={() => goTo((currentIndex + 1) % cars.length)} dir="right" />

        <div className="absolute bottom-52 left-0 right-0 z-30 px-5 sm:bottom-48 lg:bottom-44 xl:bottom-40">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 xl:justify-between">
            <div className="hidden w-16 xl:block" />
            <div className="flex max-w-[70vw] items-center gap-1.5 overflow-hidden">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
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
}: {
  children: ReactNode
  visible: boolean
  delay: number
}) => (
  <div
    style={{
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.65s ease, opacity 0.65s ease',
      transitionDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
)

const ArrowBtn = ({ onClick, dir }: { onClick: () => void; dir: 'left' | 'right' }) => (
  <button
    onClick={onClick}
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
