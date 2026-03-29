'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useRef, useState } from 'react'
import Container from '../Container'
import type { Expert } from './experts.data'

type OurExpertsClientProps = {
  experts: Expert[]
}

const OurExpertsClient = ({ experts }: OurExpertsClientProps) => {
  const [activeId, setActiveId] = useState(experts[0].id)
  const activeExpert = experts.find((expert) => expert.id === activeId) ?? experts[0]
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragStartScrollLeft = useRef(0)
  const didDragRef = useRef(false)
  const suppressClickRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const scrollCards = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return
    }

    const amount = sliderRef.current.clientWidth * 0.88

    sliderRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return
    }

    dragStartX.current = event.clientX
    dragStartScrollLeft.current = sliderRef.current.scrollLeft
    didDragRef.current = false
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current || dragStartX.current === null) {
      return
    }

    const distance = event.clientX - dragStartX.current

    if (Math.abs(distance) > 6) {
      didDragRef.current = true
      setIsDragging(true)
    }

    sliderRef.current.scrollLeft = dragStartScrollLeft.current - distance
  }

  const handlePointerUp = () => {
    suppressClickRef.current = didDragRef.current
    dragStartX.current = null
    didDragRef.current = false
    setIsDragging(false)

    if (suppressClickRef.current) {
      setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }
  }

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!suppressClickRef.current) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <section className="overflow-hidden bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className="">
        <div className="mb-7 flex justify-center sm:mb-8">
          <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#edb458,transparent)]" />
        </div>

        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
            Ishonchli jamoa
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-none tracking-[-0.03em]">
            <span className="text-white">Bizning ekspertlar </span>
            <span className="text-[#edb458]">jamoasi</span>
          </h2>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#252421] text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              aria-label="Oldingi ekspertlar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#252421] text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              aria-label="Keyingi ekspertlar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            ref={sliderRef}
            className={`faq-scroll overflow-x-auto pb-2 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="flex gap-5">
              {experts.map((expert) => {
                const isActive = expert.id === activeExpert.id

                return (
                  <Link
                    key={expert.id}
                    href={`/about/experts/${expert.id}`}
                    onClick={handleCardClick}
                    onMouseEnter={() => setActiveId(expert.id)}
                    className={`group w-[78vw] shrink-0 overflow-hidden rounded-[28px] border text-left transition-all duration-300 sm:w-[46vw] lg:w-[calc((100%-20px)/3)] xl:w-[calc((100%-60px)/4)] 2xl:w-[calc((100%-80px)/5)] ${
                      isActive
                        ? 'border-[#edb458]/40 bg-[#2a2927] shadow-[0_18px_42px_rgba(0,0,0,0.24)]'
                        : 'border-white/8 bg-[#252421] hover:-translate-y-1 hover:border-[#edb458]/22'
                    }`}
                  >
                    <div className="relative aspect-[0.95/1] overflow-hidden">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        draggable={false}
                        className={`object-cover transition-transform duration-500 ${
                          isActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                        sizes="(max-width: 639px) 92vw, (max-width: 1535px) 30vw, 18vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.72)_100%)]" />
                    </div>

                    <div className="flex items-end justify-between gap-4 px-5 py-5">
                      <div className="min-w-0">
                        <h4 className="truncate text-xl font-bold text-white">{expert.name}</h4>
                        <p className="mt-1 truncate text-white/62">{expert.role}</p>
                      </div>

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? 'border-transparent bg-[#edb458] text-[#1f1e1d]'
                            : 'border-[#edb458]/45 text-[#edb458] group-hover:bg-[#edb458] group-hover:text-[#1f1e1d]'
                        }`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 8.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm1.25 8.5h-2.5v-1.5h.75v-4h-1V10h2.75v5.5h.75V17Z"
                            fill="currentColor"
                          />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default OurExpertsClient
