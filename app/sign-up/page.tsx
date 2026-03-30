import type { Metadata } from 'next'
import Container from '@/components/Container'
import SignUpForm from '@/components/auth/SignUpForm'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Yangi foydalanuvchi sifatida ro‘yxatdan o‘ting va profilingizni saqlang.',
}

const SignUpPage = () => {
  return (
    <section className="bg-[#1f1e1d] py-28 text-white">
      <Container className="">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/8 bg-[#1f1e1d] p-8 shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:p-10">
          <p className="text-xs font-semibold tracking-[0.32em] text-[#edb458] uppercase">Ro‘yxatdan o‘tish</p>
          <h1 className="mt-4 text-4xl font-black">Sign up</h1>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Ma’lumotlaringiz saqlanadi va foydalanuvchi ID si localStorage ga yoziladi.
          </p>

          <div className="mt-8">
            <SignUpForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SignUpPage
