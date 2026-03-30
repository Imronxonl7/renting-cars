import Image from 'next/image'
import type { ReactNode } from 'react'
import Container from '../Container'
import ContactHeroImages from '@/public/rolls_royce_phantom_ewb_2022_4k_8k_2-5120x2880.jpg'

const ContactHeroImage = () => {
  return (
    <section className="relative overflow-hidden bg-[#1f1e1d] text-white">
      <div className="relative min-h-[58svh] sm:min-h-[64svh] lg:min-h-[72svh] xl:min-h-[78svh]">
        <Image
          src={ContactHeroImages}
          alt="Bog‘lanish sahifasi foni"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.46)_40%,rgba(31,30,29,0.82)_100%)]" />

        <Container className="relative flex min-h-[58svh] items-center justify-center pt-24 pb-20 text-center sm:min-h-[64svh] sm:pt-28 sm:pb-24 lg:min-h-[72svh] lg:pb-28 xl:min-h-[78svh]">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.42em] text-[#edb458] uppercase sm:text-xs">
              Bog‘lanish
            </p>
            <h1 className="text-[clamp(2.35rem,9vw,5rem)] font-black leading-[0.94] tracking-[-0.04em]">
              Biz bilan <span className="text-[#edb458]">bog‘laning</span>
            </h1>
          </div>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10 pb-16 sm:-mt-14 sm:pb-20 lg:-mt-18 lg:pb-24 xl:-mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6 cursor-pointer">
          <ContactInfoCard
            title="Email yozing"
            value="info@drivora.com"
            icon={<MailIcon />}
          />
          <ContactInfoCard
            title="Manzilimiz"
            value="Tashkent City Park, Tashkent, Uzbekistan"
            icon={<LocationIcon />}
          />
          <ContactInfoCard
            title="Ish vaqti"
            value="Dushanba-Yakshanba: 8:00 - 19:00"
            icon={<ClockIcon />}
          />
          <ContactInfoCard
            title="Qo‘ng‘iroq qiling"
            value="+91 0324-242-342"
            icon={<PhoneIcon />}
          />
        </div>
      </Container>
    </section>
  )
}

const ContactInfoCard = ({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: ReactNode
}) => (
  <article
    className="group relative min-h-60 overflow-hidden rounded-3xl border border-white/8 bg-[#252421] px-6 py-7 text-white shadow-[0_18px_42px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-[#edb458] hover:text-[#1f1e1d] sm:min-h-66 sm:px-7 sm:py-8 xl:min-h-72 xl:rounded-[28px] xl:px-8 xl:py-9"
  >
    <div className="text-[#edb458] transition-colors duration-300 group-hover:text-[#1f1e1d]">{icon}</div>
    <h3 className="mt-8 line-clamp-2 text-[1.9rem] font-black leading-[0.95] tracking-[-0.03em] sm:mt-9 sm:text-[2rem] xl:mt-10 xl:text-[2.15rem]">
      {title}
    </h3>
    <p className="mt-3 max-w-[18ch] text-base leading-7 text-white/58 transition-colors duration-300 group-hover:text-[#1f1e1d]/82 sm:mt-4 sm:text-[1.05rem] sm:leading-8">
      {value}
    </p>

    <div
      className="pointer-events-none absolute right-2 -bottom-4 text-[5.5rem] font-black leading-none text-white opacity-[0.06] transition-colors duration-300 group-hover:text-[#1f1e1d] sm:text-[6.2rem] xl:text-[7rem]"
    >
      {icon}
    </div>
  </article>
)

const MailIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7h16v10H4V7Zm0 0 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LocationIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="11" r="2.2" fill="currentColor" />
  </svg>
)

const ClockIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.5v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 16.5v2a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.75-2.76 17.3 17.3 0 0 1-5.31-5.31A17.8 17.8 0 0 1 3.18 4.5a1.8 1.8 0 0 1 1.8-2h2a1.8 1.8 0 0 1 1.75 1.48c.12.8.32 1.57.6 2.3a1.8 1.8 0 0 1-.4 1.86l-.85.85a14.5 14.5 0 0 0 5.93 5.93l.85-.85a1.8 1.8 0 0 1 1.86-.4c.73.28 1.5.48 2.3.6A1.8 1.8 0 0 1 21 16.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ContactHeroImage
