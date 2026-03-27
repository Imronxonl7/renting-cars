import type { Categories } from '@/types/Categories'
import type { Cars } from '@/types/Cars'
import type { Option } from './booking-bar.types'

export const monthNames = [
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

export const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const getCategoryOptions = (categories: Categories[]): Option[] =>
  categories.map((category) => ({
    label: category.name,
    value: category.id,
  }))

export const getCityOptions = (cars: Cars[]): Option[] =>
  Array.from(
    new Set(cars.map((car) => car.city?.trim()).filter((city): city is string => Boolean(city)))
  )
    .sort((firstCity, secondCity) => firstCity.localeCompare(secondCity))
    .map((city) => ({ label: city, value: city }))

export const formatDateValue = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const parseDateValue = (value: string) => {
  if (!value) {
    return null
  }

  const parsedDate = new Date(`${value}T00:00:00`)

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const formatDateLabel = (value: string) => {
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
