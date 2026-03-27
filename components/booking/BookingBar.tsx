'use client'

import Form from 'next/form'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Categories } from '@/types/Categories'
import { Cars } from '@/types/Cars'

type BookingBarLabels = {
  category: string
  pickupCity: string
  pickupDate: string
  returnCity: string
  returnDate: string
  submit: string
}

type BookingBarProps = {
  cars: Cars[]
  categories: Categories[]
  labels: BookingBarLabels
  className: string
  fieldClassName?: string
  submitClassName?: string
  showSubmitButton?: boolean
}

type Option = {
  label: string
  value: string
}

type CalendarProps = {
  value: string
  onChange: (value: string) => void
}

const BookingBar = ({
  cars,
  categories,
  labels,
  className,
  fieldClassName = '',
  submitClassName = '',
  showSubmitButton = true,
}: BookingBarProps) => {
  const cities = useMemo(
    () =>
      Array.from(
        new Set(cars.map((car) => car.city?.trim()).filter((city): city is string => Boolean(city)))
      ).sort((firstCity, secondCity) => firstCity.localeCompare(secondCity)),
    [cars]
  )

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }))
  const cityOptions = cities.map((city) => ({ label: city, value: city }))

  const [openField, setOpenField] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [pickupCity, setPickupCity] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnCity, setReturnCity] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const wrapperRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpenField(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  return (
    <Form action="/cars" ref={wrapperRef} className={className}>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="pickupCity" value={pickupCity} />
      <input type="hidden" name="pickupDate" value={pickupDate} />
      <input type="hidden" name="returnCity" value={returnCity} />
      <input type="hidden" name="returnDate" value={returnDate} />

      <DropdownField
        label={labels.category}
        value={category}
        placeholder={labels.category}
        options={categoryOptions}
        isOpen={openField === 'category'}
        onToggle={() => setOpenField((current) => (current === 'category' ? null : 'category'))}
        onSelect={(selectedValue) => {
          setCategory(selectedValue)
          setOpenField(null)
        }}
        fieldClassName={fieldClassName}
      />

      <DropdownField
        label={labels.pickupCity}
        value={pickupCity}
        placeholder={labels.pickupCity}
        options={cityOptions}
        isOpen={openField === 'pickupCity'}
        onToggle={() => setOpenField((current) => (current === 'pickupCity' ? null : 'pickupCity'))}
        onSelect={(selectedValue) => {
          setPickupCity(selectedValue)
          setOpenField(null)
        }}
        fieldClassName={fieldClassName}
      />

      <DateField
        label={labels.pickupDate}
        value={pickupDate}
        isOpen={openField === 'pickupDate'}
        onToggle={() => setOpenField((current) => (current === 'pickupDate' ? null : 'pickupDate'))}
        onSelect={(selectedValue) => {
          setPickupDate(selectedValue)
          setOpenField(null)
        }}
        fieldClassName={fieldClassName}
      />

      <DropdownField
        label={labels.returnCity}
        value={returnCity}
        placeholder={labels.returnCity}
        options={cityOptions}
        isOpen={openField === 'returnCity'}
        onToggle={() => setOpenField((current) => (current === 'returnCity' ? null : 'returnCity'))}
        onSelect={(selectedValue) => {
          setReturnCity(selectedValue)
          setOpenField(null)
        }}
        fieldClassName={fieldClassName}
      />

      <DateField
        label={labels.returnDate}
        value={returnDate}
        isOpen={openField === 'returnDate'}
        onToggle={() => setOpenField((current) => (current === 'returnDate' ? null : 'returnDate'))}
        onSelect={(selectedValue) => {
          setReturnDate(selectedValue)
          setOpenField(null)
        }}
        fieldClassName={fieldClassName}
      />

      {showSubmitButton && (
        <div className="flex items-center border-t border-white/10 px-5 py-4 md:border-t-0 md:border-l md:border-white/10">
          <button
            type="submit"
            className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#edb458] px-5 py-4 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95 md:min-w-40 ${submitClassName}`}
          >
            <SearchIcon />
            {labels.submit}
          </button>
        </div>
      )}
    </Form>
  )
}

const DropdownField = ({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
  fieldClassName,
}: {
  label: string
  value: string
  placeholder: string
  options: Option[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  fieldClassName: string
}) => (
  <div
    className={`group relative flex min-w-0 flex-1 border-b border-white/10 transition-colors duration-200 hover:bg-white/5 md:border-b-0 md:border-r md:border-white/10 ${fieldClassName}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
      aria-expanded={isOpen}
      aria-label={label}
    >
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-white/35 uppercase transition-colors duration-200 group-hover:text-[#edb458]">
          {label}
        </p>
        <span className={`block truncate text-sm font-medium ${value ? 'text-white' : 'text-white/50'}`}>
          {options.find((option) => option.value === value)?.label ?? placeholder}
        </span>
      </div>
      <ChevronIcon isOpen={isOpen} />
    </button>

    {isOpen && (
      <div className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c] shadow-2xl">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
              value === option.value
                ? 'bg-white/8 font-medium text-[#edb458]'
                : 'text-white hover:bg-white/5'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    )}
  </div>
)

const DateField = ({
  label,
  value,
  isOpen,
  onToggle,
  onSelect,
  fieldClassName,
}: {
  label: string
  value: string
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  fieldClassName: string
}) => (
  <div
    className={`group relative flex min-w-0 flex-1 border-b border-white/10 transition-colors duration-200 hover:bg-white/5 md:border-b-0 md:border-r md:border-white/10 ${fieldClassName}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
      aria-expanded={isOpen}
      aria-label={label}
    >
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-white/35 uppercase transition-colors duration-200 group-hover:text-[#edb458]">
          {label}
        </p>
        <span className={`block truncate text-sm font-medium ${value ? 'text-white' : 'text-white/50'}`}>
          {value ? formatDateLabel(value) : label}
        </span>
      </div>
      <CalendarIcon />
    </button>

    {isOpen && (
      <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2">
        <Calendar value={value} onChange={onSelect} />
      </div>
    )}
  </div>
)

const Calendar = ({ value, onChange }: CalendarProps) => {
  const today = new Date()
  const [current, setCurrent] = useState(parseDateValue(value) ?? today)
  const year = current.getFullYear()
  const month = current.getMonth()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

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

  const isSelected = (day: number) =>
    value === formatDateValue(new Date(year, month, day))

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year

  return (
    <div className="w-[260px] rounded-xl border border-white/10 bg-[#1c1c1c] p-4 shadow-2xl">
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
            } ${isSelected(cell.day) && cell.type === 'cur' ? '!bg-[#F5A623] !font-bold !text-black' : ''} ${
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

const formatDateValue = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const parseDateValue = (value: string) => {
  if (!value) {
    return null
  }

  const parsedDate = new Date(`${value}T00:00:00`)

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

const formatDateLabel = (value: string) => {
  const parsedDate = parseDateValue(value)

  if (!parsedDate) {
    return value
  }

  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#edb458]' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-[#edb458]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
  </svg>
)

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export default BookingBar
