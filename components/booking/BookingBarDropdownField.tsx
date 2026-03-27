import { ChevronIcon } from './BookingBarIcons'
import type { Option } from './booking-bar.types'

type BookingBarDropdownFieldProps = {
  label: string
  value: string
  placeholder: string
  options: Option[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  fieldClassName: string
}

const BookingBarDropdownField = ({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
  fieldClassName,
}: BookingBarDropdownFieldProps) => (
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

export default BookingBarDropdownField
