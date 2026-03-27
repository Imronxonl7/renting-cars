import { connection } from 'next/server'
import type { Metadata } from 'next'
import AsnwerQuestion from '@/components/AsnwerQuestion'
import HeroSlider from '@/components/HeroSlider'
import InterestedInRenting from '@/components/InterestedInRenting'
import OtherServices from '@/components/ServicesSection'
import OurBlog from '@/components/OurBlog'
import Rentax from '@/components/Rentax'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'
import SelectCarWithName from '@/components/SelectCarWithName'

export const metadata: Metadata = {
  title: 'Luxury & Premium Car Rental',
  description:
    'Rent luxury, sport, and family-friendly cars with a smooth booking experience. Discover premium vehicles, daily deals, and standout comfort for every trip.',
  keywords: [
    'luxury car rental',
    'premium car rental',
    'sports car hire',
    'SUV rental',
    'daily car rental',
    'rent a car homepage',
  ],
  openGraph: {
    title: 'Luxury & Premium Car Rental | Renting Cars',
    description:
      'Explore premium rentals built for comfort, style, and performance. Find the right car for city drives, business travel, and unforgettable road trips.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Renting Cars',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury & Premium Car Rental | Renting Cars',
    description:
      'Explore premium rentals built for comfort, style, and performance for every kind of trip.',
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
