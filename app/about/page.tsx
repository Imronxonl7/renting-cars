import type { Metadata } from 'next'
import HeaderImage from '@/components/about/HeaderImage'
import OurExperts from '@/components/about/OurExperts'
import ServicesSection from '@/components/OtherServices'
import Rentax from '@/components/Rentax'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about DriVora, our premium car rental experience, expert team, flexible services, and the standards behind every luxury booking.',
  keywords: [
    'about DriVora',
    'about car rental company',
    'premium rental team',
    'luxury car rental experts',
    'car rental service company',
  ],
  openGraph: {
    title: 'About Us | Renting Cars',
    description:
      'Discover the team, service philosophy, and premium standards that shape every DriVora rental experience.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Renting Cars',
    description:
      'Meet the experts and discover the service philosophy behind our premium car rental experience.',
  },
  alternates: {
    canonical: '/about',
  },
}

const AboutPage = () => {
  return (
    <section>
      <HeaderImage/>
      <Rentax/>
      <RentNow/>
      <SelectCarWithCategory/>
      <OurExperts/>
      <ServicesSection/>
    </section>
  )
}

export default AboutPage
