'use client'

import { useState } from 'react'
import type { CalendarProps } from './booking-bar.types'
import { dayNames, formatDateValue, monthNames, parseDateValue } from './booking-bar.utils'

const BookingBarCalendar = ({ value, onChange }: CalendarProps) => {
  const today = new Date()
  const [current, setCurrent] = useState(parseDateValue(value) ?? today)
  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const previousMonthDays = new Date(year, month, 0).getDate()
  const cells: { day: number; type: 'prev' | 'cur' | 'next' }[] = []

  for (let index = firstDay - 1; index >= 0; index -= 1) {
    cells.push({ day: previousMonthDays - index, type: 'prev' })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, type: 'cur' })
  }

  while (cells.length < 42) {
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, type: 'next' })
  }

  const isSelected = (day: number) => value === formatDateValue(new Date(year, month, day))

  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

  return (
    <div className="w-65 rounded-xl border border-white/10 bg-[#1c1c1c] p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="flex h-7 w-7 items-center justify-center text-lg text-white/50 transition-colors hover:text-white"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-white">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="flex h-7 w-7 items-center justify-center text-lg text-white/50 transition-colors hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {dayNames.map((dayName) => (
          <div key={dayName} className="py-1 text-center text-[11px] font-medium text-white/40">
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell, index) => (
          <button
            key={`${cell.type}-${cell.day}-${index}`}
            type="button"
            onClick={() => {
              if (cell.type === 'cur') {
                onChange(formatDateValue(new Date(year, month, cell.day)))
              }
            }}
            className={`rounded-lg py-1.5 text-center text-[12px] leading-none transition-colors ${
              cell.type !== 'cur'
                ? 'cursor-default text-white/20'
                : 'cursor-pointer text-white hover:bg-white/10'
            } ${isSelected(cell.day) && cell.type === 'cur' ? 'bg-[#F5A623]! font-bold! text-black!' : ''} ${
              isToday(cell.day) && cell.type === 'cur' && !isSelected(cell.day)
                ? 'border border-[#F5A623]/60'
                : ''
            }`}
          >
            {cell.day}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BookingBarCalendar
