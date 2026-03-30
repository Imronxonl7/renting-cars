'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  AUTH_EVENT_NAME,
  SEEN_BOOKING_NOTIFICATIONS_KEY,
  clearStoredUserId,
  getStoredUserId,
  getUserById,
  getUserBookings,
  requestAuthModal,
  updateUserProfile,
  type CarBookingRecord,
  type UserRecord,
} from '@/lib/usersAuth'

const ProfileClient = () => {
  const [user, setUser] = useState<UserRecord | null>(null)
  const [bookings, setBookings] = useState<CarBookingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editAvatar, setEditAvatar] = useState('')
  const userRef = useRef<UserRecord | null>(null)
  const confirmRef = useRef<HTMLDivElement | null>(null)

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
        userRef.current = currentUser
        setBookings(userBookings)
        setError('')
        setEditName(currentUser.name)
        setEditEmail(currentUser.email)
        setEditPhone(currentUser.phone)
        setEditAvatar(currentUser.avatar || '')

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
    const activeUser = userRef.current

    if (!activeUser) {
      return
    }

    const intervalId = window.setInterval(async () => {
      try {
        const latestBookings = await getUserBookings(activeUser.id)
        setBookings((currentBookings) => {
          const currentApprovedIds = new Set(
            currentBookings
              .filter((booking) => booking.status === 'approved')
              .map((booking) => booking.id)
          )

          const nextApprovedBooking = latestBookings.find(
            (booking) => booking.status === 'approved' && !currentApprovedIds.has(booking.id)
          )

          if (nextApprovedBooking) {
            setToastMessage('Mashina arizangiz qabul qilindi.')

            const seenBookingIds = new Set(
              JSON.parse(window.localStorage.getItem(SEEN_BOOKING_NOTIFICATIONS_KEY) ?? '[]') as string[]
            )

            window.localStorage.setItem(
              SEEN_BOOKING_NOTIFICATIONS_KEY,
              JSON.stringify([...seenBookingIds, nextApprovedBooking.id])
            )

            try {
              const audioContext = new window.AudioContext()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()

              oscillator.type = 'triangle'
              oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
              oscillator.frequency.exponentialRampToValueAtTime(1320, audioContext.currentTime + 0.18)

              gainNode.gain.setValueAtTime(0.001, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02)
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.38)

              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.start()
              oscillator.stop(audioContext.currentTime + 0.4)
            } catch {}
          }

          return latestBookings
        })
      } catch {}
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [user?.id])

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

  useEffect(() => {
    if (!confirmOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!confirmRef.current?.contains(event.target as Node)) {
        setConfirmOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [confirmOpen])

  const handleLogout = () => {
    clearStoredUserId()
    userRef.current = null
    setUser(null)
    setBookings([])
    setError('Siz akkauntdan chiqdingiz.')
    setConfirmOpen(false)
  }

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user) {
      return
    }

    setSaving(true)
    setError('')

    try {
      const updatedUser = await updateUserProfile({
        userId: user.id,
        name: editName,
        email: editEmail,
        phone: editPhone,
        avatar: editAvatar,
      })

      if (!updatedUser) {
        setError('Profilni saqlashda xatolik yuz berdi.')
        return
      }

      setUser(updatedUser)
      setEditing(false)
      window.dispatchEvent(new Event(AUTH_EVENT_NAME))
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Profilni saqlashda xatolik yuz berdi.'
      )
    } finally {
      setSaving(false)
    }
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

        <div className="flex flex-col rounded-4xl border border-white/8 bg-[#252421] p-8 text-white">
          <div className="overflow-hidden rounded-4xl border border-white/8 bg-[#1f1e1d]">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={560}
                height={560}
                unoptimized
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-[#edb458] text-6xl font-black text-[#1f1e1d]">
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <p className="mt-6 text-sm leading-7 text-white/70">
            Siz tizimga muvaffaqiyatli kirgansiz. Chiqmaguningizcha profilingiz headerda ko‘rinib turadi.
          </p>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#edb458] hover:text-[#edb458]"
          >
            Akkauntdan chiqish
          </button>

          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#edb458] px-5 py-3 text-sm font-semibold text-[#1f1e1d] transition-colors hover:bg-white"
          >
            Tahrirlash
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

      {editing ? (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-[#1f1e1d] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
                  Profil
                </p>
                <h3 className="mt-3 text-3xl font-black">Ma’lumotlarni tahrirlash</h3>
              </div>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
              <Field label="Ism" value={editName} onChange={setEditName} type="text" />
              <Field label="Email" value={editEmail} onChange={setEditEmail} type="email" />
              <Field label="Telefon" value={editPhone} onChange={setEditPhone} type="tel" />
              <Field label="Photo URL" value={editAvatar} onChange={setEditAvatar} type="url" required={false} />

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1f1e1d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {confirmOpen ? (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div
            ref={confirmRef}
            className="w-full max-w-md rounded-4xl border border-white/10 bg-[#1f1e1d] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
                  Tasdiqlash
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  Siz akkauntni tark etasizmi?
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#edb458] px-5 py-3 text-sm font-bold text-[#1f1e1d] transition-colors hover:bg-white"
              >
                Ha, chiqaman
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
              >
                Yo‘q, qolaman
              </button>
            </div>
          </div>
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

const Field = ({
  label,
  value,
  onChange,
  type,
  required = true,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type: string
  required?: boolean
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
    <input
      required={required}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
    />
  </label>
)

export default ProfileClient
