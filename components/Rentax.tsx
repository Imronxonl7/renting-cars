import React from 'react'
import Container from './Container'
import RentaxText from './RentaxText'
import RentaxCard from './RentaxCard'

const Rentax = () => {
  return (
    <section className='bg-[#1a1a1a] w-full'>
      <Container className=''>
        <div className='py-20 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16'>
            <RentaxText/>
            <RentaxCard/>
        </div>
      </Container>
    </section>
  )
}

export default Rentax
