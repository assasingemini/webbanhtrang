import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import LandingPageForm from './LandingPageForm';

export default async function AdminLandingPagePage() {
  const config = await prisma.langdingPage.findFirst({ where: { id: 1 } }) as any;

  const defaults = {
    heroTitle: 'Bánh Tráng Trộn Ngon Cần Thơ',
    heroSubtitle: 'Chua cay đậm đà – mê hoặc từng miếng cắn. Hương vị đặc trưng miền Tây với bò khô, trứng cút, đậu phộng rang và sa tế cay nồng.',
    heroBgImage: 'https://images.unsplash.com/photo-1660579384185-5d9cc8d5bb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600',
    aboutTitle: 'Hương Vị Đặc Trưng Từ Đất Cần Thơ',
    aboutDescription1: 'Ra đời từ niềm đam mê ẩm thực đường phố, Bánh Tráng Trộn Ngon Cần Thơ mang đến công thức bí truyền đã được chắt lọc qua nhiều năm kinh nghiệm.',
    aboutDescription2: 'Mỗi phần bánh tráng trộn là sự kết hợp tinh tế giữa nguyên liệu tươi ngon và gia vị đặc biệt, tạo nên hương vị không nơi nào sánh bằng.',
    aboutImage: 'https://images.unsplash.com/photo-1689760661329-1e6504082caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    statsRating: '4.9/5',
    statsDailyCustomers: '500+',
    statsExperience: '5 năm',
    heroPhone: '0123.456.789',
    contactAddress: '123 Đường 30/4, Quận Ninh Kiều, Cần Thơ',
    contactEmail: 'contact@banhtrangtronngoncantho.vn',
    contactHours: '09:00 - 22:00',
    contactDays: 'Thứ 2 - Chủ Nhật',
  };

  const initialData = {
    heroTitle: config?.heroTitle || defaults.heroTitle,
    heroSubtitle: config?.heroSubtitle || defaults.heroSubtitle,
    heroBgImage: config?.heroBgImage || defaults.heroBgImage,
    aboutTitle: config?.aboutTitle || defaults.aboutTitle,
    aboutDescription1: config?.aboutDescription1 || defaults.aboutDescription1,
    aboutDescription2: config?.aboutDescription2 || defaults.aboutDescription2,
    aboutImage: config?.aboutImage || defaults.aboutImage,
    statsRating: config?.statsRating || defaults.statsRating,
    statsDailyCustomers: config?.statsDailyCustomers || defaults.statsDailyCustomers,
    statsExperience: config?.statsExperience || defaults.statsExperience,
    heroPhone: config?.heroPhone || defaults.heroPhone,
    contactAddress: config?.contactAddress || defaults.contactAddress,
    contactEmail: config?.contactEmail || defaults.contactEmail,
    contactHours: config?.contactHours || defaults.contactHours,
    contactDays: config?.contactDays || defaults.contactDays,
    facebookUrl: config?.facebookUrl || '#',
    instagramUrl: config?.instagramUrl || '#',
    youtubeUrl: config?.youtubeUrl || '#',
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pt-16">
      <div className="py-10">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <Link href="/admin" className="text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={22} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                Quản lý Trang Chủ (Landing Page)
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Chỉnh sửa nội dung hiển thị trên trang chủ website.</p>
            </div>
          </div>

          <LandingPageForm initialData={initialData} />

        </div>
      </div>
    </div>
  );
}
