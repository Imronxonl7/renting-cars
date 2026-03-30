'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  createCarBooking,
  getStoredUserId,
  requestAuthModal,
} from '@/lib/usersAuth'

type CarBookingActionProps = {
  carId: string
  carModel: string
  pricePerDay: number
  variant?: 'hero' | 'panel'
}

const CarBookingAction = ({
  carId,
  carModel,
  pricePerDay,
  variant = 'panel',
}: CarBookingActionProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const totalPrice = useMemo(() => {
    if (!startDate || !endDate) {
      return pricePerDay
    }

    const start = new Date(`${startDate}T00:00:00`)
    const end = new Date(`${endDate}T00:00:00`)
    const dayCount = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    )

    return dayCount * pricePerDay
  }, [endDate, pricePerDay, startDate])

  const openBooking = () => {
    const userId = getStoredUserId()

    if (!userId) {
      requestAuthModal('sign-up')
      return
    }

    setError('')
    setMessage('')
    setModalOpen(true)
  }

  const closeBooking = () => {
    setModalOpen(false)
    setError('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userId = getStoredUserId()

    if (!userId) {
      requestAuthModal('sign-in')
      setModalOpen(false)
      return
    }

    if (endDate < startDate) {
      setError('Qaytarish sanasi olib ketish sanasidan oldin bo‘lishi mumkin emas.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const booking = await createCarBooking({
        carId,
        userId,
        startDate,
        endDate,
        totalPrice,
      })

      if (!booking) {
        setError('Booking yuborishda xatolik yuz berdi.')
        return
      }

      setMessage('Ma’lumotingiz muvaffaqiyatli qabul qilindi, tez orada javob beramiz.')
      setStartDate('')
      setEndDate('')

      setTimeout(() => {
        setModalOpen(false)
        setMessage('')
      }, 2500)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Booking yuborishda xatolik yuz berdi.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const buttonClassName =
    variant === 'hero'
      ? 'inline-flex items-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1a1917] transition-colors hover:bg-[#ddb04b]'
      : 'inline-flex w-full items-center justify-center rounded-2xl bg-[#edb458] px-5 py-4 text-lg font-semibold text-[#1a1917] transition-colors hover:bg-[#ddb04b]'

  return (
    <>
      <button type="button" onClick={openBooking} className={buttonClassName}>
        Hozir ijaraga olish
      </button>

      {modalOpen ? (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-[#1f1e1d] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
                  Booking
                </p>
                <h3 className="mt-3 text-3xl font-black">{carModel}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Sanalarni tanlang va booking arizangizni yuboring.
                </p>
              </div>

              <button
                type="button"
                onClick={closeBooking}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Olib ketish sanasi</span>
                <input
                  required
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors focus:border-[#edb458]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Qaytarish sanasi</span>
                <input
                  required
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors focus:border-[#edb458]"
                />
              </label>

              <div className="rounded-3xl border border-white/8 bg-[#252421] px-5 py-4">
                <p className="text-xs font-semibold tracking-[0.24em] text-[#edb458] uppercase">Umumiy narx</p>
                <p className="mt-3 text-2xl font-black">${totalPrice.toLocaleString('en-US')}</p>
              </div>

              {error ? (
                <p className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1f1e1d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? 'Yuborilmoqda...' : 'Arizani yuborish'}
                </button>

                <Link
                  href="/profile"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
                >
                  Profilni ko‘rish
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CarBookingAction
