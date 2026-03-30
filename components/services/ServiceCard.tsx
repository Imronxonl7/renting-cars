import Container from '../Container'

const services = [
  {
    id: '01',
    title: 'Korporativ mashina ijarasi',
    description:
      'Kompaniyalar uchun kunlik, haftalik yoki oylik asosda qulay tariflarda xizmat avtomobillarini taqdim etamiz.',
  },
  {
    id: '02',
    title: 'Haydovchi bilan ijara',
    description:
      'Shahar ichida uchrashuv, mehmon kutib olish yoki maxsus tadbirlar uchun tajribali haydovchi bilan avtomobil ajratiladi.',
  },
  {
    id: '03',
    title: 'Aeroport transfer xizmati',
    description:
      'Aeroportdan mehmonxona, ofis yoki uy manziliga o‘z vaqtida va qulay transfer xizmati yo‘lga qo‘yilgan.',
  },
  {
    id: '04',
    title: 'Avtoparkni uzoq muddatli ijaraga berish',
    description:
      'Bir nechta avtomobil kerak bo‘ladigan bizneslar uchun barqaror xizmat, texnik nazorat va moslashuvchan shartlar taklif qilamiz.',
  },
  {
    id: '05',
    title: 'VIP transfer',
    description:
      'Muhim mehmonlar, delegatsiyalar va premium safarlar uchun yuqori darajadagi qulaylikka ega transfer xizmati mavjud.',
  },
  {
    id: '06',
    title: 'To‘y va tadbirlar uchun mashina',
    description:
      'To‘y, foto sessiya, biznes forum va boshqa marosimlar uchun ko‘rkam va nufuzli avtomobillar tanlab beriladi.',
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
                  index === 0 ? 'h-50' : 'min-h-50'
                }`}
              >
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{service.title}</h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-6 translate-y-1/4">
                  <div className="absolute w-16 h-16 bg-[#0F0F0F] rounded-full -z-10"></div>
                        <div className="w-12 h-12 rounded-full bg-[#edb458] flex items-center justify-center text-black font-semibold shadow-lg hover:bg-[#2A2A2A] duration-200 hover:text-white cursor-pointer">
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
