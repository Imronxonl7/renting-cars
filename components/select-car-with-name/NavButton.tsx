type NavButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
}

const NavButton = ({ direction, onClick }: NavButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'left' ? 'Oldingi mashina' : 'Keyingi mashina'}
    className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border border-white/10 bg-[#292826] text-white transition-colors duration-200 hover:border-[#edb458] hover:text-[#edb458]"
  >
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </button>
)

export default NavButton
