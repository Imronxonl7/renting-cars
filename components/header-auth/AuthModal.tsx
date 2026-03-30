type AuthModalProps = {
  mode: 'sign-in' | 'sign-up'
  name: string
  email: string
  phone: string
  avatar: string
  error: string
  submitting: boolean
  modalRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onModeChange: (mode: 'sign-in' | 'sign-up') => void
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onAvatarChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const AuthModal = ({
  mode,
  name,
  email,
  phone,
  avatar,
  error,
  submitting,
  modalRef,
  onClose,
  onModeChange,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onAvatarChange,
  onSubmit,
}: AuthModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-xl rounded-4xl border border-white/10 bg-[#1f1e1d] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
              {mode === 'sign-in' ? 'Akkauntga kirish' : 'Yangi akkaunt'}
            </p>
            <h3 className="mt-3 text-3xl font-black">
              {mode === 'sign-in' ? 'Sign in' : 'Sign up'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Oynani yopish"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#edb458] hover:text-[#edb458]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex rounded-full border border-white/10 bg-[#252421] p-1">
          <button
            type="button"
            onClick={() => onModeChange('sign-in')}
            className={`flex-1 rounded-full cursor-pointer px-4 py-2 text-sm font-semibold transition-colors ${
              mode === 'sign-in' ? 'bg-[#edb458] text-[#1f1e1d]' : 'text-white/70 hover:text-white'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => onModeChange('sign-up')}
            className={`flex-1 rounded-full cursor-pointer px-4 py-2 text-sm font-semibold transition-colors ${
              mode === 'sign-up' ? 'bg-[#edb458] text-[#1f1e1d]' : 'text-white/70 hover:text-white'
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {mode === 'sign-up' ? (
            <>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Ism</span>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(event) => onNameChange(event.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Photo URL</span>
                <input
                  type="url"
                  value={avatar}
                  onChange={(event) => onAvatarChange(event.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
                />
              </label>
            </>
          ) : null}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="siz@email.com"
              className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Telefon raqam</span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => onPhoneChange(event.target.value)}
              placeholder="+998 90 123 45 67"
              className="w-full rounded-3xl border border-white/10 bg-[#252421] px-5 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#edb458]"
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#edb458] px-6 py-3 text-sm font-bold text-[#1f1e1d] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting
              ? mode === 'sign-in'
                ? 'Tekshirilmoqda...'
                : 'Saqlanmoqda...'
              : mode === 'sign-in'
                ? 'Kirish'
                : 'Ro‘yxatdan o‘tish'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
