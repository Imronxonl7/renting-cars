import Image from 'next/image'
import Link from 'next/link'
import type { UserRecord } from '@/lib/usersAuth'

type HeaderAuthActionsProps = {
  mobile?: boolean
  loading: boolean
  user: UserRecord | null
  onOpenSignIn: () => void
  onOpenSignUp: () => void
}

const HeaderAuthActions = ({
  mobile = false,
  loading,
  user,
  onOpenSignIn,
  onOpenSignUp,
}: HeaderAuthActionsProps) => {
  if (loading) {
    return (
      <div className={mobile ? 'mt-5 border-t border-white/10 pt-5' : 'flex'}>
        <div className="h-10 w-28 animate-pulse rounded-full bg-white/10" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className={mobile ? 'mt-5 flex flex-col gap-3 border-t border-white/10 pt-5' : 'flex items-center gap-3'}>
        <button
          type="button"
          onClick={onOpenSignIn}
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#edb458] hover:text-[black]"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={onOpenSignUp}
          className="inline-flex items-center justify-center rounded-full bg-[#edb458] px-5 py-2.5 text-sm font-semibold text-[#1f1e1d] hover:text-[#edb458]  transition-colors hover:bg-white"
        >
          Sign up
        </button>
      </div>
    )
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={mobile ? 'mt-5 flex flex-col gap-3 border-t border-white/10 pt-5' : 'flex items-center gap-3'}>
      <Link
        href="/profile"
        className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-white transition-colors hover:border-[#edb458]"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edb458] text-sm font-bold text-[#1f1e1d]">
            {initials}
          </span>
        )}
        <span className="max-w-32 truncate text-sm font-semibold">{user.name}</span>
      </Link>
    </div>
  )
}

export default HeaderAuthActions
