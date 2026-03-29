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
    title: 'Documents required for car rental',
    date: 'April 17, 2025',
    author: 'Martin C',
    excerpt:
      'Everything you need to prepare before booking a rental car, from driving license checks to deposit expectations and travel documents.',
    image: '/8c76f296821f23f867ec938c7ef2d61c.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)',
    categories: ['Cars', 'Rent A Car', 'Rental Service'],
  },
  {
    id: 2,
    title: 'Rental cost of sport and other cars',
    date: 'April 10, 2025',
    author: 'Renting Cars Team',
    excerpt:
      'A practical look at what affects pricing across sports cars, premium sedans, SUVs, and long-term rentals.',
    image: '/850aff70b907cac84b8d5dbcd74b1427.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #080808 0%, #1a1a1a 100%)',
    categories: ['Luxury', 'Sport Cars', 'Vehicles'],
  },
  {
    id: 3,
    title: 'Rental cars how to check driving fines?',
    date: 'April 3, 2025',
    author: 'Renting Cars Team',
    excerpt:
      'Learn how to review penalties, understand rental agreements, and avoid surprise charges after your trip ends.',
    image: '/ba58c78af4c120bc525d487a45b91a13.jpg',
    accentColor: '#edb458',
    bgGradient: 'linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)',
    categories: ['Rules', 'Driving Tips', 'Insurance'],
  },
]
