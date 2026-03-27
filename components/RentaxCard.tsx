import Image from 'next/image'
import React from 'react'
import RentaxImage from '../public/rentax.jpg'

const RentaxCard = () => {
  return (
    <div>
      <div className="relative flex-shrink-0">
        <div className="relative w-[320px] h-[300px] sm:w-[401px] sm:h-[380px] lg:w-[500px] lg:h-[460px] rounded-2xl overflow-hidden">
          <Image
            src={RentaxImage}
            alt="Car rental professional"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <button
          className="cursor-pointer absolute -bottom-5 left-5 w-14 h-14 bg-[#F5A623] hover:bg-[#e09510] rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label="Play video"
        >
          <svg
            className="w-6 h-6 text-black ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default RentaxCard
