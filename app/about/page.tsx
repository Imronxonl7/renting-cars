import type { Metadata } from 'next'
import HeaderImage from '@/components/about/HeaderImage'
import OurExperts from '@/components/about/OurExperts'
import ServicesSection from '@/components/OtherServices'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'
import RentaxAbout from '@/components/about/RentaxAbout'

export const metadata: Metadata = {
  title: 'Biz Haqimizda',
  description:
    'DriVora haqida ko‘proq bilib oling: premium avto ijara tajribamiz, ekspert jamoamiz, qulay xizmatlarimiz va har bir buyurtma ortidagi sifat mezonlari.',
  keywords: [
    'biz haqimizda',
    'avto ijara kompaniyasi',
    'premium ijara jamoasi',
    'hashamatli avto ijara ekspertlari',
    'mashina ijarasi xizmati',
  ],
  openGraph: {
    title: 'Biz Haqimizda | Renting Cars',
    description:
      'DriVora’ning jamoasi, xizmat falsafasi va har bir premium ijara ortidagi sifat standartlari bilan tanishing.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biz Haqimizda | Renting Cars',
    description:
      'Ekspertlarimiz bilan tanishing va premium avto ijara xizmatimiz ortidagi yondashuvni bilib oling.',
  },
  alternates: {
    canonical: '/about',
  },
}

const AboutPage = () => {
  return (
    <section>
      <HeaderImage/>
      <RentaxAbout/>
      <RentNow/>
      <SelectCarWithCategory/>
      <OurExperts/>
      <ServicesSection/>
    </section>
  )
}

export default AboutPage
