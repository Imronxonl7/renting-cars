import type { Metadata } from 'next'
import OurExperts from '@/components/about/OurExperts'

export const metadata: Metadata = {
  title: 'Ekspertlar',
  description:
    'Sotuv, bron qilish, logistika va mijozlarga premium xizmat ko‘rsatishda ishlaydigan ekspert jamoamiz bilan tanishing.',
  keywords: [
    'ekspertlar',
    'avto ijara mutaxassislari',
    'premium xizmat ekspertlari',
    'hashamatli ijara konsultantlari',
    'drivora ekspertlari',
  ],
  openGraph: {
    title: 'Ekspertlar | Renting Cars',
    description:
      'Bron qilish, premium xizmat va mijozlar tajribasi ortidagi mutaxassislar bilan tanishing.',
    url: '/experts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekspertlar | Renting Cars',
    description:
      'Bron, operatsiya, logistika va premium xizmatdagi ekspert jamoamizni ko‘ring.',
  },
  alternates: {
    canonical: '/experts',
  },
}

const ExpertsPage = () => {
  return (
    <section>
      <OurExperts />
    </section>
  )
}

export default ExpertsPage
