import Image from "next/image";
import React from "react";
import Audi from '../public/audi.jpg'
import DatePicker from "./RentNowDataCopmonent";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[560px] flex flex-col items-center justify-center">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={Audi}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Qoraytiruvchi overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16 pb-24 w-full">

        {/* Badge */}
        <span className="text-[#F5A623] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          - RENT NOW
        </span>

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-14">
          Book Auto Rental
        </h1>

        {/* Booking Bar */}
        <div className="w-full max-w-[900px] bg-[#111111]/90 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10">

          {/* Choose Car Type */}
          <div className="group relative flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer">
              <span className="text-white/50 text-sm">Choose Car Type</span>
              <svg className="w-4 h-4 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute top-full left-0 mt-1 z-50 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl min-w-[180px] overflow-hidden hidden group-hover:block">
              {["Choose Car Type", "Sport Cars", "Convertible", "Luxury Cars", "Small Cars"].map((opt, i) => (
                <div key={opt} className={`px-4 py-2.5 text-sm transition-colors
                  ${i === 0 ? "text-white/40 text-xs font-medium border-b border-white/10 cursor-default" : "text-white hover:bg-white/5 cursor-pointer"}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Pick Up Location */}
          <div className="group relative flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer">
              <span className="text-white/50 text-sm">Pick Up Location</span>
              <svg className="w-4 h-4 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute top-full left-0 mt-1 z-50 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl min-w-[180px] overflow-hidden hidden group-hover:block">
              {["Abu Dhabi", "Alain", "Dubai", "Sharjah"].map((loc) => (
                <div key={loc} className="px-4 py-2.5 text-sm text-white hover:bg-white/5 cursor-pointer transition-colors">
                  {loc}
                </div>
              ))}
            </div>
          </div>

          {/* Pick Up Date — client component */}
          <DatePicker placeholder="Pick Up Date" />

          {/* Drop Off Location */}
          <div className="group relative flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer">
              <span className="text-white/50 text-sm">Drop Off Location</span>
              <svg className="w-4 h-4 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute top-full left-0 mt-1 z-50 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl min-w-[180px] overflow-hidden hidden group-hover:block">
              {["Drop Off Location", "Abu Dhabi", "Alain", "Dubai", "Sharjah"].map((loc, i) => (
                <div key={loc} className={`px-4 py-2.5 text-sm transition-colors
                  ${i === 0 ? "text-white/40 text-xs font-medium border-b border-white/10 cursor-default" : "text-white hover:bg-white/5 cursor-pointer"}`}>
                  {loc}
                </div>
              ))}
            </div>
          </div>

          {/* Return Date — client component */}
          <DatePicker placeholder="Return Date" />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
