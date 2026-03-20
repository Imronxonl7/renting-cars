import React from 'react'
import Container from './Container'
import InterestedInRentingText from './InterestedInRentingText'
import InterestedInRentingLogos from './InterestedInRentingLogos'

const InterestedInRenting = () => {
  return (
    <section>
      <Container className='your style'>
        <div className='flex flex-col gap-20'>
            <InterestedInRentingText/>
            <InterestedInRentingLogos/>
        </div>
      </Container>
    </section>
  )
}

export default InterestedInRenting
