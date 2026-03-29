import { connection } from 'next/server'
import type { Metadata } from 'next'
import AsnwerQuestion from '@/components/AsnwerQuestion'
import HeroSlider from '@/components/HeroSlider'
import InterestedInRenting from '@/components/InterestedInRenting'
import OtherServices from '@/components/OtherServices'
import OurBlog from '@/components/OurBlog'
import Rentax from '@/components/Rentax'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'
import SelectCarWithName from '@/components/SelectCarWithName'

export const metadata: Metadata = {
  title: 'Hashamatli va Premium Avto Ijara',
  description:
    'Hashamatli, sport va oilaviy avtomobillarni qulay tarzda ijaraga oling. Har bir safar uchun premium mashinalar, qulay narx va yuqori darajadagi qulaylikni toping.',
  keywords: [
    'avto ijara',
    'hashamatli mashina ijarasi',
    'premium mashina ijarasi',
    'sport car ijara',
    'suv ijara',
    'kunlik mashina ijarasi',
  ],
  openGraph: {
    title: 'Hashamatli va Premium Avto Ijara | Renting Cars',
    description:
      'Qulaylik, uslub va kuchni birlashtirgan premium avtomobillarni tomosha qiling. Shahar, biznes yoki sayohat uchun mos mashinani toping.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Renting Cars',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hashamatli va Premium Avto Ijara | Renting Cars',
    description:
      'Har xil safarlar uchun qulay, chiroyli va kuchli premium avtomobillarni ko‘rib chiqing.',
  },
  alternates: {
    canonical: '/',
  },
}

const HomePage = async () => {
  await connection()

  return (
    <section>
      <HeroSlider />
      <Rentax />
      <RentNow />
      <SelectCarWithName />
      <SelectCarWithCategory />
      <OtherServices />
      <AsnwerQuestion />
      <OurBlog />
      <InterestedInRenting />
    </section>
  )
}

export default HomePage
