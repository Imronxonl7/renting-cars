'use client'

import Form from 'next/form'
import { useEffect, useRef, useState } from 'react'
import BookingBarDateField from './BookingBarDateField'
import BookingBarDropdownField from './BookingBarDropdownField'
import { SearchIcon } from './BookingBarIcons'
import type { BookingBarLabels, BookingFieldKey, Option } from './booking-bar.types'

type BookingBarClientProps = {
  labels: BookingBarLabels
  className: string
  categoryOptions: Option[]
  cityOptions: Option[]
  fieldClassName: string
  submitClassName: string
  showSubmitButton: boolean
}

const BookingBarClient = ({
  labels,
  className,
  categoryOptions,
  cityOptions,
  fieldClassName,
  submitClassName,
  showSubmitButton,
}: BookingBarClientProps) => {
  const [openField, setOpenField] = useState<BookingFieldKey | null>(null)
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

  const toggleField = (field: BookingFieldKey) => {
    setOpenField((current) => (current === field ? null : field))
  }

  const handleSelect = (field: BookingFieldKey, selectedValue: string) => {
    const setters: Record<BookingFieldKey, (value: string) => void> = {
      category: setCategory,
      pickupCity: setPickupCity,
      pickupDate: setPickupDate,
      returnCity: setReturnCity,
      returnDate: setReturnDate,
    }

    setters[field](selectedValue)
    setOpenField(null)
  }

  return (
    <Form action="/cars" ref={wrapperRef} className={className}>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="pickupCity" value={pickupCity} />
      <input type="hidden" name="pickupDate" value={pickupDate} />
      <input type="hidden" name="returnCity" value={returnCity} />
      <input type="hidden" name="returnDate" value={returnDate} />

      <BookingBarDropdownField
        label={labels.category}
        value={category}
        placeholder={labels.category}
        options={categoryOptions}
        isOpen={openField === 'category'}
        onToggle={() => toggleField('category')}
        onSelect={(selectedValue) => handleSelect('category', selectedValue)}
        fieldClassName={fieldClassName}
      />

      <BookingBarDropdownField
        label={labels.pickupCity}
        value={pickupCity}
        placeholder={labels.pickupCity}
        options={cityOptions}
        isOpen={openField === 'pickupCity'}
        onToggle={() => toggleField('pickupCity')}
        onSelect={(selectedValue) => handleSelect('pickupCity', selectedValue)}
        fieldClassName={fieldClassName}
      />

      <BookingBarDateField
        label={labels.pickupDate}
        value={pickupDate}
        isOpen={openField === 'pickupDate'}
        onToggle={() => toggleField('pickupDate')}
        onSelect={(selectedValue) => handleSelect('pickupDate', selectedValue)}
        fieldClassName={fieldClassName}
      />

      <BookingBarDropdownField
        label={labels.returnCity}
        value={returnCity}
        placeholder={labels.returnCity}
        options={cityOptions}
        isOpen={openField === 'returnCity'}
        onToggle={() => toggleField('returnCity')}
        onSelect={(selectedValue) => handleSelect('returnCity', selectedValue)}
        fieldClassName={fieldClassName}
      />

      <BookingBarDateField
        label={labels.returnDate}
        value={returnDate}
        isOpen={openField === 'returnDate'}
        onToggle={() => toggleField('returnDate')}
        onSelect={(selectedValue) => handleSelect('returnDate', selectedValue)}
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

export default BookingBarClient
