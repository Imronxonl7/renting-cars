export const DESKTOP_CAROUSEL_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const MOBILE_CAROUSEL_EASING = 'cubic-bezier(0.2, 0.9, 0.24, 1)'

export type FleetCardPosition = 'left' | 'center' | 'right' | 'hidden'

export const getWrappedIndex = (index: number, length: number) => {
  return (index + length) % length
}

export const getDesktopPosition = (
  index: number,
  activeIndex: number,
  length: number
): FleetCardPosition => {
  const offset = (index - activeIndex + length) % length

  if (offset === 0) {
    return 'center'
  }

  if (offset === 1) {
    return 'right'
  }

  if (offset === length - 1) {
    return 'left'
  }

  return 'hidden'
}

export const getDesktopCardClass = (position: FleetCardPosition) => {
  switch (position) {
    case 'left':
      return 'z-10 -translate-x-[110%] scale-[0.9] opacity-45 blur-[0.2px] hover:opacity-60'
    case 'center':
      return 'z-30 -translate-x-1/2 scale-100 opacity-100'
    case 'right':
      return 'z-10 translate-x-[10%] scale-[0.9] opacity-45 blur-[0.2px] hover:opacity-60'
    default:
      return 'pointer-events-none z-0 -translate-x-1/2 scale-[0.82] opacity-0'
  }
}

export const getMobileCardClass = (position: FleetCardPosition) => {
  if (position === 'center') {
    return 'z-20 -translate-x-1/2 scale-100 opacity-100'
  }

  return 'pointer-events-none z-0 -translate-x-1/2 scale-[0.96] opacity-0'
}

export const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value ?? 0)
}
