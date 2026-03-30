
import Container from './Container'
import Image from 'next/image'

const OurBlog = () => {

  const blogPosts = [
    {
      id: 1,
      title: "Ochiq yo‘l zavqi: nega kabriolet ijarasi sayohat uchun zo‘r tanlov",
      date: "24 Fev, 2024",
      author: "Renting Cars",
      excerpt: "Kabriolet ijarasi nima uchun shahar va sayohat zavqini yanada kuchaytirishini bilib oling.",
      image: "/8c76f296821f23f867ec938c7ef2d61c.jpg",
      carType: "convertible",
      carColor: "#e8c84b",
      accentColor: "#e8c84b",
      bgGradient: "linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)",
      content: ""
    },
    {
      id: 2,
      title: "Mukammal road trip: uzun yo‘l uchun eng yaxshi premium marshrutlar",
      date: "18 Fev, 2024",
      author: "Renting Cars",
      excerpt: "Eng yaxshi yo‘nalishlar, qiziqarli joylar va foydali tavsiyalar bilan ideal safarni rejalashtiring.",
      image: "/850aff70b907cac84b8d5dbcd74b1427.jpg",
      carType: "hypercar",
      carColor: "#080808",
      accentColor: "#e8c84b",
      bgGradient: "linear-gradient(135deg, #080808 0%, #1a1a1a 100%)",
      content: ""
    },
    {
      id: 3,
      title: "Oilaviy sayohat uchun eng yaxshi SUV avtomobillar",
      date: "12 Fev, 2024",
      author: "Renting Cars",
      excerpt: "Kenglik, xavfsizlik va qulaylikni birlashtirgan SUV’lar bilan oilaviy safarni yanada yoqimli qiling.",
      image: "/ba58c78af4c120bc525d487a45b91a13.jpg",
      carType: "suv",
      carColor: "#e8c84b",
      accentColor: "#e8c84b",
      bgGradient: "linear-gradient(135deg, #e8c84b 0%, #c8a84b 100%)",
      content: ""
    }
  ]

  return (
    <section className="bg-[#1f1e1d] py-20 px-6 md:px-16">
      <Container className='your style'>
        {/* Decorative top line */}
        <div className="flex justify-center mb-8">
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, #c8a84b, transparent)" }} />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#edb458] uppercase">
            · Bizning blog ·
          </p>
          <h2 className="text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
            So‘nggi <span className="text-[#edb458]">yangiliklar</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
           {
                        blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="blog-card max-w-112.5 w-full rounded-xl overflow-hidden cursor-pointer border border-[#8080805f] group hover:shadow-xl hover:shadow-[#edb458a9] transition-shadow duration-300"
                                style={{ background: "#1a1a1a" }}
                            >
                                {/* Image area */}
                                <div className="relative h-52 overflow-hidden">
                                    {/* Background scene */}
                                    <div className="absolute inset-0" style={{ background: post.bgGradient }} />
          
                                    {/* Noise texture */}
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
          
                                    {/* Car SVG */}
                                    <div className="absolute inset-0 flex items-center justify-center group">
                                        <Image className='relative w-full object-cover group-hover:scale-105 transition-transform duration-300'
                                            src={post.image}
                                            alt={post.title}
                                            width={400}
                                            height={400}
                                        />
                                        <div className='absolute bottom-0 bg-linear-to-t from-[#000000cc] to-transparent w-full h-full'></div>
                                    </div>
          
                                    {/* Date badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="blog-date-badge text-xs text-white font-semibold px-3 py-1 rounded">
                                            {post.date}
                                        </span>
                                    </div>
          
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
          
                                {/* Card body */}
                                <div className="px-5 py-4 bg-[#1a1a1a]">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <span className="flex items-center gap-1">
                                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Muallif: {post.author}
                                        </span>
                                    </div>
                                    <h3 className="line-clamp-3 text-white text-sm font-semibold leading-snug group-hover:text-[#edb458] transition-colors duration-200">
                                        {post.title}
                                    </h3>
                                </div>
                            </article>
                        ))
                    }
        </div>
      </Container>
    </section>
  )
}

export default OurBlog
