import React from 'react'
import Container from './Container'
import RentaxText from './RentaxText'
import RentaxCard from './RentaxCard'

const Rentax = () => {
  return (
    <section>
      <Container className='your style'>
        <div className='flex items-center justify-between'>
            <RentaxText/>
            <RentaxCard/>
        </div>
      </Container>
    </section>
  )
}

export default Rentax
