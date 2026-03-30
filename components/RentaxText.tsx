import Link from 'next/link'

const features = ['Sport va premium mashinalar', 'Tejamkor mashinalar']

const RentaxText = () => {
  return (
    <div className="mx-auto w-full max-w-160 lg:mx-0 xl:max-w-170">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-7 bg-[#edb458]" />
        <span className="text-xs font-semibold tracking-[0.28em] text-[#edb458] uppercase">
          Rentax
        </span>
      </div>

      <h2 className="max-w-[14ch] text-4xl font-black leading-[1.02] text-white sm:text-5xl xl:max-w-none xl:text-[56px]">
        Biz oddiy ijara
      </h2>
      <h2 className="mb-6 max-w-[16ch] text-4xl font-black leading-[1.02] text-[#edb458] sm:text-5xl xl:max-w-none xl:text-[56px]">
        kompaniyasidan ko‘prog‘imiz
      </h2>

      <p className="mb-8 max-w-155 text-sm leading-7 text-white/55 sm:text-[15px]">
        Biz mijozga shunchaki mashina berib qo‘yadigan xizmat emasmiz. Premium
        yondashuv, tezkor aloqa, qulay bron va yuqori darajadagi servis bilan
        har bir safarni ancha yengil va yoqimli qilamiz.
      </p>

      <ul className="mb-10 space-y-5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-white">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edb458]/12 text-[#edb458]">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm font-medium sm:text-[15px]">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/about"
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#edb458] px-8 py-4 text-sm font-bold text-[#1f1e1d] transition-colors duration-300 hover:bg-white hover:text-[#edb458]"
      >
        Batafsil
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M17 8l4 4m0 0-4 4m4-4H3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}

export default RentaxText
