import type { Metadata } from 'next'
import Service from '@/components/services/Service'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our car rental services including daily, monthly, and premium support options designed for flexible travel and business needs.',
  keywords: [
    'car rental services',
    'daily car rental',
    'monthly car rental',
    'premium mobility service',
    'luxury rental support',
  ],
  openGraph: {
    title: 'Services | Renting Cars',
    description:
      'See the full range of DriVora rental services, from daily bookings to premium long-term mobility solutions.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Renting Cars',
    description:
      'Discover daily, monthly, and premium rental services built for comfort, flexibility, and reliability.',
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
