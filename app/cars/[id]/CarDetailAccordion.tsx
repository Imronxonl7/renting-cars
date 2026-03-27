'use client'

import { useState } from 'react'

type AccordionItem = {
  title: string
  content: string
}

type CarDetailAccordionProps = {
  items: AccordionItem[]
}

const CarDetailAccordion = ({ items }: CarDetailAccordionProps) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <section
            key={item.title}
            className="overflow-hidden rounded-3xl border border-white/6 bg-[#232220]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-white sm:text-lg">{item.title}</span>
              <span
                className={`text-[#edb458] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-white/6 px-6 py-5 text-sm leading-7 text-white/62 sm:text-base">
                {item.content}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

export default CarDetailAccordion
