import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Renting Cars - Premium Avto Ijara',
    template: '%s | Renting Cars',
  },
  metadataBase: new URL('https://renting-cars-fwlb.vercel.app'),
  description:
    'Hashamatli, sport va kundalik avtomobillarni qulay ijaraga oling. Shahar, biznes va alohida kunlar uchun premium avto xizmat.',
  applicationName: 'Renting Cars',
  keywords: [
    'avto ijara',
    'premium avto ijara',
    'hashamatli mashina ijarasi',
    'sport mashina ijarasi',
    'suv ijara',
    'kunlik mashina ijarasi',
  ],
  openGraph: {
    title: 'Renting Cars - Premium Avto Ijara',
    description:
      'Hashamatli, sport va kundalik avtomobillarni qulay ijaraga oling. Premium xizmat, chiroyli park va qulay bron qilish jarayoni bir joyda.',
    url: '/',
    siteName: 'Renting Cars',
    locale: 'uz_UZ',
    type: 'website',
    images: [
      {
        url: '/rentax.jpg',
        width: 1200,
        height: 630,
        alt: 'Renting Cars preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renting Cars - Premium Avto Ijara',
    description:
      'Hashamatli, sport va kundalik avtomobillar uchun premium avto ijara platformasi.',
    images: ['/rentax.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
