import type { Metadata } from 'next'
import TeamsHeroHeaderImage from '@/components/teams/TeamsHeroHeaderImage'
import TeamsGrid from '@/components/teams/TeamsGrid'

export const metadata: Metadata = {
  title: 'Jamoamiz',
  description:
    'Premium ijara, VIP xizmat, bron qilish va premium park boshqaruvi ortidagi DriVora jamoasi bilan tanishing.',
  keywords: [
    'jamoamiz',
    'avto ijara jamoasi',
    'premium bron jamoasi',
    'vip ijara mutaxassislari',
    'drivora jamoasi',
  ],
  openGraph: {
    title: 'Jamoamiz | Renting Cars',
    description:
      'Hashamatli bronlar, mijozlar tajribasi va premium xizmatni boshqarayotgan jamoamizni ko‘ring.',
    url: '/teams',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jamoamiz | Renting Cars',
    description:
      'Premium avto ijara tajribasi va mijozlar yordami ortidagi jamoamiz bilan tanishing.',
  },
  alternates: {
    canonical: '/teams',
  },
}

const TeamsPage = () => {
  return (
    <section>
      <TeamsHeroHeaderImage/>
      <TeamsGrid />
    </section>
  )
}

export default TeamsPage
