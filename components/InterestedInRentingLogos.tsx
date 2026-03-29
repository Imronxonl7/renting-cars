import { Brands } from '@/types/Brands'

const InterestedInRentingLogos = ({ brands }: { brands: Brands[] }) => {
  return (
    <div className="rounded-b-[28px] border-t border-white/6 bg-[#262626] px-4 py-6 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group flex min-h-24 flex-col items-center justify-center rounded-2xl border border-white/6 bg-white/2 px-3 py-4 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-[#edb458]/45"
          >
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logo}
                alt={brand.name}
                className="mb-2 h-12 w-auto object-contain opacity-90 transition duration-300 group-hover:opacity-100"
              />
            ) : (
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#edb458]/30 bg-black/15 text-lg font-black tracking-tight text-[#edb458]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InterestedInRentingLogos
