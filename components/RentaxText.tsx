import React from 'react'

const RentaxText = () => {
  return (
    <div>
      {/* <div className="max-w-[560px]">
        <div className="flex items-center gap-2 mb-5">
          <span className="block w-6 h-[2px] bg-[#F5A623]"></span>
          <span className="text-[#F5A623] text-sm font-semibold tracking-widest uppercase">Rentax</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabolda text-white leading-tight mb-2">
          We Are More Than
        </h1>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#F5A623] leading-tight mb-7">
          A Car Rental Company
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-[480px]">
          Car repair quisque sodales dui ut varius vestibulum drana tortor turpis portition tellus eu euismod nisl massa nutodio in the miss volume place urna lacinia eros nuntna urna mauris vehicula rutrum in the miss on volume interdum.
        </p>
        <ul className="flex flex-col gap-4 mb-10">
          <li className="flex items-center gap-3">
            <span className="w-[22px] h-[22px] rounded-full bg-[#F5A623]/20 flex items-center justify-center shrink-0">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M1 4L4 7.5L10 1" stroke="#F5A623" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-white font-semibold text-[15px]">Sports and Luxury Cars</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-[22px] h-[22px] rounded-full bg-[#F5A623]/20 flex items-center justify-center shrink-0">
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M1 4L4 7.5L10 1" stroke="#F5A623" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-white font-semibold text-[15px]">Economy Cars</span>
          </li>
        </ul>
        <a href="#" className="bg-[#F5A623] text-[#1a1a1a] font-bold rounded-full px-8 py-3.5 inline-flex items-center gap-2.5 text-[15px] tracking-wide hover:bg-[#e09a18] transition-colors duration-200">
          Read More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#1a1a1a" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div> */}
      <div className="flex flex-col justify-center max-w-[560px]">
        {/* Badge */}
        <span className="text-[#edb458] text-sm font-medium tracking-widest uppercase mb-4">
          - Rentax
        </span>

        {/* Heading */}
        <h2 className="text-white text-4xl font-bold leading-tight mb-2">
          We Are More Than
        </h2>
        <h2 className="text-[#edb458] text-4xl font-bold leading-tight mb-6">
          A Car Rental Company
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Car repair quisque sodales dui ut varius Vestibulum drana tortor turpis
          portition tellus eu euismod nisl massa nutodio in the miss volume place
          urna lacinia eros nuntna urna mauris vehicula rutrum in the miss on
          volume interdum.
        </p>

        {/* Features List */}
        <ul className="flex flex-col gap-4 mb-10">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3.5 h-3.5 text-[#edb458]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="text-white text-sm font-medium">
              Sports and Luxury Cars
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3.5 h-3.5 text-[#edb458]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="text-white text-sm font-medium">Economy Cars</span>
          </li>
        </ul>

        {/* Button */}
        <div>
          <button className="cursor-pointer bg-[#edb458] hover:bg-[#e09510] text-black text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 flex items-center gap-2">
            Read More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentaxText
