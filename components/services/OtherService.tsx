import Container from '../Container'

const otherServices = [
  {
    id: '01',
    title: 'Kunlik avto ijara',
    description:
      'Qisqa muddatli safarlar uchun qulay, tezkor va ishonchli kunlik avto ijara xizmati.',
  },
  {
    id: '02',
    title: 'Oylik avto ijara',
    description:
      'Uzoqroq foydalanish uchun qulay tarif va premium xizmat bilan oylik yechim.',
  },
  {
    id: '03',
    title: 'Yillik avto ijara',
    description:
      'Yil davomida foydalanish uchun alohida shartlar va barqaror premium xizmat.',
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
              Bizning xizmatlar
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Qo‘shimcha xizmatlar
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <div
                key={service.id}
                className="relative min-h-50 overflow-hidden rounded-2xl bg-[#1C1C1C] p-6 text-white"
              >
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{service.title}</h3>
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
