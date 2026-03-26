import Container from './Container'
import RentaxCard from './RentaxCard'
import RentaxText from './RentaxText'

const Rentax = () => {
  return (
    <section className="w-full bg-[#1f1e1d] py-16 sm:py-20 lg:py-24">
      <Container className=''>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-16 xl:gap-20">
          <RentaxText />
          <RentaxCard />
        </div>
      </Container>
    </section>
  )
}

export default Rentax
