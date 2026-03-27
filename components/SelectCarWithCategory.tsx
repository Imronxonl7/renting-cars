'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Car {
  id: number
  category: string
  tagline: string
  accentTextClass: string
  accentBorderClass: string
  accentStripClass: string
  bgClass: string
  image: string
  featured?: boolean
}

const cars: Car[] = [
  {
    id: 1,
    category: 'Convertible',
    tagline: 'Open-air elegance',
    accentTextClass: 'text-[#C8922A]',
    accentBorderClass: 'border-[#C8922A]/50',
    accentStripClass: 'bg-[linear-gradient(90deg,transparent,#C8922A,transparent)]',
    bgClass: 'bg-[linear-gradient(135deg,#1a1209_0%,#0d0d0d_100%)]',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  },
  {
    id: 2,
    category: 'Sport Cars',
    tagline: 'Track-bred ferocity',
    accentTextClass: 'text-[#D4A017]',
    accentBorderClass: 'border-[#D4A017]/50',
    accentStripClass: 'bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]',
    bgClass: 'bg-[linear-gradient(135deg,#1c1500_0%,#0d0d0d_100%)]',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&q=80',
  },
  {
    id: 3,
    category: 'Luxury Cars',
    tagline: 'Refined supremacy',
    accentTextClass: 'text-[#A89060]',
    accentBorderClass: 'border-[#A89060]/50',
    accentStripClass: 'bg-[linear-gradient(90deg,transparent,#A89060,transparent)]',
    bgClass: 'bg-[linear-gradient(135deg,#0f0f0f_0%,#0d0d0d_100%)]',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  },
]

export default function CarFleetSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0d] px-6 py-20">
      <div className="mb-10 flex justify-center">
        <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#C8922A,transparent)]" />
      </div>

      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#C8922A] uppercase">
          · Select Your Car ·
        </p>
        <h2 className="text-4xl font-black tracking-[-0.02em] md:text-5xl">
          <span className="text-white">Luxury </span>
          <span className="text-[#C8922A]">Car Fleet</span>
        </h2>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4">
        {cars.map((car) => {
          const hovered = hoveredId === car.id

          return (
            <div
              key={car.id}
              className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ${car.bgClass} ${
                car.featured ? 'z-10 min-h-80 flex-[1.35] scale-105' : 'min-h-70 flex-1'
              } ${
                hovered && !car.featured ? 'scale-[1.02]' : ''
              } ${
                hovered || car.featured
                  ? 'shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
                  : 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              }`}
              onMouseEnter={() => setHoveredId(car.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Image
                width={400}
                height={400}
                src={car.image}
                alt={car.category}
                className={`absolute inset-0 h-full w-full object-cover brightness-[0.52] saturate-110 transition-transform duration-700 ${
                  hovered ? 'scale-[1.08]' : 'scale-100'
                }`}
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.1)_60%)]" />

              {(hovered || car.featured) && (
                <div className={`pointer-events-none absolute inset-0 rounded-2xl border ${car.accentBorderClass}`} />
              )}

              <div className="absolute top-5 left-5">
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {car.category}
                </span>
              </div>

              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between">
                <p className={`text-xs font-medium tracking-widest uppercase ${car.accentTextClass} ${hovered ? 'opacity-100' : 'opacity-60'}`}>
                  {car.tagline}
                </p>
                <button
                  type="button"
                  aria-label={`${car.category} kategoriyasini ko'rish`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-current backdrop-blur-sm transition-all duration-300 ${car.accentTextClass} ${
                    car.featured || hovered ? 'rotate-0 bg-current text-[#0d0d0d]' : '-rotate-45 bg-white/10'
                  }`}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {car.featured && (
                <div className={`absolute right-0 bottom-0 left-0 h-0.5 ${car.accentStripClass}`} />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
