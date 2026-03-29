import Image from 'next/image'
import Link from 'next/link'

const InteresredService = () => {
  return (
    <section className="bg-[#1f1e1d] pb-24 pt-4 lg:pb-28">
      <div className="relative min-h-[501px] w-full overflow-hidden sm:min-h-[560px] lg:min-h-[620px]">
        <Image
          src="/Aston.webp"
          alt="Interested in renting background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,12,0.42)_0%,rgba(12,12,12,0.16)_34%,rgba(12,12,12,0.56)_100%)]" />

        <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 text-center sm:min-h-[560px] lg:min-h-[620px]">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#edb458]">
            Rent Your Car
          </p>

          <h2 className="max-w-[14ch] text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[58px]">
            Interested in Renting?
          </h2>

          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Don&apos;t hesitate and send us a message.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/contact"
                          className="inline-flex min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#edb458] px-8 py-4 text-base font-bold text-[#1f1e1d] transition-colors duration-300 hover:bg-white hover:text-[#edb458]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4A8.5 8.5 0 1 1 21 11.5Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.7 12.4c.3 1.4 1.5 2.5 3 2.8 1 .2 2-.1 2.7-.8.7-.7 1-1.7.8-2.7-.3-1.4-1.5-2.5-3-2.8-1-.2-2 .1-2.7.8-.7.7-1 1.7-.8 2.7Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              WhatsApp
            </Link>

            <Link
              href="/cars"
                          className="inline-flex min-w-[190px] items-center justify-center gap-3 rounded-full border border-white/35 bg-black/18 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#edb458] hover:text-[#1f1e1d]"
            >
              Rent Now
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M7 17 17 7M17 7H8M17 7v9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteresredService
