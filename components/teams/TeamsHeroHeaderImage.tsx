import Image from 'next/image'
import Container from '../Container'
import TeamHeroImage from '@/public/LX700hfront.webp'
import { experts } from '../about/experts.data'

const TeamsHeroHeaderImage = () => {
  const featuredExpert = experts[0] ?? experts[1]

  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-[#1f1e1d] text-white sm:min-h-[78svh]">
      <Image
        src={TeamHeroImage}
        alt="Teams hero"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.46)_40%,rgba(31,30,29,0.8)_100%)]" />

      <Container className="relative flex min-h-[72svh] items-center justify-center pt-24 pb-16 text-center sm:min-h-[78svh] sm:pt-28">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.42em] text-[#edb458] uppercase">
            {featuredExpert.role}
          </p>
          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black leading-none tracking-[-0.04em]">
            {featuredExpert.name.split(' ')[0]}{' '}
            <span className="text-[#edb458]">
              {featuredExpert.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </div>
      </Container>
    </section>
  )
}

export default TeamsHeroHeaderImage
