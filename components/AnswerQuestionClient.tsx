'use client'

import { useState } from 'react'
import type { Faq } from '@/types/Faq'

type AnswerQuestionClientProps = {
  items: Faq[]
}

const AnswerQuestionClient = ({ items }: AnswerQuestionClientProps) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="faq-scroll w-full max-h-[44rem] space-y-4 overflow-y-auto pr-2">
      {items.map((item, index) => {
        const isOpen = openId === item.id

        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-[28px] border border-white/8 bg-[#252421]"
          >
            <button
              type="button"
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edb458] text-sm font-black text-[#1f1e1d]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-white sm:text-lg">{item.question}</h3>
              </div>

              <span
                className={`shrink-0 text-[#edb458] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
              <div className="border-t border-white/8 px-5 py-5 text-sm leading-7 text-white/62 sm:px-6 sm:text-base">
                {item.answer}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default AnswerQuestionClient
