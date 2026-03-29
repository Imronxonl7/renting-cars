export type Expert = {
  id: string
  name: string
  role: string
  image: string
  bio: string
  experience: string
  specialty: string
  quote: string
}

export const experts: Expert[] = [
  {
    id: 'mia-jane',
    name: 'Mia Jane',
    role: 'Sales Director',
    image: 'https://i.pravatar.cc/900?img=32',
    bio: 'Mia premium rental requests bilan ishlaydi va mijozga aynan mos avtomobilni topishda juda kuchli.',
    experience: '8 years',
    specialty: 'Luxury bookings',
    quote: 'Every rental should feel effortless from the first call to the final return.',
  },
  {
    id: 'michael-brown',
    name: 'Michael Brown',
    role: 'Corporate Mobility Lead',
    image: 'https://i.pravatar.cc/900?img=12',
    bio: 'Michael biznes mijozlar uchun uzoq muddatli flot va executive transfer jarayonlarini boshqaradi.',
    experience: '10 years',
    specialty: 'Corporate fleet',
    quote: 'Reliable mobility is not a feature, it is the standard our clients expect.',
  },
  {
    id: 'margaret-nancy',
    name: 'Margaret Nancy',
    role: 'VIP Client Manager',
    image: 'https://i.pravatar.cc/900?img=47',
    bio: 'Margaret high-end bookings, airport delivery va private client support bo‘yicha jamoaning asosiy mutaxassisi.',
    experience: '7 years',
    specialty: 'VIP rentals',
    quote: 'Luxury service is built through timing, detail, and calm communication.',
  },
  {
    id: 'daniel-frost',
    name: 'Daniel Frost',
    role: 'Operations Supervisor',
    image: 'https://i.pravatar.cc/900?img=59',
    bio: 'Daniel kundalik operatsiyalar, mashina tayyorligi va pickup-return jarayonlarini aniq nazorat qiladi.',
    experience: '9 years',
    specialty: 'Daily operations',
    quote: 'Smooth operations are what make premium service feel natural.',
  },
  {
    id: 'emma-carter',
    name: 'Emma Carter',
    role: 'Brand Experience Manager',
    image: 'https://i.pravatar.cc/900?img=25',
    bio: 'Emma mijozning birinchi taassurotidan boshlab brend bilan aloqasini kuchaytiradigan tajribalarni yaratadi.',
    experience: '6 years',
    specialty: 'Client experience',
    quote: 'People remember how a service made them feel long after the drive ends.',
  },
  {
    id: 'alex-hayes',
    name: 'Alex Hayes',
    role: 'Performance Car Specialist',
    image: 'https://i.pravatar.cc/900?img=15',
    bio: 'Alex sport va performance segmentidagi avtomobillar bo‘yicha chuqur tavsiya va texnik yo‘l-yo‘riq beradi.',
    experience: '11 years',
    specialty: 'Sports segment',
    quote: 'A high-performance car should be matched with the right driver and purpose.',
  },
  {
    id: 'sofia-reed',
    name: 'Sofia Reed',
    role: 'Reservation Strategist',
    image: 'https://i.pravatar.cc/900?img=41',
    bio: 'Sofia mavsumiy talabni kuzatadi va booking oqimlarini optimal rejalashtirib beradi.',
    experience: '5 years',
    specialty: 'Reservation planning',
    quote: 'Planning ahead is what keeps premium availability consistent.',
  },
  {
    id: 'liam-hart',
    name: 'Liam Hart',
    role: 'Logistics Coordinator',
    image: 'https://i.pravatar.cc/900?img=68',
    bio: 'Liam delivery, relocation va city-to-city handover jarayonlarini tez va aniq boshqaradi.',
    experience: '7 years',
    specialty: 'Vehicle logistics',
    quote: 'Precision in logistics saves time for both the team and the client.',
  },
  {
    id: 'nora-blake',
    name: 'Nora Blake',
    role: 'Customer Success Lead',
    image: 'https://i.pravatar.cc/900?img=49',
    bio: 'Nora repeat clients bilan ishlaydi, feedback yig‘adi va xizmat sifatini muntazam yaxshilaydi.',
    experience: '8 years',
    specialty: 'Client retention',
    quote: 'Retention grows when people trust the service without hesitation.',
  },
  {
    id: 'ethan-scott',
    name: 'Ethan Scott',
    role: 'Fleet Quality Manager',
    image: 'https://i.pravatar.cc/900?img=22',
    bio: 'Ethan har bir avtomobilning estetik holati, tozaligi va premium standartlarga mosligini tekshiradi.',
    experience: '9 years',
    specialty: 'Fleet quality',
    quote: 'The vehicle itself should reflect the promise the brand makes.',
  },
]
