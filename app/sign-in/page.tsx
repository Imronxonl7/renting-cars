import type { Metadata } from 'next'
import Container from '@/components/Container'
import SignInForm from '@/components/auth/SignInForm'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Mavjud akkaunt bilan tizimga kiring va profilingizni ko‘ring.',
}

const SignInPage = () => {
  return (
    <section className="bg-[#1f1e1d] py-28 text-white">
      <Container className="">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/8 bg-[#1f1e1d] p-8 shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:p-10">
          <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">Akkauntga kirish</p>
          <h1 className="mt-4 text-4xl font-black">Sign in</h1>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Email va telefon raqamingiz orqali foydalanuvchi ma’lumotlari tekshiriladi.
          </p>

          <div className="mt-8">
            <SignInForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SignInPage
