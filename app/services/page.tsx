import type { Metadata } from 'next'
import Service from '@/components/services/Service'

export const metadata: Metadata = {
  title: 'Xizmatlar',
  description:
    'Kunlik, oylik va premium xizmatlarimiz bilan tanishing. Safar va biznes ehtiyojlari uchun qulay avto ijara yechimlarini toping.',
  keywords: [
    'avto ijara xizmatlari',
    'kunlik avto ijara',
    'oylik avto ijara',
    'premium xizmat',
    'hashamatli ijara yordami',
  ],
  openGraph: {
    title: 'Xizmatlar | Renting Cars',
    description:
      'Kunlik bron qilishdan tortib uzoq muddatli premium xizmatlargacha bo‘lgan barcha takliflarimizni ko‘ring.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xizmatlar | Renting Cars',
    description:
      'Qulay, moslashuvchan va ishonchli kunlik, oylik hamda premium xizmatlarni ko‘rib chiqing.',
  },
  alternates: {
    canonical: '/services',
  },
}

const ServicesPage = () => {
  return (
    <Service />
  )
}

export default ServicesPage
