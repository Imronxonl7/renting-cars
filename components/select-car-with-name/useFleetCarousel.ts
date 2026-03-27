'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useRef, useState } from 'react'
import { getWrappedIndex } from './carouselUtils'

type UseFleetCarouselOptions = {
  fleetLength: number
}

export const useFleetCarousel = ({ fleetLength }: UseFleetCarouselOptions) => {
  const [activeIndex, setActiveIndex] = useState(1)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)

  const goPrev = () => {
    setActiveIndex((current) => getWrappedIndex(current - 1, fleetLength))
  }

  const goNext = () => {
    setActiveIndex((current) => getWrappedIndex(current + 1, fleetLength))
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartX.current = event.clientX
    setIsDragging(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      return
    }

    const nextOffset = event.clientX - dragStartX.current
    setDragOffset(Math.max(-160, Math.min(160, nextOffset)))
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      setIsDragging(false)
      setDragOffset(0)
      return
    }

    const dragDistance = event.clientX - dragStartX.current
    dragStartX.current = null
    setIsDragging(false)

    if (Math.abs(dragDistance) < 55) {
      setDragOffset(0)
      return
    }

    setDragOffset(0)

    if (dragDistance > 0) {
      goPrev()
      return
    }

    goNext()
  }

  const handlePointerLeave = () => {
    dragStartX.current = null
    setIsDragging(false)
    setDragOffset(0)
  }

  return {
    activeIndex,
    dragOffset,
    isDragging,
    setActiveIndex,
    goPrev,
    goNext,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
  }
}
