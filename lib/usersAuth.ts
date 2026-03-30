export type UserRecord = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: string
  created_at: string
}

export type CreateUserPayload = {
  name: string
  email: string
  phone: string
  avatar?: string
}

export type CarBookingRecord = {
  id: string
  car_id: string
  user_id: string
  start_date: string
  end_date: string
  total_price: number
  status: string
  created_at: string
}

export type CreateCarBookingPayload = {
  carId: string
  userId: string
  startDate: string
  endDate: string
  totalPrice: number
}

export const SUPABASE_URL = 'https://ikpfkhvdwjrblaiyniru.supabase.co'
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SbG03902HzuTqSDtUIqsQQ_PE0BqWfA'
export const AUTH_STORAGE_KEY = 'renting-cars-user-id'
export const AUTH_EVENT_NAME = 'renting-cars-auth-change'
export const OPEN_AUTH_MODAL_EVENT = 'renting-cars-open-auth-modal'
export const SEEN_BOOKING_NOTIFICATIONS_KEY = 'renting-cars-seen-bookings'

const buildRestUrl = (table: string, searchParams?: Record<string, string>) => {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`)

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value)
    }
  }

  return url.toString()
}

const getHeaders = (withReturnPreference = false) => ({
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  'Content-Type': 'application/json',
  ...(withReturnPreference ? { Prefer: 'return=representation' } : {}),
})

const buildAvatarUrl = (name: string, email: string, avatar?: string) => {
  if (avatar?.trim()) {
    return avatar.trim()
  }

  const encodedName = encodeURIComponent(name.trim() || email.trim())

  return `https://ui-avatars.com/api/?name=${encodedName}&background=1f1e1d&color=edb458&size=256`
}

export const getStoredUserId = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY)
}

export const setStoredUserId = (userId: string) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, userId)
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}

export const clearStoredUserId = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT_NAME))
}

export const requestAuthModal = (mode: 'sign-in' | 'sign-up' = 'sign-in') => {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(OPEN_AUTH_MODAL_EVENT, { detail: { mode } }))
}

export const getUserById = async (userId: string) => {
  const response = await fetch(
    buildRestUrl('users', {
      select: '*',
      id: `eq.${userId}`,
      limit: '1',
    }),
    {
      headers: getHeaders(),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Foydalanuvchini olishda xatolik: ${response.status}`)
  }

  const users = (await response.json()) as UserRecord[]

  return users[0] ?? null
}

export const findUserByCredentials = async (email: string, phone: string) => {
  const response = await fetch(
    buildRestUrl('users', {
      select: '*',
      email: `eq.${email.trim().toLowerCase()}`,
      phone: `eq.${phone.trim()}`,
      limit: '1',
    }),
    {
      headers: getHeaders(),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Foydalanuvchini tekshirishda xatolik: ${response.status}`)
  }

  const users = (await response.json()) as UserRecord[]

  return users[0] ?? null
}

export const findUserByEmail = async (email: string) => {
  const response = await fetch(
    buildRestUrl('users', {
      select: '*',
      email: `eq.${email.trim().toLowerCase()}`,
      limit: '1',
    }),
    {
      headers: getHeaders(),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Emailni tekshirishda xatolik: ${response.status}`)
  }

  const users = (await response.json()) as UserRecord[]

  return users[0] ?? null
}

export const createUser = async ({ name, email, phone, avatar }: CreateUserPayload) => {
  const response = await fetch(buildRestUrl('users'), {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      avatar: buildAvatarUrl(name, email, avatar),
      role: 'user',
    }),
  })

  if (!response.ok) {
    throw new Error(`Ro‘yxatdan o‘tishda xatolik: ${response.status}`)
  }

  const created = (await response.json()) as UserRecord[]

  return created[0] ?? null
}

export const createCarBooking = async ({
  carId,
  userId,
  startDate,
  endDate,
  totalPrice,
}: CreateCarBookingPayload) => {
  const payload = {
    car_id: carId,
    user_id: userId,
    start_date: startDate,
    end_date: endDate,
    total_price: totalPrice,
    status: 'pending',
  }

  const tableNames = ['car_bookings', 'car_booking', 'bookings']
  let lastStatus = 404

  for (const tableName of tableNames) {
    const response = await fetch(buildRestUrl(tableName), {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const created = (await response.json()) as CarBookingRecord[]
      return created[0] ?? null
    }

    lastStatus = response.status

    if (response.status !== 404) {
      throw new Error(`Booking yuborishda xatolik: ${response.status}`)
    }
  }

  throw new Error(`Booking yuborishda xatolik: ${lastStatus}`)
}

export const getUserBookings = async (userId: string) => {
  const tableNames = ['car_bookings', 'car_booking', 'bookings']
  let lastStatus = 404

  for (const tableName of tableNames) {
    const response = await fetch(
      buildRestUrl(tableName, {
        select: '*',
        user_id: `eq.${userId}`,
        order: 'created_at.desc',
      }),
      {
        headers: getHeaders(),
        cache: 'no-store',
      }
    )

    if (response.ok) {
      return (await response.json()) as CarBookingRecord[]
    }

    lastStatus = response.status

    if (response.status !== 404) {
      throw new Error(`Bookinglarni olishda xatolik: ${response.status}`)
    }
  }

  throw new Error(`Bookinglarni olishda xatolik: ${lastStatus}`)
}
