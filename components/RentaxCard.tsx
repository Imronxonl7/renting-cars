'use client'

import Image from 'next/image'
import { useState } from 'react'
import DillerHuman from "@/public/DillerHuman.jpg"

const VIDEO_URL =
  'https://www.youtube.com/embed/tMvrTBSO6Oo?autoplay=1&rel=0&modestbranding=1'

const RentaxCard = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="mx-auto w-full max-w-130 lg:mx-0">
      <div className="relative">
        <div className="relative aspect-[0.9/1] overflow-hidden rounded-[28px] border border-white/8 bg-[#262422] shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:aspect-[0.92/1]">
          {isPlaying ? (
            <>
              <iframe
                src={VIDEO_URL}
                title="Rentax promo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                aria-label="Videoni yopish"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Image
                src={DillerHuman}
                alt="Rentax team member standing near a luxury car"
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 520px"
                className="object-cover object-[78%_center] sm:object-[76%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.18)_100%)]" />
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((current) => !current)}
          aria-label={isPlaying ? 'Videoni yopish' : 'Videoni ijro etish'}
          className="absolute -bottom-6 left-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#edb458]/55 bg-[#262422] text-[#edb458] shadow-[0_18px_35px_rgba(0,0,0,0.28)] transition-all duration-200 hover:scale-105 hover:border-[#edb458] hover:bg-[#2d2a27] sm:left-6 sm:h-18.5 sm:w-18.5 lg:-bottom-7 lg:left-8"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edb458]/35 bg-[#1f1e1d] sm:h-13 sm:w-13">
            {isPlaying ? (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M18 6 6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="ml-0.5 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

export default RentaxCard
