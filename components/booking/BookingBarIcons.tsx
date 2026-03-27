export const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
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

export const CalendarIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-[#edb458]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
  </svg>
)

export const SearchIcon = () => (
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
