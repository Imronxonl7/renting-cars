import type { Metadata } from 'next'
import ContactHeroImage from '@/components/contact/ContactHeroImage'
import ContactFormSection from '@/components/contact/ContactFormSection'
import React from 'react'

export const metadata: Metadata = {
  title: 'Bog‘lanish',
  description:
    'DriVora bilan bog‘laning: avto ijara, bron qilish, manzil ma’lumotlari va keyingi buyurtmangiz bo‘yicha yordam oling.',
  keywords: [
    'bog‘lanish',
    'avto ijara aloqasi',
    'premium bron yordam',
    'contact page',
    'drivora bilan bog‘lanish',
  ],
  openGraph: {
    title: 'Bog‘lanish | Renting Cars',
    description:
      'Bron qilish, yordam olish va ofis manzilini bilish uchun jamoamiz bilan bog‘laning.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bog‘lanish | Renting Cars',
    description:
      'Avto ijara, xizmat yordami va manzil ma’lumotlari uchun biz bilan bog‘laning.',
  },
  alternates: {
    canonical: '/contact',
  },
}

const ContactPage = () => {
  return (
    <div>
      <ContactHeroImage/>
      <ContactFormSection />
    </div>
  )
}

export default ContactPage
