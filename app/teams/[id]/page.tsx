import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import { experts } from '@/components/about/experts.data'

type TeamDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async ({ params }: TeamDetailPageProps): Promise<Metadata> => {
  const { id } = await params
  const expert = experts.find((item) => item.id === id)

  if (!expert) {
    return { title: 'Jamoa A’zosi Topilmadi' }
  }

  return {
    title: `${expert.name} | Jamoa`,
    description: `${expert.name} - ${expert.role}`,
    openGraph: {
      title: `${expert.name} | Jamoa | Renting Cars`,
      description: `${expert.name} - ${expert.role}`,
      url: `/teams/${id}`,
      type: 'website',
      images: [expert.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${expert.name} | Jamoa | Renting Cars`,
      description: `${expert.name} - ${expert.role}`,
      images: [expert.image],
    },
    alternates: {
      canonical: `/teams/${id}`,
    },
  }
}

const TeamDetailPage = async ({ params }: TeamDetailPageProps) => {
  const { id } = await params
  const expert = experts.find((item) => item.id === id)

  if (!expert) {
    notFound()
  }

  return (
    <section className="overflow-hidden bg-[#1f1e1d] py-24 text-white">
      <Container className="">
        <div className="mb-8">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#edb458] transition-colors hover:text-white"
          >
            <span>←</span>
            <span>Back to Team</span>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(360px,0.82fr)] lg:items-stretch xl:gap-10">
          <div className="rounded-[30px] border border-white/8 bg-[#252421] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
              Team Profile
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">
              {expert.name}
            </h1>
            <p className="mt-3 text-xl font-medium text-white/72">{expert.role}</p>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
              {expert.bio}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StatCard label="Experience" value={expert.experience} />
              <StatCard label="Specialty" value={expert.specialty} />
            </div>

            <div className="mt-8 rounded-[24px] border border-white/8 bg-[#1f1e1d] px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#edb458] uppercase">
                Personal Note
              </p>
              <p className="mt-4 text-base leading-7 text-white/74 sm:text-lg">
                &ldquo;{expert.quote}&rdquo;
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[#252421] shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
            <div className="relative aspect-[0.92/1] min-h-[420px] w-full sm:min-h-[520px]">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 92vw, 42vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.56)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">
                  {expert.specialty}
                </p>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{expert.name}</h2>
                <p className="mt-2 text-white/72">{expert.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[22px] border border-white/8 bg-[#1f1e1d] px-5 py-5">
    <p className="text-xs font-semibold tracking-[0.28em] text-[#edb458] uppercase">{label}</p>
    <p className="mt-3 text-lg font-bold text-white">{value}</p>
  </div>
)

export default TeamDetailPage
