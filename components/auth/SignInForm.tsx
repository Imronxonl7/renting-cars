'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { findUserByCredentials, setStoredUserId } from '@/lib/usersAuth'

const SignInForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await findUserByCredentials(email, phone)

      if (!user) {
        setError('Bunday account topilmadi.')
        return
      }

      setStoredUserId(user.id)
      router.push('/profile')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Kirishda xatolik yuz berdi.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="siz@email.com"
      />
      <Field
        label="Telefon raqam"
        type="tel"
        value={phone}
        onChange={setPhone}
        placeholder="+998 90 123 45 67"
      />

      {error ? <p className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1f1e1d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Tekshirilmoqda...' : 'Kirish'}
      </button>

      <p className="text-center text-sm text-white/60">
        Akkauntingiz yo‘qmi?{' '}
        <Link href="/sign-up" className="font-semibold text-[#edb458] transition-colors hover:text-white">
          Sign up
        </Link>
      </p>
    </form>
  )
}

const Field = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
    <input
      required
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
    />
  </label>
)

export default SignInForm
