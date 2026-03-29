import Container from './Container'
import InterestedInRentingText from './InterestedInRentingText'
import InterestedInRentingLogos from './InterestedInRentingLogos'
import { getSupabaseRows } from '@/lib/supabase'
import { Brands } from '@/types/Brands'

const InterestedInRenting = async () => {
  const brands = await getSupabaseRows<Brands>('brands').catch((error) => {
    console.error('InterestedInRenting brands fetch error:', error)
    return []
  })

  return (
    <section className="bg-[#1f1e1d] py-20">
      <Container className="">
        <div className="overflow-hidden rounded-[28px] border border-white/6 bg-[#222222] shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
            <InterestedInRentingText />
            {brands.length > 0 ? (
              <InterestedInRentingLogos brands={brands.slice(0, 6)} />
            ) : null}
        </div>
      </Container>
    </section>
  )
}

export default InterestedInRenting
