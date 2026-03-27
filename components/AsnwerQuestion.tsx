'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
  avatar: string
  accentClass: string
  accentGlowClass: string
  accentBorderClass: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Absolutely seamless from start to finish. The sport car arrived immaculate and the whole experience felt premium.',
    name: 'Emily Martin',
    role: 'Business Executive',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
    accentClass: 'text-[#C8922A]',
    accentGlowClass: 'shadow-[0_0_60px_rgba(200,146,42,0.10),0_25px_50px_rgba(0,0,0,0.5)]',
    accentBorderClass: 'border-[#C8922A]',
  },
  {
    quote:
      "I've tried half a dozen luxury rental services and none came close to this level of quality and support.",
    name: 'Olivia Brown',
    role: 'Frequent Traveler',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
    accentClass: 'text-[#D4A017]',
    accentGlowClass: 'shadow-[0_0_60px_rgba(212,160,23,0.10),0_25px_50px_rgba(0,0,0,0.5)]',
    accentBorderClass: 'border-[#D4A017]',
  },
  {
    quote:
      'Used the annual plan for months and the dedicated account manager has saved me a lot of time every week.',
    name: 'Marcus Chen',
    role: 'Entrepreneur',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=33',
    accentClass: 'text-[#B8841E]',
    accentGlowClass: 'shadow-[0_0_60px_rgba(184,132,30,0.10),0_25px_50px_rgba(0,0,0,0.5)]',
    accentBorderClass: 'border-[#B8841E]',
  },
]

export default function TestimonialsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0d] px-6 py-20">
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,146,42,0.75)_0%,transparent_70%)] opacity-[0.04] blur-2xl" />

      <div className="mb-10 flex justify-center">
        <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#C8922A,transparent)]" />
      </div>

      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#C8922A] uppercase">
          · Testimonials ·
        </p>
        <h2 className="text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
          What Clients <span className="text-[#C8922A]">Say</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const hovered = hoveredIndex === index

          return (
            <div
              key={testimonial.name}
              className={`relative flex min-h-70 flex-col justify-between overflow-hidden rounded-2xl p-8 transition-all duration-500 ${
                hovered
                  ? `-translate-y-1.25 border border-[#C8922A33] bg-[linear-gradient(145deg,#1d190d_0%,#161616_100%)] ${testimonial.accentGlowClass}`
                  : 'border border-white/5 bg-[linear-gradient(145deg,#151515_0%,#111111_100%)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute top-0 left-10 right-10 h-px transition-all duration-500 ${
                  hovered ? 'bg-[linear-gradient(90deg,transparent,#C8922A,transparent)]' : 'bg-transparent'
                }`}
              />

              <div>
                <div className="mb-6 flex items-start justify-between">
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className={`${testimonial.accentClass} opacity-60`}>
                    <path
                      d="M0 22V13.4C0 9.667.933 6.6 2.8 4.2 4.667 1.8 7.4.333 11 0L12.4 2.2C10.2 2.733 8.5 3.733 7.3 5.2 6.1 6.667 5.467 8.4 5.4 10.4H10V22H0ZM16 22V13.4C16 9.667 16.933 6.6 18.8 4.2 20.667 1.8 23.4.333 27 0L28.4 2.2C26.2 2.733 24.5 3.733 23.3 5.2 22.1 6.667 21.467 8.4 21.4 10.4H26V22H16Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <svg key={starIndex} width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.81l-3.09 1.645.59-3.41L2 4.635l3.455-.545L7 1z"
                          fill="#C8922A"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className={`mb-7 flex-1 text-sm leading-relaxed italic ${hovered ? 'text-[#c8c8c8]' : 'text-[#909090]'}`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className={`mb-6 h-px w-full ${hovered ? 'bg-[#C8922A20]' : 'bg-white/5'}`} />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Image
                    width={400}
                    height={400}
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className={`h-11 w-11 rounded-full border-2 object-cover transition-colors duration-300 ${hovered ? testimonial.accentBorderClass : 'border-[#333]'}`}
                  />
                  {hovered && (
                    <div className={`pointer-events-none absolute inset-0 rounded-full ${testimonial.accentGlowClass}`} />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-bold ${hovered ? testimonial.accentClass : 'text-[#e0e0e0]'}`}>
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#555]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="mb-4 text-xs tracking-widest text-[#555] uppercase">
          Join 2,400+ satisfied clients
        </p>
        <button className="rounded-full bg-[linear-gradient(135deg,#C8922A,#D4A017)] px-8 py-3 text-sm font-bold tracking-widest text-[#0d0d0d] uppercase shadow-[0_4px_20px_rgba(200,146,42,0.25)] transition-transform duration-300 hover:scale-105">
          Read All Reviews
        </button>
      </div>
    </section>
  )
}
