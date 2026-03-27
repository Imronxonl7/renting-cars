import BookingBarCalendar from './BookingBarCalendar'
import { CalendarIcon } from './BookingBarIcons'
import { formatDateLabel } from './booking-bar.utils'

type BookingBarDateFieldProps = {
  label: string
  value: string
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  fieldClassName: string
}

const BookingBarDateField = ({
  label,
  value,
  isOpen,
  onToggle,
  onSelect,
  fieldClassName,
}: BookingBarDateFieldProps) => (
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
        <BookingBarCalendar value={value} onChange={onSelect} />
      </div>
    )}
  </div>
)

export default BookingBarDateField
