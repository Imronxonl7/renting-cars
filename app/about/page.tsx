import HeaderImage from '@/components/about/HeaderImage'
import OurExperts from '@/components/about/OurExperts'
import ServicesSection from '@/components/OtherServices'
import Rentax from '@/components/Rentax'
import RentNow from '@/components/RentNow'
import SelectCarWithCategory from '@/components/SelectCarWithCategory'

const AboutPage = () => {
  return (
    <section>
      <HeaderImage/>
      <Rentax/>
      <RentNow/>
      <SelectCarWithCategory/>
      <OurExperts/>
      <ServicesSection/>
    </section>
  )
}

export default AboutPage
