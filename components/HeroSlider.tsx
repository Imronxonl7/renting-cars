import React from 'react'
import Container from './Container'
import getData from '@/lib/api'

const HeroSlider = async() => {
    const cars =await getData({url:"cars"})
    console.log(cars);
    
  return (
    <section>
      <Container className=''>
        <div>

        </div>
      </Container>
    </section>
  )
}

export default HeroSlider
