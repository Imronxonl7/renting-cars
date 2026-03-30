'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  AUTH_EVENT_NAME,
  SEEN_BOOKING_NOTIFICATIONS_KEY,
  clearStoredUserId,
  getStoredUserId,
  getUserById,
  getUserBookings,
  requestAuthModal,
  type CarBookingRecord,
  type UserRecord,
} from '@/lib/usersAuth'

const ProfileClient = () => {
  const [user, setUser] = useState<UserRecord | null>(null)
  const [bookings, setBookings] = useState<CarBookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      const userId = getStoredUserId()

      if (!userId) {
        if (active) {
          setUser(null)
          setBookings([])
          setError('Siz hali akkauntga kirmagansiz.')
          setLoading(false)
        }

        return
      }

      try {
        const currentUser = await getUserById(userId)

        if (!active) {
          return
        }

        if (!currentUser) {
          clearStoredUserId()
          setUser(null)
          setBookings([])
          setError('Bunday account topilmadi.')
          setLoading(false)
          return
        }

        const userBookings = await getUserBookings(currentUser.id)

        if (!active) {
          return
        }

        setUser(currentUser)
        setBookings(userBookings)
        setError('')

        const approvedBookings = userBookings.filter((booking) => booking.status === 'approved')
        const seenBookingIds = new Set(
          JSON.parse(window.localStorage.getItem(SEEN_BOOKING_NOTIFICATIONS_KEY) ?? '[]') as string[]
        )
        const unseenApprovedBooking = approvedBookings.find((booking) => !seenBookingIds.has(booking.id))

        if (unseenApprovedBooking) {
          setToastMessage('Mashina arizangiz qabul qilindi.')
          window.localStorage.setItem(
            SEEN_BOOKING_NOTIFICATIONS_KEY,
            JSON.stringify([...seenBookingIds, unseenApprovedBooking.id])
          )
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Profilni yuklashda xatolik yuz berdi.'
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    const syncUser = () => {
      setLoading(true)
      void loadUser()
    }

    void loadUser()
    window.addEventListener(AUTH_EVENT_NAME, syncUser)

    return () => {
      active = false
      window.removeEventListener(AUTH_EVENT_NAME, syncUser)
    }
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 5000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toastMessage])

  const handleLogout = () => {
    clearStoredUserId()
    setUser(null)
    setBookings([])
    setError('Siz akkauntdan chiqdingiz.')
  }

  if (loading) {
    return <div className="rounded-4xl border border-white/8 bg-[#252421] p-8 text-white">Yuklanmoqda...</div>
  }

  if (!user) {
    return (
      <div className="rounded-4xl border border-white/8 bg-[#252421] p-8 text-white">
        <h1 className="text-3xl font-black">Profil</h1>
        <p className="mt-4 text-white/70">{error}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => requestAuthModal('sign-in')}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[#edb458] hover:text-black"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => requestAuthModal('sign-up')}
            className="inline-flex items-center justify-center rounded-full bg-[#edb458] px-5 py-3 text-sm font-semibold text-[#1f1e1d] hover:text-[#edb458] duration-300 transition-colors hover:bg-white"
          >
            Sign up
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(18rem,0.54fr)]">
        <div className="rounded-4xl border border-white/8 bg-[#252421] p-8 text-white">
          <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
            Foydalanuvchi profili
          </p>
          <h1 className="mt-4 text-3xl font-black sm:text-4xl">{user.name}</h1>
          <p className="mt-2 text-white/65">{user.role}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard label="Email" value={user.email} />
            <InfoCard label="Telefon" value={user.phone} />
            <InfoCard label="ID" value={user.id} />
            <InfoCard label="Qo‘shilgan sana" value={new Date(user.created_at).toLocaleDateString('uz-UZ')} />
          </div>

          <div className="mt-8 rounded-3xl border border-white/8 bg-[#1f1e1d] p-5">
            <p className="text-xs font-semibold tracking-[0.24em] text-[#edb458] uppercase">
              Bookinglar
            </p>

            <div className="mt-4 space-y-3">
              {bookings.length > 0 ? (
                bookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-2 rounded-[1.2rem] border border-white/8 bg-[#252421] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {booking.start_date} - {booking.end_date}
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        ${booking.total_price.toLocaleString('en-US')}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#edb458]">
                      {formatBookingStatus(booking.status)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/60">Hozircha booking arizalaringiz yo‘q.</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-white/8 bg-[#252421] p-8 text-white">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={96}
              height={96}
              unoptimized
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#edb458] text-2xl font-black text-[#1f1e1d]">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <p className="mt-6 text-sm leading-7 text-white/70">
            Siz tizimga muvaffaqiyatli kirgansiz. Chiqmaguningizcha profilingiz headerda ko‘rinib turadi.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#edb458] hover:text-[#edb458]"
          >
            Akkauntdan chiqish
          </button>
        </div>
      </div>

      {toastMessage ? (
        <div className="fixed bottom-5 right-5 z-120 w-[min(24rem,calc(100vw-2rem))] rounded-3xl border border-emerald-400/30 bg-[#252421] px-5 py-4 text-white shadow-[0_20px_45px_rgba(0,0,0,0.32)]">
          <p className="text-xs font-semibold tracking-[0.24em] text-emerald-300 uppercase">
            Yangi xabar
          </p>
          <p className="mt-2 text-sm leading-6 text-white/80">{toastMessage}</p>
        </div>
      ) : null}
    </>
  )
}

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-white/8 bg-[#1f1e1d] p-5">
    <p className="text-xs font-semibold tracking-[0.24em] text-[#edb458] uppercase">{label}</p>
    <p className="mt-3 wrap-break-words text-base font-semibold text-white">{value}</p>
  </div>
)

const formatBookingStatus = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Kutilmoqda',
    approved: 'Tasdiqlangan',
    rejected: 'Rad etilgan',
  }

  return labels[status] ?? status
}

export default ProfileClient
