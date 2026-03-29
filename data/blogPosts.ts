export interface BlogPost {
  id: number
  title: string
  date: string
  author: string
  excerpt: string
  image: string
  accentColor: string
  bgGradient: string
  categories: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Mashina ijarasi uchun kerak bo‘ladigan hujjatlar',
    date: '17-aprel, 2025',
    author: 'Martin C',
    excerpt:
      'Mashina bron qilishdan oldin haydovchilik guvohnomasi, depozit talablari va safar hujjatlarigacha bilishingiz kerak bo‘lgan hamma narsa.',
    image: '/8c76f296821f23f867ec938c7ef2d61c.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)',
    categories: ['Mashinalar', 'Ijara', 'Xizmat'],
  },
  {
    id: 2,
    title: 'Sport va boshqa mashinalar ijarasi narxi qanday hisoblanadi',
    date: '10-aprel, 2025',
    author: 'Renting Cars jamoasi',
    excerpt:
      'Sport mashinalar, premium sedanlar, SUV va uzoq muddatli ijaralarda narxga nimalar ta’sir qilishini sodda tarzda ko‘rib chiqamiz.',
    image: '/850aff70b907cac84b8d5dbcd74b1427.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #080808 0%, #1a1a1a 100%)',
    categories: ['Premium', 'Sport mashinalar', 'Avtomobillar'],
  },
  {
    id: 3,
    title: 'Ijara mashinasida jarimalarni qanday tekshirish mumkin?',
    date: '3-aprel, 2025',
    author: 'Renting Cars jamoasi',
    excerpt:
      'Jarimalarni tekshirish, ijara shartlarini to‘g‘ri tushunish va safardan keyin kutilmagan to‘lovlarga duch kelmaslik yo‘llarini bilib oling.',
    image: '/ba58c78af4c120bc525d487a45b91a13.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)',
    categories: ['Qoidalar', 'Haydash bo‘yicha maslahatlar', 'Sug‘urta'],
  },
]
