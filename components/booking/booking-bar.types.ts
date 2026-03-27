import type { Categories } from '@/types/Categories'
import type { Cars } from '@/types/Cars'

export type BookingBarLabels = {
  category: string
  pickupCity: string
  pickupDate: string
  returnCity: string
  returnDate: string
  submit: string
}

export type BookingBarProps = {
  cars: Cars[]
  categories: Categories[]
  labels: BookingBarLabels
  className: string
  fieldClassName?: string
  submitClassName?: string
  showSubmitButton?: boolean
}

export type Option = {
  label: string
  value: string
}

export type BookingFieldKey =
  | 'category'
  | 'pickupCity'
  | 'pickupDate'
  | 'returnCity'
  | 'returnDate'

export type CalendarProps = {
  value: string
  onChange: (value: string) => void
}
