import Container from '../Container'

const services = [
  {
    id: '01',
    title: 'Corporate Car Rental',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '02',
    title: 'Car Rental with Driver',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '03',
    title: 'Airport Transfer',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '04',
    title: 'Fleet Leasing',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '05',
    title: 'VIP Transfer',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '06',
    title: 'Corporate Car Rental',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
]

const ServiceCard = () => {
  return (
    <section className="relative z-20 -mt-14 bg-[#1f1e1d] pb-24 pt-3 sm:-mt-16 sm:pt-4 lg:-mt-20 lg:pb-28 lg:pt-10">
      <Container className="w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative bg-[#1C1C1C] rounded-2xl p-6 text-white overflow-hidden ${
                  index === 0 ? 'h-[200px]' : 'min-h-[200px]'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-6 translate-y-1/4">
                  <div className="absolute w-16 h-16 bg-[#0F0F0F] rounded-full -z-10"></div>
                  <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-semibold shadow-lg hover:bg-[#2A2A2A] duration-200 hover:text-white cursor-pointer">
                    {Number(service.id)}.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ServiceCard
