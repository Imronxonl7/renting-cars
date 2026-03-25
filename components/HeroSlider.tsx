import { Cars } from '@/types/Cars'
import { Categories } from '@/types/Categories'
import { getSupabaseRows } from '@/lib/supabase'
import HeroSliderClient from './hero/HeroSliderClient'

const HeroSlider = async () => {
  const heroData = await Promise.all([
      getSupabaseRows<Cars>('cars'),
      getSupabaseRows<Categories>('categories'),
    ]).then(([cars, categories]) => ({ cars, categories }))
    .catch((error) => {
      console.error('HeroSlider fetch error:', error)
      return null
    })

  if (!heroData || heroData.cars.length === 0) {
    return null
  }

  return <HeroSliderClient cars={heroData.cars} categories={heroData.categories} />
}

export default HeroSlider
