import React from 'react'
import InteresredService from './InteresredService'
import OtherService from './OtherService'
import ServiceCard from './ServiceCard'
import ServiceHero from './ServiceHero'
import SelectCarWithCategory from '../SelectCarWithCategory'

const Service = () => {
  return (
    <section>
      <ServiceHero />
      <ServiceCard />
      <OtherService />
      <InteresredService />
      <SelectCarWithCategory/>
    </section>
  )
}

export default Service
