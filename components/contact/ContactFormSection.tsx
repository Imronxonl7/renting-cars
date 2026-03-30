'use client'

import { useEffect, useRef, useState } from 'react'
import Container from '../Container'

const initialFormValues = {
  name: '',
  email: '',
  number: '',
  subject: '',
  message: '',
}

const ContactFormSection = () => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const handleChange =
    (field: keyof typeof initialFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    setIsSuccessOpen(true)
    setFormValues(initialFormValues)

    closeTimerRef.current = setTimeout(() => {
      setIsSuccessOpen(false)
      closeTimerRef.current = null
    }, 7000)
  }

  return (
    <section className="bg-[#1f1e1d] pb-16 sm:pb-20 lg:pb-24">
      <Container className="">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.96fr)] lg:items-start xl:gap-12">
          <div className="min-w-0">
            <h2 className="text-[clamp(2.1rem,6vw,3rem)] font-black tracking-[-0.03em] text-white">
              Bizga yozing
            </h2>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4 sm:mt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={formValues.name}
                  onChange={handleChange('name')}
                  placeholder="Ismingiz*"
                  required
                  className="h-13 rounded-xl border border-white/8 bg-[#252421] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/36 focus:border-[#edb458] sm:h-14 sm:px-5 sm:text-base"
                />
                <input
                  type="email"
                  value={formValues.email}
                  onChange={handleChange('email')}
                  placeholder="Email manzilingiz*"
                  required
                  className="h-13 rounded-xl border border-white/8 bg-[#252421] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/36 focus:border-[#edb458] sm:h-14 sm:px-5 sm:text-base"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={formValues.number}
                  onChange={handleChange('number')}
                  placeholder="Telefon raqamingiz*"
                  required
                  className="h-13 rounded-xl border border-white/8 bg-[#252421] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/36 focus:border-[#edb458] sm:h-14 sm:px-5 sm:text-base"
                />
                <input
                  type="text"
                  value={formValues.subject}
                  onChange={handleChange('subject')}
                  placeholder="Mavzu*"
                  required
                  className="h-13 rounded-xl border border-white/8 bg-[#252421] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/36 focus:border-[#edb458] sm:h-14 sm:px-5 sm:text-base"
                />
              </div>

              <textarea
                value={formValues.message}
                onChange={handleChange('message')}
                placeholder="Xabaringiz*"
                rows={7}
                required
                className="min-h-44 w-full rounded-xl border border-white/8 bg-[#252421] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/36 focus:border-[#edb458] sm:min-h-52 sm:px-5 sm:text-base"
              />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#edb458] px-8 py-3.5 text-sm font-bold text-[#1f1e1d] transition-transform duration-300 hover:scale-[1.02] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              >
                Yuborish
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#252421] p-2 shadow-[0_18px_42px_rgba(0,0,0,0.24)] sm:rounded-[26px]">
            <div className="overflow-hidden rounded-[20px]">
              <iframe
                title="Drivora manzil xaritasi"
                src="https://www.google.com/maps?q=Tashkent%20City%20Park&output=embed"
                className="h-72 w-full border-0 sm:h-88 md:h-96 lg:h-124"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>

      {isSuccessOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-[28px] border border-[#edb458]/30 bg-[#252421] p-7 text-center text-white shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edb458] text-[#1f1e1d]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 12 4.2 4.2L19 6.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] sm:text-[2rem]">
              Ma&apos;lumotingiz muvaffaqiyatli qo&apos;shildi
            </h3>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactFormSection
