import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import BlogCard from "@/components/ui/BlogCard";
import { ChevronRight, Star, Award, Clock, Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Luôn fetch data mới từ DB

const LP_DEFAULTS = {
  heroTitle:           'Bánh Tráng Trộn Ngon Cần Thơ',
  heroSubtitle:        'Chua cay đậm đà – mê hoặc từng miếng cắn. Hương vị đặc trưng miền Tây với bò khô, trứng cút, đậu phộng rang và sa tế cay nồng.',
  heroBgImage:         'https://images.unsplash.com/photo-1660579384185-5d9cc8d5bb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600',
  aboutTitle:          'Hương Vị Đặc Trưng Từ Đất Cần Thơ',
  aboutDescription1:   'Ra đời từ niềm đam mê ẩm thực đường phố, Bánh Tráng Trộn Ngon Cần Thơ mang đến công thức bí truyền đã được chắt lọc qua nhiều năm kinh nghiệm.',
  aboutDescription2:   'Mỗi phần bánh tráng trộn là sự kết hợp tinh tế giữa nguyên liệu tươi ngon và gia vị đặc biệt, tạo nên hương vị không nơi nào sánh bằng.',
  aboutImage:          'https://images.unsplash.com/photo-1689760661329-1e6504082caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
  statsRating:         '4.9/5',
  statsDailyCustomers: '500+',
  statsExperience:     '5 năm',
};

export default async function Home() {
  const [hotProducts, blogPosts, lpConfig] = await Promise.all([
    prisma.menuItem.findMany({
      where: { isAvailable: true },
      take: 4,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.post.findMany({
      take: 3,
      orderBy: { publishedAt: 'desc' }
    }),
    prisma.langdingPage.findFirst({ where: { id: 1 } }),
  ]);

  const lp = { ...LP_DEFAULTS, ...lpConfig };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={lp.heroBgImage}
            alt="Bánh tráng trộn ngon Cần Thơ"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(166,8,23,0.88) 0%, rgba(254,82,0,0.70) 50%, rgba(0,0,0,0.4) 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{ background: 'rgba(255,178,0,0.2)', border: '1px solid #FFB200', color: '#FFB200' }}
            >
              <Flame size={14} />
              Đặc Sản Cần Thơ Chính Hiệu
            </div>

            <h1
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.3,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                letterSpacing: '-0.01em',
              }}
            >
              {lp.heroTitle}
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {lp.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FFB200, #FE5200)' }}
              >
                Xem Thực Đơn <ChevronRight size={18} />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: '2px solid rgba(255,255,255,0.5)' }}
              >
                Tìm Đường Đến Tiệm
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: Star, value: lp.statsRating, label: 'Đánh giá' },
                { icon: Award, value: lp.statsDailyCustomers, label: 'Khách/ngày' },
                { icon: Clock, value: lp.statsExperience, label: 'Kinh nghiệm' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,178,0,0.2)' }}>
                    <Icon size={18} style={{ color: '#FFB200' }} />
                  </div>
                  <div>
                    <div className="font-bold text-white" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>{value}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2" style={{ border: '2px solid rgba(255,255,255,0.5)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.7)' }} />
          </div>
        </div>
      </section>

      {/* Features bar */}
      <div style={{ background: '#A60817' }} className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white text-sm">
            {[
              '🌶️ Sa tế cay đặc biệt',
              '🥚 Trứng cút tươi ngon',
              '🥩 Bò khô thượng hạng',
              '🥜 Đậu phộng rang giòn',
            ].map((item) => (
              <div key={item} className="py-1">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="featured" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-3"
            style={{ background: '#FFF0F0', color: '#A60817' }}
          >
            ⭐ Bán Chạy Nhất
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', fontSize: '2rem', fontWeight: 700 }}
          >
            Món Ngôn Bán Chạy Nhất
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Những bịch bánh tráng làm nên tên tuổi của chúng tôi tại Ninh Kiều, Cần Thơ. Chắc chắn bạn phải thử một lần!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotProducts.length > 0 ? (
            hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium bg-white rounded-2xl border border-dashed">
              Đang cập nhật sản phẩm...
            </div>
          )}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #8A2F2C 0%, #A60817 50%, #FE5200 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2
            className="mb-3"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', fontSize: '1.8rem', fontWeight: 700 }}
          >
            Thực Đơn Đầy Đủ Hơn 10 Món
          </h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>Từ bánh tráng trộn cổ điển đến các biến thể sáng tạo độc đáo</p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
            style={{ background: '#FFB200', color: '#A60817' }}
          >
            Xem Tất Cả Sản Phẩm <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* About strip */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl overflow-hidden grid md:grid-cols-2" style={{ background: '#FFF8F0' }}>
            <div className="p-10 flex flex-col justify-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-4 self-start"
                style={{ background: '#FFF0F0', color: '#A60817' }}
              >
                🏆 Về Chúng Tôi
              </div>
              <h2
                className="text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', fontSize: '1.8rem', fontWeight: 700 }}
              >
                {lp.aboutTitle.split('Từ').length > 1 ? (
                  <>{lp.aboutTitle.split('Từ')[0]}<br /><span style={{ color: '#A60817' }}>Từ{lp.aboutTitle.split('Từ').slice(1).join('Từ')}</span></>
                ) : lp.aboutTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {lp.aboutDescription1}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {lp.aboutDescription2}
              </p>
            </div>
            <div className="relative h-72 md:h-auto">
              <img
                src={lp.aboutImage}
                alt="Hàng quán bánh tráng trộn Cần Thơ tấp nập khách"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-3"
              style={{ background: '#FFF0F0', color: '#A60817' }}
            >
              📝 Tin Tức & Chia Sẻ
            </div>
            <h2
              className="text-gray-900"
              style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', fontSize: '2rem', fontWeight: 700 }}
            >
              Bài Viết Mới Nhất
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="flex items-center gap-1 text-sm font-medium transition-all hover:gap-2"
            style={{ color: '#A60817' }}
          >
            Xem Tất Cả <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogCard key={post.id} post={{ ...post, publishedAt: post.publishedAt.toISOString() }} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium bg-white rounded-2xl border border-dashed">
              Đang cập nhật tin tức...
            </div>
          )}
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Tiệm có ship bánh tráng trộn Cần Thơ tận nơi không?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Có, chúng tôi nhận ship hỏa tốc bánh tráng trộn trong toàn khu vực Ninh Kiều, Cần Thơ chỉ trong vòng 30 phút."
                }
              },
              {
                "@type": "Question",
                "name": "Bánh tráng trộn giá bao nhiêu một bịch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Giá giao động từ 15.000đ đến 35.000đ tùy loại topping bạn chọn. Món đắt hàng nhất là Bánh Tráng Trộn Thập Cẩm Đặc Biệt giá 35.000đ."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
