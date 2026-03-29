import Image from 'next/image'
import Container from '../Container'
import Audi from '@/public/AUDIrs7.jpg'

const HeaderImage = () => {
  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-[#1f1e1d] text-white sm:min-h-[78svh]">
      <Image
        src={Audi}
        alt="Audi RS7"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.44)_40%,rgba(31,30,29,0.78)_100%)]" />

      <Container className="relative flex min-h-[72svh] items-center justify-center pt-24 pb-16 text-center sm:min-h-[78svh] sm:pt-28">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.42em] text-[#edb458] uppercase">
            RENTAX
          </p>
          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black leading-none tracking-[-0.04em]">
            <span className="text-white">About </span>
            <span className="text-[#edb458]">Us</span>
          </h1>
        </div>
      </Container>
    </section>
  )
}

export default HeaderImage
