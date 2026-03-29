import Container from './Container'
import AnswerQuestionClient from './AnswerQuestionClient'
import { getSupabaseRows } from '@/lib/supabase'
import type { Faq } from '@/types/Faq'

const AsnwerQuestion = async () => {
  const faqItems = await getSupabaseRows<Faq>('faq').catch((error) => {
    console.error('AsnwerQuestion faq fetch error:', error)
    return []
  })

  if (faqItems.length === 0) {
    return null
  }

  return (
    <section className="w-full overflow-hidden bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className="">
        <div className="mb-7 flex justify-center sm:mb-8">
          <div className="h-14 w-px bg-[linear-gradient(to_bottom,transparent,#edb458,transparent)]" />
        </div>

        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold tracking-[0.38em] text-[#edb458] uppercase">
            FAQ
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-none tracking-[-0.03em]">
            <span className="text-white">Ko‘p so‘raladigan </span>
            <span className="text-[#edb458]">savollar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Rental process, payment, delivery, and booking conditions bo&apos;yicha eng ko&apos;p
            beriladigan savollar.
          </p>
        </div>

        <AnswerQuestionClient items={faqItems} />
      </Container>
    </section>
  )
}

export default AsnwerQuestion
