import type { Metadata } from 'next'
import Container from '@/components/Container'
import ProfileClient from '@/components/auth/ProfileClient'

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Foydalanuvchi profilingiz, email, telefon va akkaunt holati shu sahifada ko‘rinadi.',
}

const ProfilePage = () => {
  return (
    <section className="bg-[#1f1e1d] py-28 text-white">
      <Container className="">
        <ProfileClient />
      </Container>
    </section>
  )
}

export default ProfilePage
