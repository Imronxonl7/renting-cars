import Image from 'next/image'

const ServiceHero = () => {
  return (
    <section className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden bg-[#1f1e1d] sm:min-h-[680px] lg:min-h-[760px]">
      <Image
        src="/audi.jpg"
        alt="Audi service hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.38)_0%,rgba(20,20,20,0.12)_30%,rgba(20,20,20,0.52)_100%)]" />

      <div className="relative z-10 flex min-h-[620px] w-full items-center justify-center px-6 text-center sm:min-h-[680px] lg:min-h-[760px]">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#edb458]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#edb458] sm:text-xs">
              What We Do
            </span>
            <span className="h-px w-8 bg-[#edb458]" />
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-[72px]">
            Our <span className="text-[#edb458]">Services</span>
          </h1>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero
