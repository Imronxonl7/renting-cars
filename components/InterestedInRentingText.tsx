import Image from 'next/image'
import Link from 'next/link'

function WhatsAppIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 8.8c.2-.4.5-.5.8-.5h.6c.2 0 .4.1.5.4l.6 1.8c.1.3 0 .6-.2.8l-.5.7c.4.9 1.1 1.6 2 2l.7-.5c.2-.2.5-.2.8-.2l1.8.6c.3.1.4.3.4.5v.6c0 .3-.2.6-.5.8-.5.3-1 .4-1.6.4-3 0-5.6-2.5-5.6-5.6 0-.6.1-1.1.4-1.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const InterestedInRentingText = () => {
  return (
    <div className="relative min-h-90 overflow-hidden rounded-t-[28px] sm:min-h-105 lg:min-h-125">
      <Image
        src="/Aston.webp"
        alt="Luxury sports car in the Interested in Renting section"
        fill
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,14,0.2)_0%,rgba(14,14,14,0.3)_40%,rgba(14,14,14,0.72)_100%)]" />

      <div className="relative z-10 flex min-h-90 flex-col items-center justify-center px-6 py-12 text-center sm:min-h-105 lg:min-h-125">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#edb458]">
          Rent Your Car
        </p>

        <h2 className="max-w-[14ch] text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[56px]">
          Interested in Renting?
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          Don&apos;t hesitate and send us a message.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-w-47.5 items-center justify-center gap-3 rounded-full bg-[#edb458] px-8 py-4 text-base font-bold text-[#1f1e1d] transition-colors duration-300 hover:bg-white"
          >
            <WhatsAppIcon />
            WhatsApp
          </Link>

          <Link
            href="/cars"
            className="inline-flex min-w-47.5 items-center justify-center gap-3 rounded-full border border-[#edb458]/55 bg-[#edb458]/20 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#edb458] hover:bg-[#edb458] hover:text-[#1f1e1d]"
          >
            Rent Now
            <ArrowUpRightIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterestedInRentingText
