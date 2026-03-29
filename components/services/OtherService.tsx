import Container from '../Container'

const otherServices = [
  {
    id: '01',
    title: 'Daily Car Rental',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '02',
    title: 'Monthly Car Rental',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
  {
    id: '03',
    title: 'Annual Car Rental',
    description:
      'Lorem ipsum dolor sit amet the consectetur adipiscing elit entesque hendrerit elit nisan lacinia feugiat nunc eu aucton.',
  },
]

const OtherService = () => {
  return (
    <section className="bg-[#1f1e1d] pb-24 pt-18 lg:pb-28 lg:pt-24">
      <Container className="w-full">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-6 h-14 w-px bg-[#edb458]" />
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#edb458]">
              What We Do
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Other Services
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <div
                key={service.id}
                className="relative min-h-[200px] overflow-hidden rounded-2xl bg-[#1C1C1C] p-6 text-white"
              >
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-6 translate-y-1/4">
                  <div className="absolute -z-10 h-16 w-16 rounded-full bg-[#0F0F0F]"></div>
                        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#edb458] font-semibold text-black shadow-lg transition duration-200 hover:bg-[#2A2A2A] hover:text-white">
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

export default OtherService
