import AsnwerQuestion from '@/components/AsnwerQuestion'
import HeroSlider from '@/components/HeroSlider'
import InterestedInRenting from '@/components/InterestedInRenting'
import ServicesSection from '@/components/OtherServices'
import OtherServices from '@/components/OtherServices'
import OurBlog from '@/components/OurBlog'
import Rentax from '@/components/Rentax'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'
import SelectCarWithName from '@/components/SelectCarWithName'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "HomePage | Renting Cars",
  description:
    "You can find any car here",
};
const HomePage = () => {
  return (
    <section>
      <HeroSlider/>
      <Rentax/>
      <RentNow/>
      <SelectCarWithName/>
      <SelectCarWithCategory/>
      <ServicesSection/>
      <AsnwerQuestion/>
      <OurBlog/>
      <InterestedInRenting/>
    </section>
  )
}

export default HomePage
