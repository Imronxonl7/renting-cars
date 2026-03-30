import type { ReactNode } from 'react'

interface Service {
  num: string
  title: string
  description: string
  icon: ReactNode
}

const services: Service[] = [
  {
    num: '01',
    title: 'Kunlik avto ijara',
    description:
      'O‘zingizga qulay paytda mashinani olib, bemalol yuring va ish bitgach qaytaring. Qulay va tezkor kunlik ijara xizmati.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M8 6H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Oylik avto ijara',
    description:
      'Mashina sotib olmasdan ham uzoq muddat qulay foydalaning. Oylik tariflar moslashuvchan va xizmat darajasi yuqori.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14h2M14 14h2M8 18h2M14 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Yillik avto ijara',
    description:
      'Yil davomida shaxsiy parkdek foydalanish uchun premium yechim. Ustuvor bron, alohida menejer va yuqori darajadagi xizmat mavjud.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L3 7l9 5 9-5-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 12l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1f1e1d] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(237,180,88,0.8)_1px,transparent_0)] bg-size-[40px_40px] opacity-[0.025]" />

      <div className="mb-10 flex justify-center">
        <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#edb458,transparent)]" />
      </div>

      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#edb458] uppercase">
          · Bizning xizmatlar ·
        </p>
        <h2 className="text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
          Qo‘shimcha <span className="text-[#edb458]">xizmatlar</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {services.map((service) => {
          return (
            <div
              key={service.num}
              className="group relative flex min-h-70 cursor-default flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[linear-gradient(145deg,#161616_0%,#111111_100%)] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-[#edb45844] hover:bg-[linear-gradient(145deg,#1e1a0f_0%,#181818_100%)] hover:shadow-[0_0_50px_rgba(237,180,88,0.12),0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div
                className="absolute top-0 left-8 right-8 h-px bg-transparent transition-all duration-500 group-hover:bg-[linear-gradient(90deg,transparent,#edb458,transparent)]"
              />

              <div>
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#888] transition-all duration-300 group-hover:border-[#edb45840] group-hover:bg-[#edb45820] group-hover:text-[#edb458]"
                >
                  {service.icon}
                </div>

                <h3 className="mb-3 line-clamp-2 text-xl font-bold tracking-[-0.01em] text-[#e5e5e5] group-hover:text-white">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#888]">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#555] group-hover:text-[#edb458] cursor-pointer">
                  <span>Batafsil</span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#edb45840] bg-[#1e1e1e] text-sm font-black text-[#edb458] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#edb458] group-hover:text-[#0d0d0d]"
                >
                  {service.num}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
