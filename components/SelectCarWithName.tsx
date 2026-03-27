import Container from './Container'
import SelectCarWithNameHeader from './SelectCarWithNameHeader'
import SelectCarWithNameClient from './SelectCarWithNameClient'
import { getSupabaseRows } from '@/lib/supabase'
import { Cars } from '@/types/Cars'

const SelectCarWithName = async () => {
  const cars = await getSupabaseRows<Cars>('cars').catch((error) => {
    console.error('SelectCarWithName fetch error:', error)
    return []
  })
  const limitedCars = cars.slice(-30)

  if (limitedCars.length === 0) {
    return null
  }

  return (
    <section className="w-full overflow-hidden bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className=''>
        <SelectCarWithNameHeader />
        <SelectCarWithNameClient cars={limitedCars} />
      </Container>
    </section>
  )
}

export default SelectCarWithName
