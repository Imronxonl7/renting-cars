import { ReactNode } from 'react'

type HeroMiniSpecProps = {
  label: string
  value: string
  icon: 'seat' | 'fuel' | 'gear'
}

const icons: Record<HeroMiniSpecProps['icon'], ReactNode> = {
  seat: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
    </svg>
  ),
  fuel: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V7l9-5 9 5v15" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  gear: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
      <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
    </svg>
  ),
}

const HeroMiniSpec = ({ label, value, icon }: HeroMiniSpecProps) => (
  <div className="flex items-center gap-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60">
      {icons[icon]}
    </div>
    <div>
      <p className="text-[9px] leading-none tracking-wider text-white/40 uppercase">{label}</p>
      <p className="text-xs leading-snug font-semibold text-white/80">{value}</p>
    </div>
  </div>
)

export default HeroMiniSpec
