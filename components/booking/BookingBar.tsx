import BookingBarClient from './BookingBarClient'
import type { BookingBarProps } from './booking-bar.types'
import { getCategoryOptions, getCityOptions } from './booking-bar.utils'

const BookingBar = ({
  cars,
  categories,
  labels,
  className,
  fieldClassName = '',
  submitClassName = '',
  showSubmitButton = true,
}: BookingBarProps) => {
  const categoryOptions = getCategoryOptions(categories)
  const cityOptions = getCityOptions(cars)

  return (
    <BookingBarClient
      labels={labels}
      className={className}
      categoryOptions={categoryOptions}
      cityOptions={cityOptions}
      fieldClassName={fieldClassName}
      submitClassName={submitClassName}
      showSubmitButton={showSubmitButton}
    />
  )
}

export default BookingBar
