'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import Container from '../Container'
import type { Expert } from '../about/experts.data'

type TeamsGridClientProps = {
  experts: Expert[]
}

const TeamsGridClient = ({ experts }: TeamsGridClientProps) => {
  const [activeId, setActiveId] = useState(experts[0]?.id ?? '')
  const [activeTab, setActiveTab] = useState<'biography' | 'education' | 'awards'>('biography')
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragStartScrollLeft = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const activeExpert = useMemo(
    () => experts.find((expert) => expert.id === activeId) ?? experts[0],
    [activeId, experts]
  )

  const scrollCards = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return
    }

    const amount = sliderRef.current.clientWidth * 0.92

    sliderRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const tabContent = {
    biography: activeExpert.bio,
    education: activeExpert.education,
    awards: activeExpert.awards,
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartX.current = event.clientX
    dragStartScrollLeft.current = sliderRef.current.scrollLeft
    setIsDragging(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!sliderRef.current || dragStartX.current === null) {
      return
    }

    const distance = event.clientX - dragStartX.current
    sliderRef.current.scrollLeft = dragStartScrollLeft.current - distance
  }

  const handlePointerUp = () => {
    dragStartX.current = null
    setIsDragging(false)
  }

  return (
    <section className="overflow-hidden bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className="">
        <div className="mb-7 flex justify-center sm:mb-8">
          <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#edb458,transparent)]" />
        </div>

        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
            Certified Team
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-none tracking-[-0.03em]">
            <span className="text-white">Meet Our </span>
            <span className="text-[#edb458]">Experts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Booking strategy, VIP service, client experience, and fleet quality bo&apos;yicha ishlaydigan
            asosiy jamoamiz bilan tanishing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1fr)] lg:items-start xl:gap-10">
          <div>
            <div className="overflow-hidden rounded-[34px] border border-white/8 bg-[#252421] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:p-6">
              <div className="relative aspect-[0.9/1] overflow-hidden rounded-[28px]">
                <Image
                  src={activeExpert.image}
                  alt={activeExpert.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 92vw, 34vw"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {['facebook', 'x', 'instagram', 'tiktok'].map((social) => (
                <button
                  key={social}
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#edb458]/35 text-[#edb458] transition-colors hover:bg-[#edb458] hover:text-[#1f1e1d]"
                  aria-label={social}
                >
                  <span className="text-sm font-bold uppercase">
                    {social === 'instagram' ? 'ig' : social === 'facebook' ? 'f' : social === 'tiktok' ? 'tk' : 'x'}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm text-white/56">
              My e-mail address:{' '}
              <a href={`mailto:${activeExpert.email}`} className="text-white underline underline-offset-4">
                {activeExpert.email}
              </a>
            </p>
          </div>

          <div className="pt-2">
            <h3 className="max-w-3xl text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
              Hello, I&apos;m {activeExpert.name}. I work as your {activeExpert.role.toLowerCase()} at
              Drivora Luxury Car Rental.
            </h3>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/58 sm:text-base">
              {activeExpert.quote} We focus on reliable booking support, premium client experience,
              and smooth communication from the first request to final handover.
            </p>

            <div className="mt-8 space-y-4">
              {activeExpert.credentials.map((item) => (
                <div key={item} className="flex items-center gap-4 text-white/78">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b2926] text-[#edb458]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 12 4 4L19 6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-b border-[#edb458]/25 pb-4">
              {(['biography', 'education', 'awards'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold transition-colors ${
                    activeTab === tab ? 'text-[#edb458]' : 'text-white/82 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/58 sm:text-base">
              {tabContent[activeTab]}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#252421] text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              aria-label="Previous team members"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#252421] text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              aria-label="Next team members"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                const isActive = activeExpert.id === expert.id

                return (
                  <Link
                    key={expert.id}
                    href={`/teams/${expert.id}`}
                    onMouseEnter={() => setActiveId(expert.id)}
                    className={`group w-[82vw] shrink-0 overflow-hidden rounded-[28px] border text-left transition-all duration-300 sm:w-[46vw] lg:w-[calc((100%-40px)/3)] ${
                      isActive
                        ? 'border-[#edb458]/40 bg-[#2a2927] shadow-[0_18px_42px_rgba(0,0,0,0.24)]'
                        : 'border-white/8 bg-[#252421] hover:-translate-y-1 hover:border-[#edb458]/22'
                    }`}
                  >
                    <div className="relative aspect-[0.92/1] overflow-hidden">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          isActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.74)_100%)]" />
                    </div>

                    <div className="flex items-end justify-between gap-4 px-5 py-5">
                      <div className="min-w-0">
                        <h3 className="truncate text-2xl font-extrabold text-white">{expert.name}</h3>
                        <p className="mt-1 truncate text-white/64">{expert.role}</p>
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

export default TeamsGridClient
